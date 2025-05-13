import React, {useState} from 'react';
import {useWindowDimensions} from 'react-native';
import styled from '@emotion/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TabView, TabBar} from 'react-native-tab-view';

import {SvgIcon, Typo} from '@shared/components/atoms';
import useNavigate from '@shared/hooks/useNavigate';
import {colors} from '@shared/styles/theme';
import CompletedWorkoutList from '@features/statistics/components/CompletedWorkoutList';
import WorkoutStatsChart from '@features/statistics/components/WorkoutStatsChart';

const StatisticsScreen = () => {
  const navigation = useNavigate();
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);

  // 통계 화면 탭 설정
  const [routes] = useState([
    {key: 'progress', title: '통계'},
    {key: 'completed', title: '완료한 운동'},
  ]);

  // 각 탭에 대한 화면 렌더링
  const renderScene = ({route}: {route: {key: string}}) => {
    switch (route.key) {
      case 'completed':
        return <CompletedWorkoutList />;
      case 'progress':
        return <WorkoutStatsChart />;
      default:
        return null;
    }
  };

  // 상단 헤더 컴포넌트
  const StatisticsHeader = () => (
    <HeaderContainer>
      <HeaderLeft>
        <BackButton onPress={() => navigation.goBack()}>
          <SvgIcon name="icon_close" size={24} fill={colors.text_gray0} />
        </BackButton>
      </HeaderLeft>
      <HeaderCenter>
        <Typo fontSize={20} fontWeight={'bold'} color={colors.text_gray0}>
          통계
        </Typo>
      </HeaderCenter>
      <HeaderRight />
    </HeaderContainer>
  );

  // 탭바 스타일
  const tabBarStyles = {
    container: {
      backgroundColor: '#121212',
      borderBottomWidth: 1,
      borderBottomColor: '#2a2a2a',
    },
    indicator: {
      backgroundColor: colors.primary,
      height: 3,
    },
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#121212'}}>
      <Container>
        <StatisticsHeader />
        <TabViewContainer>
          <TabView
            navigationState={{index, routes}}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{width: layout.width}}
            renderTabBar={props => (
              <TabBar
                {...props}
                style={tabBarStyles.container}
                indicatorStyle={tabBarStyles.indicator}
                activeColor="#ffffff"
                inactiveColor="#777777"
              />
            )}
          />
        </TabViewContainer>
      </Container>
    </SafeAreaView>
  );
};

// 스타일 컴포넌트
const Container = styled.View({
  flex: 1,
  backgroundColor: '#121212',
});

const TabViewContainer = styled.View({
  flex: 1,
});

const HeaderContainer = styled.View({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingHorizontal: 16,
  paddingVertical: 12,
});

const HeaderLeft = styled.View({
  flex: 1,
  alignItems: 'flex-start',
});

const HeaderCenter = styled.View({
  flex: 2,
  alignItems: 'center',
});

const HeaderRight = styled.View({
  flex: 1,
  alignItems: 'flex-end',
});

const BackButton = styled.TouchableOpacity({
  padding: 8,
});

const EmptyView = styled.View({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  padding: 16,
});

export default StatisticsScreen;
