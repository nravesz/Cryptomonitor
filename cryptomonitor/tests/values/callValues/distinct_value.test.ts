import DistinctValue from "../../../src/values/callValues/distinct_value";
import ConstantValue from "../../../src/values/constant_value";

describe("DistinctValue", () => {
    describe ("evaluate", () => {
        it ("should evaluate to true if it only has a value", () => {
            const value = new DistinctValue([new ConstantValue(55)]);
            expect(value.evaluate()).toStrictEqual(true);
        });

        it ("should evaluate to true if all its values are different", () => {
            const value = new DistinctValue([new ConstantValue(55), new ConstantValue(45), new ConstantValue(5)]);
            expect(value.evaluate()).toStrictEqual(true);
        });

        it ("should evaluate to false if any value is repeated", () => {
            const value = new DistinctValue([new ConstantValue(45), new ConstantValue(45), new ConstantValue(55)]);
            expect(value.evaluate()).toStrictEqual(false);
        });
    });
});