import EncryptedStorage from 'react-native-encrypted-storage';
import { CommonActions } from '@react-navigation/native';

export const handleLogout = async (navigation) => {
  try {
    await EncryptedStorage.removeItem('authToken');
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      })
    );
  } catch (error) {
    console.log('Error al cerrar sesión', error);
  }
};
