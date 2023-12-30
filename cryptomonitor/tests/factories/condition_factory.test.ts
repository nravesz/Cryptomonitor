import Admin from "../../src/admin";
import { EqualCondition } from "../../src/conditions/equal_condition";
import { LessThanEqualsCondition } from "../../src/conditions/lessthanequals_condition";
import { LessThanCondition } from "../../src/conditions/lessthan_condition";
import { MoreThanEqualsCondition } from "../../src/conditions/morethanequals_condition";
import { MoreThanCondition } from "../../src/conditions/morethan_condition";
import ConditionFactory from "../../src/factories/condition_factory";
import Monitor from "../../src/monitor";

describe("Condition factory", () => {
    const admin = new Admin("mail@mail.com", "1234");
    const monitor = new Monitor(admin);
    const conditionFactory = new ConditionFactory(monitor);

    describe("create", () => {
        it ("should create an EqualCondition", () => {
            const equalConditionJson = {
                type: "CALL",
                name: "==",
                arguments: [
                    {
                        type: "CONSTANT",
                        value: 5
                    },
                    {
                        type: "CONSTANT",
                        value: 5.0
                    }
                ]
            };
    
            const condition = conditionFactory.create(equalConditionJson);
            expect(condition).toBeInstanceOf(EqualCondition);
        });

        it ("should create a MoreThanCondition", () => {
            const moreThanConditionJson = {
                type: "CALL",
                name: ">",
                arguments: [
                    {
                        type: "CONSTANT",
                        value: 5
                    },
                    {
                        type: "CONSTANT",
                        value: 3
                    }
                ]
            };
    
            const condition = conditionFactory.create(moreThanConditionJson);
            expect(condition).toBeInstanceOf(MoreThanCondition);
        });

        it ("should create a LessThanCondition", () => {
            const lessThanConditionJson = {
                type: "CALL",
                name: "<",
                arguments: [
                    {
                        type: "CONSTANT",
                        value: 2
                    },
                    {
                        type: "CONSTANT",
                        value: 3
                    }
                ]
            };
    
            const condition = conditionFactory.create(lessThanConditionJson);
            expect(condition).toBeInstanceOf(LessThanCondition);
        });

        it ("should create a MoreThanEqualsCondition", () => {
            const mteConditionJson = {
                type: "CALL",
                name: ">=",
                arguments: [
                    {
                        type: "CONSTANT",
                        value: 5.1
                    },
                    {
                        type: "CONSTANT",
                        value: 5.0
                    }
                ]
            };
    
            const condition = conditionFactory.create(mteConditionJson);
            expect(condition).toBeInstanceOf(MoreThanEqualsCondition);
        });

        it ("should create a LessThanEqualsCondition", () => {
            const lteConditionJson = {
                type: "CALL",
                name: "<=",
                arguments: [
                    {
                        type: "CONSTANT",
                        value: 5.0
                    },
                    {
                        type: "CONSTANT",
                        value: 4.9
                    }
                ]
            };
    
            const condition = conditionFactory.create(lteConditionJson);
            expect(condition).toBeInstanceOf(LessThanEqualsCondition);
        });
    });
});