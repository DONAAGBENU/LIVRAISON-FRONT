import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { getDeliveries } from '@/services/orderService';
import { ScreenProps } from '@/navigation/types';

const deliveriesData = [
  { id: '1', client: 'Jean Dupont', status: 'Livré', amount: '1500 FCFA' },
  { id: '2', client: 'Marie Martin', status: 'En cours', amount: '1200 FCFA' },
];

type Props = NativeStackScreenProps<RootStackParamList, 'Deliveries'>;

export default function DeliveriesScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Livraisons (18)</Text>
      
      <FlatList
        data={deliveriesData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.deliveryCard}>
            <Text style={styles.client}>{item.client}</Text>
            <View style={styles.row}>
              <Text style={styles.amount}>{item.amount}</Text>
              <View style={[styles.status, { backgroundColor: item.status === 'Livré' ? '#06D6A0' : '#FFD166' }]}>
                <Text style={styles.statusText}>{item.status}</Text>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F8FAFC',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E3A8A',
    marginBottom: 20,
  },
  deliveryCard: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },
  client: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E3A8A',
  },
  status: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
  },
});