import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import auth from '@react-native-firebase/auth';
import { saveClient } from '@/services/api';

export default function PhoneLogin() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [confirm, setConfirm] = useState<any>(null);
  const [code, setCode] = useState('');

  const signInWithPhoneNumber = async () => {
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    setConfirm(confirmation);
  };

  const confirmCode = async () => {
    const result = await confirm.confirm(code);
    const user = result.user;

    await saveClient({
      name: 'Utilisateur mobile',
      phone: user.phoneNumber,
      auth_provider: 'phone',
    });
  };

  return (
    <View>
      {!confirm ? (
        <>
          <TextInput placeholder="Numéro +22890123456" onChangeText={setPhoneNumber} />
          <Button title="Envoyer le code" onPress={signInWithPhoneNumber} />
        </>
      ) : (
        <>
          <TextInput placeholder="Code de vérification" onChangeText={setCode} />
          <Button title="Valider le code" onPress={confirmCode} />
        </>
      )}
    </View>
  );
}
