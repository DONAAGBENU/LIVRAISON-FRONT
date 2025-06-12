import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Revenue'>;

export default function RevenueScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Revenus</Text>
      <Text style={styles.amount}>3 240 FCFA</Text>
      <Text style={styles.subtitle}>Ce mois-ci</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E3A8A',
    marginBottom: 10,
  },
  amount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFD166',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748B',
  },
});