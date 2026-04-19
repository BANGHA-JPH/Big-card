import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import useAuthStore from '@store/authStore';
import AuthNavigator from './AuthNavigator';

// Dummy screens for Main stack for now
import { View, Text } from 'react-native';
const PlaceholderScreen = ({ name }: { name: string }) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>{name}</Text></View>
);

const HomeScreen = () => <PlaceholderScreen name="Home" />;
const SearchScreen = () => <PlaceholderScreen name="Search" />;
const CartScreen = () => <PlaceholderScreen name="Cart" />;
const AccountScreen = () => <PlaceholderScreen name="Account" />;

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
