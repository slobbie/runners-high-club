import styled from '@emotion/native';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {
  BottomSheetContainer,
  ButtonCircle,
  Space,
  SvgIcon,
  Typo,
} from '@shared/components/atoms';
import {Header} from '@shared/components/organisms';
import useCountdown from '@shared/hooks/useCountdown';
import useNavigate from '@shared/hooks/useNavigate';
import {timeFormatUtils} from '@shared/utils/timeFormatUtils';
import React, {useEffect, useRef, useState} from 'react';
import {Keyboard, Pressable} from 'react-native';
import Animated, {
  SlideInDown,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {SafeAreaView} from 'react-native-safe-area-context';
import ControlButtonGroup from '../components/ControlButtonGroup';
import useRoutineStore from '@shared/store/routine.store';
import {IRap} from '@features/workoutRoutineForm/store/useRapsStore';
import uuid from 'react-native-uuid';
import RestButtonGroup from '../components/RestButtonGroup';
import SetupRunContent from '../components/SetupRunContent';

const bgColors = ['tomato', 'orange', 'yellow', 'green', 'blue'];

const WorkoutScreen = () => {
  const navigation = useNavigate();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const {routineData} = useRoutineStore();

  const [isStart, setIsStart] = useState(false);

  const closeBottomsheet = () => {
    bottomSheetModalRef.current?.close();
    Keyboard.dismiss();
  };

  const settingHandler = () => {
    bottomSheetModalRef.current?.present();
  };

  const onStartHandler = () => {
    setIsStart(true);
    startCountdown();
  };

  const [baseCount, setBaseCount] = useState(3);

  const [count, startCountdown] = useCountdown(baseCount);

  const opacity = useSharedValue(0);

  /** 카운트 애니메이션 */
  useEffect(() => {
    if (!isStart) {
      return;
    }
    opacity.value = withTiming(1, {duration: 250});

    const resetAnimation = setTimeout(() => {
      opacity.value = withTiming(0, {duration: 400});
    }, 500);

    return () => clearTimeout(resetAnimation);
  }, [opacity, count, isStart]);

  /** 텍스트 애니메이션 스타일 */
  const animatedTextStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  const runDataRef = useRef({
    timer: 0,
    kmText: '',
  });

  const [timer, setTimer] = useState(0);

  const [isPause, setIsPause] = useState(false);

  const endWorkHandler = () => {
    setTimer(0);
    setIsPause(false);
    setIsStart(false);
    setIsRest(false);
  };

  const today = '목요일';

  const findRoutine = routineData.find(find => find.day === today);

  const [isRest, setIsRest] = useState<boolean>(false);
  const [currentRap, setCurrentRap] = useState<Partial<IRap>>();
  const [restDuration, setRestDuration] = useState<number>(100);
  const [currentSet, setCurrentSet] = useState<number>(1);

  const endSetHandler = () => {
    setCurrentSet(prev => prev + 1);

    setCurrentRap({
      id: uuid.v4(),
      duration: timer,
      weight: 0,
    });

    setTimer(0);
    setIsRest(true);
  };

  const nextSetHandler = () => {
    const lastRep = findRoutine?.routines;

    if (isPause) {
      setIsPause(false);
    }

    if (currentSet === lastRep?.length) {
      console.log(`currentRap :`, currentRap);
      endWorkHandler();
      return;
    }

    setBaseCount(3);
    startCountdown(() => {
      setIsRest(false);
    });
  };

  /** 시간 업데이트 */
  useEffect(() => {
    if (count <= 0 && !isPause) {
      const updateTime = () => {
        runDataRef.current.timer = timer;
        setTimer(prevTime => prevTime + 1);
        re = setTimeout(updateTime, 1000);
      };
      let re = setTimeout(updateTime, 1000);
      return () => {
        clearTimeout(re);
      };
    }
  }, [count, timer]);

  /** 시간 업데이트 */
  useEffect(() => {
    if (isRest) {
      const updateTime = () => {
        setRestDuration(prevTime => prevTime - 1);
        re = setTimeout(updateTime, 1000);
      };
      let re = setTimeout(updateTime, 1000);
      return () => {
        clearTimeout(re);
      };
    }
  }, [isRest]);

  return (
    <SafeAreaView edges={['top']} style={{flex: 1, backgroundColor: '#1f1f1f'}}>
      <Top>
        <Header
          headerLeft={
            <Pressable onPress={() => navigation.replace('drawer')}>
              <SvgIcon name="icon_arrow_back" size={40} />
            </Pressable>
          }
        />
      </Top>

      <Content>
        {findRoutine?.routines?.map((item, index) => (
          <SetView
            key={item.id}
            entering={SlideInDown.duration(800).delay(100 * index)}
            bgColor={bgColors[index]}
            zIndex={10 * (routineData.length - index)}
            bottom={100 * index}>
            <TitleView>
              <Typo color={'#1f1f1f'} fontSize={22} fontWeight={'bold'}>
                {item.rep} 세트
              </Typo>
              <Left>
                <ButtonCircle
                  onPress={settingHandler}
                  size={40}
                  buttonColor="transparent">
                  <SvgIcon name="setting" size={24} />
                </ButtonCircle>
              </Left>
            </TitleView>
            <RepView>
              <Typo color={'#1f1f1f'} fontSize={22} fontWeight={600}>
                무게: {item.weight} Kg
              </Typo>
              <Typo color={'#1f1f1f'} fontSize={22} fontWeight={600}>
                휴식: {item.rest} 초
              </Typo>
            </RepView>
          </SetView>
        ))}
      </Content>
      <BottomContent>
        <StartView>
          <StartBtn onPress={onStartHandler}>
            <Typo>START</Typo>
          </StartBtn>
        </StartView>
      </BottomContent>

      <BottomSheetContainer snapPoint="90%" ref={bottomSheetModalRef}>
        <SetupRunContent
          onPress={closeBottomsheet}
          onChange={() => {}}
          inputValue={''}
        />
      </BottomSheetContainer>
      {isStart && (
        <Dim>
          <Modal>
            {count > 0 ? (
              <AnimatedCountText style={[animatedTextStyle]}>
                {count}
              </AnimatedCountText>
            ) : (
              <CountView>
                <Typo color={'#333'} fontSize={30} fontWeight={600}>
                  {isRest ? '휴식' : '운동시간'}
                </Typo>
                <Space bottom={20} />
                <Typo color={'#333'} fontSize={40} fontWeight={600}>
                  {isRest
                    ? timeFormatUtils.formatDuration(restDuration)
                    : timeFormatUtils.formatDuration(timer)}
                </Typo>
                <BottomButtonView>
                  {isRest ? (
                    <RestButtonGroup nextSetHandler={nextSetHandler} />
                  ) : (
                    <ControlButtonGroup
                      nextSetHandler={endSetHandler}
                      endRunCallback={endWorkHandler}
                      pauseHandler={() => setIsPause(!isPause)}
                      isPause={isPause}
                    />
                  )}
                </BottomButtonView>
              </CountView>
            )}
          </Modal>
        </Dim>
      )}
    </SafeAreaView>
  );
};

export default WorkoutScreen;

const SetView = styled(Animated.View)<{
  bgColor: string;
  zIndex: number;
  bottom: number;
}>(({bgColor, zIndex, bottom}) => ({
  width: '100%',
  height: 200,
  alignItems: 'center',
  borderRadius: 20,
  backgroundColor: bgColor,
  position: 'absolute',
  bottom,
  zIndex,
  paddingHorizontal: 24,
  paddingVertical: 20,
}));

const TitleView = styled.View({
  width: '100%',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
});

const RepView = styled.View({
  width: '100%',
  marginTop: 'auto',
});

const Left = styled.View`
  align-items: center;
`;

const StartView = styled.View({
  width: '100%',
  paddingHorizontal: 24,
  alignItems: 'center',
  justifyContent: 'center',
  bottom: 0,
});

const StartBtn = styled.TouchableOpacity(({theme}) => ({
  width: '50%',
  height: 56,
  backgroundColor: theme.colors.primary,
  borderRadius: 25,
  alignItems: 'center',
  justifyContent: 'center',
}));
const Top = styled.View({
  flex: 3,
  position: 'relative',
});

const Content = styled.View({
  position: 'relative',
  paddingHorizontal: 24,
  alignContent: 'center',
  justifyContent: 'center',
});

const BottomContent = styled.View({
  flex: 1,
  position: 'relative',
  alignContent: 'center',
  justifyContent: 'center',
  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
  paddingBottom: 20,
});

const Dim = styled.View({
  width: '100%',
  height: '100%',
  position: 'absolute',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  alignItems: 'center',
  justifyContent: 'center',
});

const Modal = styled.View({
  width: '80%',
  height: 400,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#fff',
  borderRadius: 16,
});

const CountText = styled.Text`
  font-size: 100px;
  font-weight: bold;
  color: ${({theme}) => theme.colors.text_333};
`;

const AnimatedCountText = Animated.createAnimatedComponent(CountText);

const CountView = styled.View({
  width: '100%',
  height: '100%',
  alignItems: 'center',
  position: 'relative',
  padding: 24,
  paddingTop: 80,
});

const BottomButtonView = styled.View({
  width: '100%',
  position: 'absolute',
  bottom: 40,
  alignItems: 'center',
  justifyContent: 'center',
});
