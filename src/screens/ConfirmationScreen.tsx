import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'Confirmation'>;

export default function ConfirmationScreen({ navigation, route }: Props) {
  const {
    deliveryTime = "30 minutes",
    reductionOption = "1 personne",
    paymentMethod = "T-Money",
    orderNumber = generateOrderNumber()
  } = route.params;

  function generateOrderNumber() {
    return `CMD-${Math.floor(100000 + Math.random() * 900000)}`;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <MaterialIcons name="check-circle" size={80} color="#4CAF50" />
        <Text style={styles.title}>Commande confirmée !</Text>
        <Text style={styles.orderNumber}>N° {orderNumber}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Résumé de votre commande</Text>
        
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Délai de livraison:</Text>
          <Text style={styles.detailValue}>{deliveryTime}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Option:</Text>
          <Text style={styles.detailValue}>{reductionOption}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Paiement:</Text>
          <Text style={styles.detailValue}>{paymentMethod}</Text>
        </View>
      </View>

      <View style={styles.timerContainer}>
        <Text style={styles.timerText}>Votre commande arrivera dans</Text>
        <Text style={styles.timer}>{deliveryTime}</Text>
      </View>

      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.replace('Home')}
      >
        <Text style={styles.buttonText}>Retour à l'accueil</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  header: {
    alignItems: 'center',
    marginVertical: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 15,
    color: '#1E3A8A',
  },
  orderNumber: {
    fontSize: 16,
    color: '#64748B',
    marginTop: 5,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#1E3A8A',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  detailLabel: {
    fontSize: 16,
    color: '#64748B',
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
  },
  timerContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  timerText: {
    fontSize: 16,
    color: '#64748B',
  },
  timer: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1E3A8A',
    marginTop: 5,
  },
  button: {
    backgroundColor: '#1E3A8A',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});