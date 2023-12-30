import MultiplicationValue from "../../../src/values/callValues/multiplication_value";
import ConstantValue from "../../../src/values/constant_value";

describe("MultiplicationValue", () => {
    describe ("evaluate", () => {
        it ("should evaluate to the multiplication of the two values it was created with", () => {
            const value = new MultiplicationValue([new ConstantValue(5), new ConstantValue(4)]);
            expect(value.evaluate()).toStrictEqual(20);
        });

        it ("should evaluate to the first value minus the subsequent values when more than 2 values are provided", () => {
            const value = new MultiplicationValue([new ConstantValue(5), new ConstantValue(4), new ConstantValue(5)]);
            expect(value.evaluate()).toStrictEqual(100);
        })

        it ("should evaluate to the first value when only a value is provided", () => {
            const value = new MultiplicationValue([new ConstantValue(55)]);
            expect(value.evaluate()).toStrictEqual(55);
        })
    });
});