import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

type PaymentMethod = 'Mixx by Yas ' | 'Flooz' | 'Carte Bancaire' | 'Espèces';

interface PaymentMethodsProps {
  onSelect: (method: PaymentMethod | null) => void;
  selectedMethod: string | null;
  options?: {
    id: string;
    label: string;
    icon: string;
  }[];
}

const PaymentMethods = ({ onSelect, selectedMethod, options }: PaymentMethodsProps) => {
  // Méthodes de paiement par défaut avec les 4 options
  const defaultMethods: PaymentMethod[] = ['Mixx by Yas ', 'Flooz', 'Carte Bancaire', 'Espèces'];
  
  // Utilise les options fournies ou les méthodes par défaut
  const methods = options 
    ? options.map(opt => opt.label as PaymentMethod)
    : defaultMethods;

  return (
    <View style={styles.container}>
      {methods.map((method) => (
        <TouchableOpacity
          key={method}
          style={[
            styles.methodButton,
            selectedMethod === method && styles.selectedMethod
          ]}
          onPress={() => onSelect(method)}
        >
          <Text style={styles.methodText}>{method}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  methodButton: {
    padding: 14,
    backgroundColor: '#F1F5F9',
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  selectedMethod: {
    borderColor: '#1E3A8A',
    backgroundColor: '#DBEAFE',
  },
  methodText: {
    color: '#1E293B',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default PaymentMethods;