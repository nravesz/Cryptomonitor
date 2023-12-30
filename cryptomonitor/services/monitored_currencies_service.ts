import axios from 'axios';
import { monitor, sockets } from "../index";

const WebSocket = require('ws');

class MonitoredCurrenciesService {
    public getAllCurrenciesNames() {
        return monitor.getCurrencyNames();
    }

    public addCurrency(currency: string) {
        return monitor.addCurrencies(currency);
    }

    public subscribe(symbol: string) {
        try {
            if (!(symbol in sockets)) {
                sockets[symbol] = new WebSocket(
                    `wss://stream.binance.com:9443/ws/${symbol}@bookTicker`);
                sockets[symbol].on('open', function() { console.log(`New subscription: ${symbol}`); });
                sockets[symbol].on('error', function() { console.log(`Error on: ${symbol}.`); });
                sockets[symbol].on('close', function() { console.log(`Unsubscribe: ${symbol}.`); });
                sockets[symbol].addEventListener('message', (event) => {
                    //console.log(event.data)
                    const data = JSON.parse(event.data);
                    const price = data.b; // best bid price
                    monitor.setValueFor(Number(price), symbol.toUpperCase());
                });
            }
        } catch (err) {
            throw new Error("Unable to subscribe");
        }
    }

    public unsubscribe(symbol: string) {
        try {
            if (symbol in sockets) {
                sockets[symbol].close();
                delete sockets[symbol];
                monitor.removeCurrency(symbol);
            } else {
                throw new Error("Currency is not bieng monitored");
            }
        } catch (err) {
            throw new Error(err);
        }
    }

    public getAllHistory() {
        return monitor.getAllHistory();
    }

    public getMeanFor(currency:string, initialDate: Date, finalDate: Date) {
        return monitor.getMeanFor(currency, initialDate, finalDate);
    }

    public setLimitFor(limit:number, currency:string) {
        return monitor.setLimitFor(limit, currency);
    }

    public getMarketStateFor(currency:string) {
        return monitor.getMarketStateFor(currency);
    }

    public checkOperability(currency:string) {
        return monitor.checkOperability(currency);
    }

}

export default MonitoredCurrenciesService;