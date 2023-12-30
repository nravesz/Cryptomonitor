import NegationValue from "../../../src/values/callValues/negation_value";
import ConstantValue from "../../../src/values/constant_value";

describe("NegationValue", () => {
    describe ("evaluate", () => {
        it ("should evaluate to the negation of the value it was created with", () => {
            const value = new NegationValue([new ConstantValue(5)]);
            expect(value.evaluate()).toStrictEqual(-5);
        });

        //ojo con este que devuelve -0 !!
        it ("should evaluate to zero if it was created with a constant value of zero", () => {
            const value = new NegationValue([new ConstantValue(0)]);
            expect(value.evaluate()).toBeCloseTo(0);
        })
    });
});