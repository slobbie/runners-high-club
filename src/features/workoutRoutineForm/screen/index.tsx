import styled from '@emotion/native';
import {
  BottomSheetContainer,
  Space,
  SvgIcon,
  Typo,
} from '@shared/components/atoms';
import {InputLabel} from '@shared/components/molecules';
import {colors} from '@shared/styles/theme';
import React, {useRef} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import RoutineForm from '@features/workoutRoutineForm/components/RoutineForm';
import {Header} from '@shared/components/organisms';
import useNavigate from '@shared/hooks/useNavigate';
import {FlatList, Pressable} from 'react-native';
import useRoutineFormStore from '@features/workoutRoutineForm/store/routineForm.store';
import useTextChange from '@shared/hooks/useTextChange';
import {IRoutineForm} from '@shared/interface/routine.interface';
import useRoutineStore from '@shared/store/routine.store';
import uuid from 'react-native-uuid';

const WorkoutRoutineFormScreen = () => {
  const navigation = useNavigate();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const {routineFormData, setRoutineFormEdit, resetRoutineFormData} =
    useRoutineFormStore();
  const {updateRoutineData} = useRoutineStore();

  const showFormHandler = () => {
    bottomSheetModalRef.current?.present();
  };

  const hideFormHandler = () => {
    bottomSheetModalRef.current?.close();
  };

  const [workoutName, onChangeWorkoutName] = useTextChange('');
  const [day, onChangeDay] = useTextChange('');

  const editHandler = (pRoutine: IRoutineForm) => {
    setRoutineFormEdit(pRoutine);

    bottomSheetModalRef.current?.present();
  };

  const formSubmitHandler = () => {
    const payload = {
      id: uuid.v4(),
      workoutName,
      day,
      routines: routineFormData,
    };
    updateRoutineData(payload);
    resetRoutineFormData();
    navigation.replace('drawer');
  };

  return (
    <Wrapper edges={['top', 'bottom']}>
      <Header
        headerLeft={
          <Pressable onPress={() => navigation.replace('drawer')}>
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
        <InputLabel label="반복 요일" onChangeText={onChangeDay} value={day} />
        <Space bottom={20} />
        <FlatList
          data={routineFormData}
          style={{width: '100%'}}
          renderItem={({item, index}) => (
            <RoutineItem key={index}>
              <Typo fontSize={16} fontWeight={600} color={colors.text_333}>
                종목: {item.title}
              </Typo>
              <Typo fontSize={16} fontWeight={600} color={colors.text_333}>
                세트: {item.rep}
              </Typo>
              <Typo fontSize={16} fontWeight={600} color={colors.text_333}>
                무게: {item.weight}
              </Typo>
              <Typo fontSize={16} fontWeight={600} color={colors.text_333}>
                휴식: {item.rest}
              </Typo>
              <DeleteButton onPress={() => editHandler(item)}>
                <SvgIcon name="icon_edit" size={24} />
              </DeleteButton>
            </RoutineItem>
          )}
        />

        <AddView>
          {routineFormData.length <= 0 && (
            <>
              <Typo fontSize={16} fontWeight={400} color={colors.text_gray0}>
                새로운 운동을 추가해보세요
              </Typo>
            </>
          )}
          <AddButton onPress={showFormHandler}>
            <SvgIcon name="icon_add" size={60} />
          </AddButton>
        </AddView>
      </Content>

      <BottomSheetContainer snapPoint="100%" ref={bottomSheetModalRef}>
        <RoutineForm hideFormHandler={hideFormHandler} />
      </BottomSheetContainer>
    </Wrapper>
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

const AddView = styled.View({
  width: '100%',
  alignItems: 'center',
  gap: 10,
  position: 'absolute',
  bottom: 80,
});

const AddButton = styled.Pressable(({theme}) => ({
  width: 60,
  height: 60,
  backgroundColor: theme.colors.primary,
  borderRadius: 100,
  justifyContent: 'center',
  alignItems: 'center',
}));

const RoutineItem = styled.View(({theme}) => ({
  width: '100%',
  backgroundColor: theme.colors.bg_gray100,
  borderRadius: 14,
  paddingHorizontal: 16,
  paddingVertical: 15,
  marginBottom: 10,
  alignItems: 'flex-start',
  gap: 10,
}));

const DeleteButton = styled.TouchableOpacity(({}) => ({
  borderRadius: 100,
  justifyContent: 'center',
  alignItems: 'center',
  position: 'absolute',
  right: 16,
  top: 16,
}));
