import React, {useEffect, useMemo} from 'react';
import styled from '@emotion/native';
import {
  AppState,
  AppStateStatus,
  FlatList,
  ListRenderItem,
  ViewToken,
} from 'react-native';
import useHealthPermissions from '@shared/hooks/useHealthPermissions';
import healthPermissions from '@shared/constants/healthPermissions';
import {useSharedValue} from 'react-native-reanimated';
import RecordListItem from '@features/record/components/RecordListItem';
import {mockupData} from '@features/record/mockup/recordMockup';
import {IRunRecord} from '@shared/interface/run.interface';

/**
 * 기록 화면
 * @returns React.JSX.Element
 */
const RecordScreen = () => {
  const healthPermissionController = useHealthPermissions();

  /** flatlist 애니메이션 벨류 */
  const viewItems = useSharedValue<ViewToken[]>([]);

  /** 건강 데이터 권한 요청 이펙트 */
  useEffect(() => {
    healthPermissionController.initHealthPermission(healthPermissions);
  }, [healthPermissionController]);

  /** 백그라운드 에서 다시 앱으로 돌아왔을 시 실행 */
  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (nextAppState === 'active') {
        console.log('백그라운드에서 돌아옴 :', nextAppState);
        healthPermissionController.getPermissionAuthStatus(healthPermissions);
      }
    };
    const listener = AppState.addEventListener('change', handleAppStateChange);
    return () => {
      listener.remove();
    };
  }, [healthPermissionController]);

  /** flatlist 랜더링 아이템 */
  const renderItem: ListRenderItem<IRunRecord> = useMemo(() => {
    const lastIndex = mockupData.length;
    return ({item}) => (
      <RecordListItem item={item} viewItems={viewItems} lastIndex={lastIndex} />
    );
  }, [viewItems]);

  return (
    <View>
      <TitleView>
        <TitleText>기록</TitleText>
      </TitleView>
      <FlatList
        data={mockupData}
        disableVirtualization={false}
        renderItem={renderItem}
        onViewableItemsChanged={info => {
          const {viewableItems} = info;
          viewItems.value = viewableItems;
        }}
      />
    </View>
  );
};

export default RecordScreen;

const View = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.colors.bg_gray200};
`;

const TitleView = styled.View`
  width: 100%;
  top: 2%;
  margin-bottom: 5%;
`;

const TitleText = styled.Text`
  font-weight: 600;
  font-size: 22px;
  color: ${({theme}) => theme.colors.text_333};
  margin-left: 5%;
`;
