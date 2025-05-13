import React, {useState} from 'react';
import styled from '@emotion/native';

import {SvgIcon, Typo} from '@shared/components/atoms';
import {InputLabel, Picker} from '@shared/components/molecules';
import {colors} from '@shared/styles/theme';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import useRoutineFormStore from '@features/workoutRoutineForm/store/useRoutineFormStore';
import useTextChange from '@shared/hooks/useTextChange';
import PickerButton from '@features/workoutRoutineForm/components/PickerButton';
import {IPickerItem} from '@shared/components/molecules/Picker';
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
    id: routineFormEdit?.restDuration?.id || 0,
    label: routineFormEdit?.restDuration?.label || '',
  });

  const onForm = () => {
    // Date.now()와 랜덤 값을 조합하여 고유 ID 생성
    const timestamp = Date.now();
    const randomValue = Math.floor(Math.random() * 10000);
    const routineId = routineFormEdit?.id || `${timestamp}_${randomValue}`;

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

  const btnDisabled = title === '' || rep === '' || weight === '' || !restDuration.label;

  const btnText = routineFormEdit ? '수정하기' : '운동 추가하기';

  const resetForm = () => {
    onChangeTitle('');
    onChangeRep('');
    onChangeWeight('');
    hideFormHandler();
  };

  return (
    <Content style={{paddingBottom: insets.bottom + 20}}>
      <Header>
        <FormTitle>
          <Typo fontSize={20} fontWeight={'bold'} color={colors.text_gray0}>
            {routineFormEdit ? '운동 수정' : '새로운 운동 추가'}
          </Typo>
        </FormTitle>
        <CloseButton onPress={resetForm}>
          <SvgIcon name="icon_close" size={24} fill={colors.text_gray0} />
        </CloseButton>
      </Header>
      <InputView>
        <FormSection>
          <SectionTitle>
            <Typo fontSize={16} fontWeight={600} color={colors.text_gray0}>
              기본 정보
            </Typo>
          </SectionTitle>
          <InputLabel
            label="운동명"
            onChangeText={onChangeTitle}
            value={title}
            placeholder="어떤 운동인가요?"
          />
        </FormSection>

        <FormSection>
          <SectionTitle>
            <Typo fontSize={16} fontWeight={600} color={colors.text_gray0}>
              세부 설정
            </Typo>
          </SectionTitle>
          <InputLabel
            label="총 세트"
            onChangeText={onChangeRep}
            value={rep}
            keyboardType="number-pad"
            placeholder="총 몇 세트인가요?"
          />
          <InputLabel
            label="무게"
            onChangeText={onChangeWeight}
            value={weight}
            keyboardType="number-pad"
            placeholder="몇 kg인가요?"
          />

          <PickerButton
            title="휴식 시간"
            label={restDuration.label || '휴식 시간을 선택해 주세요'}
            onPress={() => setShowPicker(true)}
          />
        </FormSection>
      </InputView>

      <Bottom>
        <AddButton disabled={btnDisabled} onPress={onForm}>
          <Typo
            fontSize={18}
            fontWeight={'bold'}
            color={btnDisabled ? colors.text_4e5968 : colors.text_gray0}>
            {btnText}
          </Typo>
        </AddButton>
      </Bottom>

      {showPicker && (
        <Picker
          defaultValue={routineFormEdit?.restDuration?.id || secondsData[0].id}
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
  backgroundColor: '#121212',
  paddingVertical: 20,
  alignContent: 'center',
  position: 'relative',
});

const Header = styled.View({
  width: '100%',
  paddingHorizontal: 24,
  height: 60,
  justifyContent: 'center',
  flexDirection: 'row',
  position: 'relative',
  marginBottom: 24,
});

const FormTitle = styled.View({
  alignItems: 'center',
  justifyContent: 'center',
});

const CloseButton = styled.TouchableOpacity({
  position: 'absolute',
  right: 24,
  top: 4,
  padding: 8,
});

const InputView = styled.ScrollView({
  paddingHorizontal: 24,
  flex: 1,
});

const FormSection = styled.View({
  marginBottom: 32,
  gap: 16,
});

const SectionTitle = styled.View({
  marginBottom: 8,
});

const Bottom = styled.View({
  width: '100%',
  paddingHorizontal: 24,
  paddingVertical: 16,
  backgroundColor: '#121212',
});

const AddButton = styled.TouchableOpacity(({theme, disabled}) => ({
  width: '100%',
  height: 56,
  backgroundColor: disabled ? '#333333' : theme.colors.primary,
  borderRadius: 16,
  justifyContent: 'center',
  alignItems: 'center',
  shadowColor: '#000',
  shadowOffset: {width: 0, height: 2},
  shadowOpacity: 0.3,
  shadowRadius: 4,
  elevation: 4,
}));
