import ConstantValue from "../../src/values/constant_value";

describe("ConstantValue", () => {
    describe ("evaluate", () => {
        it ("should evaluate to the number it was created with", () => {
            const value = new ConstantValue(155);
            expect(value.evaluate()).toStrictEqual(155);
        });

        it ("should evaluate to the string it was created with", () => {
            const value = new ConstantValue("BTC/USDT");
            expect(value.evaluate()).toStrictEqual("BTC/USDT");
        });

        it ("should evaluate to the boolean it was created with", () => {
            const value = new ConstantValue(false);
            expect(value.evaluate()).toStrictEqual(false);
        });
    });
});