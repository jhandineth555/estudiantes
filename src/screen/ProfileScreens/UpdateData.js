import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import { Card, Input, Button } from 'react-native-elements';
import ProfileStyle from './ProfileStyle';
import useFetch from '../../hooks/useFetch';

export default function UpdateData() {
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const { perfil } = useFetch();

  
  const wasap = perfil ? String(perfil.num_wasap) : '';
  const correo = perfil ? perfil.email : '';

  const updateUser = async () => {
    try {
      const response = await fetch(`url de backend`, {
        method: 'PUT', // o 'PATCH'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          whatsapp,
          email,
        }),
      });

      if (response.ok) {
        const jsonResponse = await response.json();
        Alert.alert('Éxito', 'Actualizado con éxito');
        console.log(jsonResponse);
      } else {
        Alert.alert('Error', 'No se pudo actualizar');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Hubo un problema al actualizar');
    }
  };

  return (
    <View style={ProfileStyle.background}>
      <Card containerStyle={ProfileStyle.card}>
        <Card.Divider />
        <Input
          label="NÚMERO DE WHATSAPP"
          leftIcon={{ type: 'font-awesome', name: 'whatsapp' }}
          value={whatsapp}
          placeholder={wasap}
          onChangeText={setWhatsapp}
          keyboardType="numeric"
          containerStyle={{ marginBottom: 10 }}
        />
        <Input
          label="EMAIL"
          value={email}
          placeholder={correo}
          leftIcon={{ type: 'font-awesome', name: 'envelope' }}
          onChangeText={setEmail}
          keyboardType="email-address"
          containerStyle={{ marginBottom: 10 }}
        />
        <Button title="ACTUALIZAR" onPress={updateUser} />
      </Card>
    </View>
  );
}
