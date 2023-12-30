import { RuleParser } from "../src/rule_parser";
import * as fs from 'fs';

const RULES_PATH = __dirname + "/rules/";

describe ("Rule parser", () => {
    describe ("initialize", () => {
        it ("should return a RuleParser", () => {
            const parser = new RuleParser();

            expect(parser).toBeInstanceOf(RuleParser);
        });
    });

    describe ("parse", () => {
        it ("should throw error if file name is not json", () => {
            const parser = new RuleParser();
            
            expect(() => parser.parse(RULES_PATH + "note_rule.txt")).toThrow('Invalid file format');
        });

        it ("should throw error if file does not exist", () => {
            const parser = new RuleParser();

            expect(() => parser.parse(RULES_PATH + "fake_rule.json")).toThrow();
        });

        it ("should return an array of ParsedRules", () => {
            const parser = new RuleParser();
            const rules = parser.parse(RULES_PATH + "rule.json");

            expect(rules[0]).toBeDefined();
        });

        it ("should return a ParsedRule for each rule in the file", () => {
            const parser = new RuleParser();
            const rules = parser.parse(RULES_PATH + "double_rules.json");
           
            expect(rules.length).toStrictEqual(2);
        });

        it ("should throw error if no 'rules' are set", () => {
            const parser = new RuleParser();

            expect(
                () => parser.parse(RULES_PATH + "no_rules.json")
            ).toThrow('Invalid Rule format');
        });

        it ("should throw error if 'name', 'action' or 'condition' are missing", () => {
            const parser = new RuleParser();

            expect(
                () => parser.parse(RULES_PATH + "no_name_rule.json")
            ).toThrow('Invalid Rule format');
            expect(
                () => parser.parse(RULES_PATH + "no_action_rule.json")
            ).toThrow('Invalid Rule format');
            expect(
                () => parser.parse(RULES_PATH + "no_condition_rule.json")
            ).toThrow('Invalid Rule format');
        });

        it ("should throw error if condition of rule has no type", () => {
            const parser = new RuleParser();

            expect(
                () => parser.parse(RULES_PATH + "condition_with_no_type_rule.json")
            ).toThrow('Invalid Condition format');
        });

        it ("should throw error if action of rule has no type", () => {
            const parser = new RuleParser();

            expect(
                () => parser.parse(RULES_PATH + "action_with_no_type_rule.json")
            ).toThrow('Invalid Action format');
        });
    });

    describe("parseString", () => {
        it ("should parse a rules JSON", () => {
            const parser = new RuleParser();
            const fileName = RULES_PATH + "double_rules.json";
            const fileContent: string = fs.readFileSync(fileName, 'utf-8');
            const rulesJson = JSON.parse(fileContent)

            const rules = parser.parseString(rulesJson);
            expect(rules.length).toStrictEqual(2);
        });
    });
});


