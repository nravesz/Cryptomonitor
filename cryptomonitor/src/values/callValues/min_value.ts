import { Evaluable } from "../evaluable";

class MinValue implements Evaluable {
    constructor(
        private args: Evaluable[],
    ) {};

    public evaluate() {
        return this.args.map(arg => arg.evaluate()).reduce(
            (result, value) => (result < value) ? result : value , this.args[0].evaluate()
        );
    }

    public toJSON() {
        return {
            type: "CALL",
            name: "MIN",
            arguments: this.args.map(arg => arg.toJSON())
        }
    }
};

export default MinValue;