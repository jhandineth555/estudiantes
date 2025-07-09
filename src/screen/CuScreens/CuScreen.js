import React, { useState, useRef, useEffect } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Alert,
  ActivityIndicator,
  Keyboard,
  Modal,
  RefreshControl,
} from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import { Card, Icon, Input } from "react-native-elements";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NavigationStyles from "../../navigation/NavigationStyles";
import useFetch from "../../hooks/useFetch";
import { downloadPdf } from '../../services/Service';

const screenWidth = Dimensions.get('window').width;

const CuScreen = () => {
  const { perfil /*, refreshPerfil (si tienes)*/ } = useFetch();
  const [selectedImage, setSelectedImage] = useState(null);
  const [fotoSubida, setFotoSubida] = useState(false);
  const [zona, setZona] = useState('');
  const [direccion, setDireccion] = useState('');
  const [telefonoFijo, setTelefonoFijo] = useState('');
  const [telefonoPersonal, setTelefonoPersonal] = useState('');
  const [telefonoReferencia, setTelefonoReferencia] = useState('');
  const [correo, setCorreo] = useState('');
  const [tipoSangre, setTipoSangre] = useState('');
  const [downloading, setDownloading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const navigation = useNavigation();
  const lastScrollY = useRef(0);
  const ru = perfil?.ru || '202201234';

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      navigation.getParent()?.setOptions({ tabBarStyle: { display: 'none' } });
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      navigation.getParent()?.setOptions({ tabBarStyle: NavigationStyles.tabBarStyle });
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, [navigation]);

  const handleScroll = (e) => {
    const currentY = e.nativeEvent.contentOffset.y;
    const parent = navigation.getParent();

    if (currentY > lastScrollY.current + 10) {
      parent?.setOptions({ tabBarStyle: { display: 'none' } });
    } else if (currentY < lastScrollY.current - 10) {
      parent?.setOptions({ tabBarStyle: NavigationStyles.tabBarStyle });
    }

    lastScrollY.current = currentY;
  };

  useEffect(() => {
    const cargarFotoPerfil = async () => {
      try {
        const dataUri = await AsyncStorage.getItem('profileImage');
        if (dataUri) {
          setSelectedImage(dataUri);
          setFotoSubida(true);
        }
      } catch (error) {
        console.error('Error al cargar la foto local:', error);
      }
    };
    cargarFotoPerfil();
  }, []);

  const selectImage = async () => {
    launchImageLibrary(
      { mediaType: 'photo', includeBase64: true },
      async (response) => {
        if (response.assets && response.assets.length > 0) {
          const base64Img = response.assets[0].base64;
          const dataUri = `data:image/jpeg;base64,${base64Img}`;
          setSelectedImage(dataUri);
          try {
            await AsyncStorage.setItem('profileImage', dataUri);
            setFotoSubida(true);
            Alert.alert('✅ Foto seleccionada correctamente');
          } catch (error) {
            Alert.alert('❌ Error al guardar la imagen', error.message);
          }
        }
      }
    );
  };

  const eliminarFoto = async () => {
    try {
      await AsyncStorage.removeItem('profileImage');
      setSelectedImage(null);
      setFotoSubida(false);
      Alert.alert('🗑️ Foto eliminada');
    } catch (error) {
      Alert.alert('❌ Error al eliminar la imagen', error.message);
    }
  };

  const handlePrintUpdatedData = async () => {
    setDownloading(true);
    try {
      const result = await downloadPdf('CARNET_UNIVERSITARIO', ru);
      setDownloading(false);
      if (result.success) {
        Alert.alert('✅ Descargado', 'El PDF del Carnet Universitario se guardó correctamente.');
      } else {
        Alert.alert('❌ Error', result.error || 'No se pudo descargar el PDF.');
      }
    } catch (error) {
      setDownloading(false);
      Alert.alert('❌ Error', error.message || 'Ocurrió un error inesperado.');
    }
  };

  const handleGuardarDatos = () => {
    // Aquí iría la lógica real de guardar los datos en backend si aplica.
    setModalVisible(true);
  };

  // Función para refrescar datos al deslizar hacia abajo
  const onRefresh = async () => {
    setRefreshing(true);
    try {
      // Si tienes función refreshPerfil en useFetch, descomenta y úsala:
      // await refreshPerfil();

      // Recargar foto desde AsyncStorage
      const dataUri = await AsyncStorage.getItem('profileImage');
      if (dataUri) {
        setSelectedImage(dataUri);
        setFotoSubida(true);
      } else {
        setSelectedImage(null);
        setFotoSubida(false);
      }

      // Aquí podrías refrescar más estados o datos si es necesario
    } catch (error) {
      Alert.alert("Error al refrescar", error.message);
    }
    setRefreshing(false);
  };

  return (
    <>
      <ScrollView
        style={styles.scroll}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        keyboardShouldPersistTaps="handled"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.container}>
          <Text style={styles.title}>ACTUALIZACION DE DATOS PARA CARNET UNIVERSITARIO</Text>

          <Card containerStyle={styles.card}>
            <Text style={styles.sectionTitle}>FOTOGRAFIA PARA SU CARNET</Text>

            {selectedImage ? (
              <>
                <Image source={{ uri: selectedImage }} style={styles.image} />
              </>
            ) : (
              <View style={styles.placeholder}>
                <Text style={{ color: '#888' }}>No hay imagen seleccionada</Text>
              </View>
            )}

            {!fotoSubida && (
              <TouchableOpacity style={styles.imagePicker} onPress={selectImage}>
                <Icon name="person-add" type="material" size={30} color="#1e88e5" />
                <Text style={styles.imagePickerText}>Elegir archivo</Text>
              </TouchableOpacity>
            )}
          </Card>

          <Card containerStyle={styles.card}>
            <Input placeholder={perfil?.zona || ''} label="ZONA" value={zona} onChangeText={setZona} inputStyle={styles.inputText} />
            <Input placeholder={perfil?.direccion || ''} label="DIRECCION" value={direccion} onChangeText={setDireccion} inputStyle={styles.inputText} />
            <Input placeholder={perfil?.telefono || ''} label="TELEFONO FIJO" value={telefonoFijo} onChangeText={setTelefonoFijo} keyboardType="phone-pad" inputStyle={styles.inputText} />
            <Input placeholder={perfil?.tel_per || ''} label="TELEFONO PERSONAL" value={telefonoPersonal} onChangeText={setTelefonoPersonal} keyboardType="phone-pad" inputStyle={styles.inputText} />
            <Input placeholder={perfil?.tel_urg || ''} label="TEL. REFERENCIA O EMERGENCIA" value={telefonoReferencia} onChangeText={setTelefonoReferencia} keyboardType="phone-pad" inputStyle={styles.inputText} />
            <Input placeholder={perfil?.email || ''} label="CORREO ELECTRONICO" value={correo} onChangeText={setCorreo} autoCapitalize="none" keyboardType="email-address" inputStyle={styles.inputText} />
            <Input placeholder={perfil?.des_sanguineo || ' '} label="TIPO DE SANGRE" value={tipoSangre} onChangeText={setTipoSangre} inputStyle={styles.inputText} editable={false} />
          </Card>

          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.primaryButton} onPress={handlePrintUpdatedData} disabled={downloading}>
              {downloading ? <ActivityIndicator size="small" color="#fff" /> : <Text style={styles.buttonText}>IMPRIMIR DATOS ACTUALIZADOS</Text>}
            </TouchableOpacity>

            <TouchableOpacity style={styles.secondaryButton} onPress={handleGuardarDatos}>
              <Text style={styles.buttonText}>GUARDAR DATOS</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Modal de confirmación */}
      <Modal
        animationType="fade"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Icon name="check-circle" type="material" size={50} color="green" />
            <Text style={styles.modalText}>Datos guardados correctamente</Text>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.modalButton}
            >
              <Text style={styles.modalButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  scroll: { flex: 1, backgroundColor: '#f4f6f8' },
  container: { padding: 10, paddingBottom: 30 },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
    color: '#1e88e5',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
    textAlign: 'center',
  },
  card: {
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  image: {
    width: '100%',
    height: screenWidth * 0.6,
    borderRadius: 10,
    marginBottom: 10,
  },
  placeholder: {
    height: screenWidth * 0.6,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 10,
  },
  infoText: {
    fontSize: 13,
    color: '#555',
    marginBottom: 10,
    textAlign: 'center',
  },
  inputText: { fontSize: 14 },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
    marginBottom: 20,
  },
  primaryButton: {
    backgroundColor: 'rgb(119, 114, 172)',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: '45%',
    alignItems: 'center',
  },
  secondaryButton: {
    backgroundColor: 'rgb(230, 51, 51)',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: '45%',
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  imagePicker: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    backgroundColor: '#e3f2fd',
    borderRadius: 8,
    marginBottom: 10,
  },
  imagePickerText: {
    marginLeft: 8,
    color: '#1e88e5',
    fontWeight: 'bold',
  },
  deleteButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  deleteText: {
    marginLeft: 5,
    color: '#e53935',
    fontWeight: 'bold',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 10,
  },
  modalText: {
    fontSize: 18,
    marginVertical: 15,
    fontWeight: '600',
    textAlign: 'center',
  },
  modalButton: {
    backgroundColor: 'rgb(119, 114, 172)',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 10,
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default CuScreen;
