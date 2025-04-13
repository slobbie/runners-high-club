import React, {useRef, useState, useEffect} from 'react';
import {
  ScrollView,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import styled from '@emotion/native';
import {Typo} from '@shared/components/atoms';
import {colors} from '@shared/styles/theme';

const ITEM_HEIGHT = 50; // 각 항목의 높이
const VISIBLE_ITEMS = 5; // 보여질 항목 수 (홀수로 설정)
const PICKER_HEIGHT = ITEM_HEIGHT * VISIBLE_ITEMS;

interface IPickerItem {
  key: string;
  label: string;
}

interface IPickerColumnProps {
  defaultValue: string;
  data: IPickerItem[];
  onChange: (data: IPickerItem) => void;
  label?: string;
}

// 단일 휠 컴포넌트 (기존 Picker 기반)
const PickerColumn = ({
  defaultValue,
  data,
  onChange,
  label,
}: IPickerColumnProps) => {
  const scrollViewRef = useRef<ScrollView>(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  // 초기 선택 항목으로 스크롤
  useEffect(() => {
    const selectedIndex = data.findIndex(item => item.key === defaultValue);
    if (selectedIndex > -1 && scrollViewRef.current) {
      const yOffset = selectedIndex * ITEM_HEIGHT;

      // 컴포넌트가 마운트된 후 스크롤 위치 설정
      setTimeout(() => {
        scrollViewRef.current?.scrollTo({y: yOffset, animated: true});
      }, 100);
    }
  }, [defaultValue]);

  // 스크롤 이벤트 처리
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    setScrollPosition(offsetY);
  };

  // 스크롤이 멈출 때 가장 가까운 항목 선택
  const handleScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const closestIndex = Math.round(offsetY / ITEM_HEIGHT);

    // 범위를 벗어나지 않도록 확인
    const validIndex = Math.max(0, Math.min(closestIndex, data.length - 1));

    // 스크롤 위치 조정
    scrollViewRef.current?.scrollTo({
      y: validIndex * ITEM_HEIGHT,
      animated: true,
    });

    // 선택된 항목 변경
    onChange(data[validIndex]);
  };

  // 항목 클릭 시 스크롤 처리
  const handleItemPress = (index: number) => {
    scrollViewRef.current?.scrollTo({
      y: index * ITEM_HEIGHT,
      animated: true,
    });
    onChange(data[index]);
  };

  return (
    <ColumnContainer>
      {/* 중앙 하이라이트 영역 */}
      <SelectedItemHighlight />

      <ScrollViewContainer>
        <ScrollView
          ref={scrollViewRef}
          showsVerticalScrollIndicator={false}
          snapToInterval={ITEM_HEIGHT}
          decelerationRate="fast"
          onScroll={handleScroll}
          onMomentumScrollEnd={handleScrollEnd}
          scrollEventThrottle={16}
          contentContainerStyle={{
            paddingTop: PICKER_HEIGHT / 2 - ITEM_HEIGHT / 2,
            paddingBottom: PICKER_HEIGHT / 2 - ITEM_HEIGHT / 2,
          }}>
          {data.map((item, index) => {
            const itemOffset = index * ITEM_HEIGHT;
            const distance = Math.abs(scrollPosition - itemOffset);

            // 스케일과 투명도 계산
            const scale = Math.max(
              0.9,
              1 - 0.03 * Math.min(distance / ITEM_HEIGHT, 2),
            );
            const opacity = Math.max(
              0.7,
              1 - 0.15 * Math.min(distance / ITEM_HEIGHT, 2),
            );

            return (
              <PickerItem
                key={item.key}
                onPress={() => handleItemPress(index)}
                style={{
                  height: ITEM_HEIGHT,
                  transform: [{scale}],
                  opacity,
                }}>
                <Typo
                  fontSize={16}
                  fontWeight={distance < ITEM_HEIGHT / 2 ? 600 : 400}
                  color={
                    distance < ITEM_HEIGHT / 2 ? colors.text_333 : '#999999'
                  }>
                  {item.label}
                </Typo>
              </PickerItem>
            );
          })}
        </ScrollView>
      </ScrollViewContainer>

      {/* 단위 레이블 (분, 초 등) */}
      {label && (
        <UnitLabel>
          <Typo fontSize={16} fontWeight={400} color={colors.text_333}>
            {label}
          </Typo>
        </UnitLabel>
      )}
    </ColumnContainer>
  );
};

export default PickerColumn;

const ColumnContainer = styled.View({
  flex: 1,
  height: PICKER_HEIGHT,
  position: 'relative',
  justifyContent: 'center',
  alignItems: 'center',
});

const ScrollViewContainer = styled.View({
  height: PICKER_HEIGHT,
  width: '100%',
  overflow: 'hidden',
});

const PickerItem = styled.TouchableOpacity({
  width: '100%',
  justifyContent: 'center',
  alignItems: 'center',
});

const SelectedItemHighlight = styled.View({
  position: 'absolute',
  left: 0,
  right: 0,
  top: '50%',
  marginTop: -ITEM_HEIGHT / 2,
  height: ITEM_HEIGHT,
  backgroundColor: '#f0f0f0',
  zIndex: -1,
});

const UnitLabel = styled.View({
  position: 'absolute',
  right: 50,
  top: '50%',
  marginTop: -15,
  height: 30,
  justifyContent: 'center',
  alignItems: 'center',
});
