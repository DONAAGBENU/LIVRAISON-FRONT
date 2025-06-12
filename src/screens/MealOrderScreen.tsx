import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import PaymentMethods from '../components/PaymentMethods';
import DeliveryTime from '../components/DeliveryTime';
import PromoCode from '@/components/PromoCode';
import { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'MealOrder'>;

export default function MealOrderScreen({ navigation }: Props) {
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedPromo, setSelectedPromo] = useState<string | null>('none');

  const handleConfirmOrder = () => {
    if (!selectedPayment || !selectedTime) {
      Alert.alert('Erreur', 'Veuillez sélectionner un mode de paiement et un délai de livraison');
      return;
    }

    navigation.navigate('MenuList', {
      paymentMethod: selectedPayment,
      deliveryTime: selectedTime,
      reductionOption:
        selectedPromo === 'couple'
          ? '2 personnes/couple (2% de réduction)'
          : selectedPromo === 'group'
          ? 'Groupe (3% de réduction)'
          : '1 personne (prix normal)',
    });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.title}>Commander un repas</Text>
      <Text style={styles.subtitle}>24 commandes ce mois</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Méthode de paiement</Text>
        <PaymentMethods
          onSelect={setSelectedPayment}
          selectedMethod={selectedPayment}
          options={[
            { id: ' Mixx By Yas', label: 'Mixx By Yas', icon: 'mobile' },
            { id: 'Flooz', label: 'Flooz', icon: 'mobile' },
            { id: 'card', label: 'Carte Bancaire', icon: 'credit-card' },
            { id: 'cash', label: 'Espèces', icon: 'money-bill-wave' },
          ]}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Délai de livraison</Text>
        <DeliveryTime
          onSelect={setSelectedTime}
          selectedTime={selectedTime}
          options={[
            { value: '30 minutes', label: '30 minutes' },
            { value: '1 heure', label: '1 heure' },
            { value: '2 heures', label: '2 heures' },
          ]}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Options de réduction</Text>
        <PromoCode
          onSelect={setSelectedPromo}
          selectedOption={selectedPromo}
          options={[
            { value: 'none', label: '1 personne (prix normal)' },
            { value: 'couple', label: '2 personnes/couple (2% de réduction)' },
            { value: 'group', label: 'Groupe (3% de réduction)' },
          ]}
        />
      </View>

      <TouchableOpacity
        style={[
          styles.confirmButton,
          (!selectedPayment || !selectedTime) && styles.disabledButton,
        ]}
        onPress={handleConfirmOrder}
        disabled={!selectedPayment || !selectedTime}
      >
        <Text style={styles.confirmButtonText}>Confirmer la commande</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E3A8A',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748B',
    marginBottom: 20,
  },
  section: {
    marginBottom: 25,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E3A8A',
    marginBottom: 15,
  },
  confirmButton: {
    backgroundColor: '#1E3A8A',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  disabledButton: {
    backgroundColor: '#CBD5E0',
    opacity: 0.7,
  },
  confirmButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
