import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Linking,
  ImageBackground,
  SafeAreaView,
  Alert
} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

type RootStackParamList = {
  MenuDetail: { 
    item: {
      id: string;
      title: string;
      price: string;
      description: string;
      composition: string[];
      immediate?: boolean;
      image?: string;
    };
    orderDetails: {
      paymentMethod: string;
      deliveryTime: string;
      reductionOption: string;
    };
  };
};

type MenuDetailScreenRouteProp = RouteProp<RootStackParamList, 'MenuDetail'>;

interface MenuDetailScreenProps {
  route: MenuDetailScreenRouteProp;
  navigation: StackNavigationProp<RootStackParamList, 'MenuDetail'>;
}

const MenuDetailScreen: React.FC<MenuDetailScreenProps> = ({ route, navigation }) => {
  const { item, orderDetails } = route.params;

  const handleWhatsAppOrder = () => {
    const phoneNumber = '+22890582547';
    const message = `Nouvelle commande:\n\n*${item.title}* (${item.price})\n\n` +
      `*Détails de livraison:*\n` +
      `- Paiement: ${orderDetails?.paymentMethod || 'Non spécifié'}\n` +
      `- Délai: ${orderDetails?.deliveryTime || 'Non spécifié'}\n` +
      `- Réduction: ${orderDetails?.reductionOption || 'Aucune'}\n\n` +
      `Description: ${item.description}\n\n` +
      `Composition: ${item.composition.join(', ')}`;
    Linking.openURL(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`);
  };

  const handleEmailOrder = () => {
    const email = 'agbagnof@gmail.com';
    const subject = `Nouvelle commande: ${item.title}`;
    const body = `Détails de la commande:\n\n` +
      `Plat: ${item.title}\n` +
      `Prix: ${item.price}\n\n` +
      `*Options choisies:*\n` +
      `- Paiement: ${orderDetails?.paymentMethod || 'Non spécifié'}\n` +
      `- Livraison: ${orderDetails?.deliveryTime || 'Non spécifié'}\n` +
      `- Réduction: ${orderDetails?.reductionOption || 'Aucune'}\n\n` +
      `Description: ${item.description}\n\n` +
      `Composition:\n• ${item.composition.join('\n• ')}`;
    Linking.openURL(`mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
  };

  const showOrderOptions = () => {
    Alert.alert(
      'Confirmation finale',
      `Vous allez commander *${item.title}* avec:\n` +
      `- Paiement: ${orderDetails?.paymentMethod || 'Non spécifié'}\n` +
      `- Livraison: ${orderDetails?.deliveryTime || 'Non spécifié'}\n` +
      `- Réduction: ${orderDetails?.reductionOption || 'Aucune'}`,
      [
        { text: 'Annuler', style: 'cancel' },
        { text: 'Envoyer par WhatsApp', onPress: handleWhatsAppOrder },
        { text: 'Envoyer par Email', onPress: handleEmailOrder }
      ]
    );
  };

  return (
    <ImageBackground 
      source={{ uri: 'https://images.unsplash.com/photo-1606787366850-de6330128bfc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' }}
      style={styles.backgroundImage}
      blurRadius={2}
    >
      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.container}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>

          <View style={styles.header}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.price}>{item.price}</Text>
            {item.immediate && <Text style={styles.availableNow}>✔ Disponible immédiatement</Text>}
          </View>
          
          <View style={styles.contentBox}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
          
          <View style={styles.contentBox}>
            <Text style={styles.sectionTitle}>Composition</Text>
            <View style={styles.composition}>
              {item.composition.map((ingredient: string, index: number) => (
                <Text key={index} style={styles.ingredient}>• {ingredient}</Text>
              ))}
            </View>
          </View>
          
          <TouchableOpacity style={styles.button} onPress={showOrderOptions}>
            <Text style={styles.buttonText}>Finaliser la commande</Text>
          </TouchableOpacity>
          
          <Text style={styles.note}>Livraison disponible dans un rayon de 5km. Minimum de commande: 2000 FCFA.</Text>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  safeArea: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 20,
    padding: 8,
  },
  header: {
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.2)',
    paddingTop: 40,
  },
  contentBox: {
    backgroundColor: 'rgba(255,255,255,0.85)',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    textShadowColor: 'rgba(0,0,0,0.8)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  price: {
    fontSize: 24,
    color: '#F39C12',
    fontWeight: '600',
    marginVertical: 10,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  availableNow: {
    color: '#2ECC71',
    fontWeight: '600',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
    color: '#2C3E50',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#34495E',
    textAlign: 'justify',
  },
  composition: {
    marginBottom: 10,
  },
  ingredient: {
    fontSize: 16,
    marginLeft: 5,
    marginBottom: 8,
    color: '#34495E',
  },
  button: {
    backgroundColor: '#E67E22',
    padding: 18,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  note: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 20,
    marginBottom: 30,
    textAlign: 'center',
    fontStyle: 'italic',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
});

export default MenuDetailScreen;