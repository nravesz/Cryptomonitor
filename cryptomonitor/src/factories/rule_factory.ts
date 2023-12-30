import { Action } from "../actions/action";
import Monitor from "../monitor";
import { Rule } from "../rule";
import { ParsedRule, RuleParser } from "../rule_parser";
import ActionFactory from "./action_factory";
import ConditionFactory from "./condition_factory";

class RuleFactory {
    readonly parser: RuleParser = new RuleParser();
    readonly conditionFactory: ConditionFactory = new ConditionFactory(
        this.monitor
    );
    readonly actionFactory: ActionFactory = new ActionFactory(
        this.monitor
    );

    constructor(
        private monitor: Monitor,
    ) {};

    create(parsedRule: ParsedRule) {
        const rule = new Rule(parsedRule.name);

        const condition = this.conditionFactory.create(parsedRule.condition);
        rule.addCondition(condition);

        parsedRule.action.forEach(parsedAction => {
            const action: Action = this.actionFactory.create(parsedAction);
            rule.addAction(action);
        });
        
        return rule;
    }
};

export default RuleFactory;