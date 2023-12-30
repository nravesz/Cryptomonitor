import MoreThanValue from "../../../src/values/callValues/morethan_value";
import ConstantValue from "../../../src/values/constant_value";

describe("MoreThanValue", () => {
    describe ("evaluate", () => {
        it ("should evaluate to true if the left value is more than the right value", () => {
            const value = new MoreThanValue([new ConstantValue(55), new ConstantValue(45)]);
            expect(value.evaluate()).toStrictEqual(true);
        });

        it ("should evaluate to false if the left value is less than the right value", () => {
            const value = new MoreThanValue([new ConstantValue(45), new ConstantValue(54)]);
            expect(value.evaluate()).toStrictEqual(false);
        });

        it ("should evaluate to false if both values are the same", () => {
            const value = new MoreThanValue([new ConstantValue(55), new ConstantValue(55)]);
            expect(value.evaluate()).toStrictEqual(false);
        });

        it ("should evaluate to true if all values are more than their value to the right", () => {
            const value = new MoreThanValue([new ConstantValue(75), new ConstantValue(65), new ConstantValue(55)]);
            expect(value.evaluate()).toStrictEqual(true);
        });

        it ("should evaluate to false if not all values are strictly more than their value to the right", () => {
            const value = new MoreThanValue([new ConstantValue(55), new ConstantValue(65), new ConstantValue(75), new ConstantValue(50)]);
            expect(value.evaluate()).toStrictEqual(false);
        });
    });
});