import { Evaluable } from "../evaluable";

class PlusValue implements Evaluable {
    constructor(
        private args: Evaluable[],
    ) {};

    public evaluate() {
        return this.args.map(arg => arg.evaluate()).reduce(
            (result, value) => result + value, 0
        );
    }

    public toJSON() {
        return {
            type: "CALL",
            name: "+",
            arguments: this.args.map(arg => arg.toJSON())
        }
    }
};

export default PlusValue;