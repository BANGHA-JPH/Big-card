import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TouchableOpacity, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import useAuthStore from '@store/authStore';
import AuthNavigator from './AuthNavigator';
import { Colors, Spacing, FontSizes, BorderRadius } from '../constants';

// Dummy screens for Main stack for now
const PlaceholderScreen = ({ name }: { name: string }) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>{name}</Text></View>
);

const HomeScreen = () => {
  const { logout } = useAuthStore();
  
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };
  
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: Spacing.lg }}>
      <Text style={{ fontSize: FontSizes.xl, fontWeight: 'bold', marginBottom: Spacing.lg }}>
        Home Screen
      </Text>
      <Text style={{ fontSize: FontSizes.base, color: Colors.lightText, marginBottom: Spacing.xl, textAlign: 'center' }}>
        Welcome to Zita Vegetables! Your fresh food marketplace.
      </Text>
      
      <TouchableOpacity 
        style={{
          backgroundColor: Colors.error,
          paddingHorizontal: Spacing.xl,
          paddingVertical: Spacing.lg,
          borderRadius: BorderRadius.md,
          flexDirection: 'row',
          alignItems: 'center'
        }}
        onPress={handleLogout}
      >
        <Ionicons name="log-out-outline" size={20} color={Colors.white} style={{ marginRight: Spacing.sm }} />
        <Text style={{ color: Colors.white, fontWeight: '600' }}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};
const SearchScreen = () => <PlaceholderScreen name="Search" />;
const CartScreen = () => <PlaceholderScreen name="Cart" />;

// Import Account screen
import AccountScreen from '../screens/account/AccountScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const Navigation = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated, getStoredAuth } = useAuthStore();

  useEffect(() => {
    // Check stored authentication
    const checkAuth = async () => {
      await getStoredAuth();
      setIsLoading(false);
    };
    checkAuth();
  }, []);

  if (isLoading) {
    // Note: Splash screen is currently rendered inside AuthNavigator if not authenticated
    // But we could also return a bare splash screen here while loading.
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {!isAuthenticated ? (
          <Stack.Group>
            <Stack.Screen name="Auth" component={AuthNavigator} />
          </Stack.Group>
        ) : (
          <Stack.Group>
            <Stack.Screen name="MainTabs">
              {() => (
                <Tab.Navigator>
                  <Tab.Screen name="Home" component={HomeScreen} />
                  <Tab.Screen name="Search" component={SearchScreen} />
                  <Tab.Screen name="Cart" component={CartScreen} />
                  <Tab.Screen name="Account" component={AccountScreen} />
                </Tab.Navigator>
              )}
            </Stack.Screen>
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
