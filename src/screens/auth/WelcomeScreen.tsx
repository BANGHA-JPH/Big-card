import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, SafeAreaView, Dimensions } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { AuthStackParamList } from '../../navigation/AuthNavigator';
import { Colors, Spacing, FontSizes, BorderRadius } from '../../constants';
// Note: Normally we'd use an SVG icon for Google. For this template, a text fallback or basic styling goes here.

type WelcomeScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Welcome'>;

interface Props {
  navigation: WelcomeScreenNavigationProp;
}

const { height } = Dimensions.get('window');

const WelcomeScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800' }}
        style={styles.backgroundImage}
      >
        <SafeAreaView style={styles.overlay}>
          {/* Top section left empty to show background */}
          <View style={styles.topSpace} />

          {/* Bottom Card */}
          <View style={styles.card}>
            <Text style={styles.title}>Welcome</Text>
            <Text style={styles.subtitle}>Let's Get Started.</Text>
            <Text style={styles.subtitle}>Fresh food is just a tap away.</Text>
            
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.googleButton}>
                <Ionicons name="logo-google" size={20} color="#DB4437" style={{marginRight: Spacing.sm}} />
                <Text style={styles.googleButtonText}>Continue with google</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.createButton}
                onPress={() => navigation.navigate('Signup')}
              >
                <Ionicons name="person-add-outline" size={20} color={Colors.white} style={{marginRight: Spacing.sm}} />
                <Text style={styles.createButtonText}>Create an account</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity 
              style={styles.loginLinkContainer}
              onPress={() => navigation.navigate('Login')}
            >
              <Text style={styles.loginText}>
                Already have an account? <Text style={styles.loginTextBold}>Login</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)', // Slight dark overlay for contrast
    justifyContent: 'flex-end',
  },
  topSpace: {
    flex: 1,
  },
  card: {
    backgroundColor: '#F8F9FA',
    borderTopLeftRadius: BorderRadius.xl * 2,
    borderTopRightRadius: BorderRadius.xl * 2,
    padding: Spacing.xl,
    paddingTop: Spacing.xxl + Spacing.md,
    minHeight: height * 0.45,
  },
  title: {
    fontSize: FontSizes.xxl,
    fontWeight: 'bold',
    color: Colors.black,
    marginBottom: Spacing.sm,
  },
  subtitle: {
    fontSize: FontSizes.base,
    color: Colors.lightText,
    marginBottom: 4,
  },
  buttonContainer: {
    marginTop: Spacing.xl,
    gap: Spacing.md,
  },
  googleButton: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    paddingVertical: Spacing.lg,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  googleIcon: {
    fontSize: FontSizes.lg,
    fontWeight: 'bold',
    color: '#DB4437', // Google red
    marginRight: Spacing.sm,
  },
  googleButtonText: {
    color: Colors.darkText,
    fontSize: FontSizes.base,
    fontWeight: '600',
  },
  createButton: {
    flexDirection: 'row',
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.lg,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  createIcon: {
    fontSize: FontSizes.lg,
    marginRight: Spacing.sm,
    color: Colors.white,
  },
  createButtonText: {
    color: Colors.white,
    fontSize: FontSizes.base,
    fontWeight: '600',
  },
  loginLinkContainer: {
    marginTop: Spacing.xl,
    alignItems: 'center',
  },
  loginText: {
    color: Colors.lightText,
    fontSize: FontSizes.base,
  },
  loginTextBold: {
    color: Colors.darkText,
    fontWeight: 'bold',
  },
});

export default WelcomeScreen;
