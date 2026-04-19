import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ImageBackground, 
  SafeAreaView, 
  Dimensions,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { AuthStackParamList } from '../../navigation/AuthNavigator';
import { Colors, Spacing, FontSizes, BorderRadius } from '../../constants';
import apiService from '../../services/api';

type ForgotPasswordScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'ForgotPassword'>;

interface Props {
  navigation: ForgotPasswordScreenNavigationProp;
}

const { height } = Dimensions.get('window');

const ForgotPasswordScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleResetPassword = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email address');
      return;
    }

    try {
      setIsLoading(true);
      await apiService.forgotPassword(email);
      Alert.alert('Success', 'Password reset link sent to your email.');
      navigation.navigate('Login');
    } catch (error: any) {
      Alert.alert('Error', error?.response?.data?.message || 'Could not process request');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800' }}
        style={styles.backgroundImage}
      >
        <SafeAreaView style={styles.overlay}>
          {/* Top Navbar */}
          <View style={styles.navBar}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <Ionicons name="arrow-back" size={28} color={Colors.white} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.topSpace} />

          {/* Bottom Card */}
          <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.card}
          >
            <Text style={styles.title}>Forgot password?</Text>
            <Text style={styles.subtitle}>Let's Get Started.{"\n"}Fresh food is just a tap away.</Text>
            
            <View style={styles.formContainer}>
              
              {/* Email Input */}
              <View style={styles.inputContainer}>
                <Ionicons name="mail-outline" size={20} color={Colors.lightText} style={{marginRight: Spacing.sm}} />
                <TextInput
                  style={styles.input}
                  placeholder="Email Address"
                  placeholderTextColor={Colors.lightText}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>

              {/* Reset Password Button */}
              <TouchableOpacity 
                style={styles.resetButton}
                onPress={handleResetPassword}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator color={Colors.white} />
                ) : (
                  <Text style={styles.resetButtonText}>Reset password</Text>
                )}
              </TouchableOpacity>

            </View>

            <TouchableOpacity 
              style={styles.registerLinkContainer}
              onPress={() => navigation.navigate('Signup')}
            >
              <Text style={styles.registerText}>
                Don't have an account ? <Text style={styles.registerTextBold}>register</Text>
              </Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
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
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'flex-end',
  },
  navBar: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
  },
  backButton: {
    padding: Spacing.xs,
  },
  backButtonText: {
    color: Colors.white,
    fontSize: FontSizes.h3,
    fontWeight: 'bold',
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
    marginBottom: Spacing.xs,
  },
  subtitle: {
    fontSize: FontSizes.sm,
    color: Colors.lightText,
    marginBottom: Spacing.xl,
    lineHeight: 20,
  },
  formContainer: {
    gap: Spacing.lg,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
    height: 55,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  inputIcon: {
    fontSize: FontSizes.lg,
    marginRight: Spacing.sm,
    color: Colors.lightText,
  },
  input: {
    flex: 1,
    fontSize: FontSizes.base,
    color: Colors.darkText,
    height: '100%',
  },
  resetButton: {
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.lg,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Spacing.sm,
  },
  resetButtonText: {
    color: Colors.white,
    fontSize: FontSizes.base,
    fontWeight: '600',
  },
  registerLinkContainer: {
    marginTop: Spacing.xl,
    alignItems: 'center',
  },
  registerText: {
    color: Colors.lightText,
    fontSize: FontSizes.base,
  },
  registerTextBold: {
    color: Colors.darkText,
    fontWeight: 'bold',
  },
});

export default ForgotPasswordScreen;
