import * as fs from 'fs';

export type Value = object & {
    type: string;
    value?: number | string | boolean;
};

export type Action = object & {
    type: string;
    symbol?: string;
    name?: string;
    amount?: Value;
    value?: object;
}

export type Condition = object & {
    type: string;
    name?: string;
    value?: boolean;
    arguments?: Value[];
};

export interface ParsedRule {
    name: string,
    action: Action[],
    condition: Condition,
}

export class RuleParser {

    public parse(file_name: string): ParsedRule[] {
        if (!file_name.endsWith(".json")) {
            throw new Error('Invalid file format')
        }

        const file_content: string = fs.readFileSync(file_name, 'utf-8');
        const fileObject = JSON.parse(file_content);
        return this.parseJson(fileObject);
    };

    public parseString(jsonRules: string): ParsedRule[] {
        return this.parseJson(jsonRules);
    }

    private parseJson(jsonObject): ParsedRule[] {        
        const rulesObject = jsonObject.rules;
        if (!rulesObject) throw new Error('Invalid Rule format');

        const rules: ParsedRule[] = [];
        
        rulesObject.forEach((rule: ParsedRule) => {
            if (!rule.name || !rule.action || !rule.condition) 
                throw new Error('Invalid Rule format');
            if (!rule.condition.type)
                throw new Error('Invalid Condition format');
            rule.action.forEach((action: Action) => {
                if (!action.type)
                    throw new Error('Invalid Action format');
            });
            rules.push(rule);
        });

        return rules;
    }
};