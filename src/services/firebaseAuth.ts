import auth from '@react-native-firebase/auth';

export const signInWithEmail = async (email: string, password: string) => {
  try {
    await auth().signInWithEmailAndPassword(email, password);
    console.log('Connecté avec email');
  } catch (error) {
    console.error('Erreur email login :', error);
    throw error;
  }
};

export const signInWithPhone = async (phoneNumber: string) => {
  try {
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    return confirmation; // ensuite demande le code OTP à l’utilisateur
  } catch (error) {
    console.error('Erreur phone login :', error);
    throw error;
  }
};

export const confirmCode = async (confirmation: any, code: string) => {
  try {
    await confirmation.confirm(code);
    console.log('Téléphone vérifié !');
  } catch (error) {
    console.error('Code OTP incorrect :', error);
    throw error;
  }
};
