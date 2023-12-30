import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();

const baseUrl = (): string => {
    return process.env.API_URL || 'https://testnet.binance.vision/api/v3'
};

const axiosInstance = axios.create({
    baseURL: baseUrl(),
    timeout: 10000,
    headers: {
        'X-MBX-APIKEY': process.env.BINANCE_API_KEY
    }
});

export default axiosInstance;