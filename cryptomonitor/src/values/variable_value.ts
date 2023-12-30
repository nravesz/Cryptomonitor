import Admin from "../admin";
import { Evaluable } from "./evaluable";

class VariableValue implements Evaluable {

    constructor(
        private admin: Admin,
        private name: string,
    ) {}

    evaluate() {
        return this.admin.getVariable(this.name);
    }

    public toJSON() {
        return {
            type: "VARIABLE",
            name: this.name
        }
    }
};

export default VariableValue;