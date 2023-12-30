import { RuleParser } from "../src/rule_parser";
import RuleFactory from "../src/factories/rule_factory";
import { monitor } from "../index";

class RulesService {
    
    private ruleParser = new RuleParser();
    private ruleFactory = new RuleFactory(monitor);

    public allRules() {
        return monitor.rules.map(rule => rule.toJSON());
    }

    public rulesByName(name: string) {
        return monitor.rules.filter(rule => rule.name === name);
    }

    public addRules(requestRules) {
        const parsedRules = this.ruleParser.parseString(requestRules);
        const rules = parsedRules.map(parsedRule => this.ruleFactory.create(parsedRule));
        rules.map(rule => monitor.addRule(rule));
    }
}

export default RulesService;