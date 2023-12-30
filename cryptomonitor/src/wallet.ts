export interface Transaction {
    currency: string;
    amount: number;
};

export class Wallet {

    readonly currencies: Object = {};
    readonly history: Transaction[] = [];

    getAmount(currency: string): number {
        return (this.currencies[currency]) ?
            this.currencies[currency] :
            0;
    }

    getCurrencies(): string[] {
        return Object.keys(this.currencies);
    }

    addAmount(currency: string, value: number): void {
        if (!this.currencies[currency]) {
            this.currencies[currency] = 0;
        }
        this.currencies[currency] += value;
        this.history.push({
            currency,
            amount: value,
        });
    }

    reduceAmount(currency: string, value: number): void {
        if (!this.currencies[currency] || this.currencies[currency] < value) return;

        this.currencies[currency] -= value;
        this.history.push({
            currency,
            amount: -value
        });
    }

    currencyHistory(currency: string): Transaction[] {
        return this.history.filter((transaction) => transaction.currency === currency);
    }

    public allHistory(): Transaction[] {
        return this.history;
    }

    public updateBalance(newBalance) {
        newBalance.map(balance => {
            const currency = balance.currency;
            const balanceAmount = parseFloat(balance.amount);

            if(this.currencies[currency]) {
                const currentAmount = this.currencies[balance.currency];                

                if (currentAmount !== balanceAmount) {
                    const diff = balanceAmount - currentAmount;
                    (diff >= 0) ? this.addAmount(currency, diff)
                    : this.reduceAmount(currency, -diff);
                }
            } else {
                this.addAmount(currency, balanceAmount);
            }
        });
    }
};
