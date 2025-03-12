import {useRef, useState} from 'react';

const useCountdown = (
  initialCount: number,
): [number, (onComplete?: () => void) => void] => {
  const countRef = useRef<number>(initialCount);
  const [count, setCount] = useState<number>(initialCount);
  const startTime = useRef<number | null>(null);
  const animationFrameId = useRef<number | null>(null);
  const onCompleteRef = useRef<(() => void) | null>(null);

  const runCountdown = (timestamp: number) => {
    if (!startTime.current) {
      return;
    }
    const elapsed = (timestamp - startTime.current) / 1000; // 초 단위 경과 시간
    const newCount = Math.max(initialCount - Math.floor(elapsed), 0);

    if (newCount !== countRef.current) {
      console.log('newCount :', newCount);
      countRef.current = newCount; // ✅ 즉시 업데이트
      setCount(newCount);
    }

    if (newCount > 0) {
      animationFrameId.current = requestAnimationFrame(runCountdown);
    } else {
      onCompleteRef.current?.();
      onCompleteRef.current = null;
      startTime.current = null;
      countRef.current = initialCount;
      animationFrameId.current = null;
    }
  };

  const startCountdown = (onComplete?: () => void) => {
    if (count !== initialCount) {
      setCount(initialCount);
    }
    if (startTime.current) {
      return;
    }
    if (onComplete) {
      onCompleteRef.current = onComplete;
    }

    startTime.current = performance.now();
    animationFrameId.current = requestAnimationFrame(runCountdown);
  };

  return [count, startCountdown];
};

export default useCountdown;
