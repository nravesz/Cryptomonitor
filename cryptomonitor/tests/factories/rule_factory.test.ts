import * as fs from "fs";
import Admin from "../../src/admin";
import RuleFactory from "../../src/factories/rule_factory";
import Monitor from "../../src/monitor";
import { Rule } from "../../src/rule";
import { RuleParser } from "../../src/rule_parser";

const RULES_PATH = __dirname + "/../rules/";

const getRulesFromFileName = (fileName: string) => {
    const sampeRuleFilepath = RULES_PATH + fileName;
    const ruleFileContent = fs.readFileSync(sampeRuleFilepath, 'utf-8');
    const rulesJson = JSON.parse(ruleFileContent);
    return rulesJson.rules;
}

describe ("RuleFactory", () => {
    const admin = new Admin("mail@mail.com", "1234");
    const monitor = new Monitor(admin);
    const ruleFactory = new RuleFactory(monitor);

    describe ("initialize", () => {
        it ("should return a RuleFactory", () => {
            const factory = new RuleFactory(monitor);

            expect(factory).toBeInstanceOf(RuleFactory);
        });

        it ("should be created with a RuleParser", () => {
            const factory = new RuleFactory(monitor);

            expect(factory.parser).toBeInstanceOf(RuleParser);
        });
    });

    describe ("create", () => {
        it ("should create Rules from ParsedRules", () => {
            const admin: Admin = new Admin("email@mail.com", "my-pass-123");

            const factory = new RuleFactory(monitor);
            const parser = new RuleParser();
            
            const parsedRules = parser.parse(RULES_PATH + "rule.json");
            const rules = parsedRules.map(parsedRule => factory.create(parsedRule));
            expect(rules.length).toStrictEqual(1);
            expect(rules[0]).toBeInstanceOf(Rule);
        });

        it ("should create a Rule from a ParsedRule", () => {
            const parsedRules = getRulesFromFileName("sell_if_below_variable_rule.json");
            const rule = ruleFactory.create(parsedRules[0]);
            
            expect(rule).toBeInstanceOf(Rule);
            expect(rule.name).toStrictEqual("Escape")

            const doubleParsedRules = getRulesFromFileName("double_rules.json");
            const firstDoubleRule = ruleFactory.create(doubleParsedRules[0]);
            const secondDoubleRule = ruleFactory.create(doubleParsedRules[1]);
            
            expect(firstDoubleRule).toBeInstanceOf(Rule);
            expect(secondDoubleRule).toBeInstanceOf(Rule);
            expect(firstDoubleRule.name).toStrictEqual("Comprar 12 TDD/USDT siempre (1)")
            expect(secondDoubleRule.name).toStrictEqual("Comprar 12 TDD/USDT siempre (2)")
        });
    });
});