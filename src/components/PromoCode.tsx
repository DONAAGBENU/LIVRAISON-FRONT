import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface PromoCodeProps {
  onSelect?: (value: string | null) => void;
  selectedOption?: string | null;
  options?: {
    value: string | null;
    label: string;
  }[];
}

const PromoCode = ({ 
  onSelect, 
  selectedOption: propSelectedOption, 
  options: propOptions 
}: PromoCodeProps) => {
  const [internalSelected, setInternalSelected] = useState<string | null>(null);
  const selectedOption = propSelectedOption !== undefined ? propSelectedOption : internalSelected;
  
  const defaultOptions = [
    { label: '1 personne (prix normal)', value: null },
    { label: '2 personnes/couple (2% de réduction)', value: 'COUPLE2' },
    { label: 'Groupe (3% de réduction)', value: 'GROUPE3' },
  ];
  
  const options = propOptions || defaultOptions;

  const handleSelect = (value: string | null) => {
    if (onSelect) {
      onSelect(value);
    } else {
      setInternalSelected(value);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}></Text>
        {options.map((option) => (
          <TouchableOpacity
            key={option.value || 'default'}
            style={[
              styles.optionButton,
              selectedOption === option.value && styles.selectedOption
            ]}
            onPress={() => handleSelect(option.value)}
          >
            <Text style={styles.optionText}>{option.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginVertical: 20,
  },
  innerContainer: {
    width: '100%',
    maxWidth: 400,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#1E3A8A',
    textAlign: 'center',
  },
  optionButton: {
    padding: 16,
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
  },
  selectedOption: {
    borderColor: '#2563EB',
    backgroundColor: '#EFF6FF',
  },
  optionText: {
    color: '#1E293B',
    fontSize: 15,
    textAlign: 'center',
  },
});

export default PromoCode;