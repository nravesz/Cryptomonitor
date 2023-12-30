import { Wallet } from '../src/wallet'

describe ("Wallet", () => {

    describe ("initialize", () => {
        it ("should return a Wallet when created", () => {
            const wallet: Wallet = new Wallet();
            expect(wallet).toBeDefined();
            expect(wallet).toBeInstanceOf(Wallet);
        });
    
        it ("should be created without any currencies", () => {
            const wallet: Wallet = new Wallet();
            expect(wallet).toBeInstanceOf(Wallet);
            expect(wallet.getCurrencies().length).toStrictEqual(0);
        });
    
        it ("should be created with an empty transaction history", () => {
            const wallet: Wallet = new Wallet();
            expect(wallet).toBeInstanceOf(Wallet);
            expect(wallet.history.length).toStrictEqual(0);
        });
    });

    describe("currencies modification", () => {
        it ("should add a currency the first time a value is added", () => {
            const wallet: Wallet = new Wallet();
            expect(wallet).toBeInstanceOf(Wallet);

            wallet.addAmount("BTC", 100);

            expect(wallet.getCurrencies().length).toStrictEqual(1);
            expect(wallet.getAmount("BTC")).toStrictEqual(100);
        });

        it ("should return new amount when new amount is added", () => {
            const wallet: Wallet = new Wallet();
            expect(wallet).toBeInstanceOf(Wallet);
            expect(wallet.getCurrencies().length).toStrictEqual(0);
    
            wallet.addAmount("BTC", 30);
            
            expect(wallet.getAmount("BTC")).toStrictEqual(30);
    
            wallet.addAmount("BTC", 57);
    
            expect(wallet.getAmount("BTC")).toStrictEqual(87);
        });
    
        it ("should have new amount when values are reduced", () => {
            const wallet: Wallet = new Wallet();
            wallet.addAmount("ETH", 100);
            expect(wallet).toBeInstanceOf(Wallet);
    
            wallet.reduceAmount("ETH", 57);
    
            expect(wallet.getAmount("ETH")).toStrictEqual(43);
    
            wallet.reduceAmount("ETH", 20);
    
            expect(wallet.getAmount("ETH")).toStrictEqual(23);
        });
    
        it ("should not be able to reduce more than current amount", () => {
            const wallet: Wallet = new Wallet();
            wallet.addAmount("BTC", 40);
    
            wallet.reduceAmount("BTC", 50);
    
            expect(wallet.getAmount("BTC")).toStrictEqual(40);
    
            wallet.reduceAmount("BTC", 15);
    
            expect(wallet.getAmount("BTC")).toStrictEqual(25);
    
            wallet.reduceAmount("BTC", 26);
    
            expect(wallet.getAmount("BTC")).toStrictEqual(25);
        });
    });

    describe ("transaction history", () => {
        it ("should have a transaction history as currency is added or reduced", () => {
            const wallet: Wallet = new Wallet();
            
            wallet.addAmount("ETH", 40);
            wallet.reduceAmount("ETH", 15);
            wallet.addAmount("ETH", 60);
            wallet.reduceAmount("ETH", 75);
    
            expect(wallet.history.length).toStrictEqual(4);
        });
    });
});