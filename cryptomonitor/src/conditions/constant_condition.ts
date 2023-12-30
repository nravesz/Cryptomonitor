import { Condition } from "./condition";

export class ConstantCondition extends Condition{

    constructor(
        readonly value: boolean,
    ) {
        super();
    };

    check() {
        return this.value;
    }

    public toJSON() {
        return {
            type: "CONSTANT",
            value: this.value
        }
    }
}