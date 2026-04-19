import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView, Dimensions } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from '../../navigation/AuthNavigator';
import { Colors, Spacing, FontSizes, BorderRadius } from '../../constants';

type SplashScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Splash'>;

interface Props {
  navigation: SplashScreenNavigationProp;
}

const { width, height } = Dimensions.get('window');

const SplashScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        
        {/* Top Section */}
        <View style={styles.headerContainer}>
          <Text style={styles.welcomeText}>Welcome to</Text>
          <View style={styles.logoContainer}>
            <Text style={styles.logoBig}>BIG</Text>
            <Text style={styles.logoCart}>CART</Text>
          </View>
          <Text style={styles.subtitle}>Shop Fresh. Eat Healthy. Live Better.</Text>
        </View>

        {/* Center Image Placeholder */}
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1596700889242-4f35e971eb0e?auto=format&fit=crop&q=80&w=800' }} 
            style={styles.image} 
            resizeMode="cover"
          />
        </View>
        
        {/* Bottom Button */}
        <View style={styles.footer}>
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => navigation.navigate('Welcome')}
          >
            <Text style={styles.buttonText}>Get started</Text>
          </TouchableOpacity>
        </View>
        
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    padding: Spacing.xl,
  },
  headerContainer: {
    alignItems: 'center',
    marginTop: height * 0.1,
  },
  welcomeText: {
    fontSize: FontSizes.xxl,
    fontWeight: '700',
    color: Colors.black,
    marginBottom: Spacing.xs,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  logoBig: {
    fontSize: FontSizes.h1,
    fontWeight: '200',
    color: Colors.green || '#81C784', // fallback to a lighter green if needed
  },
  logoCart: {
    fontSize: FontSizes.h1,
    fontWeight: '800',
    color: Colors.primary,
  },
  subtitle: {
    fontSize: FontSizes.sm,
    color: Colors.lightText,
    fontWeight: '400',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: BorderRadius.xl,
  },
  footer: {
    paddingBottom: Spacing.xl,
  },
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.lg,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonText: {
    color: Colors.white,
    fontSize: FontSizes.lg,
    fontWeight: '600',
  },
});

export default SplashScreen;
