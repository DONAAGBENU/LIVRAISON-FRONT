import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'NewOrder'>;

// Type pour une commande
type Order = {
  id: string;
  clientName: string;
  phone: string;
  email: string;
  details: string;
  date: string;
};

export default function NewOrderScreen({ navigation, route }: Props) {
  const [clientName, setClientName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [orderDetails, setOrderDetails] = useState('');

  const handleSubmit = () => {
    if (!clientName || !phone || !orderDetails) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs obligatoires');
      return;
    }

    // Validation basique de l'email
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      Alert.alert('Erreur', 'Veuillez entrer un email valide');
      return;
    }

    // Validation du numéro de téléphone
    if (!/^[0-9]{10,15}$/.test(phone)) {
      Alert.alert('Erreur', 'Numéro de téléphone invalide');
      return;
    }

    // Création de la nouvelle commande
    const newOrder: Order = {
      id: Date.now().toString(),
      clientName,
      phone,
      email,
      details: orderDetails,
      date: new Date().toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
    };

    // Passer la nouvelle commande à la page Home
    navigation.navigate('Home', { newOrder });

    Alert.alert('Succès', 'Commande créée avec succès!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nouvelle commande</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Nom du client *"
        value={clientName}
        onChangeText={setClientName}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Téléphone *"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />
      
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      
      <TextInput
        style={[styles.input, styles.detailsInput]}
        placeholder="Détails de la commande *"
        value={orderDetails}
        onChangeText={setOrderDetails}
        multiline
      />
      
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>Enregistrer</Text>
      </TouchableOpacity>
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
  input: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 2,
  },
  detailsInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#1E3A8A',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  submitText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});