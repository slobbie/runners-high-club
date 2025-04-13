import React from 'react';
import styled from '@emotion/native';
import {ButtonBase, PickerColumn, Typo} from '@shared/components/atoms';
import {colors} from '@shared/styles/theme';

interface IPickerItem {
  key: string;
  label: string;
}

interface IPickerColumn {
  defaultValue: string;
  data: IPickerItem[];
  onChange: (data: IPickerItem) => void;
  label?: string; // "분", "초" 등의 레이블
}

// 복수 휠 피커의 props
interface MultiWheelPickerProps {
  columns: IPickerColumn[];
  onClose: () => void;
}

const ITEM_HEIGHT = 50; // 각 항목의 높이
const VISIBLE_ITEMS = 5; // 보여질 항목 수 (홀수로 설정)
const PICKER_HEIGHT = ITEM_HEIGHT * VISIBLE_ITEMS;

const MultiWheelPicker = ({columns, onClose}: MultiWheelPickerProps) => {
  return (
    <PickerModalOverlay onPress={onClose}>
      <PickerModal>
        <Container>
          <ColumnsContainer>
            {columns.map((column, index) => (
              <PickerColumn
                key={`column-${index}`}
                defaultValue={column.defaultValue}
                data={column.data}
                onChange={column.onChange}
                label={column.label}
              />
            ))}
          </ColumnsContainer>
        </Container>
        <Bottom>
          <ButtonBase onPress={onClose}>
            <Typo fontSize={16} fontWeight={600} color={colors.bg_gray000}>
              선택
            </Typo>
          </ButtonBase>
        </Bottom>
      </PickerModal>
    </PickerModalOverlay>
  );
};

export default MultiWheelPicker;

// 스타일 컴포넌트
const PickerModalOverlay = styled(ButtonBase)({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  width: '100%',
  height: '100%',
});

const PickerModal = styled.View({
  width: '80%',
  backgroundColor: '#ffffff',
  borderRadius: 12,
  overflow: 'hidden',
});

const Container = styled.View({
  width: '100%',
  height: PICKER_HEIGHT,
  backgroundColor: '#ffffff',
  borderRadius: 12,
  overflow: 'hidden',
  position: 'relative',
});

const ColumnsContainer = styled.View({
  width: '100%',
  height: '100%',
  flexDirection: 'row',
  justifyContent: 'space-around',
  alignItems: 'center',
});

const Bottom = styled.View({
  paddingHorizontal: 50,
  paddingVertical: 20,
});
