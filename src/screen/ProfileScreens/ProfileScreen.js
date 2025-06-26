import React, { useEffect, useState, useRef, useCallback } from 'react';
import {
  View,
  Text,
  Animated,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import { Avatar } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import InformacionPerfil from './InformacionPerfil';
import InfoAcademica from './InfoAcademica';
import LugarPerfil from './LugarPerfil';
import ProfileStyle from './ProfileStyle';
import NavigationStyles from '../../navigation/NavigationStyles';
import useFetch from '../../hooks/useFetch';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const [imageUri, setImageUri] = useState(null);
  const scrollY = useRef(new Animated.Value(0)).current;
  const lastScrollY = useRef(0);

  const { perfil, refreshPerfil } = useFetch();

  useEffect(() => {
    const fetchImage = async () => {
      const uri = await AsyncStorage.getItem('profileImage');
      if (uri) setImageUri(uri);
    };
    fetchImage();
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

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    Promise.all([refreshPerfil?.()])
      .finally(() => setRefreshing(false));
  }, [refreshPerfil]);

  const ruE = perfil?.id_alumno || '';
  const ca = perfil?.programa || '';
  const sexo = perfil?.id_sexo?.toLowerCase();

  // Selecciona la imagen del avatar según sexo o imagen guardada
  const avatarSource = imageUri
    ? { uri: `file://${imageUri}` }
    : sexo === 'f'
      ? require('../../asset/img/avatar_mujer.png')  // Avatar femenino
      : require('../../asset/img/avatar.png');       // Avatar masculino por defecto

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
      >
        {/* Encabezado */}
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

        {/* Secciones */}
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

        <View style={{ height: 40 }} />
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
