import React, {useEffect, useMemo, useState} from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import NaverMapView, {Marker} from 'react-native-nmap';
import styled from '@emotion/native';
import Geolocation from '@react-native-community/geolocation';
import {RouteProp} from '@react-navigation/native';

import {RootStackParams} from '@shared/interface/rootStackParams';

interface IProps {
  route: RouteProp<RootStackParams, 'recordDetail'>;
}

/**
 * 기록 상세 내용 화면
 * @returns React.JSX.Element
 */
const RecordDetailScreen = ({route}: IProps) => {
  const recordData = route.params;

  /** 네이버 맵뷰 스타일 */
  const naverMapViewStyle = useMemo(() => {
    return {
      width: '100%',
      height: '100%',
    } as StyleProp<ViewStyle>;
  }, []);

  /** 스크롤뷰 컨텐츠 스타일 */
  const contentContainerStyle = useMemo(() => {
    return {
      padding: 20,
      flexGrow: 1,
    };
  }, []);

  /** 현재 위치 상태 */
  const [markerPosition, setMarkerPosition] = useState<{
    latitude: number;
    longitude: number;
  }>({
    latitude: 0,
    longitude: 0,
  });

  // TODO 임시 코드
  useEffect(() => {
    Geolocation.getCurrentPosition(
      info => {
        setMarkerPosition({
          latitude: info.coords.latitude,
          longitude: info.coords.longitude,
        });
      },
      console.error,
      {
        enableHighAccuracy: true,
        timeout: 20000,
      },
    );
  }, []);

  return (
    <SafeAreaView>
      <Wrapper contentContainerStyle={contentContainerStyle}>
        <TitleView>
          <TitleDate>{recordData.date}</TitleDate>
          <Title>{recordData.runningTitle}</Title>
        </TitleView>
        <KmWrapper>
          <KmBox>
            <KmText>{recordData.totalKm}</KmText>
            <KmTextUnit>Km</KmTextUnit>
          </KmBox>
        </KmWrapper>
        <RecodeView>
          <RecodeBox>
            <RecordView>
              <RecordText>{recordData.runningTime}</RecordText>
              <RecordTextUnit>시간</RecordTextUnit>
            </RecordView>
            <RecordView>
              <RecordText>{recordData.kcal}</RecordText>
              <RecordTextUnit>소모 칼로리</RecordTextUnit>
            </RecordView>
            <RecordView>
              <RecordText>{recordData.totalAveragePace}</RecordText>
              <RecordTextUnit>페이스</RecordTextUnit>
            </RecordView>
          </RecodeBox>
          <RecodeBox>
            <RecordView>
              <RecordText>{recordData.elevationGain}</RecordText>
              <RecordTextUnit>고도상승</RecordTextUnit>
            </RecordView>
            <RecordView>
              <RecordText>{recordData.averageHeartRate}</RecordText>
              <RecordTextUnit>평균 심박수</RecordTextUnit>
            </RecordView>
            <RecordView>
              <RecordText>{recordData.averageCadence}</RecordText>
              <RecordTextUnit>케이던스</RecordTextUnit>
            </RecordView>
          </RecodeBox>
        </RecodeView>
        <LayerView>
          <NaverMapView
            style={naverMapViewStyle}
            zoomControl={false}
            center={{
              zoom: 14.7,
              tilt: 0,
              latitude: (markerPosition.latitude + markerPosition.latitude) / 2,
              longitude:
                (markerPosition.longitude + markerPosition.longitude) / 2,
            }}>
            <Marker
              coordinate={{
                latitude: markerPosition.latitude,
                longitude: markerPosition.longitude,
              }}
              width={1}
              height={1}
              pinColor="transparent"
              anchor={{x: 0.5, y: 0.5}}
            />
            {/* <Path
            width={10}
            color={'#40C576'}
            outlineWidth={0}
            coordinates={pathPosition}
          /> */}
            <Marker
              coordinate={{
                latitude: markerPosition.latitude,
                longitude: markerPosition.longitude,
              }}
              width={12}
              height={12}
              pinColor={'green'}
              image={require('../../../assets/pngIcon/blue-dot.png')}
            />
          </NaverMapView>
        </LayerView>
        <DetailView>
          <DetailViewTitle>구간 정보</DetailViewTitle>
          <DetailTitleView>
            <DetailTitleKmView>
              <DetailTitleKmText>Km</DetailTitleKmText>
            </DetailTitleKmView>
            <DetailTitlePaceView>
              <DetailTitleKmText>Km</DetailTitleKmText>
            </DetailTitlePaceView>
            <DetailTitleAltitudeView>
              <DetailTitleKmText>Km</DetailTitleKmText>
            </DetailTitleAltitudeView>
          </DetailTitleView>
          <DetailItemView>
            {recordData.segmentTime.map(item => {
              return (
                <DetailItemBox key={item.km}>
                  <DetailItemKmView>
                    <DetailTitleText>{item.km}</DetailTitleText>
                  </DetailItemKmView>
                  <DetailItemPaceView>
                    <DetailTitleText>{item.averagePace}</DetailTitleText>
                  </DetailItemPaceView>
                  <DetailItemAltitudeView>
                    <DetailTitleText>{item.elevation}</DetailTitleText>
                  </DetailItemAltitudeView>
                </DetailItemBox>
              );
            })}
          </DetailItemView>
        </DetailView>
        <BottomMarginView />
      </Wrapper>
    </SafeAreaView>
  );
};

export default RecordDetailScreen;

const SafeAreaView = styled.SafeAreaView`
  flex-grow: 1;
  background-color: ${({theme}) => theme.colors.bg_gray000};
`;

const Wrapper = styled.ScrollView`
  background-color: ${({theme}) => theme.colors.bg_gray000};
`;

const TitleView = styled.View`
  border-bottom-width: 1px;
  border-color: ${({theme}) => theme.colors.bg_gray250};
  padding-bottom: 10px;
`;

const TitleDate = styled.Text`
  font-weight: 400;
  font-size: 16px;
  color: ${({theme}) => theme.colors.text_333};
  opacity: 0.6;
`;
const Title = styled.Text`
  font-weight: 600;
  font-size: 22px;
  color: ${({theme}) => theme.colors.text_333};
  margin-top: 10px;
`;

const LayerView = styled.View`
  width: 100%;
  height: 250px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  overflow: hidden;
  margin-top: 10%;
  margin-bottom: 10%;
`;

const KmWrapper = styled.View`
  width: 100%;
  height: 16%;
  align-items: center;
  justify-content: center;
`;

const KmBox = styled.View`
  flex-direction: row;
`;

const KmText = styled.Text`
  color: ${({theme}) => theme.colors.text_333};
  font-size: 60px;
  font-weight: bold;
`;

const KmTextUnit = styled.Text`
  color: ${({theme}) => theme.colors.text_333};
  margin-top: auto;
  margin-bottom: 2%;
  margin-left: 10px;
`;

const RecodeView = styled.View`
  align-items: end;
  height: 160px;
`;

const RecordView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const RecordText = styled.Text`
  font-weight: 400;
  font-size: 30px;
`;

const RecordTextUnit = styled.Text`
  font-weight: 300;
  font-size: 18px;
`;

const RecodeBox = styled.View`
  flex: 1;
  flex-direction: row;
`;

const DetailView = styled.View`
  min-height: 100px;
  width: 100%;
`;

const DetailViewTitle = styled(Title)`
  margin-top: 0px;
`;

const DetailTitleView = styled.View`
  margin-top: 20px;
  flex-direction: row;
`;

const DetailTitleKmView = styled.View`
  flex: 1;
`;

const DetailTitleKmText = styled.Text`
  color: ${({theme}) => theme.colors.text_gray2};
  font-weight: 600;
  font-size: 14px;
`;

const DetailTitlePaceView = styled.View`
  flex: 3;
`;

const DetailTitleAltitudeView = styled.View`
  flex: 1;
`;

const DetailItemView = styled.View`
  margin-top: 16px;
`;

const DetailItemBox = styled.View`
  flex-direction: row;
  flex: 1;
  margin-bottom: 10px;
  height: 40px;
  align-items: center;
`;

const DetailItemKmView = styled.View`
  flex: 1;
`;

const DetailItemPaceView = styled.View`
  width: 100%;
  flex: 3;
`;

const DetailItemAltitudeView = styled.View`
  width: 100%;
  flex: 1;
`;

const DetailTitleText = styled.Text`
  color: ${({theme}) => theme.colors.text_333};
  font-weight: 600;
  font-size: 16px;
`;

const BottomMarginView = styled.View`
  height: 100px;
`;
