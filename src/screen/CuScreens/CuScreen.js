import React, { useState, useRef, useLayoutEffect } from "react";
import { Text, View, Button, Image, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import { Card, Icon, Input } from "react-native-elements";
import { useNavigation } from '@react-navigation/native';
import NavigationStyles from "../../navigation/NavigationStyles";
import useFetch from "../../hooks/useFetch";

const screenWidth = Dimensions.get('window').width;

const CuScreen = () => {
    const { perfil } = useFetch();
    const [selectedImage, setSelectedImage] = useState(null);
    const [zona, setZona] = useState('');
    const [direccion, setDireccion] = useState('');
    const [telefonoFijo, setTelefonoFijo] = useState('');
    const [telefonoPersonal, setTelefonoPersonal] = useState('');
    const [telefonoReferencia, setTelefonoReferencia] = useState('');
    const [correo, setCorreo] = useState('');
    const [tipoSangre, setTipoSangre] = useState('');
    const navigation = useNavigation();
    const lastScrollY = useRef(0);
    
    useLayoutEffect(() => {
        navigation.getParent()?.setOptions({ tabBarStyle: NavigationStyles.tabBarStyle });
    }, []);
    
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

    const selectImage = () => {
        launchImageLibrary(
            { mediaType: 'photo', includeBase64: true },
            (response) => {
                if (response.assets && response.assets.length > 0) {
                    const imageUri = response.assets[0].uri;
                    setSelectedImage(imageUri);
                }
            }
        );
    };
    
    return (
        <ScrollView
            style={styles.scroll}
            onScroll={handleScroll}
            scrollEventThrottle={16}
        >
            <View style={styles.container}>
                <Text style={styles.title}>ACTUALIZACION DE DATOS PARA CARNET UNIVERSITARIO</Text>

                <Card containerStyle={styles.card}>
                    <Text style={styles.sectionTitle}>FOTOGRAFIA PARA SU CARNET</Text>
                    {selectedImage ? (
                        <Image source={{ uri: selectedImage }} style={styles.image} />
                    ) : (
                        <View style={styles.placeholder}>
                            <Text style={{ color: '#888' }}>No hay imagen seleccionada</Text>
                        </View>
                    )}
                    <Text style={styles.infoText}>
                        LA FOTOGRAFIA DEBE SER FONDO CELESTE{'\n'}FORMATO .JPG Y TAMAÑO ACEPTABLE.
                    </Text>
                    <TouchableOpacity style={styles.imagePicker} onPress={selectImage}>
                        <Icon
                            name="person-add"
                            type="material"
                            size={30}
                            color="#1e88e5"
                        />
                        <Text style={styles.imagePickerText}>Eligir archivo</Text>
                    </TouchableOpacity>

                </Card>

                <Card containerStyle={styles.card}>
                    <Input
                        placeholder={perfil?.zona || ''}
                        label="ZONA"
                        value={zona}
                        onChangeText={setZona}
                        inputStyle={styles.inputText}
                    />
                    <Input
                        placeholder={perfil?.direccion || ''}
                        label="DIRECCION"
                        value={direccion}
                        onChangeText={setDireccion}
                        inputStyle={styles.inputText}
                    />
                    <Input
                        placeholder={perfil?.telefono || ''}
                        label="TELEFONO FIJO"
                        value={telefonoFijo}
                        onChangeText={setTelefonoFijo}
                        keyboardType="phone-pad"
                        inputStyle={styles.inputText}
                    />
                    <Input
                        placeholder={perfil?.tel_per || ''}
                        label="TELEFONO PERSONAL"
                        value={telefonoPersonal}
                        onChangeText={setTelefonoPersonal}
                        keyboardType="phone-pad"
                        inputStyle={styles.inputText}
                    />
                    <Input
                        placeholder={perfil?.tel_urg || ''}
                        label="TEL. REFERENCIA O EMERGENCIA"
                        value={telefonoReferencia}
                        onChangeText={setTelefonoReferencia}
                        keyboardType="phone-pad"
                        inputStyle={styles.inputText}
                    />
                    <Input
                        placeholder={perfil?.email || ''}
                        label="CORREO ELECTRONICO"
                        value={correo}
                        onChangeText={setCorreo}
                        autoCapitalize="none"
                        keyboardType="email-address"
                        inputStyle={styles.inputText}
                    />
                    <Input
                        placeholder={perfil?.des_sanguineo || ' '}
                        label="TIPO DE SANGRE"
                        value={tipoSangre}
                        onChangeText={setTipoSangre}
                        inputStyle={styles.inputText}
                        editable={false}
                    />
                </Card>

                <View style={styles.buttonsContainer}>
                    <TouchableOpacity style={styles.primaryButton} onPress={() => alert('Mostrando datos')}>
                        <Text style={styles.buttonText}>IMPRIMIR DATOS ACTUALIZADOS</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.secondaryButton} onPress={() => alert('Datos Actualizados')}>
                        <Text style={styles.buttonText}>GUARDAR DATOS</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scroll: {
        flex: 1,
        backgroundColor: '#f4f6f8',
    },
    container: {
        padding: 10,
        paddingBottom: 30,
    },
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
    inputText: {
        fontSize: 14,
    },
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
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
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

});

export default CuScreen;
