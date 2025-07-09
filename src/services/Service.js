import axios from "axios";
import EncryptedStorage from "react-native-encrypted-storage";
import RNFetchBlob from 'react-native-blob-util';

const API_URL = "https://api3000.uatf.edu.bo";

// Crear instancia axios con baseURL
const api = axios.create({ baseURL: API_URL });

// Interceptor para agregar token y evitar caché en GET
api.interceptors.request.use(async (config) => {
  const token = await EncryptedStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  if (config.method === 'get') {
    // Evitar cache
    config.headers['Cache-Control'] = 'no-cache, no-store, must-revalidate';
    config.headers['Pragma'] = 'no-cache';
    config.headers['Expires'] = '0';

    // Agregar timestamp para evitar cache en URL
    config.url += (config.url.includes('?') ? '&' : '?') + 't=' + Date.now();
  }
  return config;
});

// Interceptor para renovar token cuando expire
api.interceptors.response.use(
  response => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      error.response?.data?.message === 'Access token expirado' &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        const refreshToken = await EncryptedStorage.getItem('refreshToken');
        if (!refreshToken) throw new Error('No hay refresh token');

        const res = await axios.post(`${API_URL}/refreshToken`, { refreshToken });
        const { token: newAccessToken, refreshToken: newRefreshToken } = res.data;

        if (!newAccessToken || !newRefreshToken) {
          throw new Error('No se pudieron renovar los tokens');
        }

        await EncryptedStorage.setItem('authToken', newAccessToken);
        await EncryptedStorage.setItem('refreshToken', newRefreshToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        await EncryptedStorage.removeItem('authToken');
        await EncryptedStorage.removeItem('refreshToken');
        // Aquí puedes disparar evento global de logout si tienes context o redux
        return Promise.reject(new Error('Sesión expirada. Por favor, inicia sesión nuevamente.'));
      }
    }

    return Promise.reject(error);
  }
);

// 1. Login
export const login = async (ru, password) => {
  try {
    const response = await api.post('/login', { ru, password });
    const { token, refreshToken } = response.data;

    if (token && refreshToken) {
      await EncryptedStorage.setItem('authToken', token);
      await EncryptedStorage.setItem('refreshToken', refreshToken);
    }

    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Error de conexión con el servidor" };
  }
};

// 2. Renovar token (llamado interno o manual si quieres)
export const refreshAccessToken = async () => {
  const refreshToken = await EncryptedStorage.getItem('refreshToken');
  if (!refreshToken) throw new Error('No hay refresh token');

  const response = await axios.post(`${API_URL}/refreshToken`, { refreshToken });
  const { token, refreshToken: newRefreshToken } = response.data;

  if (!token || !newRefreshToken) {
    throw new Error('No se pudo renovar token');
  }

  await EncryptedStorage.setItem('authToken', token);
  await EncryptedStorage.setItem('refreshToken', newRefreshToken);

  return token;
};

// 3. Fetch con renovación automática (JSON)
export const fetchWithAuthRetry = async (url, options = {}) => {
  const response = await api({
    url,
    ...options,
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) }
  });

  return response.data;
};

// 4. Fetch para blobs con renovación automática y sin cache
export const fetchBlobWithAuthRetry = async (url) => {
  let token = await EncryptedStorage.getItem('authToken');
  let response = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store',
  });

  if (response.status === 401) {
    try {
      const newToken = await refreshAccessToken();
      response = await fetch(url, {
        headers: { Authorization: `Bearer ${newToken}` },
        cache: 'no-store',
      });
    } catch (err) {
      await EncryptedStorage.removeItem('authToken');
      await EncryptedStorage.removeItem('refreshToken');
      throw new Error('Sesión expirada. Inicie sesión nuevamente.');
    }
  }

  if (!response.ok) throw new Error('Error al obtener el recurso');
  return response;
};

// 5. Endpoints protegidos
export const getProfileInfo = async () => {
  return fetchWithAuthRetry('/profile');
};

export const update_data = async ({ num_wasap, email }) => {
  return fetchWithAuthRetry('/actualizar_dato', {
    method: 'POST',
    data: { num_wasap, email },
  });
};

// 6. Descarga de PDF reutilizable (elimina archivo anterior para evitar cache)
const downloadPDF = async (url, path, title, description) => {
  try {
    const fs = RNFetchBlob.fs;
    if (await fs.exists(path)) {
      await fs.unlink(path);  // Eliminar archivo viejo para no cachear
    }

    const response = await fetchBlobWithAuthRetry(url);
    const pdfUrl = await response.json();

    const res = await RNFetchBlob.config({
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        path,
        mime: 'application/pdf',
        mediaScannable: true,
        title,
        description,
      },
    }).fetch('GET', pdfUrl);

    return { success: true, path: res.path() };
  } catch (error) {
    console.error(`Error al descargar ${title}:`, error);
    return { success: false, error: error.message };
  }
};

export const fetchTempPdfKardexAcademico = async (ru) => {
  const { fs } = RNFetchBlob;
  const path = `${fs.dirs.DownloadDir}/kardex_academico_${ru}.pdf`;
  return downloadPDF(`${API_URL}/ImprimirKardexAcademico/${ru}`, path, `kardex_academico_${ru}.pdf`, 'Descargando Kardex Académico');
};

export const fetchTempPdfKardexPensum = async (ru) => {
  const { fs } = RNFetchBlob;
  const path = `${fs.dirs.DownloadDir}/kardex_pensum_${ru}.pdf`;
  return downloadPDF(`${API_URL}/ImprimirKardexPensum/${ru}`, path, `kardex_pensum_${ru}.pdf`, 'Descargando Kardex Pensum');
};

export const fetchTempPdfCarnetUniversitario = async (ru) => {
  const { fs } = RNFetchBlob;
  const path = `${fs.dirs.DownloadDir}/carnet_universitario_${ru}.pdf`;
  return downloadPDF(`${API_URL}/ImprimirSolicitudCarnetUniversitario/${ru}`, path, `carnet_universitario_${ru}.pdf`, 'Descargando Carnet Universitario');
};

export const fetchTempPdfMatricula = async (ru) => {
  const { fs } = RNFetchBlob;
  const path = `${fs.dirs.DownloadDir}/matricula_${ru}.pdf`;
  return downloadPDF(`${API_URL}/ImprimirMatricula/${ru}`, path, `matricula_${ru}.pdf`, 'Descargando Matrícula');
};

export const downloadPdf = async (tipo, ru) => {
  if (!ru || !tipo) return { success: false, error: 'Faltan datos' };

  switch (tipo) {
    case 'KARDEX_ACADEMICO': return fetchTempPdfKardexAcademico(ru);
    case 'KARDEX_PENSUM': return fetchTempPdfKardexPensum(ru);
    case 'CARNET_UNIVERSITARIO': return fetchTempPdfCarnetUniversitario(ru);
    case 'MATRICULA': return fetchTempPdfMatricula(ru);
    default: return { success: false, error: 'Tipo no válido' };
  }
};

// 7. Obtener foto de perfil
export const getFotoPerfil = async () => {
  try {
    const response = await fetchWithAuthRetry('/foto');
    return response.r_foto;
  } catch (error) {
    console.error('Error al obtener la foto:', error.message);
    throw error;
  }
};

// 8. Obtener periodos y materias
export const getPeriodos = async (ru) => {
  try {
    const response = await api.get(`${ru}`, {
      headers: {
        'Cache-Control': 'no-cache',
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener los periodos:', error);
    return [];
  }
};

export const getMateriasPorPeriodo = async (periodo) => {
  try {
    const response = await api.get(`materias/${periodo}`, {
      headers: {
        'Cache-Control': 'no-cache',
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener materias del periodo:', error);
    return [];
  }
};

// 9. Subir foto perfil
export const uploadFotoPerfil = async (base64Image) => {
  try {
    const response = await fetchWithAuthRetry('/foto', {
      method: 'POST',
      data: {
        foto: base64Image,
      },
    });
    return response;
  } catch (error) {
    console.error('Error al subir la foto:', error.message);
    throw error;
  }
};
