import React from 'react';
import { View, Text, StyleSheet, FlatList, ImageBackground } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

const servicesData = [
  { id: '1', name: 'Nettoyage', amount: '5000 FCFA' },
  { id: '2', name: 'Garde d\'enfant', amount: '3000 FCFA' },
  { id: '3', name: 'Organisation fêtes d\'anniversaire de A à Z', amount: 'Apartir de 25000 FCFA' },
  { id: '4', name: 'Organisation mariage de A à Z', amount: 'Apartir de 150000 FCFA' },
  { id: '5', name: 'Livraison dans votre pays de résidence', amount: '30000 FCFA' },
  { id: '6', name: 'Gestion de votre entreprise', amount: 'Apartir de 50000 FCFA/mois' },
  { id: '7', name: 'Résolution de problèmes de couple', amount: '20000 FCFA/session' },
  { id: '8', name: 'Coaching personnel/professionnel', amount: '15000 FCFA/séance' },
  { id: '9', name: 'Préparation du dîner familial', amount: '8000 FCFA/repas' },
  { id: '10', name: 'Location de voiture', amount: 'Apartir de 20000 FCFA/jour' },
];

type Props = NativeStackScreenProps<RootStackParamList, 'OtherServices'>;

export default function OtherServicesScreen({ navigation }: Props) {
  return (
    <ImageBackground
      source={{ uri: 'https://images.unsplash.com/photo-1600891963934-74b9f99e2e0c?auto=format&fit=crop&w=1050&q=80' }}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Autres services</Text>
        <FlatList
          data={servicesData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.serviceCard}>
              <Text style={styles.serviceName}>{item.name}</Text>
              <View style={styles.row}>
                <Text style={styles.amount}>{item.amount}</Text>
              </View>
            </View>
          )}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.85)', // semi-transparence pour lisibilité
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E3A8A',
    marginBottom: 20,
  },
  serviceCard: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },
  serviceName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#F472B6',
  },
});
