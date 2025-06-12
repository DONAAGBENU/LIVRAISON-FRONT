 
import { Order } from '../navigation/types';

let deliveries: Order[] = []; // Stockage temporaire (remplacez par une vraie base de données)

export const addOrderToDeliveries = (order: Order): Promise<void> => {
  return new Promise((resolve) => {
    deliveries.push(order);
    console.log('Commande enregistrée:', order);
    resolve();
  });
};

export const getDeliveries = (): Promise<Order[]> => {
  return Promise.resolve(deliveries);
};