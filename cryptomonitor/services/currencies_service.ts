import axios from 'axios';

class CurrenciesService {
    public async getAllCurrencies() {
        return axios.get('https://api3.binance.com/api/v3/ticker/price')
        .then((response) => {
            return response.data
        })
        .then((data) => {
            const currencyNames: string[] = [];
            for (let i = 0; i < data.length; i++) {
                currencyNames.push(data[i]['symbol']);
            }
            return ({
                success: true,
                data: currencyNames
            });
        })
        .catch((err) => {
            return ({
                success: false,
                message: 'Unable to connect to Binance API'
            });
        });
    }
}

export default CurrenciesService;