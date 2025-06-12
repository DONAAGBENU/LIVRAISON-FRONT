import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const notifications = [
  {
    id: '1',
    title: 'Nouvelle commande',
    message: 'Commande #CMD-78948 reçue',
    time: 'Il y a 10 min',
    read: false
  },
  {
    id: '2',
    title: 'Livraison effectuée',
    message: 'La commande #CMD-78945 a été livrée',
    time: 'Il y a 2 heures',
    read: true
  },
  {
    id: '3',
    title: 'Stock faible',
    message: 'Le stock de Poulet DG est presque épuisé',
    time: 'Il y a 1 jour',
    read: true
  },
];

export default function NotificationsScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notifications</Text>
        <TouchableOpacity>
          <Text style={styles.markAllText}>Tout marquer comme lu</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={notifications}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={[styles.notificationCard, !item.read && styles.unreadCard]}>
            <View style={styles.notificationIcon}>
              <MaterialIcons 
                name={item.title.includes('commande') ? 'shopping-cart' : 'info'} 
                size={24} 
                color={!item.read ? '#1E3A8A' : '#64748B'} 
              />
            </View>
            <View style={styles.notificationContent}>
              <Text style={[styles.notificationTitle, !item.read && styles.unreadText]}>{item.title}</Text>
              <Text style={styles.notificationMessage}>{item.message}</Text>
              <Text style={styles.notificationTime}>{item.time}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    padding: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1E3A8A',
  },
  markAllText: {
    color: '#1E3A8A',
    fontSize: 14,
  },
  notificationCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    elevation: 1,
  },
  unreadCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#1E3A8A',
  },
  notificationIcon: {
    marginRight: 15,
    justifyContent: 'center',
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#64748B',
    marginBottom: 5,
  },
  unreadText: {
    color: '#1E3A8A',
  },
  notificationMessage: {
    fontSize: 14,
    color: '#1E293B',
    marginBottom: 5,
  },
  notificationTime: {
    fontSize: 12,
    color: '#64748B',
  },
});