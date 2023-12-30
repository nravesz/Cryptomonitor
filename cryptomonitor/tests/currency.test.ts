import Currency from "../src/currency";

describe("Currency", () => {

    describe("name", () => {
        it ("should be created with a name", () => {
            const currency = new Currency("bitcoin");
            
            expect(currency).toBeInstanceOf(Currency);
            expect(currency.name).toStrictEqual("bitcoin");
        });
    });

    describe("getMarketState", () => {
        it ("marked state shoud be stable when created", () => {
            const currency = new Currency("bitcoin");
            
            expect(currency.getMarketState()).toStrictEqual("Estable");
        });
    });

    describe("getHistoryMean", () => {
        it ("calculate history mean", () => {
            const currency = new Currency("bitcoin");
            const date1 = new Date();
            const date2 = new Date();
            date1.setDate(date1.getDate() - 1);
            currency.addValueToHistory(date1, 2)
            expect(currency.getHistoryMean(date1, date2)).toStrictEqual(2);
        });
    });

});