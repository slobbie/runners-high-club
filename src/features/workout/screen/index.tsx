import React, {useEffect, useRef, useState} from 'react';
import styled from '@emotion/native';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {Keyboard, Pressable} from 'react-native';
import Animated, {
  SlideInDown,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
} from 'react-native-reanimated';
// Lottie 애니메이션을 사용하려면 이 패키지를 설치해야 합니다
// import LottieView from 'lottie-react-native';
import uuid from 'react-native-uuid';
import {SafeAreaView} from 'react-native-safe-area-context';

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
import ControlButtonGroup from '@features/workout/components/ControlButtonGroup';
import useRoutineStore from '@shared/store/useRoutineStore';
import {IRap} from '@features/workoutRoutineForm/store/useRapsStore';
import RestButtonGroup from '@features/workout/components/RestButtonGroup';
import SetupRunContent from '@features/workout/components/SetupRunContent';

const taskColors = ['#FFE500', '#FF4081', '#4DD0E1', '#9CCC65', '#BA68C8'];

const WorkoutScreen = () => {
  const navigation = useNavigate();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const {routineData} = useRoutineStore();

  // 기본 운동 상태
  const [isStart, setIsStart] = useState(false);
  const [isPause, setIsPause] = useState(false);
  const [isRest, setIsRest] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false); // 운동 완료 상태
  const [currentRap, setCurrentRap] = useState<Partial<IRap>>();
  const [restDuration, setRestDuration] = useState<number>(100);
  const [currentSet, setCurrentSet] = useState<number>(1);
  const [totalCalories, setTotalCalories] = useState<number>(0); // 총 소모 칼로리

  // 타이머 및 카운트다운 관련 상태
  const [timer, setTimer] = useState(0);
  const [baseCount, setBaseCount] = useState(3);
  const [count, startCountdown] = useCountdown(baseCount);

  // 애니메이션 값
  const opacity = useSharedValue(0);
  const completedScale = useSharedValue(0.5);
  const completedOpacity = useSharedValue(0);
  // const confettiAnim = useRef<LottieView>(null);

  const closeBottomsheet = () => {
    bottomSheetModalRef.current?.close();
    Keyboard.dismiss();
  };

  const settingHandler = () => {
    bottomSheetModalRef.current?.present();
  };

  const onStartHandler = () => {
    setIsStart(true);
    startCountdown(() => {
      // 카운트다운 완료 후 1초 후에 운동 모드 시작
      setTimeout(() => {
        setIsRest(false);
      }, 3000);
    });
  };

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

  /** 완료 애니메이션 */
  useEffect(() => {
    if (isCompleted) {
      completedScale.value = withTiming(1, {
        duration: 800,
        easing: Easing.elastic(1.2),
      });
      completedOpacity.value = withTiming(1, {duration: 500});
    } else {
      completedScale.value = 0.5;
      completedOpacity.value = 0;
    }
  }, [completedScale, completedOpacity, isCompleted]);

  /** 텍스트 애니메이션 스타일 */
  const animatedTextStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  /** 완료 애니메이션 스타일 */
  const completedAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: completedOpacity.value,
      transform: [{scale: completedScale.value}],
    };
  });

  const runDataRef = useRef({
    timer: 0,
    kmText: '',
  });

  // endWorkHandler 함수 (운동 중지 및 리셋)
  const endWorkHandler = () => {
    setTimer(0);
    setIsPause(false);
    setIsStart(false);
    setIsRest(false);
    setIsCompleted(false);
    setCurrentSet(1);
  };

  // 오늘 날짜 - 요일 숫자로 가져오기 (0: 일요일, 1: 월요일, ...)
  const todayDayNum = new Date().getDay();

  // 현재 요일에 해당하는 루틴 찾기
  const findRoutine = routineData.find(find => find.day === todayDayNum);

  console.log(`현재 요일 ${todayDayNum}의 루틴:`, findRoutine);

  // 세트 종료 및 휴식 시작
  const endSetHandler = () => {
    // 현재 세트 정보 저장
    setCurrentRap({
      id: uuid.v4(),
      duration: timer,
      weight: 0,
    });

    // 타이머 초기화 및 휴식 모드 활성화
    setTimer(0);
    setIsRest(true);

    // findRoutine?.restTime이 있으면 그 값을 사용하고, 없으면 기본값 60초 사용
    const restTime = findRoutine?.restTime || 60;
    setRestDuration(restTime);

    console.log('휴식 시작, 남은 시간:', restTime);
  };

  // 휴식 종료 및 다음 세트 시작 (또는 운동 완료 화면으로)
  const nextSetHandler = () => {
    const lastRep = findRoutine?.routines;

    // 현재 세트 증가
    setCurrentSet(prev => {
      const newSet = prev + 1;
      console.log(`다음 세트로 이동: ${newSet}/${lastRep?.length || 0}`);
      return newSet;
    });

    // 일시정지 상태면 재개
    if (isPause) {
      setIsPause(false);
    }

    // 모든 세트 완료 시 완료 화면으로 전환
    if (currentSet >= (lastRep?.length || 0)) {
      console.log('모든 세트 완료! 축하 화면으로 이동');
      console.log(`마지막 세트 정보:`, currentRap);

      // 랜덤 칼로리 (실제로는 계산 로직 필요)
      const randomCalories = Math.floor(Math.random() * 200) + 100;
      setTotalCalories(randomCalories);

      // 완료 상태로 전환
      setIsCompleted(true);

      // 완료 애니메이션 시작 - Lottie 패키지 설치 후 사용 가능
      // if (confettiAnim.current) {
      //   confettiAnim.current.reset();
      //   confettiAnim.current.play();
      // }
      return;
    }

    // 다음 세트 시작을 위한 카운트다운
    setBaseCount(3);
    startCountdown(() => {
      // 카운트다운 완료 후 1초 지연 후 휴식 모드 종료하고 운동 시작
      setTimeout(() => {
        setIsRest(false);
      }, 1000);
    });
  };

  /** 시간 업데이트 */
  useEffect(() => {
    if (count <= 0 && !isPause && !isRest) {
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

  const finishWorkoutAndGoBack = () => {
    endWorkHandler();
    navigation.goBack();
  };

  return (
    <SafeAreaView edges={['top']} style={{flex: 1, backgroundColor: '#1A1A1A'}}>
      <AppContainer>
        <TopSection>
          <HeaderRow>
            <Pressable onPress={() => navigation.goBack()}>
              <SvgIcon name="icon_arrow_back" size={32} color="#ffffff" />
            </Pressable>
          </HeaderRow>

          <DateSection>
            <DateSubtitle>
              {
                [
                  '일요일',
                  '월요일',
                  '화요일',
                  '수요일',
                  '목요일',
                  '금요일',
                  '토요일',
                ][new Date().getDay()]
              }
            </DateSubtitle>
            <DateTitle>오늘 · {new Date().getDate()}</DateTitle>
          </DateSection>

          <WorkoutHeader>
            <WorkoutHeaderTitle>오늘의 운동</WorkoutHeaderTitle>
          </WorkoutHeader>
        </TopSection>

        <TasksTitle>TASKS</TasksTitle>

        <TasksContent>
          {findRoutine?.routines?.map((item, index) => (
            <TaskCard
              key={item.id}
              entering={SlideInDown.duration(800).delay(100 * index)}
              style={{
                backgroundColor: taskColors[index % taskColors.length],
                marginBottom: 12,
                zIndex: 10 * (routineData.length - index),
              }}>
              <TaskRow>
                <TaskCheckbox>
                  {currentSet > index ? (
                    <CheckboxChecked>
                      <SvgIcon
                        name="icon_arrow_circle_right"
                        size={20}
                        color="#ffffff"
                      />
                    </CheckboxChecked>
                  ) : (
                    <CheckboxEmpty />
                  )}
                </TaskCheckbox>
                <TaskInfo>
                  <TaskTitle>{item.title || `${index + 1}번 운동`}</TaskTitle>
                  <TaskDetails>
                    <TaskDetail>세트: {item.rep}</TaskDetail>
                    <TaskDetail>무게: {item.weight} Kg</TaskDetail>
                    <TaskDetail>휴식: {item.restDuration.label} 초</TaskDetail>
                  </TaskDetails>
                </TaskInfo>
                <TaskActions>
                  <Pressable onPress={settingHandler}>
                    <SvgIcon name="setting" size={22} color="#1A1A1A" />
                  </Pressable>
                </TaskActions>
              </TaskRow>
            </TaskCard>
          ))}
        </TasksContent>

        <BottomContent>
          <StartButton onPress={onStartHandler}>
            <StartButtonText>START WORKOUT</StartButtonText>
          </StartButton>
        </BottomContent>
      </AppContainer>

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
              <AnimatedCountText
                style={[animatedTextStyle, {opacity: opacity.value}]}>
                {count}
              </AnimatedCountText>
            ) : (
              <CountView>
                {isCompleted ? (
                  // 운동 완료 화면
                  <Animated.View
                    style={[completedAnimatedStyle, {alignItems: 'center'}]}>
                    <CompletionCard>
                      {/* Lottie 애니메이션 - 패키지 설치 후 사용 가능
                      <LottieView
                        ref={confettiAnim}
                        source={require('@assets/lottie/confetti.json')}
                        autoPlay
                        loop={false}
                        style={{
                          width: 300,
                          height: 300,
                          position: 'absolute',
                          top: -100,
                        }}
                      /> */}

                      <CompletionIcon>
                        <SvgIcon
                          name="icon_refresh"
                          width={80}
                          height={80}
                          color="#4CAF50"
                        />
                      </CompletionIcon>

                      <Typo color={'#fff'} fontSize={32} fontWeight={600}>
                        축하합니다!
                      </Typo>

                      <Typo
                        color={'#ccc'}
                        fontSize={18}
                        fontWeight={400}
                        style={{marginTop: 10, marginBottom: 30}}>
                        모든 운동을 완료했습니다
                      </Typo>

                      <StatsRow>
                        <StatItem>
                          <Typo color={'#fff'} fontSize={16} fontWeight={400}>
                            총 세트
                          </Typo>
                          <Typo color={'#fff'} fontSize={28} fontWeight={600}>
                            {findRoutine?.routines?.length || 0}
                          </Typo>
                        </StatItem>

                        <StatDivider />

                        <StatItem>
                          <Typo color={'#fff'} fontSize={16} fontWeight={400}>
                            소요 시간
                          </Typo>
                          <Typo color={'#fff'} fontSize={28} fontWeight={600}>
                            {timeFormatUtils.formatDuration(timer)}
                          </Typo>
                        </StatItem>

                        <StatDivider />

                        <StatItem>
                          <Typo color={'#fff'} fontSize={16} fontWeight={400}>
                            소모 칼로리
                          </Typo>
                          <Typo color={'#fff'} fontSize={28} fontWeight={600}>
                            {totalCalories}kcal
                          </Typo>
                        </StatItem>
                      </StatsRow>

                      <FinishButton onPress={finishWorkoutAndGoBack}>
                        <Typo fontSize={17} fontWeight="bold" color="#FFFFFF">
                          운동 종료하기
                        </Typo>
                      </FinishButton>
                    </CompletionCard>
                  </Animated.View>
                ) : (
                  // 운동/휴식 중 화면
                  <>
                    <WorkoutStatusCard>
                      <StatusHeader>
                        <Typo color={'#fff'} fontSize={24} fontWeight={600}>
                          {isRest ? '휴식 시간' : '운동 중'}
                        </Typo>
                        <StatusBadge isRest={isRest}>
                          <Typo color={'#fff'} fontSize={14} fontWeight={400}>
                            {isRest ? '휴식' : `세트 ${currentSet}`}
                          </Typo>
                        </StatusBadge>
                      </StatusHeader>

                      <TimerDisplay>
                        <Typo color={'#fff'} fontSize={60} fontWeight={600}>
                          {isRest
                            ? timeFormatUtils.formatDuration(restDuration)
                            : timeFormatUtils.formatDuration(timer)}
                        </Typo>
                      </TimerDisplay>

                      {isRest && (
                        <NextSetInfo>
                          <Typo color={'#ccc'} fontSize={18} fontWeight={400}>
                            다음 세트: {currentSet}/
                            {findRoutine?.routines?.length || 0}
                          </Typo>
                          <ProgressBar>
                            <ProgressFill
                              style={{
                                width: `${
                                  (currentSet /
                                    (findRoutine?.routines?.length || 1)) *
                                  100
                                }%`,
                              }}
                            />
                          </ProgressBar>
                        </NextSetInfo>
                      )}
                    </WorkoutStatusCard>

                    <BottomButtonView>
                      <ControlButtonGroup
                        nextSetHandler={isRest ? nextSetHandler : endSetHandler}
                        endRunCallback={endWorkHandler}
                        pauseHandler={() => setIsPause(!isPause)}
                        isPause={isPause}
                        isRest={isRest}
                      />
                    </BottomButtonView>
                  </>
                )}
              </CountView>
            )}
          </Modal>
        </Dim>
      )}
    </SafeAreaView>
  );
};

// 운동 완료 카드
const CompletionCard = styled.View`
  width: 90%;
  max-width: 380px;
  background-color: rgba(30, 30, 30, 0.95);
  border-radius: 24px;
  padding: 32px 24px;
  align-items: center;
  position: relative;
  overflow: hidden;
`;

// 완료 아이콘 컨테이너
const CompletionIcon = styled.View`
  margin-bottom: 24px;
`;

// 통계 행
const StatsRow = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  margin-bottom: 40px;
  padding: 20px;
  background-color: rgba(50, 50, 50, 0.5);
  border-radius: 12px;
`;

// 통계 항목
const StatItem = styled.View`
  align-items: center;
`;

// 통계 구분선
const StatDivider = styled.View`
  width: 1px;
  height: 40px;
  background-color: rgba(255, 255, 255, 0.2);
`;

// 확인 버튼
const FinishButton = styled.TouchableOpacity`
  background-color: #4caf50;
  padding: 16px 0;
  border-radius: 12px;
  width: 100%;
  align-items: center;
`;

export default WorkoutScreen;

const AppContainer = styled.View`
  flex: 1;
  background-color: #1a1a1a;
  padding: 0 16px;
`;

const TopSection = styled.View`
  padding-top: 8px;
  padding-bottom: 24px;
`;

const HeaderRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const DateSection = styled.View`
  margin-bottom: 24px;
`;

const DateSubtitle = styled.Text`
  font-size: 14px;
  color: #bbbbbb;
  font-weight: 500;
  margin-bottom: 4px;
`;

const DateTitle = styled.Text`
  font-size: 32px;
  color: #ffffff;
  font-weight: 700;
`;

const WorkoutHeader = styled.View`
  margin-bottom: 16px;
`;

const WorkoutHeaderTitle = styled.Text`
  font-size: 22px;
  font-weight: 700;
  color: #ffffff;
`;

const TasksTitle = styled.Text`
  font-size: 48px;
  font-weight: 700;
  color: #ffffff;
  margin-top: 16px;
  margin-bottom: 24px;
`;

const TasksContent = styled.View`
  flex: 1;
  padding-bottom: 16px;
`;

const TaskCard = styled(Animated.View)`
  border-radius: 16px;
  padding: 16px;
  elevation: 2;
`;

const TaskRow = styled.View`
  flex-direction: row;
  align-items: flex-start;
`;

const TaskCheckbox = styled.View`
  margin-right: 12px;
  padding-top: 4px;
`;

const CheckboxEmpty = styled.View`
  width: 24px;
  height: 24px;
  border-radius: 12px;
  border-width: 2px;
  border-color: #333333;
  background-color: transparent;
`;

const CheckboxChecked = styled.View`
  width: 24px;
  height: 24px;
  border-radius: 12px;
  background-color: #333333;
  justify-content: center;
  align-items: center;
`;

const TaskInfo = styled.View`
  flex: 1;
`;

const TaskTitle = styled.Text`
  font-size: 20px;
  font-weight: 600;
  color: #333333;
  margin-bottom: 8px;
`;

const TaskDetails = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;

const TaskDetail = styled.Text`
  font-size: 14px;
  color: #444444;
  margin-right: 12px;
  margin-bottom: 4px;
`;

const TaskActions = styled.View`
  padding: 4px;
`;

const BottomContent = styled.View`
  padding-top: 20px;
  padding-bottom: 20px;
`;

const StartButton = styled.TouchableOpacity`
  background-color: #333333;
  border-radius: 12px;
  padding: 16px;
  align-items: center;
  justify-content: center;
`;

const StartButtonText = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: #ffffff;
`;

const Dim = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 1);
  z-index: 9999;
`;

const Modal = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 24px;
`;

const AnimatedCountText = styled(Animated.Text)`
  font-size: 180px;
  font-weight: bold;
  color: #fff;
  text-shadow: 0px 2px 10px rgba(0, 0, 0, 0.3);
`;

const CountView = styled.View`
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const BottomButtonView = styled.View`
  position: absolute;
  bottom: 100px;
  width: 100%;
  align-items: center;
  justify-content: center;
  padding: 0 16px;
`;

// 워크아웃 상태 카드
const WorkoutStatusCard = styled.View`
  width: 85%;
  max-width: 350px;
  background-color: rgba(40, 40, 40, 0.9);
  border-radius: 24px;
  padding: 24px;
  margin-bottom: 20px;
`;

// 상태 헤더 (제목 + 뱃지)
const StatusHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

// 상태 뱃지 (휴식 또는 세트 번호)
const StatusBadge = styled.View<{isRest?: boolean}>`
  background-color: ${props => (props.isRest ? '#2E7D32' : '#1976D2')};
  padding: 8px 16px;
  border-radius: 20px;
`;

// 타이머 디스플레이
const TimerDisplay = styled.View`
  align-items: center;
  justify-content: center;
  margin: 20px 0;
`;

// 다음 세트 정보
const NextSetInfo = styled.View`
  align-items: center;
  margin-top: 20px;
`;

// 진행 상태 바
const ProgressBar = styled.View`
  width: 100%;
  height: 6px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 3px;
  margin-top: 10px;
  overflow: hidden;
`;

// 진행 상태 바 채우기
const ProgressFill = styled.View`
  height: 100%;
  background-color: #4caf50;
  border-radius: 3px;
`;
