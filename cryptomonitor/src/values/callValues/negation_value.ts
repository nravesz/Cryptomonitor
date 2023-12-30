import { Evaluable } from "../evaluable";

class NegationValue implements Evaluable {
    constructor(
        private args: Evaluable[],
    ) {};

    public evaluate() {
        return this.args.map(arg => arg.evaluate()*-1).reduce(
            (result, value) => value, 0
        );
    }

    public toJSON() {
        return {
            type: "CALL",
            name: "NEGATE",
            arguments: this.args.map(arg => arg.toJSON())
        }
    }
};

export default NegationValue;