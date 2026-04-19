import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Navigation from './src/navigation/Navigation';
import { ToastProvider } from 'react-native-toast-notifications';

export default function App() {
  return (
    <SafeAreaProvider>
      <ToastProvider>
        <Navigation />
        <StatusBar barStyle="dark-content" />
      </ToastProvider>
    </SafeAreaProvider>
  );
}
