import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';

// Importez vos écrans comme avant
import WelcomeScreen from './src/screens/WelcomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import MealOrderScreen from '@/screens/MealOrderScreen';
import NewOrderScreen from '@/screens/NewOrderScreen';
import ClientsScreen from '@/screens/ClientsScreen';
import DeliveriesScreen from '@/screens/DeliveriesScreen';
import InventoryScreen from '@/screens/InventoryScreen';
import MarketShoppingScreen from '@/screens/MarketShoppingScreen';
import MenuListScreen from '@/screens/MenuListScreen';
import OrderDetailsScreen from '@/screens/OrderDetailsScreen';
import RevenueScreen from '@/screens/RevenueScreen';
import ReportsScreen from '@/screens/ReportsScreen';
import OrdersListScreen from '@/screens/OrdersListScreen';
import OtherServicesScreen from '@/screens/OtherServicesScreen';
import MenuDetailScreen from '@/screens/MenuDetailScreen';
import NotificationsScreen from '@/screens/NotificationsScreen';
import ConfirmationScreen from '@/screens/ConfirmationScreen';
// ... autres imports

// 1. Définissez les types pour votre navigation
type RootStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Home: undefined;
  MealOrder: undefined;
  Clients: undefined;
  Revenue: undefined;
  Deliveries: undefined;
  MarketShopping: undefined;
  OtherServices: undefined;
  NewOrder: undefined;
  MenuList: undefined;
  MenuDetail: { itemId: string }; // Exemple avec paramètre
  OrdersList: undefined;
  OrderDetails: { orderId: string };
  Notifications: undefined;
  Inventory: undefined;
  Reports: undefined;
  Confirmation: {
    deliveryTime: string;
    reductionOption: string;
    paymentMethod?: string;
    orderNumber?: string;
  };


};

// 2. Créez le navigateur avec vos types
const Stack = createNativeStackNavigator<RootStackParamList>();

// 3. Définissez les props pour vos écrans (exemple pour HomeScreen)
type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;
type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
  route: HomeScreenRouteProp;
}

// Vous devrez faire de même pour chaque écran qui utilise navigation/route
export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName="Welcome" 
          screenOptions={{ 
            headerShown: false,
            headerStyle: {
              backgroundColor: '#1E3A8A',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerBackTitle: '',
          }}
        >
          {/* Écrans principaux */}
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="MealOrder" component={MealOrderScreen} />
          <Stack.Screen name="NewOrder" component={NewOrderScreen}/>
          <Stack.Screen name="Clients" component={ClientsScreen} />
          <Stack.Screen name="Deliveries" component={DeliveriesScreen}/>
          <Stack.Screen name="Inventory" component={InventoryScreen}/>
          <Stack.Screen name="MarketShopping" component={MarketShoppingScreen}/>
          <Stack.Screen name="MenuList" component={MenuListScreen}/>
          <Stack.Screen name="OrderDetails" component={OrderDetailsScreen}/>
          <Stack.Screen name="Revenue" component={RevenueScreen}/>
          <Stack.Screen name="Reports" component={ReportsScreen}/>
          <Stack.Screen name="OrdersList" component={OrdersListScreen}/>
          <Stack.Screen name="OtherServices" component={OtherServicesScreen}/>
          <Stack.Screen name="MenuDetail" component={MenuDetailScreen}/>
          <Stack.Screen name="Notifications" component={NotificationsScreen}/>
          <Stack.Screen name="Confirmation" component={ConfirmationScreen}/>

         
      

        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}