import { registerRootComponent } from 'expo';

import App from './App';

import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.X.X:8000/api', // ⚠️ Remplace par l’IP de ton PC
  headers: { 'Content-Type': 'application/json' },
});

export const saveClient = (client: {
  name: string;
  email?: string;
  phone?: string;
  auth_provider: 'email' | 'google' | 'facebook' | 'phone';
}) => {
  return api.post('/clients', client);
};

export default api;


// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
