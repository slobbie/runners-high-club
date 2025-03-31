import styled from '@emotion/native';
import React, {useEffect, useRef, useState} from 'react';
import ControlButtonGroup from '@features/runTracker/components/ControlButtonGroup';
import useNavigate from '@shared/hooks/useNavigate';
import useRunSetupStore from '@shared/store/runSetupStore';
import {runUtils} from '@shared/utils/runUtils';
import {timeFormatUtils} from '@shared/utils/timeFormatUtils';

interface IRunTracker {}

/**
 * 달리기 현황 추적 컴포넌트
 * @property { boolean } isRun 달리기 시작 여부
 * @property { boolean } isPause 달리기 일시정지 여부
 * @returns React.JSX.Element
 */
const RunTrackerScreen = ({}: IRunTracker) => {
  const navigate = useNavigate();
  /** 일시정지 상태 */
  const [isPause, setIsPause] = useState(false);

  const [markerPosition, setMarkerPosition] = useState<{
    latitude: number;
    longitude: number;
  }>({
    latitude: 0,
    longitude: 0,
  });

  /** 현재 위치 상태 */
  const [pathPosition, setPathPosition] = useState<
    {
      latitude: number;
      longitude: number;
    }[]
  >([
    {
      latitude: 0,
      longitude: 0,
    },
    {
      latitude: 0,
      longitude: 0,
    },
  ]);

  const pathPositionRef = useRef<NodeJS.Timeout>();

  const [kmText, setKmText] = useState('0.00');

  const {setDistanceRunningTime, setDistanceRun, setDistanceRunningPace} =
    useRunSetupStore();

  const [timer, setTimer] = useState(0);
  const paceRef = useRef('0:00');
  const runDataRef = useRef({
    timer: 0,
    kmText: '',
  });

  /** 시간 업데이트 */
  useEffect(() => {
    if (!isPause) {
      const updateTime = () => {
        runDataRef.current.timer = timer;
        setTimer(prevTime => prevTime + 1);
        re = setTimeout(updateTime, 1000);
      };
      let re = setTimeout(updateTime, 1000);
      return () => {
        setDistanceRunningTime(timeFormatUtils.formatDuration(timer));
        clearTimeout(re);
      };
    }
  }, [isPause, setDistanceRunningTime, timer]);

  /** km 미터 계산 호출 */
  useEffect(() => {
    if (!isPause) {
      const prevPosition = pathPosition[0];
      const km = runUtils.calculateDistance(
        prevPosition.latitude,
        prevPosition.longitude,
        markerPosition.latitude,
        markerPosition.longitude,
      );
      /** 달린 거리 계산  */
      const convertKm = runUtils.formatDistance(
        Math.round((km + Number.EPSILON) * 100) / 100,
      );
      setKmText(convertKm);
      runDataRef.current.kmText = convertKm;
      setDistanceRun(convertKm);
    }
  }, [isPause, markerPosition, pathPosition]);

  /** 러닝 종료시 초기화 */
  useEffect(() => {
    return () => {
      setTimer(0);
      setKmText('0.00');
    };
  }, []);

  useEffect(() => {
    if (!isPause) {
      const updatePosition = () => {
        setMarkerPosition(prev => ({
          ...prev,
          latitude: prev.latitude + 0.00005,
          longitude: prev.longitude + 0.000001,
        }));
        setPathPosition(prev => {
          return [
            ...prev,
            {
              latitude: prev[prev.length - 1].latitude + 0.00005,
              longitude: prev[prev.length - 1].longitude + 0.000001,
            },
          ];
        });

        pathPositionRef.current = setTimeout(updatePosition, 1000);
      };
      pathPositionRef.current = setTimeout(updatePosition, 1000);
      return () => {
        clearTimeout(pathPositionRef.current);
      };
    }
    return () => {
      clearTimeout(pathPositionRef.current);
    };
  }, [isPause]);

  /** 페이스 업데이트 */
  useEffect(() => {
    let intervalId: any;
    if (!isPause) {
      intervalId = setInterval(() => {
        const pace = runUtils.calculateTimeToRun1kmPace(
          Number(runDataRef.current.kmText),
          runDataRef.current.timer,
        );
        setDistanceRunningPace(pace);
        paceRef.current = pace;
      }, 2000);
      return () => {
        clearTimeout(intervalId);
      };
    } else {
      clearInterval(intervalId);
    }
  }, [isPause]);

  /** 일시정지 핸들러 */
  const pauseHandler = () => {
    setIsPause(prev => !prev);
  };

  const endRunCallback = () => {
    clearTimeout(pathPositionRef.current);
    pathPositionRef.current = undefined;
    navigate.replace('completeRunScreen', {pathPosition, markerPosition});
  };

  return (
    <RunView>
      <Top>
        <KmTextView>
          <RunKmText>{kmText}</RunKmText>
          <RunKmTextUnit>Km</RunKmTextUnit>
        </KmTextView>
      </Top>
      <Mid>
        <RecordView>
          <RecordText>{timeFormatUtils.formatDuration(timer)}</RecordText>
          <RecordTextUnit>시간</RecordTextUnit>
        </RecordView>
        <RecordView>
          <RecordText>--</RecordText>
          <RecordTextUnit>BPM</RecordTextUnit>
        </RecordView>
        <RecordView>
          <RecordText>{paceRef.current}</RecordText>
          <RecordTextUnit>페이스</RecordTextUnit>
        </RecordView>
      </Mid>
      <ControlButtonGroup
        isPause={isPause}
        endRunCallback={endRunCallback}
        pauseHandler={pauseHandler}
      />
    </RunView>
  );
};

export default RunTrackerScreen;

const RunView = styled.View`
  position: relative;
  background-color: ${({theme}) => theme.colors.bg_gray000};
  width: 100%;
  height: 100%;
`;

const Top = styled.View`
  flex: 1;
  flex-direction: row;
`;

const KmTextView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const RunKmText = styled.Text`
  font-weight: bold;
  font-size: 50px;
`;
const RunKmTextUnit = styled.Text`
  font-weight: bold;
  font-size: 24px;
`;

const Mid = styled.View`
  flex: 1.5;
  align-items: flex-start;
  flex-direction: row;
`;

const RecordView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-top: 10%;
`;

const RecordText = styled.Text`
  font-weight: 400;
  font-size: 30px;
`;

const RecordTextUnit = styled.Text`
  font-weight: 300;
  font-size: 18px;
`;
