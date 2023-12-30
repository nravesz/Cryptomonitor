import WalletValue from "../../src/values/wallet_value";
import { Wallet } from "../../src/wallet";

describe ("WalletValue", () => {
    describe ("evaluate", () => {
        it ("should evaluate to an amount in the Wallet", () => {
            const wallet = new Wallet();
            const value = new WalletValue(wallet, "BTC");

            wallet.addAmount("BTC", 150);

            expect(value.evaluate()).toStrictEqual(150);
        });

        it ("should evaluate to the currency amount in Wallet", () => {
            const wallet = new Wallet();
            const value = new WalletValue(wallet, "BTC");
            expect(value.evaluate()).toStrictEqual(0);

            wallet.addAmount("BTC", 150);
            expect(value.evaluate()).toStrictEqual(150);

            wallet.reduceAmount("BTC", 77);
            expect(value.evaluate()).toStrictEqual(73);
        });
    });
});