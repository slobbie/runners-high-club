import React from 'react';
import {Dimensions, View} from 'react-native';
import styled from '@emotion/native';
import {LineChart, BarChart} from 'react-native-chart-kit';
import {colors} from '@shared/styles/theme';
import {Typo} from '@shared/components/atoms';

// 차트 데이터 인터페이스
interface ChartData {
  labels: string[];
  datasets: {
    data: number[];
    color?: (opacity: number) => string;
    strokeWidth?: number;
  }[];
  legend?: string[];
}

// 막대 차트 데이터 인터페이스
interface BarChartData {
  labels: string[];
  datasets: {
    data: number[];
    colors?: string[];
  }[];
}

// 차트 설정
const chartConfig = {
  backgroundGradientFrom: '#1A1A1A',
  backgroundGradientTo: '#1A1A1A',
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(62, 139, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: '6',
    strokeWidth: '2',
    stroke: '#3E8BFF',
  },
  // Y축 여백 완전 제거
  yAxisSuffixOffset: 0,
  yAxisInterval: 1,
  // 차트 중앙 정렬을 위한 설정
  propsForBackgroundLines: {
    strokeDasharray: '', // 실선
    stroke: 'transparent',
  },
  paddingLeft: -20, // 왼쪽 여백 더 줄이기
  paddingRight: 0,
  horizontalLabelRotation: 0,
  formatYLabel: () => '',
  xLabelsOffset: 0,
};

// 운동량 라인 차트
const WorkoutVolumeChart = () => {
  const {width} = Dimensions.get('window');
  // 화면 너비에 맞게 차트 크기 조정 - 너비 확장
  const chartWidth = width - 24; // 너비를 더 크게 설정

  // 샘플 데이터 - 실제 구현에서는 스토어나 API에서 가져와야 함
  const data: ChartData = {
    labels: ['월', '화', '수', '목', '금', '토', '일'],
    datasets: [
      {
        data: [5000, 8500, 7000, 9500, 11000, 8000, 6000],
        color: (opacity = 1) => `rgba(62, 139, 255, ${opacity})`,
        strokeWidth: 2,
      },
      {
        data: [4000, 6500, 5000, 7500, 9000, 7000, 5000],
        color: (opacity = 1) => `rgba(255, 99, 132, ${opacity})`,
        strokeWidth: 2,
      },
    ],
    legend: ['이번 주', '지난 주'],
  };

  return (
    <ChartCard>
      <ChartHeader>
        <ChartTitle>
          <Typo fontSize={18} fontWeight={600} color={colors.text_gray0}>
            주간 운동량 (kg)
          </Typo>
        </ChartTitle>
        <ChartDate>
          <Typo fontSize={14} color={colors.text_gray1}>
            2025.04.14 - 2025.04.20
          </Typo>
        </ChartDate>
      </ChartHeader>
      <LineChart
        data={data}
        width={chartWidth}
        height={180}
        chartConfig={chartConfig}
        bezier
        style={{
          marginVertical: 4,
          borderRadius: 16,
          alignSelf: 'center',
        }}
        withDots={true}
        withShadow={false}
        withInnerLines={false}
        withOuterLines={false}
        withVerticalLines={false}
        withHorizontalLines={true}
        withVerticalLabels={true}
        withHorizontalLabels={false}
        fromZero={true}
        hidePointsAtIndex={[]}
        renderDotContent={({x, y, index, indexData}) => {
          // 각 데이터 포인트에 값 표시 (선택 사항)
          return index % 2 === 0 ? (
            <View
              key={index}
              style={{
                position: 'absolute',
                top: y - 24,
                left: x - 16,
              }}>
              <Typo fontSize={12} color="#ffffff">
                {indexData}
              </Typo>
            </View>
          ) : null;
        }}
      />
      <ChartLegend>
        {data.legend?.map((legend, index) => (
          <LegendItem key={index}>
            <LegendColor
              color={
                index === 0 ? 'rgba(62, 139, 255, 1)' : 'rgba(255, 99, 132, 1)'
              }
            />
            <LegendText>
              <Typo fontSize={12} color={colors.text_gray1}>
                {legend}
              </Typo>
            </LegendText>
          </LegendItem>
        ))}
      </ChartLegend>
    </ChartCard>
  );
};

// 운동 유형별 칼로리 소모 차트
const CaloriesBurnedChart = () => {
  const {width} = Dimensions.get('window');
  // 화면 너비에 맞게 차트 크기 조정 - 너비 확장
  const chartWidth = width - 24; // 너비를 더 크게 설정

  // 샘플 데이터 - 실제 구현에서는 스토어나 API에서 가져와야 함
  const data: BarChartData = {
    labels: ['월', '화', '수', '목', '금', '토', '일'],
    datasets: [
      {
        data: [350, 450, 280, 500, 600, 450, 400],
      },
    ],
  };

  const barChartConfig = {
    ...chartConfig,
    color: (opacity = 1) => `rgba(78, 211, 135, ${opacity})`,
  };

  return (
    <ChartCard>
      <ChartHeader>
        <ChartTitle>
          <Typo fontSize={18} fontWeight={600} color={colors.text_gray0}>
            일일 칼로리 소모 (kcal)
          </Typo>
        </ChartTitle>
        <ChartDate>
          <Typo fontSize={14} color={colors.text_gray1}>
            2025.04.14 - 2025.04.20
          </Typo>
        </ChartDate>
      </ChartHeader>
      <BarChart
        data={data}
        width={chartWidth}
        height={180}
        chartConfig={barChartConfig}
        style={{
          marginVertical: 4,
          borderRadius: 16,
          alignSelf: 'center',
        }}
        showValuesOnTopOfBars={true}
        showBarTops={true}
        withInnerLines={false}
        withHorizontalLabels={false}
        fromZero
      />
    </ChartCard>
  );
};

// 운동 목표 달성률 (원형 그래프로 표현 가능)
const WorkoutGoalProgress = () => {
  // 샘플 데이터
  const weeklyGoal = 5;
  const currentAchieved = 3;
  const progressPercentage = (currentAchieved / weeklyGoal) * 100;

  return (
    <SmallChartCard>
      <ChartHeader>
        <ChartTitle>
          <Typo fontSize={16} fontWeight={600} color={colors.text_gray0}>
            주간 목표 달성률
          </Typo>
        </ChartTitle>
      </ChartHeader>

      <GoalProgressContainer>
        <ProgressCircle percentage={progressPercentage}>
          <ProgressText>
            <Typo fontSize={20} fontWeight={'bold'} color="#3E8BFF">
              {Math.round(progressPercentage)}%
            </Typo>
          </ProgressText>
        </ProgressCircle>

        <GoalDetails>
          <Typo fontSize={14} color={colors.text_gray1}>
            {currentAchieved}/{weeklyGoal} 세션
          </Typo>
        </GoalDetails>
      </GoalProgressContainer>
    </SmallChartCard>
  );
};

// 운동 시간 통계
const WorkoutTimeStats = () => {
  // 샘플 데이터
  const totalTime = 320; // 분
  const sessionsCompleted = 3;
  const avgTimePerSession = Math.round(totalTime / sessionsCompleted);

  return (
    <SmallChartCard>
      <ChartHeader>
        <ChartTitle>
          <Typo fontSize={16} fontWeight={600} color={colors.text_gray0}>
            주간 운동 시간
          </Typo>
        </ChartTitle>
      </ChartHeader>

      <TimeStatsContainer>
        <StatValue>
          <Typo fontSize={24} fontWeight={'bold'} color="#58C7C6">
            {totalTime}
          </Typo>
          <Typo fontSize={12} color={colors.text_gray1}>
            총 운동 시간(분)
          </Typo>
        </StatValue>

        <StatValue>
          <Typo fontSize={24} fontWeight={'bold'} color="#9747FF">
            {avgTimePerSession}
          </Typo>
          <Typo fontSize={12} color={colors.text_gray1}>
            평균 운동 시간(분)
          </Typo>
        </StatValue>
      </TimeStatsContainer>
    </SmallChartCard>
  );
};

// 주요 컴포넌트 - 모든 차트를 포함
const WorkoutStatsChart = () => {
  return (
    <Container contentContainerStyle={{paddingBottom: 20, paddingTop: 20}}>
      <WorkoutVolumeChart />
      <CaloriesBurnedChart />
      <SmallChartsRow>
        <WorkoutGoalProgress />
        <WorkoutTimeStats />
      </SmallChartsRow>
    </Container>
  );
};

// 스타일 컴포넌트
const Container = styled.ScrollView({
  flex: 1,
  backgroundColor: '#121212',
  padding: 4, // 여백 추가 축소
});

const ChartCard = styled.View({
  backgroundColor: '#1A1A1A',
  borderRadius: 12,
  padding: 10,
  marginBottom: 10,
  shadowColor: '#000',
  shadowOffset: {width: 0, height: 2},
  shadowOpacity: 0.1,
  shadowRadius: 8,
  elevation: 3,
  alignItems: 'center', // 내부 요소 중앙 정렬
  justifyContent: 'center', // 세로 방향 중앙 정렬
  overflow: 'hidden', // 너무 큰 요소 잘라냄
  width: '100%', // 전체 너비 사용
});

const SmallChartCard = styled.View({
  backgroundColor: '#1A1A1A',
  borderRadius: 12,
  padding: 10,
  flex: 1,
  marginHorizontal: 4,
  shadowColor: '#000',
  shadowOffset: {width: 0, height: 2},
  shadowOpacity: 0.1,
  shadowRadius: 8,
  elevation: 3,
});

const ChartHeader = styled.View({
  marginBottom: 12,
});

const ChartTitle = styled.View({
  marginBottom: 6,
});

const ChartDate = styled.View({});

const ChartLegend = styled.View({
  flexDirection: 'row',
  justifyContent: 'center',
  marginTop: 8,
});

const LegendItem = styled.View({
  flexDirection: 'row',
  alignItems: 'center',
  marginHorizontal: 8,
});

const LegendColor = styled.View<{color: string}>(({color}) => ({
  width: 12,
  height: 12,
  backgroundColor: color,
  borderRadius: 6,
  marginRight: 4,
}));

const LegendText = styled.View({});

const SmallChartsRow = styled.View({
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginHorizontal: -4,
  marginBottom: 16,
});

const GoalProgressContainer = styled.View({
  alignItems: 'center',
  justifyContent: 'center',
  flex: 1,
});

const ProgressCircle = styled.View<{percentage: number}>(({percentage}) => ({
  width: 80,
  height: 80,
  borderRadius: 50,
  borderWidth: 8,
  borderColor: 'rgba(62, 139, 255, 0.3)',
  borderLeftColor: percentage >= 25 ? '#3E8BFF' : 'rgba(62, 139, 255, 0.3)',
  borderTopColor: percentage >= 50 ? '#3E8BFF' : 'rgba(62, 139, 255, 0.3)',
  borderRightColor: percentage >= 75 ? '#3E8BFF' : 'rgba(62, 139, 255, 0.3)',
  borderBottomColor: '#3E8BFF',
  justifyContent: 'center',
  alignItems: 'center',
  transform: [{rotate: '-45deg'}],
}));

const ProgressText = styled.View({
  transform: [{rotate: '45deg'}],
});

const GoalDetails = styled.View({
  marginTop: 16,
});

const TimeStatsContainer = styled.View({
  flexDirection: 'row',
  justifyContent: 'space-around',
  alignItems: 'center',
  flex: 1,
});

const StatValue = styled.View({
  alignItems: 'center',
});

export default WorkoutStatsChart;
