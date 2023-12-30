import { Evaluable } from "../evaluable";

class MinusValue implements Evaluable {
    constructor(
        private args: Evaluable[],
    ) {};

    public evaluate() {
        return this.args.map(arg => arg.evaluate()).reduce(
            (result, value) => result - value, 2*this.args[0].evaluate()
        );
    }

    public toJSON() {
        return {
            type: "CALL",
            name: "-",
            arguments: this.args.map(arg => arg.toJSON())
        }
    }
};

export default MinusValue;