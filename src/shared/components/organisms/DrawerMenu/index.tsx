import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

const DrawerMenu = props => {
  return (
    <DrawerContentScrollView {...props}>
      {/* 프로필 영역 */}
      <View style={styles.profileContainer}>
        <Image
          source={{uri: 'https://via.placeholder.com/80'}}
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>사용자 이름</Text>
      </View>

      {/* 기본 Drawer 항목 */}
      <DrawerItemList {...props} />

      {/* 로그아웃 버튼 */}
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => console.log('로그아웃')}>
        <Text style={styles.logoutText}>로그아웃</Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  profileContainer: {padding: 20, alignItems: 'center'},
  profileImage: {width: 80, height: 80, borderRadius: 40, marginBottom: 10},
  profileName: {fontSize: 18, fontWeight: 'bold'},
  logoutButton: {
    padding: 15,
    alignItems: 'center',
    backgroundColor: 'green',
    margin: 10,
    borderRadius: 5,
  },
  logoutText: {color: '#fff', fontSize: 16},
});

export default DrawerMenu;
