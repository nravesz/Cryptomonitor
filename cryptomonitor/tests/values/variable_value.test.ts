import Admin from "../../src/admin";
import VariableValue from "../../src/values/variable_value";

describe ("VariableValue", () => {
    describe ("evaluate", () => {
        it ("should evaluate to a variable set in the Admin", () => {
            const admin = new Admin("mail@mail.com", "1234");
            admin.setVariable("BTC_LIMIT", 1500);
            admin.setVariable("STABLE_CURRENCY", "USDT");
            admin.setVariable("BUY_ETH", false);

            const value1 = new VariableValue(admin, "BTC_LIMIT");
            const value2 = new VariableValue(admin, "STABLE_CURRENCY");
            const value3 = new VariableValue(admin, "BUY_ETH");

            expect(value1.evaluate()).toStrictEqual(1500);
            expect(value2.evaluate()).toStrictEqual("USDT");
            expect(value3.evaluate()).toStrictEqual(false);
        });

        it ("should evaluate to the current value for the variable", () => {
            const admin = new Admin("mail@mail.com", "1234");
            const value = new VariableValue(admin, "BTC_LIMIT");
            expect(value.evaluate()).toBeUndefined();

            admin.setVariable("BTC_LIMIT", 100);
            expect(value.evaluate()).toStrictEqual(100);

            admin.setVariable("BTC_LIMIT", 1000);
            expect(value.evaluate()).toStrictEqual(1000);
        });
    });
});