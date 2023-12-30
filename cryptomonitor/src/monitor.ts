import Admin from "./admin";
import Currency from "./currency";
import { Rule } from "./rule";

class Monitor {
    currencies: Object = {};
    readonly rules: Rule[] = [];

    constructor(
        readonly admin: Admin,
    ) {
        this.admin = admin;
    }
    hasValueFor(currency:string,) {
        return (currency in this.currencies);
    }
    
    setValueFor(value: number, currency:string,) {
        const date = new Date();
        date.setDate(date.getDate());
        if(this.hasValueFor(currency)){
            if(Math.abs(this.getCurrency(currency).getLastValue() - value) > (this.getCurrency(currency).getLastValue() / 1000)){
                this.getCurrency(currency).addValueToHistory(date, value);
                this.triggerRules();
            }
        }else{
            const new_currency = new Currency(currency);
            new_currency.addValueToHistory(date, value);
            this.currencies[new_currency.name] = {currency:new_currency, limit: null};
            this.triggerRules();
        }        
    }

    getValueFor(currency:string,) {
        return (this.getCurrency(currency).getLastValue());
    }
    getCurrency(currency:string,): Currency {
        return this.currencies[currency].currency;
    }
    getMeanFor(currency:string, initialDate: Date, finalDate: Date) {
        return (this.getCurrency(currency).getHistoryMean(initialDate, finalDate));
    }
    getMarketStateFor(currency:string){
        return this.getCurrency(currency).getMarketState();
    }
    setLimitFor(value: number, currency:string){
        return this.currencies[currency].limit = value;
    }
    checkOperability(currency:string){
        if(this.currencies[currency].limit){
            return this.getValueFor(currency) < this.currencies[currency].limit;
        }else{
            return true;
        }
    }

    addRule(rule: Rule) {
        this.rules.push(rule);
    };

    private triggerRules() {
        this.rules.map(rule => rule.trigger());
    };

    addCurrencies(currency: string) {
        if (!(currency in this.currencies)) {
            this.currencies[currency] = new Currency(currency);
            return true;
        }
        return false;
    }

    getCurrencyNames() {
        const names = [];
        for (let key in this.currencies) {
            names.push(key);
        }
        return names;
    }

    removeCurrency(currency: string) {
        delete this.currencies[currency];
    }

    getAllHistory() {
        const history = {};
        for (let key in this.currencies) {
            const currency: Currency = this.getCurrency(key);
            history[key] = currency.getHistory();
        }
        return history;
    }
    
}

export default Monitor;