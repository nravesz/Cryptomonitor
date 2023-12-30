import Monitor from "../../../src/monitor";
import LastValue from "../../../src/values/callValues/last_value";
import ConstantValue from "../../../src/values/constant_value";
import DataValue from "../../../src/values/data_value";
import dataValueMock from "../../mocks/data_value";
import monitorMock from "../../mocks/monitor";




describe("LastValue", () => {
    describe("evaluate", () => {
        it("should evaluate to the last value of an array of Evaluables", () => {
            const value = new LastValue([
                new ConstantValue(56),
                new ConstantValue(10),
                new ConstantValue(10000),
                new ConstantValue(-6),
                new ConstantValue(2),
            ]);

            expect(value.evaluate()).toStrictEqual(2)
        });

        it("should evaluate to a single value if created with one Evaluable", () => {
            const value = new LastValue(new ConstantValue(5));

            expect(value.evaluate()).toStrictEqual(5);
        });

        it("should evaluate to the last value of an Enumerable that evalutes to an array", () => {
            const value = new LastValue(dataValueMock);

            expect(value.evaluate()).toStrictEqual(21);            
        });
    });
});