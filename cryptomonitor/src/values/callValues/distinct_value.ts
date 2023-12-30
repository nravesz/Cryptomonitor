import { Evaluable } from "../evaluable";

class DistinctValue implements Evaluable {
    constructor(
        private args: Evaluable[],
    ) {};

    public evaluate() {
        var result = true;
        const values = []
        this.args.forEach(function (evaluable) {
            if(values.includes(evaluable.evaluate())) result = false;
            values.push(evaluable.evaluate());
        })
        return result;
    }

    public toJSON() {
        return {
            type: "CALL",
            name: "DISTINCT",
            arguments: this.args.map(arg => arg.toJSON())
        }
    }
};

export default DistinctValue;