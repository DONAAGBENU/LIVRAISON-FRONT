import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

const allOrders = [
  { id: '#12345', client: 'Jean Dupont', status: 'Livré', amount: '4500 FCFA', date: '15/03/2023' },
  { id: '#12346', client: 'Marie Martin', status: 'En cours', amount: '3200 FCFA', date: '16/03/2023' },
  { id: '#12347', client: 'Pierre Durand', status: 'Préparation', amount: '2800 FCFA', date: '17/03/2023' },
  { id: '#12348', client: 'Amina Sow', status: 'Livré', amount: '3800 FCFA', date: '18/03/2023' },
];

type Props = NativeStackScreenProps<RootStackParamList, 'OrdersList'>;

export default function OrdersListScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Toutes les commandes</Text>
      
      <FlatList
        data={allOrders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.orderCard}>
            <View style={styles.orderHeader}>
              <Text style={styles.orderId}>{item.id}</Text>
              <Text style={styles.orderDate}>{item.date}</Text>
            </View>
            <Text style={styles.client}>{item.client}</Text>
            <View style={styles.orderFooter}>
              <Text style={styles.amount}>{item.amount}</Text>
              <View style={[
                styles.status,
                { 
                  backgroundColor: item.status === 'Livré' ? '#06D6A0' : 
                                  item.status === 'En cours' ? '#FFD166' : '#E0E0E0' 
                }
              ]}>
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
  orderCard: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 2,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  orderId: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: 'bold',
  },
  orderDate: {
    fontSize: 14,
    color: '#64748B',
  },
  client: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 10,
  },
  orderFooter: {
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
    color: '#1E293B',
  },
});