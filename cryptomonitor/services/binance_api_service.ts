import { monitor } from "../index";
import axiosInstance from "./axiosService";
import * as CryptoJs from 'crypto-js';
import * as dotenv from 'dotenv';

dotenv.config();

class BinanceApiService {
    public async getWallet() {
        const timestamp = this.timestamp();
        const signature = this.signature(timestamp);
        const queryParams = `${timestamp}&signature=${signature}`;

        const { data } = await axiosInstance.get(
            `/account?${queryParams}`
        );

        return data.balances.map(item => {
            return {
                currency: item.asset,
                amount: item.free,
            }    
        });
    }

    public async getPriceFor(currency: string) {
        const { data } = await axiosInstance.get('/ticker/price');
        return parseFloat(data.find(price => price.symbol === currency).price);
    }

    public makeBuyOrder(currency: string, amount: number) {
        this.makeOrder(currency, amount, 'BUY')
    }

    public makeSellOrder(currency: string, amount: number) {
        this.makeOrder(currency, amount, 'SELL');
    }

    private makeOrder(currency: string, amount: number, operation: string) {
        const type = 'type=MARKET';
        const side = `side=${operation}`;
        const respType = 'newOrderRespType=ACK'
        const symbol = `symbol=${currency}`;
        const quantity = `quantity=${amount}`;
        const timestamp = this.timestamp();

        const signatureParams = [
            type,
            side,
            respType,
            symbol,
            quantity,
            timestamp
        ].join('&');

        const signature = this.signature(signatureParams);
        const queryParams = `${signatureParams}&signature=${signature}`;

        axiosInstance.post(`/order?${queryParams}`);
    }

    private timestamp(): string {
        return `timestamp=${new Date().getTime()}`;
    }

    private signature(queryString: string): string {
        return CryptoJs.HmacSHA256(
            queryString,
            process.env.BINANCE_API_SECRET
        ).toString(CryptoJs.enc.Hex);
    }
};

export default BinanceApiService;