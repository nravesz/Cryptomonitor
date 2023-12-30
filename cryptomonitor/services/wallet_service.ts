import { monitor } from "../index";
import axiosInstance from "./axiosService";
import CryptoJs from 'crypto-js';

class WalletService {
    public getBalance() {
        return Object.entries(monitor.admin.wallet.currencies).map(([currency, amount]) => {
            return {
                currency,
                amount
            }
        });
    }

    public getAllHistory() {
        return monitor.admin.wallet.allHistory();
    }

    public getCurrencyHistory(currency: string) {
        return monitor.admin.wallet.currencyHistory(currency);
    }
};

export default WalletService;