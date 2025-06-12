import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  ImageBackground,
  ActivityIndicator 
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Welcome'>;

export default function WelcomeScreen({ navigation }: Props) {
  const [imageLoaded, setImageLoaded] = React.useState(false);

  return (
    <ImageBackground 
      source={{ uri: 'https://plus.unsplash.com/premium_photo-1672199330058-adb7cae5eeda?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }}
      style={styles.backgroundImage}
      onLoadEnd={() => setImageLoaded(true)}
      resizeMode="cover"
      blurRadius={0} // Désactive tout flou potentiel
    >
      {!imageLoaded && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FF6347" />
        </View>
      )}
      
      <View style={styles.overlay}>
        <View style={styles.content}>
          <MaterialIcons 
            name="restaurant" // Icône plus appropriée
            size={100} // Taille légèrement augmentée
            color="white" 
            style={styles.icon} 
          />
          
          <Text style={styles.welcomeText}>Bienvenue !</Text>
          <Text style={styles.subtitle}>Découvrez une expérience culinaire exceptionnelle et autres services pas comme les autres</Text>

          <TouchableOpacity 
            style={styles.orderButton} 
            onPress={() => navigation.navigate('Login')}
            activeOpacity={0.7}
          >
            <Text style={styles.buttonText}>Commencer</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%', // Ajouté pour couvrir tout l'écran
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.35)', // Opacité légèrement réduite pour mieux voir l'image
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5', // Fond plus neutre pendant le chargement
  },
  content: {
    alignItems: 'center',
    padding: 25, // Padding augmenté
    width: '90%',
    maxWidth: 400,
    borderRadius: 15, // Bords arrondis
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fond semi-transparent pour le contenu
  },
  icon: {
    marginBottom: 25,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  welcomeText: {
    fontSize: 38, // Taille augmentée
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 15,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.7)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  subtitle: {
    fontSize: 22, // Taille augmentée
    color: 'white',
    marginBottom: 40,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
    lineHeight: 28, // Meilleure lisibilité
  },
  orderButton: {
    backgroundColor: '#FF6347',
    paddingHorizontal: 45, // Légèrement plus large
    paddingVertical: 16,
    borderRadius: 30,
    elevation: 8, // Ombre plus prononcée
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 20, // Taille augmentée
    fontWeight: 'bold', // Plus épais
    letterSpacing: 0.5, // Espacement amélioré
  },
});