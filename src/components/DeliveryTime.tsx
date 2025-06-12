import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface DeliveryTimeProps {
  onSelect: (time: string | null) => void;
  selectedTime: string | null;
  options?: {
    value: string;
    label: string;
  }[];
}

const DeliveryTime = ({ onSelect, selectedTime, options }: DeliveryTimeProps) => {
  const deliveryTimes = options || [
    { label: '30 minutes', value: '30min' },
    { label: '1 heure', value: '1h' },
    { label: '2 heures', value: '2h' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}></Text>
        {deliveryTimes.map((time) => (
          <TouchableOpacity
            key={time.value}
            style={[
              styles.timeButton,
              selectedTime === time.value && styles.selectedTime
            ]}
            onPress={() => onSelect(time.value)}
          >
            <Text style={styles.timeText}>{time.label}</Text>
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
  timeButton: {
    padding: 16,
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
  },
  selectedTime: {
    borderColor: '#2563EB',
    backgroundColor: '#EFF6FF',
  },
  timeText: {
    color: '#1E293B',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default DeliveryTime;