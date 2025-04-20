import React, {useState} from 'react';
import styled from '@emotion/native';
import {Drawer} from 'react-native-drawer-layout';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import useRoutineStore from '@shared/store/useRoutineStore';
import TodayRoutineList from '@features/home/components/TodayRoutineList';
import RoutineName from '@features/home/components/RoutineName';
import HomeHeader from '@features/home/components/HomeHeader';
import {DrawerMenu} from '@shared/components/organisms';
import {Space} from '@shared/components/atoms';

const HomeScreen = () => {
  const insets = useSafeAreaInsets();
  const {routineData} = useRoutineStore();

  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const today = new Date().getDay();

  const workoutData = routineData.find(data => data.day === today);

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
          <HomeHeader setIsDrawerOpen={setIsDrawerOpen} />

          <RoutineName workoutName={workoutData?.workoutName || ''} />

          <Space bottom={20} />

          <TodayRoutineList routineFormData={workoutData?.routines || []} />
        </Content>
      </Wrapper>
    </Drawer>
  );
};

export default HomeScreen;

const Wrapper = styled.View({
  flex: 1,
  backgroundColor: '#1f1f1f',
});

const Content = styled.View({
  flex: 1,
});
