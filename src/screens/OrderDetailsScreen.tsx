import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { MaterialIcons } from '@expo/vector-icons';

type Props = NativeStackScreenProps<RootStackParamList, 'OrderDetails'>;

const orderData = {
  id: '#CMD-78945',
  client: 'Jean Dupont',
  phone: '+237 6 12 34 56 78',
  items: [
    { name: 'Poulet DG', quantity: 2, price: '2000 FCFA' },
    { name: 'Jus naturel', quantity: 1, price: '500 FCFA' }
  ],
  total: '4500 FCFA',
  status: 'Livré',
  date: '12/05/2023',
  time: '12:30',
  address: '123 Rue du Commerce, Douala'
};

export default function OrderDetailsScreen({ route }: Props) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.orderId}>{orderData.id}</Text>
        <View style={[styles.statusBadge, { backgroundColor: '#06D6A0' }]}>
          <Text style={styles.statusText}>{orderData.status}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Informations client</Text>
        <View style={styles.infoRow}>
          <MaterialIcons name="person" size={20} color="#1E3A8A" />
          <Text style={styles.infoText}>{orderData.client}</Text>
        </View>
        <View style={styles.infoRow}>
          <MaterialIcons name="phone" size={20} color="#1E3A8A" />
          <Text style={styles.infoText}>{orderData.phone}</Text>
        </View>
        <View style={styles.infoRow}>
          <MaterialIcons name="place" size={20} color="#1E3A8A" />
          <Text style={styles.infoText}>{orderData.address}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Détails de la commande</Text>
        {orderData.items.map((item, index) => (
          <View key={index} style={styles.itemRow}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemQuantity}>x{item.quantity}</Text>
            <Text style={styles.itemPrice}>{item.price}</Text>
          </View>
        ))}
      </View>

      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total:</Text>
        <Text style={styles.totalAmount}>{orderData.total}</Text>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Commandé le {orderData.date} à {orderData.time}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  orderId: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E3A8A',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  statusText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E3A8A',
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoText: {
    marginLeft: 10,
    fontSize: 15,
    color: '#1E293B',
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  itemName: {
    flex: 2,
    fontSize: 14,
    color: '#1E293B',
  },
  itemQuantity: {
    flex: 1,
    textAlign: 'center',
    fontSize: 14,
    color: '#64748B',
  },
  itemPrice: {
    flex: 1,
    textAlign: 'right',
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1E3A8A',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 2,
  },
  totalText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E3A8A',
  },
  footer: {
    marginTop: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#64748B',
  },
});