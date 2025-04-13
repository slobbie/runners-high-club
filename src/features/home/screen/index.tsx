import {DrawerMenu, Header} from '@shared/components/organisms';
import React, {useState} from 'react';
import styled from '@emotion/native';
import {Drawer} from 'react-native-drawer-layout';
import Animated, {
  SlideInDown,
  SlideInRight,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import {TouchableOpacity} from 'react-native-gesture-handler';
import {Space, SvgIcon, Typo} from '@shared/components/atoms';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import useRoutineStore from '@shared/store/routine.store';
import useNavigate from '@shared/hooks/useNavigate';

const HomeScreen = () => {
  const navigation = useNavigate();
  const insets = useSafeAreaInsets();
  const {routineData} = useRoutineStore();

  const today = new Date().getDay();

  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [startWorkout, setStartWorkout] = useState<boolean>(false);

  const scale = useSharedValue(1);

  const onPressIn = (index: number) => {
    setCurrentIndex(index);
    scale.value = withTiming(0.9);
  };

  const onPressOut = () => {
    scale.value = withTiming(1);
    setCurrentIndex(null);
    // setStartWorkout(true);
    navigation.navigate('workoutScreen');
  };

  const cardItemStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: scale.value}],
    };
  });

  const startWorkoutStyle = useAnimatedStyle(() => {
    return {
      position: 'absolute',
      zIndex: 1000,
      width: '100%',
      height: '100%',
    };
  });

  const workoutData = routineData.find(data => data.day === today);

  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  return (
    <Drawer
      drawerType="slide"
      open={isDrawerOpen}
      onOpen={() => {}}
      onClose={() => setIsDrawerOpen(false)}
      renderDrawerContent={() => (
        <DrawerMenu
          onClose={() => {
            setIsDrawerOpen(false);
          }}
        />
      )}>
      <Wrapper>
        <Content
          style={{
            paddingTop: insets.top,
          }}>
          <Header
            headerLeft={
              <ToDayView>
                <Typo fontSize={16} fontWeight={'bold'}>
                  Monday
                </Typo>
                <Typo fontSize={16} fontWeight={'bold'}>
                  13
                </Typo>
              </ToDayView>
            }
            headerRight={
              <TouchableOpacity onPress={() => setIsDrawerOpen(true)}>
                <SvgIcon
                  name="icon_menu"
                  size={24}
                  fill={'#fff'}
                  stroke={'#fff'}
                />
              </TouchableOpacity>
            }
          />
          <TitleView>
            <Animated.View entering={SlideInRight.duration(600)}>
              <Typo fontSize={36} fontWeight={'bold'}>
                TODAY - {workoutData?.workoutName}
              </Typo>
            </Animated.View>
          </TitleView>
          <Space bottom={20} />
          <Animated.FlatList
            data={workoutData?.routines || []}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              gap: 10,
              paddingBottom: 30,
              paddingHorizontal: 24,
            }}
            style={{
              flex: 1,
            }}
            keyExtractor={item => item.id.toString()}
            itemLayoutAnimation={SlideInRight.duration(600)}
            renderItem={({item, index}) => {
              return (
                <AnimatedCardItem
                  style={[
                    currentIndex === index ? cardItemStyle : undefined,
                    currentIndex === index && startWorkout
                      ? startWorkoutStyle
                      : undefined,
                    {backgroundColor: '#fff'},
                  ]}
                  onPressIn={() => onPressIn(index)}
                  onPressOut={onPressOut}
                  entering={SlideInDown.duration(800).delay(100 * index)} // 추가적인 지연 효과 적용 가능
                >
                  <ArrowUpRight>
                    <SvgIcon name={'icon_arrow_up_right'} />
                  </ArrowUpRight>
                  <Typo
                    fontSize={24}
                    color={'#1f1f1f'}
                    lineHeight={40}
                    fontWeight={'bold'}>
                    {item.title}
                  </Typo>
                  <Typo
                    fontSize={16}
                    color={'#1f1f1f'}
                    lineHeight={40}
                    fontWeight={'bold'}>
                    세트간 휴식 {item.rest} 초
                  </Typo>
                  <CircleView>
                    <StartView>
                      <Typo
                        fontSize={16}
                        color={'#1f1f1f'}
                        lineHeight={40}
                        fontWeight={'bold'}>
                        {`시작하기`}
                      </Typo>
                    </StartView>
                  </CircleView>
                </AnimatedCardItem>
              );
            }}
          />
        </Content>
      </Wrapper>
    </Drawer>
  );
};

export default HomeScreen;

const Wrapper = styled(Animated.View)({
  flex: 1,
  backgroundColor: '#1f1f1f',
});

const Content = styled.View({
  flex: 1,
});

const ToDayView = styled.View({
  flexDirection: 'row',
  gap: 4,
});

const TitleView = styled.View({
  alignItems: 'flex-start',
  gap: 10,
  paddingHorizontal: 24,
});

const CardItem = styled.Pressable({
  width: '100%',
  height: 200,
  paddingHorizontal: 24,
  paddingVertical: 16,
  backgroundColor: '#f3f752',
  borderRadius: 30,
});

const AnimatedCardItem = Animated.createAnimatedComponent(CardItem);

const CircleView = styled.View({
  marginTop: 'auto',
  width: '100%',
  flexDirection: 'row',
  justifyContent: 'flex-end',
  gap: 10,
});

const StartView = styled.View({
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: 'auto',
});

const ArrowUpRight = styled.View({
  width: 24,
  height: 24,
  position: 'absolute',
  right: 16,
  top: 16,
});
