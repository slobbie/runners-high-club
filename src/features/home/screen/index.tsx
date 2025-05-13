import React, {useState} from 'react';
import styled from '@emotion/native';
import {Drawer} from 'react-native-drawer-layout';
import {useWindowDimensions, StyleSheet} from 'react-native';
import Animated from 'react-native-reanimated';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TabBar, TabView} from 'react-native-tab-view';

import {DrawerMenu} from '@shared/components/organisms';
import useRoutineStore from '@shared/store/useRoutineStore';
import TodayRoutineList from '@features/home/components/TodayRoutineList';
import PastRoutineList from '@features/home/components/PastRoutineList';
import HomeHeader from '@features/home/components/HomeHeader';

const HomeScreen = () => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const {routineData} = useRoutineStore();

  const today = new Date().getDay();

  const todayRoutine = routineData.find(data => data.day === today);
  const otherRoutines = routineData.filter(routine => routine !== todayRoutine);

  const [routes] = useState([
    {key: 'active', title: '오늘의 루틴'},
    {key: 'other', title: '다른 루틴'},
  ]);

  // 탭 뷰 장면 맵 정의
  const renderScene = ({route}: {route: {key: string}}) => {
    switch (route.key) {
      case 'active':
        return <TodayRoutineList todayRoutine={todayRoutine?.routines || []} />;
      case 'other':
        return <PastRoutineList otherRoutines={otherRoutines} />;
      default:
        return null;
    }
  };

  return (
    <Container>
      <Drawer
        open={isDrawerOpen}
        onOpen={() => setIsDrawerOpen(true)}
        onClose={() => setIsDrawerOpen(false)}
        renderDrawerContent={() => (
          <DrawerMenu onClose={() => setIsDrawerOpen(false)} />
        )}
        drawerType="front"
        drawerStyle={Styles.drawer}>
        <SafeAreaContainer>
          <Animated.View style={Styles.flex_1}>
            <HomeHeader
              setIsDrawerOpen={setIsDrawerOpen}
              workoutName={todayRoutine?.workoutName || ''}
            />

            <TabViewContainer>
              <TabView
                navigationState={{index, routes}}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{width: layout.width}}
                renderTabBar={props => (
                  <TabBar
                    {...props}
                    style={Styles.container}
                    indicatorStyle={Styles.indicator}
                    activeColor="#ffffff"
                    inactiveColor="#777777"
                  />
                )}
              />
            </TabViewContainer>
          </Animated.View>
        </SafeAreaContainer>
      </Drawer>
    </Container>
  );
};

export default HomeScreen;

const Styles = StyleSheet.create({
  container: {
    backgroundColor: '#1A1A1A',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  indicator: {
    backgroundColor: '#3E8BFF',
    height: 3,
  },
  flex_1: {
    flex: 1,
  },
  drawer: {
    backgroundColor: '#333',
    width: '70%',
  },
});

const Container = styled.View({
  flex: 1,
  backgroundColor: '#1A1A1A',
});

const SafeAreaContainer = styled(SafeAreaView)({
  flex: 1,
  backgroundColor: '#1A1A1A',
});

const TabViewContainer = styled.View({
  flex: 1,
});
