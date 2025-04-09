import React, { useEffect } from "react"
import { ActivityIndicator, View } from "react-native";
import LoginStyle from "./LoginStyle";
import EncryptedStorage from "react-native-encrypted-storage";

const SaveAuth = ({navigation}) => {
    useEffect(() => {
        const checkAuth = async () => {
            const token = await EncryptedStorage.getItem('authToken');
            if (token) {
                navigation.navigate('Tab');
            } else {
                navigation.navigate('Login');
            }
        };
        checkAuth();
    }, [navigation]);
    return (
        <View style={LoginStyle.auth}>
        <ActivityIndicator size="large" />
      </View>
    );
};
export default SaveAuth;