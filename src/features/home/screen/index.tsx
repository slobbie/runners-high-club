import React, {useMemo, useState} from 'react';
import styled from '@emotion/native';
import {Drawer} from 'react-native-drawer-layout';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import useRoutineStore from '@shared/store/useRoutineStore';
import TodayRoutineList from '@features/home/components/TodayRoutineList';
import RoutineName from '@features/home/components/RoutineName';
import HomeHeader from '@features/home/components/HomeHeader';
import {DrawerMenu} from '@shared/components/organisms';
import {Space} from '@shared/components/atoms';
import {IRoutineForm, IRoutines} from '@shared/interface/routine.interface';
import OtherRoutineTitle from '@features/home/components/OtherRoutineTitle';
import {FlatList} from 'react-native-gesture-handler';
import {StyleSheet} from 'react-native';

const HomeScreen = () => {
  const insets = useSafeAreaInsets();
  const {routineData} = useRoutineStore();

  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const today = new Date().getDay();

  const todayRoutine = routineData.find(data => data.day === today);
  const otherRoutines = routineData.filter(routine => routine !== todayRoutine);
  const restRoutines = otherRoutines.flatMap(routine => routine.routines);

  const sortRoutinesByToday = (
    routines: IRoutines[],
    pTodayRoutine: IRoutines | undefined,
  ): IRoutineForm[] => {
    if (!pTodayRoutine) {
      return otherRoutines.flatMap(routine => routine.routines);
    }

    const todayRoutines = pTodayRoutine.routines;
    return [...todayRoutines, ...restRoutines];
  };

  const sortedRoutines = useMemo(
    () => sortRoutinesByToday(routineData, todayRoutine),
    [routineData, todayRoutine],
  );

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
                <RoutineName workoutName={todayRoutine?.workoutName || ''} />
                <Space bottom={20} />
                <TodayRoutineList routineFormData={sortedRoutines || []} />
              </>
            )}
            renderItem={() => (
              <>
                {restRoutines.length > 0 && (
                  <>
                    <OtherRoutineTitle />
                    <Space bottom={20} />
                    <TodayRoutineList routineFormData={restRoutines || []} />
                  </>
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
    // paddingHorizontal: 24,
  },
});

const Wrapper = styled.View({
  flex: 1,
  backgroundColor: '#1f1f1f',
});

const Content = styled.View({
  flex: 1,
});
