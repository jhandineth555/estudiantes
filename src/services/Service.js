import axios from "axios";
import EncryptedStorage from "react-native-encrypted-storage";
import RNFetchBlob from 'react-native-blob-util';

const API_URL = "https://api3000.uatf.edu.bo";
// const API_URL = "http://192.168.0.11:3000"; // Para pruebas locales
// 1. Login
export const login = async (ru, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { ru, password });

    if (response.data.token && response.data.refreshToken) {
      await EncryptedStorage.setItem('authToken', response.data.token);
      await EncryptedStorage.setItem('refreshToken', response.data.refreshToken);
    }

    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Error de conexión con el servidor" };
  }
};

// 2. Renovar token
export const refreshAccessToken = async () => {
  const refreshToken = await EncryptedStorage.getItem('refreshToken');
  if (!refreshToken) throw new Error('No hay refresh token');

  try {
    const response = await axios.post(`${API_URL}/refreshToken`, { refreshToken });

    if (response.data.token) {
      await EncryptedStorage.setItem('authToken', response.data.token);
      return response.data.token;
    } else {
      throw new Error('No se pudo renovar token');
    }
  } catch (error) {
    throw new Error('Sesión expirada. Vuelva a iniciar sesión.');
  }
};

// 3. Fetch con renovación automática
const fetchWithAuthRetry = async (url, options = {}) => {
  let token = await EncryptedStorage.getItem('authToken');

  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
    ...options.headers,
  };

  let response = await fetch(url, { ...options, headers });

  if (response.status === 401) {
    try {
      token = await refreshAccessToken();

      const retryHeaders = {
        ...headers,
        Authorization: `Bearer ${token}`,
      };

      response = await fetch(url, { ...options, headers: retryHeaders });
    } catch (refreshError) {
      await EncryptedStorage.removeItem('authToken');
      await EncryptedStorage.removeItem('refreshToken');
      throw new Error('Sesión expirada. Por favor, inicie sesión nuevamente.');
    }
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Error de servidor');
  }

  return response.json();
};

// 4. Peticiones protegidas
export const getProfileInfo = async () => {
  return await fetchWithAuthRetry(`${API_URL}/profile`);
};

export const getInfo = async () => {
  return await fetchWithAuthRetry(`${API_URL}/info_academica`);
};

export const getLugar = async () => {
  return await fetchWithAuthRetry(`${API_URL}/lugar`);
};

export const update_data = async ({ num_wasap, email }) => {
  return await fetchWithAuthRetry(`${API_URL}/actualizar_dato`, {
    method: 'POST',
    body: JSON.stringify({ num_wasap, email }),
  });
};

export const downloadPdf = async (id, nombre = 'kardex.pdf') => {
  const token = await EncryptedStorage.getItem('authToken');
  const { dirs } = RNFetchBlob.fs;
  const path = `${dirs.DownloadDir}/${nombre}`;

  try {
    const res = await RNFetchBlob.config({
      path,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        mime: 'application/pdf',
        title: nombre,
        description: 'Descargando desde la app',
        mediaScannable: true,
      },
    }).fetch('GET', `${API_URL}/descargarpdf/${id}`, {
      Authorization: `Bearer ${token}`,
    });

    return { success: true, path: res.path() };
  } catch (error) {
    console.error('Error al descargar PDF:', error);
    return { success: false, error };
  }
};

export const fetchTempPdf = async (id) => {
  const token = await EncryptedStorage.getItem('authToken');
  const { fs } = RNFetchBlob;
  const dir = fs.dirs.DocumentDir;
  const path = `${dir}/temp_kardex_${id}.pdf`;

  try {
    const res = await RNFetchBlob.config({ path }).fetch(
      'GET',
      `${API_URL}/mostrarpdf/${id}`,
      {
        Authorization: `Bearer ${token}`,
      }
    );

    return { success: true, path: res.path() };
  } catch (error) {
    console.error('Error al cargar PDF temporal:', error.message || error);
    return { success: false, error };
  }
};
