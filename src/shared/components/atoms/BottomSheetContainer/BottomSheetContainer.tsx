import React, {useCallback, useMemo} from 'react';
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetModalProps,
} from '@gorhom/bottom-sheet';

interface IBottomsheet extends BottomSheetModalProps {
  children: React.ReactNode;
  snapPoint: string;
}

/**
 * 바텀 시트 컨테이너 컴포넌트
 */
const BottomSheetContainer = React.forwardRef<BottomSheetModal, IBottomsheet>(
  ({children, snapPoint}, ref) => {
    /** 화면 노출 정도 */
    const snapPoints = useMemo(() => [snapPoint], [snapPoint]);

    /** 바텀시트 종료 이벤트 */
    const renderBackdrop = useCallback(
      (props: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop
          {...props}
          pressBehavior="close"
          appearsOnIndex={0}
          disappearsOnIndex={-1}
        />
      ),
      [],
    );

    return (
      <BottomSheetModal
        ref={ref}
        index={0}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}>
        {children}
      </BottomSheetModal>
    );
  },
);

export default BottomSheetContainer;
