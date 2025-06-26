import React, { useEffect } from 'react';
import { View, Text, PermissionsAndroid, Platform } from 'react-native';
import notifee from '@notifee/react-native';
import { mostrarNotificacion } from '../../services/NotificationService';


const NotificationScreen = () => {
useEffect(() => {
    const pedirPermiso = async () => {
      if (Platform.OS === 'android') {
        await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
      }
      await notifee.requestPermission();
    };

    const conectarSocket = () => {
      const ws = new WebSocket('ws://192.168.0.11:3000'); // cambia por tu IP

      ws.onopen = () => {
        console.log('✅ WebSocket conectado');
      };

      ws.onmessage = async event => {
        const mensaje = event.data;
        console.log('📨 Mensaje recibido:', mensaje);

        // Muestra notificación nativa
        await mostrarNotificacion('Nuevo mensaje', mensaje);
      };

      ws.onerror = error => {
        console.error('❌ Error en WebSocket:', error.message);
      };
    };

    pedirPermiso();
    conectarSocket();
  }, []);

  return (
    <View style={{ padding: 20 }}>
      <Text>✅ Escuchando notificaciones desde RabbitMQ...</Text>
    </View>
  );
};
export default NotificationScreen;