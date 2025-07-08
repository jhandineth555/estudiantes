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
const spacing = 16;
const itemWidth = (width - spacing * (numColumns + 1)) / numColumns;

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

const KardexScreen = ({ route }) => {
  const navigation = useNavigation();
  const ru = route?.params?.ru || '202201234';

  const [loadingKardex, setLoadingKardex] = useState(false);
  const [loadingPensum, setLoadingPensum] = useState(false);

  const handleDownload = async (tipo, setLoading) => {
    try {
      setLoading(true);
      const result = await downloadPdf(tipo, ru);
      setLoading(false);

      if (result.success) {
        Alert.alert('✅ Descarga exitosa', `Se descargó el PDF de ${tipo.replace('_', ' ')}.`);
      } else {
        Alert.alert('❌ Error al descargar', 'Por favor, intenta nuevamente.');
      }
    } catch (error) {
      setLoading(false);
      Alert.alert('⚠️ Error inesperado', 'Ocurrió un problema. Revisa tu conexión.');
    }
  };

  const data = [
    {
      iconName: 'printer',
      label: 'Imprimir Kardex Académico',
      iconColor: '#D32F2F',
      onPress: () => navigation.navigate('imprimirkardexacademico', { ru }),
    },
    {
      iconName: 'download',
      label: 'Descargar Kardex Académico (.PDF)',
      iconColor: '#1976D2',
      loading: loadingKardex,
      onPress: () => handleDownload('KARDEX_ACADEMICO', setLoadingKardex),
    },
    {
      iconName: 'printer',
      label: 'Imprimir Kardex Pensum',
      iconColor: '#D32F2F',
      onPress: () => navigation.navigate('imprimirkardexpensum', { ru }),
    },
    {
      iconName: 'download',
      label: 'Descargar Kardex Pensum (.PDF)',
      iconColor: '#1976D2',
      loading: loadingPensum,
      onPress: () => handleDownload('KARDEX_PENSUM', setLoadingPensum),
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
            onPress={item.onPress}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    paddingTop: 40,
    paddingHorizontal: spacing,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50',
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
    backgroundColor: '#FFF',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing,
    paddingHorizontal: 10,
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
    color: '#333',
    textAlign: 'center',
  },
});

export default KardexScreen;
