import Admin from "../../src/admin";
import ValueFactory from "../../src/factories/value_factory";
import Monitor from "../../src/monitor";
import AverageValue from "../../src/values/callValues/average_value";
import DistinctValue from "../../src/values/callValues/distinct_value";
import DivisionValue from "../../src/values/callValues/division_value";
import EqualValue from "../../src/values/callValues/equal_value";
import LessThanEqualsValue from "../../src/values/callValues/lessthanequals_value";
import LessThanValue from "../../src/values/callValues/lessthan_value";
import MaxValue from "../../src/values/callValues/max_value";
import MinusValue from "../../src/values/callValues/minus_value";
import MinValue from "../../src/values/callValues/min_value";
import MoreThanEqualsValue from "../../src/values/callValues/morethanequals_value";
import MoreThanValue from "../../src/values/callValues/morethan_value";
import MultiplicationValue from "../../src/values/callValues/multiplication_value";
import NegationValue from "../../src/values/callValues/negation_value";
import PlusValue from "../../src/values/callValues/plus_value";
import StdDevValue from "../../src/values/callValues/stddev_value";
import ConstantValue from "../../src/values/constant_value";
import DataValue from "../../src/values/data_value";
import VariableValue from "../../src/values/variable_value";
import WalletValue from "../../src/values/wallet_value";

describe("ValueFactory", () => {
    const admin = new Admin("mail@mail.com", "1234");
    const monitor = new Monitor(admin);
    const valueFactory = new ValueFactory(monitor);

    describe("create", () => {
        it ("should create a ConstantValue", () => {
            const constantValueJson = {
                type: "CONSTANT",
                value: "my constant value"
            };

            const value = valueFactory.create(constantValueJson);
            expect(value).toBeInstanceOf(ConstantValue);
        });

        it ("should create a VariableValue", () => {
            const variableValueJson = {
                type: "VARIABLE",
                name: "MY_VARIABLE"
            };

            const value = valueFactory.create(variableValueJson);
            expect(value).toBeInstanceOf(VariableValue);
        });

        it ("should create a WalletValue", () => {
            const walletValueJson = {
                type: "WALLET",
                symbol: "BTC"
            };

            const value = valueFactory.create(walletValueJson);
            expect(value).toBeInstanceOf(WalletValue);
        });

        it ("should create a DataValue", () => {
            const dataValueJson = {
                type: "DATA",
                symbol: "TDD/USDT",
                from: 7200,
                until: 3600,
                default: [{
                    type: "CONSTANT",
                    value: 2000
                },{
                    type: "CONSTANT",
                    value: 2001
                }]
            };

            const value = valueFactory.create(dataValueJson);
            expect(value).toBeInstanceOf(DataValue);
        });

        it ("should create a PlusValue", () => {
            const plusValueJson = {
                type: "CALL",
                name: "+",
                arguments: [{
                    type: "CONSTANT",
                    value: 2000
                },{
                    type: "CONSTANT",
                    value: 2001
                }]
            };            

            const value = valueFactory.create(plusValueJson);
            expect(value).toBeInstanceOf(PlusValue);
        });

        it ("should create a MultiplicationValue", () => {
            const multiplicationValueJson = {
                type: "CALL",
                name: "*",
                arguments: [{
                    type: "CONSTANT",
                    value: 2000
                },{
                    type: "CONSTANT",
                    value: 2001
                }]
            };
            const value = valueFactory.create(multiplicationValueJson);
            expect(value).toBeInstanceOf(MultiplicationValue);
        });

        it ("should create an AverageValue", () => {
            const averageValueJson = {
                type: "CALL",
                name: "AVERAGE",
                arguments: [{
                    type: "CONSTANT",
                    value: 2000
                },{
                    type: "CONSTANT",
                    value: 2001
                }]
            };
            const value = valueFactory.create(averageValueJson);
            expect(value).toBeInstanceOf(AverageValue);
        });

        it ("should create an StdDevValue", () => {
            const stdDevValueJson = {
                type: "CALL",
                name: "STDDEV",
                arguments: [{
                    type: "CONSTANT",
                    value: 2000
                },{
                    type: "CONSTANT",
                    value: 2001
                }]
            };
            const value = valueFactory.create(stdDevValueJson);
            expect(value).toBeInstanceOf(StdDevValue);
        });

        it ("should create an MinValue", () => {
            const minValueJson = {
                type: "CALL",
                name: "MIN",
                arguments: [{
                    type: "CONSTANT",
                    value: 2000
                },{
                    type: "CONSTANT",
                    value: 2001
                }]
            };
            const value = valueFactory.create(minValueJson);
            expect(value).toBeInstanceOf(MinValue);
        });

        it ("should create an MaxValue", () => {
            const maxValueJson = {
                type: "CALL",
                name: "MAX",
                arguments: [{
                    type: "CONSTANT",
                    value: 2000
                },{
                    type: "CONSTANT",
                    value: 2001
                }]
            };
            const value = valueFactory.create(maxValueJson);
            expect(value).toBeInstanceOf(MaxValue);
        });

        it ("should create an EqualValue", () => {
            const equalValueJson = {
                type: "CALL",
                name: "==",
                arguments: [{
                    type: "CONSTANT",
                    value: 2000
                },{
                    type: "CONSTANT",
                    value: 2001
                }]
            };
            const value = valueFactory.create(equalValueJson);
            expect(value).toBeInstanceOf(EqualValue);
        });

        it ("should create a DistinctValue", () => {
            const distinctValueJson = {
                type: "CALL",
                name: "DISTINCT",
                arguments: [{
                    type: "CONSTANT",
                    value: 2000
                },{
                    type: "CONSTANT",
                    value: 2001
                }]
            };
            const value = valueFactory.create(distinctValueJson);
            expect(value).toBeInstanceOf(DistinctValue);
        });

        it ("should create a LessThanValue", () => {
            const lessThanValueJson = {
                type: "CALL",
                name: "<",
                arguments: [{
                    type: "CONSTANT",
                    value: 2000
                },{
                    type: "CONSTANT",
                    value: 2001
                }]
            };
            const value = valueFactory.create(lessThanValueJson);
            expect(value).toBeInstanceOf(LessThanValue);
        });

        it ("should create a MoreThanValue", () => {
            const moreThanValueJson = {
                type: "CALL",
                name: ">",
                arguments: [{
                    type: "CONSTANT",
                    value: 2000
                },{
                    type: "CONSTANT",
                    value: 2001
                }]
            };
            const value = valueFactory.create(moreThanValueJson);
            expect(value).toBeInstanceOf(MoreThanValue);
        });

        it ("should create a MoreThanEqualsValue", () => {
            const moreThanEqualsValueJson = {
                type: "CALL",
                name: ">=",
                arguments: [{
                    type: "CONSTANT",
                    value: 2000
                },{
                    type: "CONSTANT",
                    value: 2001
                }]
            };
            const value = valueFactory.create(moreThanEqualsValueJson);
            expect(value).toBeInstanceOf(MoreThanEqualsValue);
        });

        it ("should create a LessThanEqualsValue", () => {
            const lessThanEqualsValueJson = {
                type: "CALL",
                name: "<=",
                arguments: [{
                    type: "CONSTANT",
                    value: 2000
                },{
                    type: "CONSTANT",
                    value: 2001
                }]
            };
            const value = valueFactory.create(lessThanEqualsValueJson);
            expect(value).toBeInstanceOf(LessThanEqualsValue);
        });

        it ("should create a NegationValue", () => {
            const negationValueJson = {
                type: "CALL",
                name: "NEGATE",
                arguments: [{
                    type: "CONSTANT",
                    value: 2000
                }]
            };
            const value = valueFactory.create(negationValueJson);
            expect(value).toBeInstanceOf(NegationValue);
        });

        it ("should create a MinusValue", () => {
            const minusValueJson = {
                type: "CALL",
                name: "-",
                arguments: [{
                    type: "CONSTANT",
                    value: 2000
                },{
                    type: "CONSTANT",
                    value: 2001
                }]
            };
            const value = valueFactory.create(minusValueJson);
            expect(value).toBeInstanceOf(MinusValue);
        });

        it ("should create a DivisionValue", () => {
            const divisionValueJson = {
                type: "CALL",
                name: "/",
                arguments: [{
                    type: "CONSTANT",
                    value: 2000
                },{
                    type: "CONSTANT",
                    value: 2001
                }]
            };
            const value = valueFactory.create(divisionValueJson);
            expect(value).toBeInstanceOf(DivisionValue);
        });
    });
});