import StdDevValue from "../../../src/values/callValues/stddev_value";
import ConstantValue from "../../../src/values/constant_value";

describe("StdDevValue", () => {
    describe ("evaluate", () => {
        it ("should evaluate to the standard deviation of the array of evaluables it was created with", () => {
            const value = new StdDevValue([new ConstantValue(5), new ConstantValue(15), new ConstantValue(25)]);
            expect(value.evaluate()).toBeCloseTo(8.1649658092773);
        });

        it ("should evaluate to zero if it has only a value", () => {
            const value = new StdDevValue([new ConstantValue(5)]);
            expect(value.evaluate()).toBeCloseTo(0);
        });

        it ("should evaluate to zero if all values are the same", () => {
            const value = new StdDevValue([new ConstantValue(5),new ConstantValue(5),new ConstantValue(5),new ConstantValue(5)]);
            expect(value.evaluate()).toBeCloseTo(0);
        });
    });
});