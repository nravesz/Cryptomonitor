import { Condition } from "./condition";
import { Evaluable } from "../values/evaluable";

export class EqualCondition extends Condition{
    private evaluables: Evaluable[];

    constructor(evaluables: Evaluable[]){
        super();
        this.evaluables = evaluables;
    }

    check() {
        return this.evaluables.every((evaluable) => evaluable.evaluate() === this.evaluables[0].evaluate());
    }

    public toJSON() {
        return {
            type: "CALL",
            name: "==",
            arguments: this.evaluables.map(evaluable => evaluable.toJSON())
        }
    }
}