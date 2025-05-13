import React, {useMemo, useRef, useState} from 'react';
import {Pressable, StyleSheet} from 'react-native';
import styled from '@emotion/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import Animated, {SlideInDown, FadeInDown} from 'react-native-reanimated';
import uuid from 'react-native-uuid';

import {
  BottomSheetContainer,
  Space,
  SvgIcon,
  Typo,
} from '@shared/components/atoms';
import {InputLabel, Picker} from '@shared/components/molecules';
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
        <AppContainer>
          <TopSection>
            <HeaderRow>
              <Pressable
                onPress={() => navigation.goBack()}
                style={styles.headerButton}>
                <SvgIcon name="icon_arrow_back" size={24} color="#ffffff" />
              </Pressable>
              <HeaderTitle>루틴 만들기</HeaderTitle>
              <Pressable
                onPress={formSubmitHandler}
                style={[
                  styles.headerButton,
                  !workoutName ? styles.disabledButton : {},
                ]}
                disabled={!workoutName}>
                <Typo
                  fontSize={18}
                  fontWeight={600}
                  color={!workoutName ? '#777777' : '#3498db'}>
                  등록
                </Typo>
              </Pressable>
            </HeaderRow>
          </TopSection>

          <Content>
            <FormSection>
              <SectionTitle>루틴 정보</SectionTitle>
              <FormCard>
                <InputLabel
                  label="종목명"
                  onChangeText={onChangeWorkoutName}
                  value={workoutName}
                  placeholder="예: 상체 운동"
                  placeholderTextColor="#777777"
                />
                <Space bottom={16} />
                <PickerButton
                  title="반복 요일"
                  label={day.label}
                  onPress={() => setIsDayPickerOpen(true)}
                />
              </FormCard>
              <Space bottom={24} />
            </FormSection>

            <FormSection>
              <SectionTitle>운동 추가</SectionTitle>

              {routineFormData.length > 0 ? (
                <RoutineListContainer>
                  {routineFormData.map((routine, index) => (
                    <AnimatedRoutineCard
                      key={routine.id}
                      entering={SlideInDown.duration(300).delay(index * 100)}
                      style={[
                        styles.routineCard,
                        {backgroundColor: getRoutineColor(index)},
                      ]}>
                      <RoutineCard
                        routineFormData={[routine]}
                        editHandler={editHandler}
                      />
                    </AnimatedRoutineCard>
                  ))}
                </RoutineListContainer>
              ) : (
                <EmptyStateContainer>
                  <EmptyStateText>운동 루틴을 등록해보세요</EmptyStateText>
                </EmptyStateContainer>
              )}

              <RoutineAddButton
                isRoutineFormDataEmpty={isRoutineFormDataEmpty}
                showFormHandler={showFormHandler}
              />
            </FormSection>
          </Content>
        </AppContainer>

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
  backgroundColor: '#1a1a1a',
});

const AppContainer = styled.View({
  flex: 1,
  backgroundColor: '#1a1a1a',
  padding: 0,
  paddingHorizontal: 16,
});

const TopSection = styled.View({
  marginBottom: 16,
});

const HeaderRow = styled.View({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginVertical: 16,
});

const HeaderTitle = styled.Text({
  fontSize: 20,
  fontWeight: '700',
  color: '#ffffff',
});

const Content = styled.ScrollView({
  flex: 1,
});

const FormSection = styled.View({
  marginBottom: 16,
});

const SectionTitle = styled.Text({
  fontSize: 18,
  fontWeight: '600',
  color: '#ffffff',
  marginBottom: 12,
});

const FormCard = styled.View({
  backgroundColor: '#2a2a2a',
  borderRadius: 16,
  padding: 16,
  width: '100%',
});

const RoutineListContainer = styled.View({
  width: '100%',
  marginBottom: 16,
});

const AnimatedRoutineCard = styled(Animated.View)({
  marginBottom: 12,
  borderRadius: 16,
  overflow: 'hidden',
});

const EmptyStateContainer = styled.View({
  width: '100%',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#2a2a2a',
  borderRadius: 16,
  padding: 32,
  marginBottom: 16,
});

const EmptyStateText = styled.Text({
  fontSize: 16,
  color: '#aaaaaa',
  textAlign: 'center',
});

const styles = StyleSheet.create({
  headerButton: {
    padding: 8,
  },
  disabledButton: {
    opacity: 0.5,
  },
  routineCard: {
    borderRadius: 16,
    overflow: 'hidden',
  },
});

// 루틴 카드 색상 배열
const routineColors = ['#FFE500', '#FF4081', '#4DD0E1', '#9CCC65', '#BA68C8'];

// 인덱스에 따라 색상 순환 반환 함수
const getRoutineColor = (index: number) => {
  return routineColors[index % routineColors.length];
};
