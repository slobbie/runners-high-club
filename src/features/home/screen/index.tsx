import React, {useState} from 'react';
import styled from '@emotion/native';
import {Drawer} from 'react-native-drawer-layout';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {FlatList} from 'react-native-gesture-handler';
import {StyleSheet} from 'react-native';

import useRoutineStore from '@shared/store/useRoutineStore';
import TodayRoutineList from '@features/home/components/TodayRoutineList';
import RoutineName from '@features/home/components/RoutineName';
import {DrawerMenu} from '@shared/components/organisms';
import {Space} from '@shared/components/atoms';
import OtherRoutineTitle from '@features/home/components/OtherRoutineTitle';
import HomeHeader from '@features/home/components/HomeHeader';

const HomeScreen = () => {
  const insets = useSafeAreaInsets();
  const {routineData} = useRoutineStore();

  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const today = new Date().getDay();

  const todayRoutine = routineData.find(data => data.day === today);
  const otherRoutines = routineData.filter(routine => routine !== todayRoutine);
  const restRoutines = otherRoutines.flatMap(routine => routine.routines);

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
          <FlatList
            data={[1]}
            contentContainerStyle={Styles.contentContainer}
            ListHeaderComponent={() => (
              <>
                <RoutineSection>
                  <RoutineName workoutName={todayRoutine?.workoutName || ''} />
                  <Space bottom={20} />
                  <TodayRoutineList
                    routineFormData={todayRoutine?.routines || []}
                  />
                </RoutineSection>
              </>
            )}
            renderItem={() => (
              <>
                {restRoutines.length > 0 && (
                  <RoutineSection>
                    <OtherRoutineTitle />
                    <Space bottom={20} />
                    <TodayRoutineList routineFormData={restRoutines || []} />
                  </RoutineSection>
                )}
              </>
            )}
          />
        </Content>
      </Wrapper>
    </Drawer>
  );
};

export default HomeScreen;

const Styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    gap: 20,
  },
});

const Wrapper = styled.View({
  flex: 1,
  backgroundColor: '#000000',
});

const Content = styled.View({
  flex: 1,
});

const RoutineSection = styled.View({
  marginVertical: 10,
});
