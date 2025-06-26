import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Icon } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { handleLogout } from '../hooks/logout';
import useFetch from '../hooks/useFetch';
import Modal from 'react-native-modal';

const CustomDrawerContent = (props) => {
  const { navigation } = props;
  const [imageUri, setImageUri] = useState(null);
  const [showPrincipalSubmenu, setShowPrincipalSubmenu] = useState(false);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);

  const { perfil } = useFetch();
  const ru = perfil ? perfil.id_alumno : '';
  const nombre = perfil ? perfil.nombres : '';
  const ap_paterno = perfil ? perfil.paterno : '';
  const ap_materno = perfil ? perfil.materno : '';

  useEffect(() => {
    const fetchImage = async () => {
      const uri = await AsyncStorage.getItem('profileImage');
      setImageUri(uri);
    };
    fetchImage();
  }, []);

  const toggleLogoutModal = () => {
    setLogoutModalVisible(!logoutModalVisible);
  };

  const confirmLogout = () => {
    toggleLogoutModal();
    handleLogout(navigation);
  };

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.drawerContentContainer}
    >
      <View style={styles.profileContainer}>
        <View style={styles.profileInfoRow}>
          {imageUri ? (
            <Image source={{ uri: `file://${imageUri}` }} style={styles.image} />
          ) : (
            <Image source={require('../asset/img/avatar.png')} style={styles.image} />
          )}
          <View style={styles.profileTextContainer}>
            <Text style={styles.username}>{nombre} {ap_paterno} {ap_materno}</Text>
            <Text style={styles.userInfo}>R.U.: {ru}</Text>
          </View>
        </View>
      </View>

      <View style={styles.menuContainer}>
        <TouchableOpacity
          style={styles.principalButton}
          onPress={() => setShowPrincipalSubmenu(!showPrincipalSubmenu)}
        >
          <Icon name="home-outline" type="ionicon" size={24} color="#8e8e93" />
          <Text style={styles.menuLabel}>PRINCIPAL</Text>
          <View style={styles.chevronContainer}>
            <Icon
              name={showPrincipalSubmenu ? 'chevron-up-outline' : 'chevron-down-outline'}
              type="ionicon"
              size={18}
              color="#8e8e93"
            />
          </View>
        </TouchableOpacity>

        {showPrincipalSubmenu && (
          <>
            <DrawerItem
              label="MI PERFIL"
              onPress={() => navigation.navigate('Profile')}
              icon={({ size }) => (
                <Icon name="person-outline" type="ionicon" size={size} color="#8e8e93" />
              )}
              labelStyle={styles.menuLabel}
              style={styles.drawerItem}
            />
            <DrawerItem
              label="REGISTRAR TELEFONO Y EMAIL"
              onPress={() => navigation.navigate('Update')}
              icon={({ size }) => (
                <Icon name="clipboard-outline" type="ionicon" size={size} color="#8e8e93" />
              )}
              labelStyle={styles.menuLabel}
              style={styles.drawerItem}
            />
          </>
        )}

        <DrawerItem
          label="CARNET UNIVERSITARIO"
          onPress={() => navigation.navigate('Cu')}
          icon={({ size }) => (
            <Icon name="newspaper-outline" type="ionicon" size={size} color="#8e8e93" />
          )}
          labelStyle={styles.menuLabel}
          style={styles.drawerItem}
        />

        <View style={styles.separator} />

        <DrawerItem
          label="CERRAR SESION"
          onPress={toggleLogoutModal}
          icon={({ size }) => (
            <Icon name="log-out-outline" type="ionicon" size={size} color="#D9534F" />
          )}
          labelStyle={[styles.menuLabel, styles.logoutLabel]}
          style={[styles.drawerItem, styles.logoutItem]}
        />
      </View>

      <View style={styles.footer}>
        <Text style={styles.versionText}>Versión 1.0.0</Text>
      </View>

      {/* Modal personalizado para cerrar sesión */}
      <Modal
        isVisible={logoutModalVisible}
        onBackdropPress={toggleLogoutModal}
        animationIn="zoomIn"
        animationOut="zoomOut"
        backdropOpacity={0.6}
        useNativeDriver
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Cerrar Sesión</Text>
          <Text style={styles.modalMessage}>¿Estás seguro de que deseas cerrar sesión?</Text>

          <View style={styles.modalButtonsContainer}>
            <TouchableOpacity
              style={[styles.modalButton, styles.cancelButton]}
              onPress={toggleLogoutModal}
              activeOpacity={0.7}
            >
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.modalButton, styles.confirmButton]}
              onPress={confirmLogout}
              activeOpacity={0.7}
            >
              <Text style={styles.confirmButtonText}>Sí, cerrar sesión</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  drawerContentContainer: {
    flex: 1,
    backgroundColor: '#f5f7fa',
  },
  profileContainer: {
    backgroundColor: '#5682a3',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 15,
  },
  profileInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: 'white',
    marginRight: 15,
  },
  profileTextContainer: {
    flex: 1,
  },
  username: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  userInfo: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 2,
  },
  principalButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 17,
    paddingVertical: 10,
  },
  chevronContainer: {
    flex: 1,
    alignItems: 'flex-end',
    paddingRight: 20,
  },
  menuContainer: {
    flex: 1,
    paddingTop: 10,
  },
  drawerItem: {
    marginHorizontal: 0,
    borderRadius: 0,
    paddingVertical: 5,
  },
  menuLabel: {
    fontSize: 12,
    color: '#333',
    marginLeft: 10,
    fontWeight: '400',
  },
  separator: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 15,
    marginHorizontal: 20,
  },
  logoutItem: {
    marginHorizontal: 10,
    borderRadius: 12,
    backgroundColor: '#f8d7da',
  },
  logoutLabel: {
    color: '#D9534F',
    fontWeight: '700',
  },
  footer: {
    paddingVertical: 20,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    marginTop: 10,
  },
  versionText: {
    fontSize: 12,
    color: '#999',
  },

  // Modal styles
  modalContainer: {
    backgroundColor: 'white',
    padding: 22,
    borderRadius: 15,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 10,
    color: '#333',
  },
  modalMessage: {
    fontSize: 16,
    color: '#555',
    marginBottom: 25,
    textAlign: 'center',
  },
  modalButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    marginHorizontal: 7,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#e0e0e0',
  },
  cancelButtonText: {
    color: '#555',
    fontWeight: '600',
  },
  confirmButton: {
    backgroundColor: '#D9534F',
  },
  confirmButtonText: {
    color: 'white',
    fontWeight: '700',
  },
});

export default CustomDrawerContent;
