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
import { useNavigation } from '@react-navigation/native';
import { downloadPdf, fetchTempPdf } from '../../services/Service';

const Mostrar_KardexScreen = () => {
  const [filePath, setFilePath] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const pdfId = 1; // <- puedes parametrizar esto en el futuro

  useEffect(() => {
    const loadPdf = async () => {
      setLoading(true);
      const result = await fetchTempPdf(pdfId);
      if (result.success) {
        setFilePath(result.path);
      } else {
        Alert.alert('Error', 'No se pudo cargar el PDF desde el servidor.');
      }
      setLoading(false);
    };

    loadPdf();
  }, []);

  const handleDownload = async () => {
    const result = await downloadPdf(pdfId);
    if (result.success) {
      Alert.alert('Éxito', 'PDF descargado en la carpeta de descargas.');
    } else {
      Alert.alert('Error', 'No se pudo descargar el PDF.');
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={28} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Kardex Académico</Text>

        <TouchableOpacity onPress={handleDownload}>
          <Icon name="download" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator style={{ marginTop: 20 }} size="large" color="#3E4A89" />
      ) : filePath ? (
        <Pdf
          source={{ uri: `file://${filePath}` }}
          style={{ flex: 1, width: Dimensions.get('window').width }}
        />
      ) : (
        <Text style={{ textAlign: 'center', marginTop: 20 }}>No se pudo cargar el PDF</Text>
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

export default Mostrar_KardexScreen;
