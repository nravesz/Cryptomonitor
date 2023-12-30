import Admin from "../src/admin";
import { Wallet } from "../src/wallet";

describe("Wallet and Admin integration", () => {
    describe("initialize Admin", () => {
        it ("should be created with an empty wallet", () => {
            const admin = new Admin("my_mail@mail.com", "pass123");

            expect(admin).toBeInstanceOf(Admin);
            expect(admin.wallet).toBeInstanceOf(Wallet);

            expect(admin.wallet.getCurrencies().length).toStrictEqual(0);
            expect(admin.wallet.history.length).toStrictEqual(0);
        });
    });

    describe("wallet access", () => {
        it ("should be able to see wallet amounts per currency", () => {
            const admin = new Admin("my_mail@mail.com", "pass123");

            const adminWallet = admin.wallet;
            adminWallet.addAmount("BTC", 500);
            adminWallet.addAmount("ETH", 300);

            expect(admin.getCurrency("BTC")).toStrictEqual(500);
            expect(admin.getCurrency("ETH")).toStrictEqual(300);
        });

        it ("should be able to see wallet transaction history", () => {
            const admin = new Admin("my_mail@mail.com", "pass123");

            const adminWallet = admin.wallet;
            adminWallet.addAmount("BTC", 500);
            adminWallet.reduceAmount("BTC", 100);
            adminWallet.addAmount("BTC", 50);
            adminWallet.addAmount("ETH", 25);
            adminWallet.reduceAmount("ETH", 15);

            expect(
                admin.getTransactionHistory()
            ).toStrictEqual(
                [
                    { currency: "BTC", amount: 500 },
                    { currency: "BTC", amount: -100 },
                    { currency: "BTC", amount: 50 },
                    { currency: "ETH", amount: 25},
                    { currency: "ETH", amount: -15},
                ]
            );
        });

        it ("should be able to see transaction history per currency", () => {
            const admin = new Admin("my_mail@mail.com", "pass123");

            const adminWallet = admin.wallet;
            adminWallet.addAmount("BTC", 500);
            adminWallet.reduceAmount("BTC", 100);
            adminWallet.addAmount("BTC", 50);
            adminWallet.addAmount("ETH", 25);
            adminWallet.reduceAmount("ETH", 15);

            expect(
                admin.getCurrencyTransactionHistory("BTC")
            ).toStrictEqual(
                [
                    { currency: "BTC", amount: 500 },
                    { currency: "BTC", amount: -100 },
                    { currency: "BTC", amount: 50 },
                ]
            );
        });
    });
});