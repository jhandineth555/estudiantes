import React, { useEffect } from "react";
import { ActivityIndicator, View, Alert } from "react-native";
import EncryptedStorage from "react-native-encrypted-storage";
import { getProfileInfo, refreshAccessToken } from "../../services/Service";
import LoginStyle from "./LoginStyle";

const SaveAuth = ({ navigation }) => {
  useEffect(() => {
    const verificarSesion = async () => {
      try {
        console.log("🔍 Verificando sesión...");

        const accessToken = await EncryptedStorage.getItem("authToken");
        const refreshToken = await EncryptedStorage.getItem("refreshToken");

        if (!accessToken || !refreshToken) {
          throw new Error("Tokens no encontrados");
        }

        try {
          // Primer intento de obtener el perfil
          await getProfileInfo();
          console.log("✅ Perfil obtenido con token válido");
          navigation.reset({ index: 0, routes: [{ name: 'Tab' }] });
        } catch (error) {
          console.log("⚠️ Token posiblemente expirado:", error.message);

          // Intenta renovar el token manualmente (por si el interceptor falló)
          try {
            console.log("🔁 Intentando renovar token...");
            await refreshAccessToken();

            // Segundo intento con nuevo token
            await getProfileInfo();
            console.log("✅ Perfil obtenido tras renovar token");
            navigation.reset({ index: 0, routes: [{ name: 'Tab' }] });
          } catch (refreshError) {
            console.log("❌ No se pudo renovar token:", refreshError.message);
            throw refreshError;
          }
        }

      } catch (error) {
        console.log("❌ Error en verificación de sesión:", error.message);
        await EncryptedStorage.removeItem("authToken");
        await EncryptedStorage.removeItem("refreshToken");
        Alert.alert("Sesión caducada", "Por favor inicia sesión nuevamente.");
        navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
      }
    };

    verificarSesion();
  }, []);

  return (
    <View style={LoginStyle.auth}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};

export default SaveAuth;
