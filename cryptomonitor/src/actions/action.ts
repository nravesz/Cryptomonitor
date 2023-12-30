import { Evaluable } from "../values/evaluable";

export class Action {
    protected evaluable: Evaluable;

    constructor(evaluable: Evaluable){
        this.evaluable = evaluable;
    }

    execute(){};

    public toJSON () {
        return {};
    };
}