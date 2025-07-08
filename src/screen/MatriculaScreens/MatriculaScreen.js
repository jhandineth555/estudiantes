import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Platform,
  ToastAndroid,
  Alert,
} from 'react-native';
import { Card, Icon } from 'react-native-elements';
import useFetch from '../../hooks/useFetch';
import { fetchTempPdfMatricula } from '../../services/Service';

const MatriculaScreen = () => {
  const { perfil } = useFetch();

  if (!perfil) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center', marginTop: 20 }}>Cargando datos del perfil...</Text>
      </View>
    );
  }

  const nombre = perfil?.nombres || '';
  const paterno = perfil?.paterno || '';
  const materno = perfil?.materno || '';
  const ru = perfil?.id_alumno || '';
  const yaCompro = perfil?.yaCompro || false; // Asegúrate de que tu backend lo incluya

  const showMessage = (mensaje) => {
    if (Platform.OS === 'android') {
      ToastAndroid.show(mensaje, ToastAndroid.LONG);
    } else {
      Alert.alert('Aviso', mensaje);
    }
  };

  const handleImprimir = async () => {
    try {
      const res = await fetchTempPdfMatricula(ru);
      if (res && res.success) {
        showMessage('✅ PDF descargado correctamente');
        // Aquí puedes navegar a una pantalla que muestre el PDF si quieres
      } else {
        showMessage(`❌ Error al descargar: ${res?.error || 'Desconocido'}`);
      }
    } catch (err) {
      showMessage('❌ Error al descargar PDF');
      console.error('Error al imprimir matrícula:', err);
    }
  };

  const handleComprar = () => {
    if (yaCompro) {
      showMessage('❌ Ya has comprado tu matrícula. No puedes volver a comprar.');
    } else {
      showMessage('✅ Matrícula comprada correctamente');
      // Aquí puedes agregar lógica para llamar a comprarMatricula(ru)
    }
  };

  return (
    <View style={styles.container}>
      <Card containerStyle={styles.card}>
        <Text style={styles.precio}>INFORMACIÓN DE COMPRAS DE MATRÍCULAS</Text>
        <Card.Divider />
        <Text style={styles.titulo}>
          UNIVERSITARIO: {nombre} {paterno} {materno}
        </Text>
        <View style={styles.qrContainer}>
          <Text style={styles.codigoText}>R.U. {ru}</Text>
        </View>
      </Card>

      <View style={styles.bottomSection}>
        <View style={styles.circleButtonContainer}>
          <TouchableOpacity
            style={[styles.circleButton, styles.imprimir]}
            onPress={handleImprimir}
            activeOpacity={0.7}
          >
            <Icon name="printer" type="feather" color="#fff" size={30} />
          </TouchableOpacity>
          <Text style={styles.label}>IMPRIMIR MI MATRÍCULA .PDF</Text>
        </View>

        <View style={styles.circleButtonContainer}>
          <TouchableOpacity
            style={[
              styles.circleButton,
              styles.comprar,
              yaCompro && { backgroundColor: '#ccc' }, // Gris si ya compró
            ]}
            onPress={handleComprar}
            activeOpacity={0.7}
            disabled={yaCompro}
          >
            <Icon name="shopping-cart" type="feather" color="#fff" size={30} />
          </TouchableOpacity>
          <Text style={styles.label}>COMPRAR MATRÍCULA</Text>
        </View>
      </View>
    </View>
  );
};

export default MatriculaScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    padding: 10,
    justifyContent: 'space-between',
  },
  card: {
    borderRadius: 15,
    padding: 20,
    elevation: 5,
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  precio: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  qrContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  codigoText: {
    marginTop: 10,
    fontSize: 16,
    color: '#555',
  },
  bottomSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30,
  },
  circleButtonContainer: {
    alignItems: 'center',
    width: '45%',
  },
  circleButton: {
    width: 75,
    height: 75,
    borderRadius: 75 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  imprimir: {
    backgroundColor: '#007bff',
  },
  comprar: {
    backgroundColor: '#28a745',
  },
  label: {
    marginTop: 8,
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
    textAlign: 'center',
  },
});
