import { Condition } from "./condition";
import { Evaluable } from "../values/evaluable";

export class DistinctCondition extends Condition{
    private evaluables: Evaluable[];

    constructor(evaluables: Evaluable[]){
        super();
        this.evaluables = evaluables;
    }

    check() {
        var result = true;
        const values = []
        this.evaluables.forEach(function (evaluable) {
            if(values.includes(evaluable.evaluate())) result = false;
            values.push(evaluable.evaluate());
        })
        return result;
    }

    public toJSON() {
        return {
            type: "CALL",
            name: "DISTINCT",
            arguments: this.evaluables.map(evaluable => evaluable.toJSON())
        }
    }
}