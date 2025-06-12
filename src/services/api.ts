import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 1. Définir les types d'interface
interface LoginResponse {
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
}

interface Meal {
  id: number;
  name: string;
  description: string;
  price: number;
}

interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
}

export const saveClient = (client: {
  name: string;
  email?: string;
  phone?: string;
  auth_provider: 'email' | 'phone' | 'google' | 'facebook';
}) => {
  return api.post('/clients', client);
};


// 2. Configuration Axios avec typage
const api = axios.create({
  //baseURL: 'http://10.0.2.2:8000/api',

    //baseURL: 'http://localhost:8000/api', 
    //baseURL: 'http://localhost:8081', 
    baseURL: 'http://192.168.1.70:8081/api',  
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

// 3. Intercepteur avec typage
api.interceptors.request.use(async (config) => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  } catch (error) {
    console.error('Error getting token:', error);
    return config;
  }
});

// 4. Fonction login avec typage
export const login = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await api.post<LoginResponse>('/login', {
      email,
      password,
      device_name: 'react-native'
    });

    
    
    await AsyncStorage.setItem('token', response.data.token);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data as ApiError;
    }
    throw { message: 'Login failed' } as ApiError;
  }
};

// Fonction register déplacée au niveau racine
export const register = async (data: {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}): Promise<LoginResponse> => {
  try {
    const response = await api.post<LoginResponse>('/register', data);
    await AsyncStorage.setItem('token', response.data.token);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data as ApiError;
    }
    throw { message: 'Registration failed' } as ApiError;
  }
};


// 5. Fonction fetchMeals avec typage
export const fetchMeals = async (): Promise<Meal[]> => {
  try {
    const response = await api.get<{ data: Meal[] }>('/meals');
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data as ApiError;
    }
    throw { message: 'Failed to fetch meals' } as ApiError;
  }
};

export default api;