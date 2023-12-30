import { Evaluable } from "./evaluable";

class ConstantValue implements Evaluable {

    constructor(
        private value: boolean | number | string,
    ) {};

    evaluate() {
        return this.value;
    }

    public toJSON() {
        return {
            type: "CONSTANT",
            value: this.value
        }
    }
};

export default ConstantValue;