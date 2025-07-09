import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { Card, Input, Button, Icon } from 'react-native-elements';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import Modal from 'react-native-modal';

import LoginStyle from './LoginStyle';
import { login } from '../../services/Service';

const loginSchema = Yup.object().shape({
  ru: Yup.string().min(5, 'Registro Universitario inválido').required('Campo obligatorio'),
  password: Yup.string().min(5, 'Contraseña muy corta').required('Campo obligatorio'),
});

const LoginScreen = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isWelcomeVisible, setIsWelcomeVisible] = useState(false);
  const navigation = useNavigation();

  const handleLogin = async (values) => {
    try {
      const response = await login(values.ru, values.password);

      if (response && response.token) {
        setIsWelcomeVisible(true);
        setTimeout(() => {
          setIsWelcomeVisible(false);
          navigation.replace('Tab');
        }, 2000);
      } else {
        Alert.alert('Error', 'Credenciales incorrectas');
      }
    } catch (error) {
      Alert.alert('Error', error.message || 'Algo salió mal');
    }
  };

  return (
    <View style={LoginStyle.container}>
      <View style={LoginStyle.background}>
        <Formik
          initialValues={{ ru: '', password: '' }}
          validationSchema={loginSchema}
          onSubmit={handleLogin}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <Card containerStyle={LoginStyle.card}>
              <Image
                source={require('../../asset/img/uatf.png')}
                style={LoginStyle.image}
              />
              <Text style={LoginStyle.title}>U.A.T.F. Estudiantes</Text>

              <Input
                placeholder="R.U."
                leftIcon={<Icon name="user" type="font-awesome" color="#517fa4" />}
                onChangeText={handleChange('ru')}
                onBlur={handleBlur('ru')}
                value={values.ru}
                keyboardType="numeric"
                errorMessage={touched.ru && errors.ru ? errors.ru : ''}
              />

              <Input
                placeholder="Clave"
                leftIcon={<Icon name="lock" type="font-awesome" color="#517fa4" />}
                rightIcon={
                  <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <Icon
                      name={showPassword ? 'eye-off' : 'eye'}
                      type="material-community"
                      color="#517fa4"
                    />
                  </TouchableOpacity>
                }
                secureTextEntry={!showPassword}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                errorMessage={touched.password && errors.password ? errors.password : ''}
              />

              <Button
                title="Iniciar Sesión"
                onPress={handleSubmit}
                buttonStyle={LoginStyle.button}
              />
            </Card>
          )}
        </Formik>
      </View>

      {/* Modal estilizado */}
      <Modal isVisible={isWelcomeVisible} animationIn="zoomIn" animationOut="zoomOut">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>¡Bienvenido!</Text>
          <Text style={styles.modalText}>Has iniciado sesión correctamente</Text>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#517fa4',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    color: '#333',
  },
});

export default LoginScreen;
