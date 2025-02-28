import React, {useCallback, useMemo} from 'react';
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';

interface IBottomsheet {
  children: React.ReactNode;
  snapPoint: string;
}

/**
 * 바텀 시트 컴포넌트
 * @property { BottomSheetModal } BottomSheetModal Type 의 ref
 * @property { string } snapPoint 바텀 시트 화면 노출 비율
 * @returns React.JSX.Element
 */
const Bottomsheet = React.forwardRef<any, IBottomsheet>(
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
      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={ref}
          index={0}
          snapPoints={snapPoints}
          backdropComponent={renderBackdrop}>
          {children}
        </BottomSheetModal>
      </BottomSheetModalProvider>
    );
  },
);

export default Bottomsheet;
