import AverageValue from "../../../src/values/callValues/average_value";
import ConstantValue from "../../../src/values/constant_value";

describe("AverageValue", () => {
    describe ("evaluate", () => {
        it ("should evaluate to the mean between the two values it was created with", () => {
            const value = new AverageValue([new ConstantValue(5), new ConstantValue(15)]);
            expect(value.evaluate()).toEqual(10);
        });

        it ("should evaluate to the value it was created with", () => {
            const value = new AverageValue([new ConstantValue(5)]);
            expect(value.evaluate()).toEqual(5);
        })

        it ("should evaluate to the mean between the three values it was created with", () => {
            const value = new AverageValue([new ConstantValue(5), new ConstantValue(15), new ConstantValue(25)]);
            expect(value.evaluate()).toEqual(15);
        })
    });
});