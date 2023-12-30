import { Evaluable } from "../evaluable";

class DivisionValue implements Evaluable {
    constructor(
        private args: Evaluable[],
    ) {};

    public evaluate() {
        return this.args.map(arg => arg.evaluate()).reduce(
            (result, value) => result / value, this.args[0].evaluate()**2
        );
    }

    public toJSON() {
        return {
            type: "CALL",
            name: "/",
            arguments: this.args.map(arg => arg.toJSON())
        }
    }
};

export default DivisionValue;