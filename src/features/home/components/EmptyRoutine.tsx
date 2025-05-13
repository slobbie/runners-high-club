import styled from '@emotion/native';
import {Typo} from '@shared/components/atoms';
import useNavigate from '@shared/hooks/useNavigate';
import {colors} from '@shared/styles/theme';
import React from 'react';

interface IProps {
  title: string;
  description: string;
}

/**
 * 루틴이 없을시
 */
const EmptyRoutine = ({title, description}: IProps) => {
  const navigation = useNavigate();
  return (
    <MainContent>
      <EmptyStateContainer>
        <EmptyStateTitle>{title}</EmptyStateTitle>
        <EmptyStateDescription>{description}</EmptyStateDescription>
        <AddRoutineButton
          onPress={() => navigation.navigate('workoutRoutineFormScreen')}>
          <Typo color={colors.text_000}>새 루틴 등록하기</Typo>
        </AddRoutineButton>
      </EmptyStateContainer>
    </MainContent>
  );
};

export default EmptyRoutine;

const MainContent = styled.ScrollView({
  flex: 1,
  padding: 20,
});

const EmptyStateContainer = styled.View({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  padding: 40,
});

const EmptyStateTitle = styled.Text({
  fontSize: 20,
  fontWeight: '600',
  color: '#ffffff',
  textAlign: 'center',
  marginBottom: 12,
});

const EmptyStateDescription = styled.Text({
  fontSize: 16,
  color: '#888888',
  textAlign: 'center',
  marginBottom: 24,
});

const AddRoutineButton = styled.TouchableOpacity({
  backgroundColor: '#3E8BFF',
  borderRadius: 8,
  paddingVertical: 12,
  paddingHorizontal: 20,
});
