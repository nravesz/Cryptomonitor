import EqualValue from "../../../src/values/callValues/equal_value";
import ConstantValue from "../../../src/values/constant_value";

describe("EqualValue", () => {
    describe ("evaluate", () => {
        it ("should evaluate to true if it only has a value", () => {
            const value = new EqualValue([new ConstantValue(55)]);
            expect(value.evaluate()).toStrictEqual(true);
        });

        it ("should evaluate to true if all its values are the same", () => {
            const value = new EqualValue([new ConstantValue(55), new ConstantValue(55), new ConstantValue(55)]);
            expect(value.evaluate()).toStrictEqual(true);
        });

        it ("should evaluate to false if not all values are the same", () => {
            const value = new EqualValue([new ConstantValue(45), new ConstantValue(55), new ConstantValue(45)]);
            expect(value.evaluate()).toStrictEqual(false);
        });
    });
});