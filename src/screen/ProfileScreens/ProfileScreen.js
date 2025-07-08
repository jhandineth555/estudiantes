import React, { useEffect, useState, useRef, useCallback } from 'react';
import {
  View,
  Text,
  Animated,
  RefreshControl,
  StyleSheet,
  Alert,
} from 'react-native';
import { Avatar } from 'react-native-elements';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import InformacionPerfil from './InformacionPerfil';
import InfoAcademica from './InfoAcademica';
import LugarPerfil from './LugarPerfil';
import ProfileStyle from './ProfileStyle';
import NavigationStyles from '../../navigation/NavigationStyles';
import useFetch from '../../hooks/useFetch';
import { getFotoPerfil } from '../../services/Service'; // ✅ importar del service

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const [imageUri, setImageUri] = useState(null);
  const scrollY = useRef(new Animated.Value(0)).current;
  const lastScrollY = useRef(0);

  const { perfil, refreshPerfil } = useFetch();

  // ✅ Función para obtener imagen del backend
  const loadImage = async () => {
    try {
      const base64Image = await getFotoPerfil();
      if (base64Image) {
        setImageUri(`data:image/jpeg;base64,${base64Image}`);
      } else {
        setImageUri(null); // Si no hay imagen
      }
    } catch (error) {
      console.error('Error obteniendo imagen de perfil:', error);
      setImageUri(null);
    }
  };

  useEffect(() => {
    loadImage();
  }, []);

  useFocusEffect(
    useCallback(() => {
      navigation.getParent()?.setOptions({ tabBarStyle: NavigationStyles.tabBarStyle });
      return () => {};
    }, [navigation])
  );

  useEffect(() => {
    const listener = scrollY.addListener(({ value }) => {
      if (value > lastScrollY.current) {
        navigation.getParent()?.setOptions({ tabBarStyle: { display: 'none' } });
      } else {
        navigation.getParent()?.setOptions({ tabBarStyle: NavigationStyles.tabBarStyle });
      }
      lastScrollY.current = value;
    });
    return () => scrollY.removeListener(listener);
  }, [navigation, scrollY]);

  const onRefresh = useCallback(async () => {
    if (!refreshPerfil) return;

    setRefreshing(true);
    try {
      await refreshPerfil();  // 🔄 Datos del perfil
      await loadImage();      // 🔄 Imagen del perfil desde backend
    } catch (error) {
      Alert.alert('Error', 'No se pudo actualizar la información');
    } finally {
      setRefreshing(false);
    }
  }, [refreshPerfil]);

  const ruE = perfil?.id_alumno || '';
  const ca = perfil?.programa || '';
  const sexo = perfil?.id_sexo?.toLowerCase();

  const avatarSource = imageUri
    ? { uri: imageUri }
    : sexo === 'f'
    ? require('../../asset/img/avatar_mujer.png')
    : require('../../asset/img/avatar.png');

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        style={styles.scrollView}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <View style={styles.header}>
          <Text style={ProfileStyle.centeredText}>CARRERA: {ca}</Text>

          <Avatar
            size="xlarge"
            rounded
            source={avatarSource}
            containerStyle={ProfileStyle.avatar}
          />

          <Text style={styles.ruText}>R.U.: {ruE}</Text>
          <Text style={styles.title}>INFORMACIÓN</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>INFORMACIÓN DEL ESTUDIANTE</Text>
          <InformacionPerfil />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>INFORMACIÓN ACADÉMICA</Text>
          <InfoAcademica />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>INFORMACIÓN DE LOCALIDAD</Text>
          <LugarPerfil />
        </View>
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    marginVertical: 20,
  },
  ruText: {
    marginTop: 10,
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
    marginTop: 5,
  },
  section: {
    paddingHorizontal: 15,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default ProfileScreen;
