
import { Admin } from "../admin";
import { Action } from "./action";
import { Evaluable } from "../values/evaluable";

export class SetVariableAction extends Action{

    private admin: Admin;
    private name: string;

    constructor(admin: Admin, name: string, evaluable: Evaluable){
        super(evaluable);
        this.admin=admin;
        this.name=name;
    }

    execute(){
        this.admin.setVariable(this.name,this.evaluable.evaluate())
    };

    public toJSON() {
        return {
            type: "SET_VARIABLE",
            name: this.name,
            value: this.evaluable.toJSON()
        }
    }
}