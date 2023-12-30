import Monitor from "../src/monitor"
import Admin from "../src/admin"
import { ParsedRule, RuleParser } from "../src/rule_parser";
import { Rule } from "../src/rule";
import RuleFactory from "../src/factories/rule_factory";
import Currency from "../src/currency";

const RULES_PATH = __dirname + "/rules/"

const createAdmin = () => {
    return new Admin("my_new_admin@mail.com", "mypassword1234");
};

describe("Monitor", () => {

    describe("initialize", () => {
        it ("should return a Monitor with associated admin when created", () => {
            const admin = createAdmin();
            const monitor = new Monitor(admin);
            expect(monitor).toBeInstanceOf(Monitor);
            expect(monitor.admin).toBeInstanceOf(Admin);
        });
        it ("should be able to login with associated admin", () => {
            const admin = createAdmin();
            const monitor = new Monitor(admin);
            expect(monitor).toBeInstanceOf(Monitor);
            expect(monitor.admin.login("my_new_admin@mail.com", "mypassword1234")).toStrictEqual(true);
        });
        it ("should return an empty array if no currencies", () => {
            const admin = createAdmin();
            const monitor = new Monitor(admin);
            expect(monitor).toBeInstanceOf(Monitor);
            expect(monitor.getCurrencyNames()).toStrictEqual([]);
        });
        it ("should return an array with only one currency", () => {
            const admin = createAdmin();
            const monitor = new Monitor(admin);
            monitor.setValueFor(9, "bitcoin");
            expect(monitor).toBeInstanceOf(Monitor);
            expect(monitor.getCurrencyNames()).toStrictEqual(["bitcoin"]);
        });
    });

    describe("Adding Values", () => {
        it ("should return false if the Monitor has no value for the currency", () => {
            const admin = createAdmin();
            const monitor = new Monitor(admin);
            
            expect(monitor.hasValueFor('BTC')).toStrictEqual(false);
        });
        it ("should return true after setting value for the currency to the Monitor", () => {
            const admin = createAdmin();
            const monitor = new Monitor(admin);

            monitor.setValueFor(1,'BTC');
            expect(monitor.hasValueFor('BTC')).toStrictEqual(true);
        });

        it ("should return 123 as current value after setting value for the currency to the Monitor", () => {
            const admin = createAdmin();
            const monitor = new Monitor(admin);

            monitor.setValueFor(123,'BTC');
            expect(monitor.getValueFor('BTC')).toStrictEqual(123);
        });

        it ("should be able to have values for multiple currencies", () => {
            const admin = createAdmin();
            const monitor = new Monitor(admin);

            monitor.setValueFor(123,'BTC');
            monitor.setValueFor(456,'ETH');
            monitor.setValueFor(789,'LUN');
            expect(monitor.hasValueFor('BTC')).toStrictEqual(true);
            expect(monitor.hasValueFor('ETH')).toStrictEqual(true);
            expect(monitor.hasValueFor('LUN')).toStrictEqual(true);
            expect(monitor.getValueFor('BTC')).toStrictEqual(123);
            expect(monitor.getValueFor('ETH')).toStrictEqual(456);
            expect(monitor.getValueFor('LUN')).toStrictEqual(789);
        });
        it ("should not change value if less than 0.1%", () => {
            const admin = createAdmin();
            const monitor = new Monitor(admin);

            monitor.setValueFor(100,'BTC');
            monitor.setValueFor(100.05,'BTC');
            expect(monitor.getValueFor('BTC')).toStrictEqual(100);
        });
        it ("should change value if more than 0.1%", () => {
            const admin = createAdmin();
            const monitor = new Monitor(admin);

            monitor.setValueFor(100,'BTC');
            monitor.setValueFor(100.2,'BTC');
            expect(monitor.getValueFor('BTC')).toStrictEqual(100.2);
        });
    });
    describe("Currency info", () => {
        it ("should be able to get history mean of a currency", () => {
            const admin = createAdmin();
            const monitor = new Monitor(admin);

            const date = new Date();
            date.setDate(date.getDate()-1);
            const date2 = new Date();
            date.setDate(date2.getDate());

            monitor.setValueFor(100,'BTC');
            monitor.setValueFor(200,'BTC');
            expect(monitor.getMeanFor('BTC', date, date2 )).toEqual(150);
        });
        it ("should be able to get MarketState of a currency", () => {
            const admin = createAdmin();
            const monitor = new Monitor(admin);

            monitor.setValueFor(100,'BTC');
            expect(monitor.getMarketStateFor('BTC')).toStrictEqual("Estable");
        });
    });
    describe("Operability", () => {
        it ("should return operable when no limit set", () => {
            const admin = createAdmin();
            const monitor = new Monitor(admin);
            monitor.setValueFor(100,'BTC');
            expect(monitor.checkOperability('BTC')).toStrictEqual(true);
        });
        it ("should return operable when value is lower than limit", () => {
            const admin = createAdmin();
            const monitor = new Monitor(admin);
            monitor.setValueFor(100,'BTC');
            monitor.setLimitFor(200,'BTC');
            expect(monitor.checkOperability('BTC')).toStrictEqual(true);
        });
        it ("should return not operable when value is higher than limit", () => {
            const admin = createAdmin();
            const monitor = new Monitor(admin);
            monitor.setValueFor(300,'BTC');
            monitor.setLimitFor(200,'BTC');
            expect(monitor.checkOperability('BTC')).toStrictEqual(false);
        });
    });

    describe("rules", () => {
        it ("should contain no rules when created", () => {
            const admin = createAdmin();
            const monitor = new Monitor(admin);
            expect(monitor.rules.length).toStrictEqual(0);
        });

        it ("should allow rules to be added", () => {
            const admin = createAdmin();
            const monitor = new Monitor(admin);
            
            const parser = new RuleParser();
            const factory = new RuleFactory(monitor);

            const parsedRules: ParsedRule[] = parser.parse(RULES_PATH + 'double_rules.json');
            const rules = parsedRules.map(parsedRule => factory.create(parsedRule));

            rules.map(rule => monitor.addRule(rule));

            expect(monitor.rules.length).toStrictEqual(2);
            expect(monitor.rules[0]).toBeInstanceOf(Rule);
        });
    });

    describe("remove currency", () => {
        it ("should be only one currency after a remove", () => {
            const admin = createAdmin();
            const monitor = new Monitor(admin);
        
            monitor.setValueFor(9, "bitcoin");
            monitor.setValueFor(9, "ethereum");
            monitor.removeCurrency("bitcoin");
            expect(monitor.getCurrencyNames()).toStrictEqual(["ethereum"]);
        });

        it ("should allow rules to be added", () => {
            const admin = createAdmin();
            const monitor = new Monitor(admin);
            
            const parser = new RuleParser();
            const factory = new RuleFactory(monitor);

            const parsedRules: ParsedRule[] = parser.parse(RULES_PATH + 'double_rules.json');
            const rules = parsedRules.map(parsedRule => factory.create(parsedRule));

            rules.map(rule => monitor.addRule(rule));

            expect(monitor.rules.length).toStrictEqual(2);
            expect(monitor.rules[0]).toBeInstanceOf(Rule);
        });
    });
});