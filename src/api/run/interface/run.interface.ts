// =============================================================================
// File    : run.interface.ts
// Class   :
// Purpose : run.interface.ts 인터페이스
// Date    : 2024.06
// Author  :  JHS
// History :
// =============================================================================
// Copyright (C) 2024 JHS All rights reserved.
// =============================================================================

/** 러닝 기록 리스트 아이템  타입 */
export interface IRunRecord {
  id: number;
  // 날짜
  date: string;
  // 달리기 제목
  runningTitle: string;
  // 총거리
  totalKm: string;
  // 평균 페이스
  totalAveragePace: string;
  // 최고 페이스
  bestPace: string;
  // 러닝 시간
  runningTime: string;
  // 칼로리
  kcal?: string;
  // 평균 케이던스
  averageCadence: number;
  // 고도 상승
  elevationGain: number;
  // 고도 하강
  elevationLoss: number;
  // 평균 심박수
  averageHeartRate?: string;
  // 최대 심박수
  maximumHeartRate?: string;
  // 구간
  segmentTime: {
    km: string;
    // 평균 페이스
    averagePace: string;
    // 이전 페이스와의 차이
    difference: string;
    // 고도 상승률
    elevation: string;
  }[];
  runningRoute: {
    km: number;
    route: {
      latitude: number;
      longitude: number;
    }[];
  }[];
}
