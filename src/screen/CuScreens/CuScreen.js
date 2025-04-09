import React, { useState } from "react";
import { Text, View, Button, Image, StyleSheet, ScrollView} from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import { Card, Input } from "react-native-elements";  // Importar Card de React Native Elements

const CuScreen = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
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
        <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={styles.container}>
                <Text style={styles.title}>Foto para el carnet universitario</Text>
                
                <Card>
                    <Card.Title>Imagen Seleccionada</Card.Title>
                    <Card.Divider />
                    {selectedImage ? (
                        <Image source={{ uri: selectedImage }} style={styles.image} />
                    ) : (
                        <Text>No hay imagen seleccionada</Text>
                    )}
                    <Text style={{ color: 'blue' }}>
                        La fotografia debe ser con fondo celeste.{'\n'} El formato debe ser JPG y el tamaño aceptable.
                    </Text>
                    <Button title="Elegir Archivo..." onPress={selectImage} />
                </Card>
            </View>

            <View style={styles.container}>
                <Card>
                    <Card.Title>ACTUALIZACION PARA EL CARNET UNIVERSITARIO</Card.Title>
                    <Card.Divider />

                    <Text style={styles.text}>ZONA:</Text>
                    <Input
                        placeholder=""
                        value={name}
                        leftIcon={{ type: 'material-icons', name: 'location-on',  color: 'gray' }}
                        onChangeText={setName}
                    />
                    <Text style={styles.text}>DIRECCION:</Text>
                    <Input
                        placeholder=""
                        value={email}
                        leftIcon={{ type: 'material-icons', name: 'home',  color: 'gray' }}
                        onChangeText={setEmail}
                        autoCapitalize="none"
                    />
                    <Text style={styles.text}>TELEFONO(FIJO):</Text>
                    <Input
                        placeholder=""
                        value={password}
                        leftIcon={{ type: 'material-icons', name: 'phone',  color: 'gray' }}
                        onChangeText={setPassword}
                        secureTextEntry={true}
                    />
                    <Text style={styles.text}>TELEFONO PERSONAL:</Text>
                    <Input
                        placeholder=""
                        value={password}
                        leftIcon={{ type: 'material-icons', name: 'phone',  color: 'gray' }}
                        onChangeText={setPassword}
                        secureTextEntry={true}
                    />
                    <Text style={styles.text}>TELEFONO DE REFERENCIA O URGENCIA:</Text>
                    <Input
                        placeholder=""
                        value={password}
                        leftIcon={{ type: 'material-icons', name: 'phone',  color: 'gray' }}
                        onChangeText={setPassword}
                        secureTextEntry={true}
                    />
                    <Text style={styles.text}>CORREO ELECTRONICO:</Text>
                    <Input
                        placeholder=""
                        value={password}
                        onChangeText={setPassword}
                        leftIcon={{ type: 'material-icons', name: 'email',  color: 'gray' }}
                        secureTextEntry={true}
                    />
                    <Text style={styles.text}>TIPO DE SANGRE:</Text>
                    <Input
                        placeholder=""
                        value={password}
                        leftIcon={{ type: 'material-icons', name: 'bloodtype',  color: 'gray' }}
                        onChangeText={setPassword}
                        secureTextEntry={true}
                    />
                </Card>
            </View>

            <View style={styles.container2}>
                <View style={styles.buttonContainer}>
                    <Button title="Imprimir Datos Actuales " onPress={() => alert('Datos Impresos')} />
                </View>
                <View style={styles.buttonContainer}>
                    <Button title="Guardar Datos" onPress={() => alert('Datos Actualizados')} />
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginTop: 50,
        alignItems: 'center',
    },
    container2: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 20,
        justifyContent: 'center',
        fontWeight: 'bold',
        marginBottom: 20,
        color: 'black',
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 0,
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 2,
        marginBottom: 16,
        paddingHorizontal: 130,
    },
    text: {
        fontSize: 16,
        marginBottom: 8,
        color: 'gray',
    },
    buttonContainer: {
        margin: 10,
        width: '40%',
    },
});

export default CuScreen;
