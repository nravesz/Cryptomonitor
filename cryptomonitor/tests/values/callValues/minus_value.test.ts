import MinusValue from "../../../src/values/callValues/minus_value";
import ConstantValue from "../../../src/values/constant_value";

describe("MinusValue", () => {
    describe ("evaluate", () => {
        it ("should evaluate to the left value subtracted by the right value it was created with", () => {
            const value = new MinusValue([new ConstantValue(55), new ConstantValue(45)]);
            expect(value.evaluate()).toStrictEqual(10);
        });

        /*
        A implementar seguridad de tamaño de argumentos en todos los values
        it ("should not be able to be created with other than two arguments", () => {
            const value = new PlusValue([new ConstantValue(55), new ConstantValue(45), new ConstantValue(50)]);
            expect(value.evaluate()).toStrictEqual(150);
        });
        */
    });
});