import axios from 'axios';
import { cookies } from 'next/dist/client/components/headers';

// Interceptor para agregar un token de autenticación a las solicitudes
function addAuthTokenToRequest(config: any) {
    const token = cookies().get('token');

    if (token) {
        config.headers.Authorization = `Bearer ${token.value}`;
    }
    return config;
}

// Interceptor para manejar errores de red
function handleNetworkErrors(error: Error) {
    console.error('Error de red:', error.message);
    return Promise.reject(error);
}

// Configuración de Axios con los interceptores
export const axiosInstance = axios.create({
    baseURL: process.env.DELIVERIT_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use(addAuthTokenToRequest);
axiosInstance.interceptors.response.use(null, handleNetworkErrors);
