import PlusValue from "../../../src/values/callValues/plus_value";
import ConstantValue from "../../../src/values/constant_value";

describe("PlusValue", () => {
    describe ("evaluate", () => {
        it ("should evaluate to the sum of the values it was created with (2 values)", () => {
            const value = new PlusValue([new ConstantValue(55), new ConstantValue(45)]);
            expect(value.evaluate()).toStrictEqual(100);
        });

        it ("should evaluate to the sum of the values it was created with (3 values)", () => {
            const value = new PlusValue([new ConstantValue(55), new ConstantValue(45), new ConstantValue(50)]);
            expect(value.evaluate()).toStrictEqual(150);
        });

        it ("should evaluate to the sum of the values it was created with (1 value)", () => {
            const value = new PlusValue([new ConstantValue(55)]);
            expect(value.evaluate()).toStrictEqual(55);
        });
    });
});