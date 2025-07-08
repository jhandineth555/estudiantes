import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  PermissionsAndroid,
  Platform,
  Alert,
} from 'react-native';
import notifee from '@notifee/react-native';
import { mostrarNotificacion } from '../../services/NotificationService';
import EncryptedStorage from 'react-native-encrypted-storage';

const NotificationScreen = () => {
  const [notificaciones, setNotificaciones] = useState([]);

  // Pedir permisos y conectar al WebSocket
  useEffect(() => {
    const pedirPermiso = async () => {
      if (Platform.OS === 'android') {
        await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
      }
      await notifee.requestPermission();
    };

    const conectarSocket = () => {
      const ws = new WebSocket('ws://192.168.0.132:3000'); // tu IP del backend con WebSocket

      ws.onopen = () => {
        console.log('✅ WebSocket conectado');
      };

      ws.onmessage = async event => {
        const mensaje = event.data;
        console.log('📨 Mensaje recibido:', mensaje);

        await mostrarNotificacion('Nuevo mensaje', mensaje);

        const nuevaNotificacion = {
          id: Date.now().toString(),
          mensaje,
          leido: false,
          fecha: new Date().toISOString(),
        };

        const actualizadas = [nuevaNotificacion, ...notificaciones];
        setNotificaciones(actualizadas);
        await EncryptedStorage.setItem('notificaciones', JSON.stringify(actualizadas));
      };

      ws.onerror = error => {
        console.error('❌ Error en WebSocket:', error.message);
      };
    };

    const cargarNotificaciones = async () => {
      const data = await EncryptedStorage.getItem('notificaciones');
      if (data) {
        setNotificaciones(JSON.parse(data));
      }
    };

    pedirPermiso();
    conectarSocket();
    cargarNotificaciones();
  }, []);

  // Marcar como leído/no leído
  const toggleLeido = async (id) => {
    const actualizadas = notificaciones.map(notif =>
      notif.id === id ? { ...notif, leido: !notif.leido } : notif
    );
    setNotificaciones(actualizadas);
    await EncryptedStorage.setItem('notificaciones', JSON.stringify(actualizadas));
  };

  // Eliminar solo del dispositivo
  const eliminarNotificacion = async (id) => {
    Alert.alert('¿Eliminar?', '¿Deseas eliminar esta notificación solo del dispositivo?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Eliminar',
        style: 'destructive',
        onPress: async () => {
          const filtradas = notificaciones.filter(notif => notif.id !== id);
          setNotificaciones(filtradas);
          await EncryptedStorage.setItem('notificaciones', JSON.stringify(filtradas));
        }
      }
    ]);
  };

  // Render de cada card
  const renderItem = ({ item }) => (
    <View style={[styles.card, item.leido ? styles.leido : styles.noLeido]}>
      <Text style={styles.mensaje}>{item.mensaje}</Text>
      <Text style={styles.fecha}>{new Date(item.fecha).toLocaleString()}</Text>
      <View style={styles.botones}>
        <TouchableOpacity onPress={() => toggleLeido(item.id)} style={styles.btnToggle}>
          <Text style={styles.btnTexto}>{item.leido ? 'Marcar No Leído' : 'Marcar Leído'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => eliminarNotificacion(item.id)} style={styles.btnEliminar}>
          <Text style={styles.btnTexto}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>📬 Notificaciones</Text>
      <FlatList
        data={notificaciones}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 20 }}>Sin notificaciones</Text>}
      />
    </View>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f0f2f5',
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    elevation: 3,
  },
  leido: {
    borderLeftWidth: 5,
    borderLeftColor: '#28a745',
  },
  noLeido: {
    borderLeftWidth: 5,
    borderLeftColor: '#dc3545',
  },
  mensaje: {
    fontSize: 16,
    marginBottom: 5,
  },
  fecha: {
    fontSize: 12,
    color: '#888',
  },
  botones: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  btnToggle: {
    backgroundColor: '#007bff',
    padding: 8,
    borderRadius: 5,
  },
  btnEliminar: {
    backgroundColor: '#dc3545',
    padding: 8,
    borderRadius: 5,
  },
  btnTexto: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
});
