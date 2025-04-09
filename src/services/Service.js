import axios from "axios";

const API_URL = "http://10.10.218.101:3000"; 

export const login = async (ru, password) => {
    try {
        const response = await axios.post(`${API_URL}/login`, { ru, password });
        return response.data; 
    } catch (error) {
        throw error.response?.data || { message: "Error de conexión con el servidor" };
    }
};
export const getProfileInfo = async () => {
    try {
      const response = await axios.get(`${API_URL}/profile`);
      console.log('Datos obtenidos:', response.data);  
      return response.data; 
    } catch (error) {
      console.error('Error al obtener la información del perfil:', error.message);
      return null;
    }
  };

  export const getInfo = async () => {
    try {
      const response = await axios.get(`${API_URL}/info_academica`);
      console.log('Datos obtenidos:', response.data);  
      return response.data; 
    } catch (error) {
      console.error('Error al obtener la información del perfil:', error.message);
      return null;
    }
  };

  export const getLugar = async () => {
    try {
      const response = await axios.get(`${API_URL}/lugar`);
      console.log('Datos obtenidos:', response.data);  
      return response.data; 
    } catch (error) {
      console.error('Error al obtener la información del perfil:', error.message);
      return null;
    }
  };