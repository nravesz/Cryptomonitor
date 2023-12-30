import Admin from "../admin";
import { ConstantCondition } from "../conditions/constant_condition";
import { DistinctCondition } from "../conditions/distinct_condition";
import { EqualCondition } from "../conditions/equal_condition";
import { LessThanEqualsCondition } from "../conditions/lessthanequals_condition";
import { LessThanCondition } from "../conditions/lessthan_condition";
import { MoreThanEqualsCondition } from "../conditions/morethanequals_condition";
import { MoreThanCondition } from "../conditions/morethan_condition";
import Monitor from "../monitor";
import { Condition } from "../rule_parser";
import { Evaluable } from "../values/evaluable";
import { Wallet } from "../wallet";
import ValueFactory from "./value_factory";

class ConditionFactory {

    readonly valueFactory: ValueFactory = new ValueFactory(
        this.monitor
    );

    constructor(
        private monitor: Monitor,
    ) {};

    create(parsedCondition: Condition) {
        if (parsedCondition.type === "CONSTANT")
            return new ConstantCondition(parsedCondition.value);

        const args: Evaluable[] = [];
        parsedCondition.arguments.forEach(argument => {
            args.push(this.valueFactory.create(argument));
        });
        switch(parsedCondition.name) {
            case ">":
                return new MoreThanCondition(args);
            case "<":
                return new LessThanCondition(args);
            case ">=":
                return new MoreThanEqualsCondition(args);
            case "<=":
                return new LessThanEqualsCondition(args); 
            case "==":
                return new EqualCondition(args);
            case "DISTINCT":
                return new DistinctCondition(args);
        }
    }
};

export default ConditionFactory;