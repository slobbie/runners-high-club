import styled from '@emotion/native';
import {Typo} from '@shared/components/atoms';
import {InputLabel} from '@shared/components/molecules';
import {colors} from '@shared/styles/theme';
import React from 'react';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import useRoutineFormStore from '@features/workoutRoutineForm/store/routineForm.store';
import useTextChange from '@shared/hooks/useTextChange';
import uuid from 'react-native-uuid';

interface IProps {
  hideFormHandler: () => void;
}

const RoutineForm = ({hideFormHandler}: IProps) => {
  const insets = useSafeAreaInsets();

  const {routineFormEdit, setRoutineFormData, updateRoutineFormData} =
    useRoutineFormStore();

  const [title, onChangeTitle] = useTextChange(routineFormEdit?.title || '');
  const [rep, onChangeRep] = useTextChange(routineFormEdit?.rep || '');
  const [weight, onChangeWeight] = useTextChange(routineFormEdit?.weight || '');
  const [rest, onChangeRest] = useTextChange(routineFormEdit?.rest || '');

  const onForm = () => {
    const routineId = routineFormEdit?.id || uuid.v4();

    const payload = {
      id: routineId,
      title,
      rep,
      weight,
      rest,
    };
    if (routineFormEdit) {
      updateRoutineFormData(payload);
    } else {
      setRoutineFormData(payload);
    }

    hideFormHandler();
  };

  const btnDisabled =
    title === '' || rep === '' || weight === '' || rest === '';

  const btnText = routineFormEdit ? '수정' : '추가';

  return (
    <Content style={{paddingBottom: insets.top}}>
      <InputView>
        <InputLabel label="운동명" onChangeText={onChangeTitle} value={title} />
        <InputLabel label="총 세트" onChangeText={onChangeRep} value={rep} />
        <InputLabel label="무게" onChangeText={onChangeWeight} value={weight} />
        <InputLabel
          label="휴식 시간"
          onChangeText={onChangeRest}
          value={rest}
        />
      </InputView>

      <Bottom>
        <AddButton disabled={btnDisabled} onPress={onForm}>
          <Typo
            fontSize={22}
            fontWeight={'bold'}
            color={btnDisabled ? colors.text_4e5968 : colors.text_gray0}>
            {btnText}
          </Typo>
        </AddButton>
      </Bottom>
    </Content>
  );
};

export default RoutineForm;

const Content = styled(SafeAreaView)({
  flex: 1,
  backgroundColor: '#1f1f1f',
  paddingVertical: 20,
  alignContent: 'center',
  position: 'relative',
});

const InputView = styled.View({
  paddingHorizontal: 24,
  gap: 20,
});

const Bottom = styled.View({
  position: 'absolute',
  bottom: 50,
  width: '100%',
  paddingHorizontal: 24,
});

const AddButton = styled.TouchableOpacity(({theme, disabled}) => ({
  width: '100%',
  height: 56,
  backgroundColor: disabled ? theme.colors.bg_E2E4E6 : theme.colors.primary,
  borderRadius: 16,
  justifyContent: 'center',
  alignItems: 'center',
}));
