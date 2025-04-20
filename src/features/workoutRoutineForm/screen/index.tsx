import React, {useMemo, useRef, useState} from 'react';
import {Pressable} from 'react-native';
import styled from '@emotion/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import uuid from 'react-native-uuid';

import {
  BottomSheetContainer,
  Space,
  SvgIcon,
  Typo,
} from '@shared/components/atoms';
import {InputLabel, Picker} from '@shared/components/molecules';
import {Header} from '@shared/components/organisms';
import useNavigate from '@shared/hooks/useNavigate';
import useRoutineFormStore from '@features/workoutRoutineForm/store/useRoutineFormStore';
import useTextChange from '@shared/hooks/useTextChange';
import {IRoutineForm} from '@shared/interface/routine.interface';
import useRoutineStore from '@shared/store/useRoutineStore';
import PickerButton from '@features/workoutRoutineForm/components/PickerButton';
import RoutineCard from '@features/workoutRoutineForm/components/RoutineCard';
import RoutineAddButton from '@features/workoutRoutineForm/components/RoutineAddButton';
import {weekdays} from '@shared/constants/weekdays';
import RoutineForm from '@features/workoutRoutineForm/components/RoutineForm';

const WorkoutRoutineFormScreen = () => {
  const navigation = useNavigate();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const {routineFormData, setRoutineFormEdit, resetRoutineFormData} =
    useRoutineFormStore();

  const {updateRoutineData} = useRoutineStore();

  const [workoutName, onChangeWorkoutName] = useTextChange('');

  const [isDayPickerOpen, setIsDayPickerOpen] = useState<boolean>(false);

  const [day, onChangeDay] = useState<{id: number; label: string}>({
    id: new Date().getDay(),
    label: weekdays[new Date().getDay()].label,
  });

  const showFormHandler = () => {
    bottomSheetModalRef.current?.present();
  };

  const hideFormHandler = () => {
    bottomSheetModalRef.current?.close();
  };

  const isRoutineFormDataEmpty = useMemo(
    () => routineFormData.length <= 0,
    [routineFormData],
  );

  const editHandler = (pRoutine: IRoutineForm) => {
    setRoutineFormEdit(pRoutine);

    bottomSheetModalRef.current?.present();
  };

  const formSubmitHandler = () => {
    const payload = {
      id: uuid.v4(),
      workoutName,
      day: day.id,
      routines: routineFormData,
    };
    updateRoutineData(payload);
    resetRoutineFormData();
    navigation.replace('homeScreen');
  };

  return (
    <>
      <Wrapper edges={['top', 'bottom']}>
        <Header
          headerLeft={
            <Pressable onPress={() => navigation.goBack()}>
              <SvgIcon name="icon_arrow_back" size={24} />
            </Pressable>
          }
          headerRight={
            <Pressable onPress={formSubmitHandler}>
              <Typo fontSize={20} fontWeight={600} color={'#fff'}>
                등록
              </Typo>
            </Pressable>
          }
        />
        <Content>
          <InputLabel
            label="종목명"
            onChangeText={onChangeWorkoutName}
            value={workoutName}
          />
          <Space bottom={20} />

          <PickerButton
            title="반복 요일"
            label={day.label}
            onPress={() => setIsDayPickerOpen(true)}
          />
          <Space bottom={20} />

          <RoutineCard
            routineFormData={routineFormData}
            editHandler={editHandler}
          />

          <RoutineAddButton
            isRoutineFormDataEmpty={isRoutineFormDataEmpty}
            showFormHandler={showFormHandler}
          />
        </Content>

        <BottomSheetContainer snapPoint="100%" ref={bottomSheetModalRef}>
          <RoutineForm hideFormHandler={hideFormHandler} />
        </BottomSheetContainer>
      </Wrapper>

      {isDayPickerOpen && (
        <Picker
          defaultValue={day.id}
          data={weekdays}
          onChange={onChangeDay}
          onClose={() => setIsDayPickerOpen(false)}
        />
      )}
    </>
  );
};

export default WorkoutRoutineFormScreen;

const Wrapper = styled(SafeAreaView)({
  flex: 1,
  backgroundColor: '#1f1f1f',
});

const Content = styled.View({
  paddingHorizontal: 24,
  paddingVertical: 20,
  position: 'relative',
  width: '100%',
  height: '100%',
  alignItems: 'center',
});
