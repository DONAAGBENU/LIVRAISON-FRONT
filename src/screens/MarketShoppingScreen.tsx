import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

const marketData = [
  { id: '1', items: '10 articles', date: 'Aujourd\'hui', amount: '7500 FCFA' },
  { id: '2', items: '8 articles', date: 'Hier', amount: '6200 FCFA' },
];

type Props = NativeStackScreenProps<RootStackParamList, 'MarketShopping'>;

export default function MarketShoppingScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Courses marché (10)</Text>
      
      <FlatList
        data={marketData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.marketCard}>
            <Text style={styles.items}>{item.items}</Text>
            <View style={styles.row}>
              <Text style={styles.date}>{item.date}</Text>
              <Text style={styles.amount}>{item.amount}</Text>
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
  marketCard: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },
  items: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  date: {
    fontSize: 14,
    color: '#64748B',
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#A78BFA',
  },
});