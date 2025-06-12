import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  ScrollView,
  ImageBackground,
  ActivityIndicator
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { login } from '@/services/api';
import RNPickerSelect from 'react-native-picker-select';


import GoogleLogin from '@/components/GoogleLoginButton';  
import FacebookLogin from '@/components/FacebookLoginButton';
import PhoneLogin from '@/components/PhoneLogin';


 




type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const countryCodes = [
  { label: '🇩🇿 Algérie (+213)', value: '+213' },
  { label: '🇧🇯 Bénin (+229)', value: '+229' },
  { label: '🇧🇼 Botswana (+267)', value: '+267' },
  { label: '🇧🇫 Burkina Faso (+226)', value: '+226' },
  { label: '🇧🇮 Burundi (+257)', value: '+257' },
  { label: '🇨🇲 Cameroun (+237)', value: '+237' },
  { label: '🇨🇻 Cap-Vert (+238)', value: '+238' },
  { label: '🇨🇫 Centrafrique (+236)', value: '+236' },
  { label: '🇹🇩 Tchad (+235)', value: '+235' },
  { label: '🇰🇲 Comores (+269)', value: '+269' },
  { label: '🇨🇬 Congo (+242)', value: '+242' },
  { label: '🇨🇩 RDC (+243)', value: '+243' },
  { label: '🇨🇮 Côte d\'Ivoire (+225)', value: '+225' },
  { label: '🇩🇯 Djibouti (+253)', value: '+253' },
  { label: '🇪🇬 Égypte (+20)', value: '+20' },
  { label: '🇬🇶 Guinée Équatoriale (+240)', value: '+240' },
  { label: '🇪🇷 Érythrée (+291)', value: '+291' },
  { label: '🇸🇿 Eswatini (+268)', value: '+268' },
  { label: '🇪🇹 Éthiopie (+251)', value: '+251' },
  { label: '🇬🇦 Gabon (+241)', value: '+241' },
  { label: '🇬🇲 Gambie (+220)', value: '+220' },
  { label: '🇬🇭 Ghana (+233)', value: '+233' },
  { label: '🇬🇳 Guinée (+224)', value: '+224' },
  { label: '🇬🇼 Guinée-Bissau (+245)', value: '+245' },
  { label: '🇰🇪 Kenya (+254)', value: '+254' },
  { label: '🇱🇸 Lesotho (+266)', value: '+266' },
  { label: '🇱🇷 Liberia (+231)', value: '+231' },
  { label: '🇱🇾 Libye (+218)', value: '+218' },
  { label: '🇲🇬 Madagascar (+261)', value: '+261' },
  { label: '🇲🇼 Malawi (+265)', value: '+265' },
  { label: '🇲🇱 Mali (+223)', value: '+223' },
  { label: '🇲🇷 Mauritanie (+222)', value: '+222' },
  { label: '🇲🇺 Maurice (+230)', value: '+230' },
  { label: '🇾🇹 Mayotte (+262)', value: '+262' },
  { label: '🇲🇦 Maroc (+212)', value: '+212' },
  { label: '🇲🇿 Mozambique (+258)', value: '+258' },
  { label: '🇳🇦 Namibie (+264)', value: '+264' },
  { label: '🇳🇪 Niger (+227)', value: '+227' },
  { label: '🇳🇬 Nigeria (+234)', value: '+234' },
  { label: '🇷🇪 Réunion (+262)', value: '+262' },
  { label: '🇷🇼 Rwanda (+250)', value: '+250' },
  { label: '🇸🇹 Sao Tomé-et-Principe (+239)', value: '+239' },
  { label: '🇸🇳 Sénégal (+221)', value: '+221' },
  { label: '🇸🇨 Seychelles (+248)', value: '+248' },
  { label: '🇸🇱 Sierra Leone (+232)', value: '+232' },
  { label: '🇸🇴 Somalie (+252)', value: '+252' },
  { label: '🇿🇦 Afrique du Sud (+27)', value: '+27' },
  { label: '🇸🇸 Soudan du Sud (+211)', value: '+211' },
  { label: '🇸🇩 Soudan (+249)', value: '+249' },
  { label: '🇹🇿 Tanzanie (+255)', value: '+255' },
  { label: '🇹🇬 Togo (+228)', value: '+228' },
  { label: '🇹🇳 Tunisie (+216)', value: '+216' },
  { label: '🇺🇬 Ouganda (+256)', value: '+256' },
  { label: '🇪🇭 Sahara Occidental (+212)', value: '+212' },
  { label: '🇿🇲 Zambie (+260)', value: '+260' },
  { label: '🇿🇼 Zimbabwe (+263)', value: '+263' },
];

export default function LoginScreen({ navigation }: Props) {
  const [loginMethod, setLoginMethod] = useState<'email' | 'phone'>('email');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+237');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Nettoyage de l'intervalle
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // Gestion de la navigation après chargement
  useEffect(() => {
    if (progress >= 100) {
      setIsLoading(false);
      setTimeout(() => navigation.replace('Home'), 100);
    }
  }, [progress, navigation]);

  const startProgressBar = () => {
    setIsLoading(true);
    setProgress(0);
    const duration = 3000; // 3 secondes
    const interval = 100;
    const increment = 100 / (duration / interval);

    intervalRef.current = setInterval(() => {
      setProgress(prev => Math.min(prev + increment, 100));
    }, interval);
  };

  const handleLogin = () => {
    // Validation
    if (loginMethod === 'email') {
      if (!email.trim() || !password.trim()) {
        setError('Veuillez remplir tous les champs');
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setError('Email invalide');
        return;
      }
    } else {
      if (!phone.trim()) {
        setError('Veuillez entrer votre numéro de téléphone');
        return;
      }
      if (!/^\d{8,15}$/.test(phone)) {
        setError('Numéro invalide');
        return;
      }
    }

    if (loginMethod === 'email' && password.length < 6) {
      setError('Mot de passe trop court (min 6 caractères)');
      return;
    }

    setError('');
    startProgressBar();
  };

  const handleSocialLogin = (provider: string) => {
    setError('');
    startProgressBar();
  };

  return (
    <ImageBackground
      source={{ uri: 'https://images.unsplash.com/photo-1741018605802-e394cf20a435?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDc4fGJvOGpRS1RhRTBZfHxlbnwwfHx8fHw%3D' }}
      style={styles.backgroundImage}
      onLoadEnd={() => setImageLoaded(true)}
      resizeMode="cover"
    >
      {!imageLoaded && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#1E3A8A" />
        </View>
      )}

      <ScrollView 
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.content}>
          <Text style={styles.title}>Connexion</Text>

          <View style={styles.loginMethodSelector}>
            <TouchableOpacity
              style={[styles.methodButton, loginMethod === 'email' && styles.activeMethod]}
              onPress={() => setLoginMethod('email')}
            >
              <Text style={[styles.methodText, loginMethod === 'email' && styles.activeMethodText]}>Email</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.methodButton, loginMethod === 'phone' && styles.activeMethod]}
              onPress={() => setLoginMethod('phone')}
            >
              <Text style={[styles.methodText, loginMethod === 'phone' && styles.activeMethodText]}>Téléphone</Text>
            </TouchableOpacity>
          </View>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          {loginMethod === 'email' ? (
            <>
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#999"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <TextInput
                style={styles.input}
                placeholder="Mot de passe"
                placeholderTextColor="#999"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </>
          ) : (
            <View style={styles.phoneInputContainer}>
              <View style={styles.countryCodeContainer}>
                <RNPickerSelect
                  onValueChange={setCountryCode}
                  items={countryCodes}
                  value={countryCode}
                  style={pickerSelectStyles}
                  placeholder={{}}
                  useNativeAndroidPickerStyle={false}
                />
              </View>
              <TextInput
                style={[styles.input, styles.phoneInput]}
                placeholder="Numéro"
                placeholderTextColor="#999"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
              />
            </View>
          )}

          {isLoading && (
            <View style={styles.progressContainer}>
              <View style={[styles.progressBar, { width: `${progress}%` }]} />
              <Text style={styles.progressText}>{Math.round(progress)}%</Text>
            </View>
          )}

          <TouchableOpacity 
            style={[styles.button, (isLoading || (loginMethod === 'email' ? (!email || !password) : !phone)) && styles.disabledButton]} 
            onPress={handleLogin}
            disabled={isLoading}
          >
            <Text style={styles.buttonText}>
              {isLoading ? 'Connexion...' : 'Se connecter'}
            </Text>
          </TouchableOpacity>

          <Text style={styles.orText}>──────── OU ────────</Text>

          <View style={styles.socialButtonsContainer}>
            <TouchableOpacity 
              style={[styles.socialButton, styles.facebookButton]}
              onPress={() => handleSocialLogin('facebook')}
              disabled={isLoading}
            >
              <FontAwesome name="facebook" size={20} color="white" />
              <Text style={styles.socialButtonText}>Facebook</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.socialButton, styles.googleButton]}
              onPress={() => handleSocialLogin('google')}
              disabled={isLoading}
            >
              <FontAwesome name="google" size={20} color="white" />
              <Text style={styles.socialButtonText}>Google</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.navigate('Welcome')}
          >
            <Text style={styles.backButtonText}>Retour</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    color: 'black',
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    color: 'black',
  },
});

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  content: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1E3A8A',
    marginBottom: 25,
    textAlign: 'center',
  },
  loginMethodSelector: {
    flexDirection: 'row',
    marginBottom: 20,
    width: '100%',
    justifyContent: 'space-between',
  },
  methodButton: {
    width: '48%',
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#EDF2F7',
    alignItems: 'center',
  },
  activeMethod: {
    backgroundColor: '#1E3A8A',
  },
  methodText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4A5568',
  },
  activeMethodText: {
    color: 'white',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    marginBottom: 15,
    paddingLeft: 15,
    fontSize: 16,
    color: '#1E293B',
  },
  phoneInputContainer: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 15,
  },
  countryCodeContainer: {
    width: '30%',
    marginRight: 10,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    justifyContent: 'center',
  },
  phoneInput: {
    flex: 1,
  },
  button: {
    backgroundColor: '#1E3A8A',
    paddingVertical: 15,
    borderRadius: 8,
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#CBD5E1',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  errorText: {
    color: '#E53E3E',
    marginBottom: 15,
    textAlign: 'center',
    width: '100%',
    backgroundColor: '#FEE2E2',
    padding: 10,
    borderRadius: 5,
  },
  progressContainer: {
    height: 20,
    width: '100%',
    backgroundColor: '#EDF2F7',
    borderRadius: 10,
    marginTop: 10,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#38A169',
    borderRadius: 10,
    position: 'absolute',
    left: 0,
  },
  progressText: {
    color: '#1A202C',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 12,
  },
  orText: {
    color: '#718096',
    marginVertical: 20,
    fontSize: 14,
    textAlign: 'center',
  },
  socialButtonsContainer: {
    width: '100%',
    marginBottom: 15,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 8,
    marginBottom: 10,
    width: '100%',
  },
  facebookButton: {
    backgroundColor: '#3B5998',
  },
  googleButton: {
    backgroundColor: '#DB4437',
  },
  socialButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
  },
  backButton: {
    alignSelf: 'center',
    padding: 10,
  },
  backButtonText: {
    color: '#1E3A8A',
    fontSize: 16,
    fontWeight: '600',
  },
});