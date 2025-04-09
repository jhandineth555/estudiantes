import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Icon } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { handleLogout } from '../hooks/logout';
import useFetch from '../hooks/useFetch';

const CustomDrawerContent = (props) => {
  const { navigation } = props;
  const [imageUri, setImageUri] = useState();
  const { perfil } = useFetch();
  const ru = perfil ? perfil.ru_e : '';
  const nombre = perfil ? perfil.nombre : '';
  useEffect(() => {
    const fetchImage = async () => {
      const uri = await AsyncStorage.getItem('profileImage');
      setImageUri(uri);
    };
    fetchImage();
  }, []);

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.profileContainer}>
      <Text style={styles.username}>Bienvenido</Text>
        {imageUri ? (
          <Image source={{ uri: `file://${imageUri}` }} style={styles.image} />
        ) : (
          <Image source={require('../asset/img/avatar.png')} style={styles.image} />
        )}
        <Text style={styles.username}>{nombre}</Text>
        <Text style={styles.userInfo}>R.U.: {ru}</Text>
      </View>

      <DrawerItem
        label="Principal"
        onPress={() => navigation.navigate('Home')}
        icon={() => <Icon name="home-outline" type="ionicon" size={24} color="#007BFF" />}
      />
      <DrawerItem
        label="Mi Perfil"
        onPress={() => navigation.navigate('Profile')} 
        icon={() => <Icon name="person-outline" type="ionicon" size={24} color="#007BFF" />}
      />
      <View style={styles.separator} />
      <DrawerItem
        label="Cerrar Sesión"
        onPress={() => handleLogout(navigation)}
        icon={() => <Icon name="log-out-outline" type="ionicon" size={24} color="#007BFF" />}
        labelStyle={styles.logoutLabel}
      />
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
    marginTop: 20,
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  userInfo: {
    fontSize: 14,
    color: 'gray',
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 10,
    marginHorizontal: 15,
  },
  logoutLabel: {
    fontSize: 16,
    color: '#007BFF',
    fontWeight: 'bold',
  },
});

export default CustomDrawerContent;
