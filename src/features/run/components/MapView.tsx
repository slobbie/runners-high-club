import styled from '@emotion/native';
import React from 'react';
import {StyleSheet} from 'react-native';
import NaverMapView, {Marker} from 'react-native-nmap';

import DotPng from '@assets/png/blue-dot.png';

interface IProps {
  pathPosition: {
    latitude: number;
    longitude: number;
  }[];
  markerPosition: {
    latitude: number;
    longitude: number;
  };
}

/**
 * MapView 컴포넌트
 * @returns React.JSX.Element
 */
const MapView = ({pathPosition, markerPosition}: IProps) => {
  return (
    <LayerView>
      <RadiusView>
        <NaverMapView
          style={styles.naverMapView}
          zoomControl={false}
          center={{
            zoom: 15.7,
            // 지도 기울기
            tilt: 0,
            latitude:
              (pathPosition[pathPosition.length - 1].latitude +
                pathPosition[pathPosition.length - 1].latitude) /
              2,
            longitude:
              (pathPosition[pathPosition.length - 1].longitude +
                pathPosition[pathPosition.length - 1].longitude) /
              2,
          }}>
          <Marker
            coordinate={{
              latitude: markerPosition.latitude,
              longitude: markerPosition.longitude,
            }}
            width={12}
            height={12}
            pinColor={'green'}
            image={DotPng}
          />
        </NaverMapView>
      </RadiusView>
    </LayerView>
  );
};

export default MapView;

const styles = StyleSheet.create({
  naverMapView: {
    width: '100%',
    height: '100%',
  },
});

const LayerView = styled.View({
  width: '100%',
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
});

const RadiusView = styled.View({
  width: '80%',
  height: '80%',
  borderRadius: 10,
  overflow: 'hidden',
});
