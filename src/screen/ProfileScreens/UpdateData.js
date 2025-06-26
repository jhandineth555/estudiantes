import React, { useEffect, useState } from 'react';
import { View, Alert, ScrollView } from 'react-native';
import { Card, Input, Button } from 'react-native-elements';
import ProfileStyle from './ProfileStyle';
import useFetch from '../../hooks/useFetch';
import { update_data } from '../../services/Service';
import { useNavigation } from '@react-navigation/native';

export default function UpdateData() {
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const { perfil } = useFetch();
  const navigation = useNavigation();
  useEffect(() => {
    if (perfil) {
      setWhatsapp(perfil.tel_whatsapp ? String(perfil.tel_whatsapp) : '');
      setEmail(perfil.email || '');
    }
  }, [perfil]);

  const updateUser = async () => {
    try {
      const response = await update_data({
        num_wasap: whatsapp,
        email,
      });
      Alert.alert(' ', 'Datos actualizados correctamente');
      console.log(response);
      navigation.navigate('Home');
    } catch (error) {
      Alert.alert('Error', error.message || 'No se pudo actualizar');
    }
  };

  return (
    <ScrollView contentContainerStyle={ProfileStyle.background}>
      <Card containerStyle={ProfileStyle.card}>
        <Card.Title>Actualizar Datos</Card.Title>
        <Card.Divider />
        <Input
          label="NÚMERO DE WHATSAPP"
          leftIcon={{ type: 'font-awesome', name: 'whatsapp' }}
          value={whatsapp}
          onChangeText={setWhatsapp}
          keyboardType="numeric"
        />
        <Input
          label="EMAIL"
          value={email}
          leftIcon={{ type: 'font-awesome', name: 'envelope' }}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Button title="ACTUALIZAR" onPress={updateUser} />
      </Card>
    </ScrollView>
  );
}