import { Evaluable } from "../evaluable";

class AverageValue implements Evaluable {
    constructor(
        private args: Evaluable[],
    ) {};

    public evaluate() {
        return this.args.map(arg => arg.evaluate()).reduce(
            (result, value) => result + value, 0
        )/this.args.length;
    }

    public toJSON() {
        return {
            type: "CALL",
            name: "AVERAGE",
            arguments: this.args.map(arg => arg.toJSON())
        }
    }
};

export default AverageValue;