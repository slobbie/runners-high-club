import React from 'react';
import {StyleSheet} from 'react-native';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import {SafeAreaView} from 'react-native-safe-area-context';
import styled from '@emotion/native';

import useNavigate from '@shared/hooks/useNavigate';
import {SvgIcon, Typo} from '@shared/components/atoms';
import {colors} from '@shared/styles/theme';

interface IProps {
  onClose: () => void;
}

const DrawerMenu = ({onClose}: IProps) => {
  const navigation = useNavigate();

  const menuItems = [
    {
      id: 'workout',
      icon: 'icon_add' as const,
      title: '운동 추가',
      action: () => navigation.navigate('workoutRoutineFormScreen'),
    },
    {
      id: 'stats',
      icon: 'icon_menu' as const,
      title: '통계 보기',
      action: () => navigation.navigate('statisticsScreen'),
    },
    {
      id: 'settings',
      icon: 'icon_menu' as const,
      title: '설정',
      action: () => {}, // 향후 설정 화면 추가 시 연결
    },
  ];

  return (
    <DrawerContentScrollView style={styles.scrollView}>
      <Container>
        <Header>
          <LogoContainer>
            <LogoText>
              <Typo fontSize={24} fontWeight={'bold'} color={colors.primary}>
                Runner's
              </Typo>
              <Typo fontSize={24} fontWeight={'bold'} color={colors.text_gray0}>
                High Club
              </Typo>
            </LogoText>
          </LogoContainer>
          <CloseButton onPress={onClose}>
            <SvgIcon name="icon_close" size={24} fill={colors.text_gray0} />
          </CloseButton>
        </Header>

        <ProfileSection>
          <ProfileCircle>
            <Typo fontSize={24} fontWeight={'bold'} color={'#121212'}>
              R
            </Typo>
          </ProfileCircle>
          <ProfileInfo>
            <Typo fontSize={18} fontWeight={'bold'} color={colors.text_gray0}>
              러너
            </Typo>
            <Typo fontSize={14} color={colors.text_gray1}>
              열심히 달리는 중
            </Typo>
          </ProfileInfo>
        </ProfileSection>

        <MenuItems>
          {menuItems.map(item => (
            <MenuItem
              key={item.id}
              onPress={() => {
                onClose();
                item.action();
              }}>
              <MenuItemIcon>
                <SvgIcon name={item.icon} size={22} fill={colors.text_gray0} />
              </MenuItemIcon>
              <MenuItemText>
                <Typo fontSize={16} fontWeight={600} color={colors.text_gray0}>
                  {item.title}
                </Typo>
              </MenuItemText>
            </MenuItem>
          ))}
        </MenuItems>

        <Footer>
          <FooterText>
            <Typo fontSize={12} color={colors.text_gray2}>
              버전 1.0.0
            </Typo>
          </FooterText>
        </Footer>
      </Container>
    </DrawerContentScrollView>
  );
};

const Container = styled(SafeAreaView)({
  flex: 1,
  backgroundColor: '#121212',
  paddingHorizontal: 24,
  paddingVertical: 16,
});

const Header = styled.View({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 32,
});

const LogoContainer = styled.View({
  flexDirection: 'row',
  alignItems: 'center',
});

const LogoText = styled.View({
  flexDirection: 'row',
  gap: 4,
});

const CloseButton = styled.TouchableOpacity({
  width: 40,
  height: 40,
  justifyContent: 'center',
  alignItems: 'center',
});

const ProfileSection = styled.View({
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 32,
  paddingBottom: 24,
  borderBottomWidth: 1,
  borderBottomColor: 'rgba(255, 255, 255, 0.1)',
});

const ProfileCircle = styled.View({
  width: 56,
  height: 56,
  borderRadius: 28,
  backgroundColor: colors.primary,
  justifyContent: 'center',
  alignItems: 'center',
  marginRight: 16,
});

const ProfileInfo = styled.View({
  flex: 1,
  gap: 4,
});

const MenuItems = styled.View({
  flex: 1,
});

const MenuItem = styled.TouchableOpacity({
  flexDirection: 'row',
  alignItems: 'center',
  paddingVertical: 16,
  borderBottomWidth: 1,
  borderBottomColor: 'rgba(255, 255, 255, 0.05)',
});

const MenuItemIcon = styled.View({
  width: 40,
  height: 40,
  justifyContent: 'center',
  alignItems: 'center',
  marginRight: 16,
});

const MenuItemText = styled.View({
  flex: 1,
});

const Footer = styled.View({
  paddingVertical: 16,
  alignItems: 'center',
});

const FooterText = styled.View({
  alignItems: 'center',
});

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#121212',
  },
});

export default DrawerMenu;
