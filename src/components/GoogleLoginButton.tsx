import React, { useEffect } from 'react';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { Button } from 'react-native';
import { saveClient } from '@/services/api';

WebBrowser.maybeCompleteAuthSession();

export default function GoogleLogin() {
  // 🔥 Correction 1 : Utilisez 'clientId' au lieu de 'expoClientId'
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: 'TON_GOOGLE_CLIENT_ID', // Client ID unique pour toutes les plateformes
    iosClientId: 'TON_IOS_CLIENT_ID', // Optionnel (si différent)
    androidClientId: 'TON_ANDROID_CLIENT_ID', // Optionnel (si différent)
  });

  useEffect(() => {
    if (response?.type === 'success' && response.authentication) { // ✅ Vérification de null
      getUserInfo(response.authentication.accessToken);
    }
  }, [response]);

  const getUserInfo = async (token: string) => {
    try {
      const res = await fetch('https://www.googleapis.com/userinfo/v2/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      if (!res.ok) throw new Error('Échec de la récupération des données Google');
      
      const user = await res.json();

      // 🔥 Correction 2 : Gestion des erreurs pour l'appel API Laravel
      await saveClient({
        name: user.name,
        email: user.email,
        auth_provider: 'google',
      });
    } catch (error) {
      console.error('Erreur Google Auth:', error);
    }
  };

  return (
    <Button 
      title="Connexion Google" 
      onPress={() => promptAsync()} 
      disabled={!request} // ✅ Désactive le bouton pendant le chargement
    />
  );
}