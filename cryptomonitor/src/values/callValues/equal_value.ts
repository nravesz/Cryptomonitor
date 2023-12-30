import { Evaluable } from "../evaluable";

class EqualValue implements Evaluable {
    constructor(
        private args: Evaluable[],
    ) {};

    public evaluate() {
        return this.args.every((evaluable) => evaluable.evaluate() === this.args[0].evaluate());
    }

    public toJSON() {
        return {
            type: "CALL",
            name: "==",
            arguments: this.args.map(arg => arg.toJSON())
        }
    }
};

export default EqualValue;