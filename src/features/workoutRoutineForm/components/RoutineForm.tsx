import React, {useState} from 'react';
import styled from '@emotion/native';
import uuid from 'react-native-uuid';

import {ButtonCustom, Picker, SvgIcon, Typo} from '@shared/components/atoms';
import {InputLabel} from '@shared/components/molecules';
import {colors} from '@shared/styles/theme';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import useRoutineFormStore from '@features/workoutRoutineForm/store/useRoutineFormStore';
import useTextChange from '@shared/hooks/useTextChange';
import PickerButton from '@features/workoutRoutineForm/components/PickerButton';
import {IPickerItem} from '@shared/components/atoms/Picker';
import useCreateSecondsData from '@features/workoutRoutineForm/hooks/useCreateSecondsData';

interface IProps {
  hideFormHandler: () => void;
}

const RoutineForm = ({hideFormHandler}: IProps) => {
  const insets = useSafeAreaInsets();

  const {routineFormEdit, setRoutineFormData, updateRoutineFormData} =
    useRoutineFormStore();

  const [showPicker, setShowPicker] = useState(false);

  const [title, onChangeTitle] = useTextChange(routineFormEdit?.title || '');
  const [rep, onChangeRep] = useTextChange(routineFormEdit?.rep || '');
  const [weight, onChangeWeight] = useTextChange(routineFormEdit?.weight || '');

  const secondsData = useCreateSecondsData();

  const [restDuration, onChangeRestDuration] = useState<IPickerItem>({
    id: 0,
    label: '',
  });

  const onForm = () => {
    const routineId = routineFormEdit?.id || uuid.v4();

    const payload = {
      id: routineId,
      title,
      rep,
      weight,
      restDuration,
    };
    if (routineFormEdit) {
      updateRoutineFormData(payload);
    } else {
      setRoutineFormData(payload);
    }

    hideFormHandler();
  };

  const btnDisabled = title === '' || rep === '' || weight === '';

  const btnText = routineFormEdit ? '수정' : '추가';

  const resetForm = () => {
    onChangeTitle('');
    onChangeRep('');
    onChangeWeight('');
    hideFormHandler();
  };

  return (
    <Content style={{paddingBottom: insets.top}}>
      <Header>
        <ButtonCustom onPress={resetForm}>
          <SvgIcon name="icon_close" size={24} />
        </ButtonCustom>
      </Header>
      <InputView>
        <InputLabel label="운동명" onChangeText={onChangeTitle} value={title} />
        <InputLabel
          label="총 세트"
          onChangeText={onChangeRep}
          value={rep}
          keyboardType="number-pad"
        />
        <InputLabel
          label="무게"
          onChangeText={onChangeWeight}
          value={weight}
          keyboardType="number-pad"
        />

        <PickerButton
          title="휴식 시간"
          label={restDuration.label || '휴식 시간을 선택해 주세요'}
          onPress={() => setShowPicker(true)}
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

      {showPicker && (
        <Picker
          defaultValue={secondsData[0].id}
          data={secondsData}
          onChange={onChangeRestDuration}
          onClose={() => setShowPicker(false)}
        />
      )}
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

const Header = styled.View({
  width: '100%',
  paddingHorizontal: 24,
  height: 40,
  justifyContent: 'flex-end',
  flexDirection: 'row',
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
