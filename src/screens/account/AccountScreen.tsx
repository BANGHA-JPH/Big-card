import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import useAuthStore from '@store/authStore';
import { Colors, Spacing, FontSizes, BorderRadius } from '../../constants';

const AccountScreen: React.FC = () => {
  const { user, logout, isLoading } = useAuthStore();

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            try {
              await logout();
            } catch (error) {
              console.error('Logout error:', error);
              Alert.alert('Error', 'Failed to logout. Please try again.');
            }
          },
        },
      ]
    );
  };

  const menuItems = [
    {
      icon: 'person-outline',
      title: 'Profile',
      subtitle: 'Manage your account information',
    },
    {
      icon: 'location-outline',
      title: 'Addresses',
      subtitle: 'Manage delivery addresses',
    },
    {
      icon: 'heart-outline',
      title: 'Favorites',
      subtitle: 'View your favorite products',
    },
    {
      icon: 'receipt-outline',
      title: 'Orders',
      subtitle: 'View order history',
    },
    {
      icon: 'card-outline',
      title: 'Payment Methods',
      subtitle: 'Manage payment options',
    },
    {
      icon: 'settings-outline',
      title: 'Settings',
      subtitle: 'App preferences and settings',
    },
    {
      icon: 'help-circle-outline',
      title: 'Help & Support',
      subtitle: 'Get help and contact support',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.profileContainer}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={40} color={Colors.white} />
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>
              {user?.name || 'Guest User'}
            </Text>
            <Text style={styles.userEmail}>
              {user?.email || 'guest@example.com'}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.menuSection}>
        {menuItems.map((item, index) => (
          <TouchableOpacity key={index} style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <Ionicons 
                name={item.icon as any} 
                size={24} 
                color={Colors.primary} 
                style={styles.menuIcon}
              />
              <View style={styles.menuText}>
                <Text style={styles.menuTitle}>{item.title}</Text>
                <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
              </View>
            </View>
            <Ionicons 
              name="chevron-forward" 
              size={20} 
              color={Colors.lightText} 
            />
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.logoutSection}>
        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={handleLogout}
          disabled={isLoading}
        >
          <Ionicons 
            name="log-out-outline" 
            size={24} 
            color={Colors.error} 
            style={styles.logoutIcon}
          />
          <Text style={styles.logoutButtonText}>
            {isLoading ? 'Logging out...' : 'Logout'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Zita Vegetables E-commerce
        </Text>
        <Text style={styles.footerSubtext}>
          Version 1.0.0
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    backgroundColor: Colors.primary,
    padding: Spacing.xl,
    paddingTop: Spacing.xxl + Spacing.md,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.lg,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: FontSizes.xl,
    fontWeight: 'bold',
    color: Colors.white,
    marginBottom: Spacing.xs / 2,
  },
  userEmail: {
    fontSize: FontSizes.base,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  menuSection: {
    backgroundColor: Colors.white,
    marginTop: Spacing.md,
    padding: Spacing.md,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuIcon: {
    marginRight: Spacing.lg,
  },
  menuText: {
    flex: 1,
  },
  menuTitle: {
    fontSize: FontSizes.base,
    fontWeight: '600',
    color: Colors.darkText,
    marginBottom: Spacing.xs / 2,
  },
  menuSubtitle: {
    fontSize: FontSizes.sm,
    color: Colors.lightText,
  },
  logoutSection: {
    padding: Spacing.md,
    marginTop: Spacing.md,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    paddingVertical: Spacing.lg,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.error,
  },
  logoutIcon: {
    marginRight: Spacing.sm,
  },
  logoutButtonText: {
    fontSize: FontSizes.base,
    fontWeight: '600',
    color: Colors.error,
  },
  footer: {
    alignItems: 'center',
    padding: Spacing.xl,
    marginTop: Spacing.lg,
  },
  footerText: {
    fontSize: FontSizes.base,
    fontWeight: '600',
    color: Colors.darkText,
    marginBottom: Spacing.xs / 2,
  },
  footerSubtext: {
    fontSize: FontSizes.sm,
    color: Colors.lightText,
  },
});

export default AccountScreen;
