import { Evaluable } from "../evaluable";

class LastValue implements Evaluable {
    constructor(
        private args: Evaluable[] | Evaluable,
    ) {};

    evaluate() {
        if (this.args instanceof Array) {
            return this.args[this.args.length - 1].evaluate();
        }

        const value = this.args.evaluate();
        if (value instanceof Array) {
            return value[value.length - 1];
        }
        return value;
    }

    public toJSON() {
        const argsJson = (this.args instanceof Array) ?
            this.args.map(args => args.toJSON()) :
            this.args.toJSON();
            
        return {
            type: "CALL",
            name: "LAST",
            arguments: argsJson
        };
    }
};

export default LastValue;