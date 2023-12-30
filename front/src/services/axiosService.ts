import axios from 'axios';

const buildBaseUrl = (): string => {
    const host = process.env.BACKEND_URL || 'http://localhost';
    if (host.includes('localhost')) 
        return host + ':3001'
    return host;
};

const axiosInstance = axios.create({
    baseURL: buildBaseUrl(),
    timeout: 1000000,
});

export default axiosInstance;