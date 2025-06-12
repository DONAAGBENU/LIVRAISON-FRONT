import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

/**
 * Définition complète des routes de l'application avec leurs paramètres
 */
export type RootStackParamList = {
  // Écrans d'authentification
  Welcome: undefined;
  Login: undefined;
  
  // Écran principal
  Home: undefined;
  
  // Gestion des commandes
  MealOrder: undefined;
  Confirmation: {
    paymentMethod: string;
    deliveryTime: string;
    reductionOption: string;
    orderNumber: string;
  };
  NewOrder: undefined;
  OrdersList: undefined;
  OrderDetails: { 
    orderId: string;
    refreshList?: boolean;
    paymentMethod: string;
    deliveryTime: string;
    reductionOption: string;
  };
  
  // Menu et produits
  MenuList: {
    paymentMethod: string;
    deliveryTime: string;
    reductionOption: string;
  };
  MenuDetail: { 
    itemId: string;
    itemName?: string;
    price: string;
    image: string;
    description: string;
    composition: string[];
    available: boolean;
    immediate?: boolean;
  };
  
  // Gestion clients
  Clients: undefined;
  
  // Finances
  Revenue: undefined;
  Reports: undefined;
  
  // Logistique
  Deliveries: undefined;
  DeliveryDetails: {
    deliveryId: string;
    orderNumber: string;
    items: Array<{
      id: string;
      name: string;
      price: string;
      quantity: number;
    }>;
    customer: {
      name: string;
      phone: string;
      address: string;
    };
    payment: {
      method: string;
      reduction: string;
      amount: string;
    };
    deliveryInfo: {
      time: string;
      status: 'preparing' | 'shipped' | 'delivered' | 'cancelled';
      driver?: string;
    };
    createdAt: Date;
  };
  MarketShopping: undefined;
  Inventory: undefined;
  
  // Divers
  OtherServices: undefined;
  Notifications: undefined;
};

/**
 * Types pour les données de livraison
 */
export interface DeliveryItem {
  id: string;
  name: string;
  price: string;
  quantity: number;
  image?: string;
}

export interface DeliveryOrder {
  id: string;
  orderNumber: string;
  items: DeliveryItem[];
  customer: {
    name: string;
    phone: string;
    address: string;
    notes?: string;
  };
  payment: {
    method: string;
    reduction: string;
    amount: string;
  };
  delivery: {
    time: string;
    status: 'preparing' | 'shipped' | 'delivered' | 'cancelled';
    driver?: string;
  };
  createdAt: Date;
}

/**
 * Type pour la prop 'navigation' des écrans
 */
export type StackNavigationProp<T extends keyof RootStackParamList> = 
  NativeStackNavigationProp<RootStackParamList, T>;


  export type Order = {
    id: string;
    clientName: string;
    items: string[]; // ou un type plus précis si tu as des objets plats
    totalAmount: number;
    deliveryTime: string;
    paymentMethod: string;
    reductionOption?: string;
    // ajoute tous les champs nécessaires
  };
  

/**
 * Type pour la prop 'route' des écrans
 */
export type StackRouteProp<T extends keyof RootStackParamList> = 
  RouteProp<RootStackParamList, T>;

/**
 * Props complètes pour un écran (navigation + route)
 */
export type ScreenProps<T extends keyof RootStackParamList> = {
  navigation: StackNavigationProp<T>;
  route: StackRouteProp<T>;
};

/**
 * Type utilitaire pour la fonction navigate()
 */
export type TypedNavigate = <T extends keyof RootStackParamList>(
  screen: T,
  params?: RootStackParamList[T]
) => void;

/**
 * Type utilitaire pour la fonction navigation.replace()
 */
export type TypedReplace = <T extends keyof RootStackParamList>(
  screen: T,
  params?: RootStackParamList[T]
) => void;