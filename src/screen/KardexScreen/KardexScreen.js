import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { downloadPdf } from '../../services/Service';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const numColumns = 2;
const itemMargin = 16;
const itemWidth = (width - (itemMargin * (numColumns + 1))) / numColumns;


const GridItem = ({ iconName, label, onPress, iconColor, loading }) => (
  <TouchableOpacity
    style={[styles.item, { width: itemWidth }]}
    onPress={onPress}
    activeOpacity={0.8}
    disabled={loading}
  >
    <View style={styles.iconContainer}>
      {loading ? (
        <ActivityIndicator size="small" color={iconColor || '#333'} />
      ) : (
        <Icon name={iconName} size={45} color={iconColor || '#333'} />
      )}
    </View>
    <Text style={styles.label} numberOfLines={2} ellipsizeMode="tail">
      {label}
    </Text>
  </TouchableOpacity>
);

const KardexScreen = () => {
  const navigation = useNavigation();
  const [loadingDownloadKardex, setLoadingDownloadKardex] = useState(false);
  const [loadingDownloadPensum, setLoadingDownloadPensum] = useState(false);


  const handleDownload = async (pdfId, nombreArchivo, setLoading) => {
    setLoading(true);
    try {
      const result = await downloadPdf(pdfId, nombreArchivo);
      if (result.success) {
        Alert.alert(
          'Éxito',
          `PDF "${nombreArchivo}" descargado correctamente.`
        );
       
      } else {
        Alert.alert('Error', 'No se pudo descargar el archivo.');
      }
    } catch (error) {
      Alert.alert('Error', 'Error inesperado al descargar el PDF.');
    } finally {
      setLoading(false);
    }
  };

  // Datos de cada botón
  const data = [
    {
      iconName: 'printer',
      label: 'Imprimir mi Kardex Académico',
      target: 'imprimirkardexacademico',
      iconColor: '#E53935',
      loading: false,
    },
    {
      iconName: 'download',
      label: 'Descargar mi Kardex Académico (.PDF)',
      iconColor: '#1E88E5',
      loading: loadingDownloadKardex,
      onPress: () => handleDownload(1, 'Kardex_Academico.pdf', setLoadingDownloadKardex),
    },
    {
      iconName: 'printer',
      label: 'Imprimir mi Kardex Pensum',
      target: 'imprimirkardexpensum',
      iconColor: '#E53935',
      loading: false,
    },
    {
      iconName: 'download',
      label: 'Descargar mi Kardex Pensum (.PDF)',
      iconColor: '#1E88E5',
      loading: loadingDownloadPensum,
      onPress: () => handleDownload(2, 'Kardex_Pensum.pdf', setLoadingDownloadPensum),
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>MI KARDEX ACADÉMICO Y PENSUM</Text>
      <View style={styles.grid}>
        {data.map((item, index) => (
          <GridItem
            key={index}
            iconName={item.iconName}
            label={item.label}
            iconColor={item.iconColor}
            loading={item.loading}
            onPress={
              item.onPress
                ? item.onPress
                : () => navigation.navigate(item.target)
            }
          />
        ))}
      </View>
    </View>
  );
};

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    paddingTop: 40,
    paddingHorizontal: itemMargin,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  item: {
    height: 160,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: itemMargin,
    paddingHorizontal: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 4,
  },
  iconContainer: {
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    color: '#444',
    textAlign: 'center',
  },
});

export default KardexScreen;
