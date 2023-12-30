import MinValue from "../../../src/values/callValues/min_value";
import ConstantValue from "../../../src/values/constant_value";

describe("MinValue", () => {
    describe ("evaluate", () => {
        it ("should evaluate to the lower value of the values it is created with", () => {
            const value = new MinValue([new ConstantValue(5), new ConstantValue(15), new ConstantValue(25)]);
            expect(value.evaluate()).toBeCloseTo(5);
        });

        it ("should evaluate to the lower value of the values it is created with even if it is not on the first position", () => {
            const value = new MinValue([new ConstantValue(15), new ConstantValue(15), new ConstantValue(4)]);
            expect(value.evaluate()).toBeCloseTo(4);
        });

        it ("should evaluate to the value it was created with if it only has one value", () => {
            const value = new MinValue([new ConstantValue(25)]);
            expect(value.evaluate()).toBeCloseTo(25);
        });
    });
});