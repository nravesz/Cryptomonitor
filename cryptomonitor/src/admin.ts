import { Wallet, Transaction } from "./wallet";

export class Admin {
    readonly wallet: Wallet;
    readonly variables: Map<string, number | string | boolean>;

    constructor(
        readonly email: string,
        private password: string,
    ) {
        this.wallet = new Wallet();
        this.variables = new Map<string, number | string | boolean>;
    }

    login(email:string, password: string) {
        return (email === this.email) && (password === this.password);
    }

    getCurrency(currency: string): number {
        return this.wallet.getAmount(currency);
    }

    getTransactionHistory(): Transaction[] {
        return this.wallet.history;
    }

    getCurrencyTransactionHistory(currency: string): Transaction[] {
        return this.wallet.currencyHistory(currency);
    }

    getVariable(key: string): number | string | boolean {
        return this.variables.get(key);
    }

    setVariable(key: string, value: number | string | boolean){
        this.variables.set(key,value);
    }

    public deleteVariable(key: string): boolean {
        return this.variables.delete(key);
    }
}

export default Admin;