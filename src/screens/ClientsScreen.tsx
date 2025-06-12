import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import api from '@/services/api';

type Client = {
  id: number;
  name: string;
  email: string;
  phone: string;
  auth_provider: string;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Clients'>;

const ClientsScreen = ({ navigation }: Props) => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [clientCount, setClientCount] = useState(0);

  useEffect(() => {
    api.get('/clients')
      .then(res => {
        setClients(res.data);
        setClientCount(res.data.length);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Clients ({clientCount})</Text>
      
      <FlatList
        data={clients}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.clientCard}>
            <Text style={styles.clientName}>{item.name}</Text>
            <Text style={styles.clientInfo}>Email: {item.email}</Text>
            <Text style={styles.clientInfo}>Téléphone: {item.phone}</Text>
            <Text style={styles.clientInfo}>Méthode: {item.auth_provider}</Text>
          </View>
        )}
      />
    </View>
  );
};

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
  clientCard: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },
  clientName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
  },
  clientInfo: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 5,
  },
});

export default ClientsScreen;