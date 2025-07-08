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
import { fetchTempPdfKardexPensum } from '../../services/Service';

const MostrarKardexPensumScreen = () => {
  const [filePath, setFilePath] = useState(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();

  const ru = route.params?.ru || '1234567';

  const loadPdf = async () => {
    setLoading(true);
    const result = await fetchTempPdfKardexPensum(ru);
    if (result.success) {
      console.log('📄 Ruta del PDF:', result.path);
      setFilePath(result.path);
    } else {
      Alert.alert('Error', 'No se pudo cargar el PDF desde el servidor.');
      console.log('❌ Error:', result.error);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadPdf();
  }, []);

  const handleDownload = async () => {
    setDownloading(true);
    const result = await fetchTempPdfKardexPensum(ru);
    setDownloading(false);

    if (result.success) {
      Alert.alert('✅ Descargado', 'El PDF se guardó correctamente.');
    } else {
      Alert.alert('Error', 'No se pudo descargar el PDF.');
      console.log('❌ Error al descargar:', result.error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={28} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Kardex Pensum</Text>

        <TouchableOpacity onPress={handleDownload} disabled={downloading}>
          {downloading ? (
            <ActivityIndicator color="#fff" size={20} />
          ) : (
            <Icon name="download" size={28} color="#fff" />
          )}
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator style={{ marginTop: 20 }} size="large" color="#3E4A89" />
      ) : filePath ? (
        <Pdf
          source={{ uri: `file://${filePath}` }}
          style={{ flex: 1, width: Dimensions.get('window').width }}
          onError={(error) => Alert.alert('Error al mostrar PDF', error.message)}
        />
      ) : (
        <Text style={{ textAlign: 'center', marginTop: 20 }}>
          No se pudo cargar el PDF
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default MostrarKardexPensumScreen;
