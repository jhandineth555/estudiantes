import React, { useEffect, useState } from 'react';
import {
  View,
  Dimensions,
  Alert,
  StyleSheet,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from 'react-native';
import Pdf from 'react-native-pdf';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { fetchTempPdfKardexAcademico, downloadPdf } from '../../services/Service';

const Mostrar_KardexScreen = () => {
  const [filePath, setFilePath] = useState(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();

  // Obtenemos el ru dinámicamente (puede venir desde params)
  const ru = route.params?.ru || '123456';

  // Cargar PDF temporal para vista previa
  const loadPdf = async () => {
    setLoading(true);
    const result = await fetchTempPdfKardexAcademico(ru);
    if (result.success) {
      setFilePath(result.path);
    } else {
      Alert.alert('Error', 'No se pudo cargar el PDF desde el servidor.');
    }
    setLoading(false);
  };

  useEffect(() => {
    loadPdf();
  }, []);

  // Descargar PDF completo al pulsar el ícono
  const handleDownload = async () => {
    setDownloading(true);
    const result = await downloadPdf('KARDEX_ACADEMICO', ru);
    setDownloading(false);

    if (result.success) {
      Alert.alert(
        '✅ Descargado',
        'El PDF se guardó correctamente'
      );
    } else {
      Alert.alert('❌ Error', result.error || 'No se pudo descargar el PDF.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={28} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Kardex Académico</Text>

        <TouchableOpacity onPress={handleDownload} disabled={downloading}>
          {downloading ? (
            <ActivityIndicator color="#fff" size={20} />
          ) : (
            <Icon name="download" size={28} color="#fff" />
          )}
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator style={styles.loading} size="large" color="#3E4A89" />
      ) : filePath ? (
        <Pdf
          source={{ uri: `file://${filePath}` }}
          style={styles.pdf}
          onError={(error) => Alert.alert('Error al mostrar PDF', error.message)}
        />
      ) : (
        <Text style={styles.errorText}>No se pudo cargar el PDF.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: 60,
    backgroundColor: '#3E4A89',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loading: {
    marginTop: 20,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
  },
  errorText: {
    textAlign: 'center',
    marginTop: 20,
    color: 'red',
  },
});

export default Mostrar_KardexScreen;
