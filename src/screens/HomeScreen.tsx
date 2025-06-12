import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Animated } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { MaterialIcons, FontAwesome5, Ionicons } from '@expo/vector-icons';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const stats = [
  { title: 'Commander un repas', value: '24', icon: 'fastfood', color: '#FF6B6B', iconLib: MaterialIcons, screen: 'MealOrder' },
  { title: 'Clients', value: '156', icon: 'users', color: '#4ECDC4', iconLib: FontAwesome5, screen: 'Clients' },
   
  { title: 'Livraisons', value: '18', icon: 'motorcycle', color: '#06D6A0', iconLib: MaterialIcons, screen: 'Deliveries' },
   
  { title: 'Autres services', value: '5', icon: 'more-horiz', color: '#F472B6', iconLib: MaterialIcons, screen: 'OtherServices' },
];

const recentOrders = [
  { id: '#CMD-78945', client: 'Jean Dupont', items: 'Poulet DG, Jus naturel', time: '12:30', status: 'Livré', amount: '4500 FCFA' },
  { id: '#CMD-78946', client: 'Marie Martin', items: 'Poisson braisé, Eau minérale', time: '13:15', status: 'En cours', amount: '3200 FCFA' },
  { id: '#CMD-78947', client: 'Pierre Durand', items: 'Ndolè, Plantain', time: '14:00', status: 'Préparation', amount: '2800 FCFA' },
];

export default function HomeScreen({ navigation }: Props) {
  const [currentDate] = useState(new Date().toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  }));

  const scrollY = useRef(new Animated.Value(0)).current;

  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, 120],
    outputRange: [0, -180],
    extrapolate: 'clamp',
  });

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 60],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.headerWrapper, {
        transform: [{ translateY: headerTranslateY }],
        opacity: headerOpacity
      }]}>
        <ImageBackground
          source={{ uri: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' }}
          style={styles.header}
          imageStyle={styles.headerImage}
        >
          <View style={styles.headerContent}>
            <View>
              <Text style={styles.headerTitle}>Tableau de bord</Text>
              <Text style={styles.date}>{currentDate}</Text>
            </View>
            <View style={styles.headerIcons}>
              <TouchableOpacity
                style={styles.notificationButton}
                onPress={() => navigation.navigate('Notifications')}
              >
                <Ionicons name="notifications" size={24} color="white" />
                <View style={styles.notificationBadge}>
                  <Text style={styles.notificationText}>3</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <MaterialIcons name="logout" size={24} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </Animated.View>

      <Animated.ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      >
        <View style={styles.statsContainer}>
          {stats.map((stat, index) => {
            const IconComponent = stat.iconLib;
            return (
              <TouchableOpacity
                key={index}
                style={[styles.statCard, { backgroundColor: stat.color }]}
                activeOpacity={0.8}
                onPress={() => navigation.navigate(stat.screen as keyof RootStackParamList)}
              >
                <View style={styles.statIconContainer}>
                  <IconComponent name={stat.icon} size={28} color="white" />
                </View>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statTitle}>{stat.title}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Actions rapides */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Actions rapides</Text>
          <View style={styles.actionsContainer}>
            <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#FFD700' }]} onPress={() => navigation.navigate('NewOrder')}>
              <MaterialIcons name="add-circle" size={28} color="#1E3A8A" />
              <Text style={[styles.actionText, { color: '#1E3A8A' }]}>Nouvelle commande</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#1E3A8A' }]} onPress={() => navigation.navigate('MenuList')}>
              <MaterialIcons name="restaurant-menu" size={28} color="white" />
              <Text style={[styles.actionText, { color: 'white' }]}>Voir le menu</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionButton, { backgroundColor: 'white' }]} onPress={() => navigation.navigate('Inventory')}>
              <MaterialIcons name="inventory" size={28} color="#1E3A8A" />
              <Text style={[styles.actionText, { color: '#1E3A8A' }]}>Inventaire</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#1E3A8A' }]} onPress={() => navigation.navigate('Reports')}>
              <MaterialIcons name="assessment" size={28} color="white" />
              <Text style={[styles.actionText, { color: 'white' }]}>Rapports</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Commandes récentes */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Commandes récentes</Text>
            <TouchableOpacity onPress={() => navigation.navigate('OrdersList')} style={styles.seeAllButton}>
              <Text style={styles.seeAllText}>Voir tout</Text>
              <MaterialIcons name="chevron-right" size={20} color="#1E3A8A" />
            </TouchableOpacity>
          </View>
          {recentOrders.map((order, index) => (
            <TouchableOpacity
              key={index}
              style={styles.orderCard}
              onPress={() => navigation.navigate('OrderDetails', { orderId: order.id })}
            >
              <View style={styles.orderHeader}>
                <Text style={styles.orderId}>{order.id}</Text>
                <Text style={styles.orderTime}>{order.time}</Text>
              </View>
              <Text style={styles.orderClient}>{order.client}</Text>
              <Text style={styles.orderItems}>{order.items}</Text>
              <View style={styles.orderFooter}>
                <Text style={styles.orderAmount}>{order.amount}</Text>
                <View style={[
                  styles.statusBadge,
                  {
                    backgroundColor:
                      order.status === 'Livré' ? '#06D6A0' :
                        order.status === 'En cours' ? '#FFD166' : '#E0E0E0'
                  }
                ]}>
                  <Text style={styles.statusText}>{order.status}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  headerWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  header: {
    height: 180,
    paddingTop: 50,
    paddingHorizontal: 20,
    justifyContent: 'flex-end',
  },
  headerImage: {
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  date: {
    fontSize: 16,
    color: 'white',
    opacity: 0.9,
    marginTop: 5,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationButton: {
    position: 'relative',
    padding: 10,
    marginRight: 10,
  },
  notificationBadge: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: '#FF4757',
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    marginTop: 180,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 15,
    marginTop: 10,
  },
  statCard: {
    width: '48%',
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statIconContainer: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  statValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    marginVertical: 5,
  },
  statTitle: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
    opacity: 0.9,
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    marginHorizontal: 15,
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E3A8A',
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seeAllText: {
    color: '#1E3A8A',
    fontSize: 14,
    marginRight: 5,
  },
  actionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionButton: {
    width: '48%',
    padding: 15,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  actionText: {
    marginLeft: 10,
    fontWeight: '600',
    fontSize: 15,
  },
  orderCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#1E3A8A',
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  orderId: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748B',
  },
  orderTime: {
    fontSize: 14,
    color: '#64748B',
  },
  orderClient: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 3,
  },
  orderItems: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 10,
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E3A8A',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 15,
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
  },
});
