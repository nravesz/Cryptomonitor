import ConstantValue from "../constant_value";
import { Evaluable } from "../evaluable";
import AverageValue from "./average_value";

class StdDevValue implements Evaluable {
    constructor(
        private args: Evaluable[],
    ) {};

    public evaluate() {
        const mean = new AverageValue(this.args).evaluate();
        return (this.args.map(arg => (arg.evaluate() - mean)**2).reduce(
            (result, value) => result + value as number, 0
        ) / this.args.length)**0.5

    }

    public toJSON() {
        return {
            type: "CALL",
            name: "STDDEV",
            arguments: this.args.map(arg => arg.toJSON())
        }
    }
};

export default StdDevValue;