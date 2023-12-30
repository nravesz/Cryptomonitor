import MaxValue from "../../../src/values/callValues/max_value";
import ConstantValue from "../../../src/values/constant_value";

describe("MaxValue", () => {
    describe ("evaluate", () => {
        it ("should evaluate to the lower value of the values it is created with", () => {
            const value = new MaxValue([new ConstantValue(5), new ConstantValue(15), new ConstantValue(25)]);
            expect(value.evaluate()).toBeCloseTo(25);
        });

        it ("should evaluate to the lower value of the values it is created with even if it is not on the last position", () => {
            const value = new MaxValue([new ConstantValue(15), new ConstantValue(15), new ConstantValue(4)]);
            expect(value.evaluate()).toBeCloseTo(15);
        });

        it ("should evaluate to the value it was created with if it only has one value", () => {
            const value = new MaxValue([new ConstantValue(25)]);
            expect(value.evaluate()).toBeCloseTo(25);
        });
    });
});