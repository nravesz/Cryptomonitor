import DivisionValue from "../../../src/values/callValues/division_value";
import ConstantValue from "../../../src/values/constant_value";

describe("DivisionValue", () => {
    describe ("evaluate", () => {
        it ("should evaluate to the left value divided by the right value it was created with", () => {
            const value = new DivisionValue([new ConstantValue(20), new ConstantValue(4)]);
            expect(value.evaluate()).toBeCloseTo(5);
        });

        /*
        A implementar seguridad de tamaño de argumentos en todos los values
        it ("should not be able to be created with other than two arguments", () => {
            const value = new DivisionValue([new ConstantValue(55), new ConstantValue(45), new ConstantValue(50)]);
            expect(value.evaluate()).toStrictEqual(150);
        });
        */
    });
});