import React, { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import EncryptedStorage from "react-native-encrypted-storage";
import LoginStyle from "./LoginStyle";
import { getProfileInfo, refreshAccessToken } from "../../services/Service";

const SaveAuth = ({ navigation }) => {
  useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log("🔄 Verificando token...");
        await getProfileInfo();
        console.log("✅ Token válido. Navegando a Tab.");
        navigation.replace("Tab");
      } catch (error) {
        console.log("⚠️ Error al obtener perfil:", error.message);

        const status = error.response?.status;

        if (status === 401 || error.message.includes("expired")) {
          try {
            console.log("🔁 Token expirado. Intentando renovar...");
            await refreshAccessToken();
            console.log("✅ Token renovado. Reintentando perfil...");
            await getProfileInfo();
            navigation.replace("Tab");
          } catch (refreshError) {
            console.log("❌ Falló la renovación:", refreshError.message);
            await EncryptedStorage.removeItem("authToken");
            await EncryptedStorage.removeItem("refreshToken");
            navigation.replace("Login");
          }
        } else {
          console.log("❌ Error inesperado. Redirigiendo a Login.");
          navigation.replace("Login");
        }
      }
    };

    checkAuth();
  }, [navigation]);

  return (
    <View style={LoginStyle.auth}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};

export default SaveAuth;
