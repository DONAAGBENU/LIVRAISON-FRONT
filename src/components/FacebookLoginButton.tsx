import React, { useEffect } from 'react';
import { Button, Alert } from 'react-native';
import * as AuthSession from 'expo-auth-session';
import { saveClient } from '@/services/api';
import { FacebookAuthProvider } from '@react-native-firebase/auth';
 

const FB_APP_ID = 'TON_FACEBOOK_APP_ID'; // remplace par ton vrai ID

const discovery = {
  authorizationEndpoint: 'https://www.facebook.com/v11.0/dialog/oauth',
  tokenEndpoint: 'https://graph.facebook.com/v11.0/oauth/access_token',
};

export default function FacebookLogin() {
  const redirectUri = AuthSession.makeRedirectUri();

  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: FB_APP_ID,
      scopes: ['public_profile', 'email'],
      redirectUri,
      responseType: AuthSession.ResponseType.Token,
    },
    discovery
  );

  useEffect(() => {
    const handleResponse = async () => {
      if (response?.type === 'success' && response.authentication?.accessToken) {
        const accessToken = response.authentication.accessToken;
        const res = await fetch(
          `https://graph.facebook.com/me?fields=id,name,email&access_token=${accessToken}`
        );
        const user = await res.json();

        await saveClient({
          name: user.name,
          email: user.email,
          auth_provider: 'facebook',
        });

        Alert.alert('Bienvenue', `Connecté en tant que ${user.name}`);
      }
    };

    handleResponse();
  }, [response]);

  return (
    <Button
      title="Connexion avec Facebook"
      onPress={() => promptAsync()}
      disabled={!request}
    />
  );
}
