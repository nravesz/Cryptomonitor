import { Evaluable } from "../evaluable";

class LessThanValue implements Evaluable {
    constructor(
        private args: Evaluable[],
    ) {};

    public evaluate() {
        for (let index = 0; index < this.args.length - 1; index++) {
            const argLeft: Evaluable = this.args[index];
            const argRight: Evaluable = this.args[index + 1];

             if (argLeft.evaluate() >= argRight.evaluate())
                return false;           
        }
        return true;
    }

    public toJSON() {
        return {
            type: "CALL",
            name: "<",
            arguments: this.args.map(arg => arg.toJSON())
        }
    }
};

export default LessThanValue;