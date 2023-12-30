import { Action } from "./actions/action"
import { Condition } from "./conditions/condition";

export class Rule {

    private condition: Condition;
    private actions: Action[] = [];

    constructor(
        readonly name: string
    ) {};

    addCondition(condition: Condition) {
        this.condition = condition;
    };

    addAction(action:Action){
        this.actions.push(action);
    };

    async trigger() {
        try {
            if (this.condition.check())
            await Promise.all(this.actions.map(action => action.execute()));
        } catch {
            console.error("There was an error executing actions of Rule", {
                name: this.name
            });
        }        
    };

    public toJSON() {
        return {
            name: this.name,
            condition: this.condition.toJSON(),
            action: this.actions.map(action => action.toJSON())
        }
    }
    
}