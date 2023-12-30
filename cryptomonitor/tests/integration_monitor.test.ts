import Admin from "../src/admin";
import RuleFactory from "../src/factories/rule_factory";
import Monitor from "../src/monitor";
import { RuleParser } from "../src/rule_parser";

const RULES_PATH = __dirname + "/rules/"

const createRuleFromFilename = (fileName: string, monitor: Monitor) => { 
    const filePath = RULES_PATH + fileName;
    const parser = new RuleParser();
    const factory = new RuleFactory(monitor);

    const rule = factory.create(parser.parse(filePath)[0]);
    return rule;
}

let admin: Admin;
let monitor: Monitor;

const initializeMonitor = () => {
    admin = new Admin("mail@mail.com", "pass1234");
    monitor = new Monitor(admin);
}

describe("Integration Monitor", () => {
    describe("Rule triggers", () => {
        beforeEach(() => {
            initializeMonitor();
        });

        it ("should do nothing if no rules are defined", () => {
            monitor.setValueFor(200, "BTC/USDT");
            
            expect(admin.wallet.getCurrencies().length).toStrictEqual(0);
            expect(admin.wallet.getAmount("BTC")).toStrictEqual(0);
            expect(admin.wallet.getAmount("USDT")).toStrictEqual(0);
        });

        it ("should trigger its rules when an update is received", () => {
            const alwaysSellRule = createRuleFromFilename("always_sell_rule.json", monitor);
            monitor.addRule(alwaysSellRule);

            admin.wallet.addAmount("BTC", 100);
            admin.wallet.addAmount("USDT", 500);

            monitor.setValueFor(10, "BTC/USDT");

            expect(admin.wallet.getAmount("BTC")).toStrictEqual(85);
            expect(admin.wallet.getAmount("USDT")).toStrictEqual(650);
        });

        it ("rule: should buy 100 ETH/BTC if last value is below 15", () => {
            const buyIfBelowRule = createRuleFromFilename("buy_if_below_rule.json", monitor);
            monitor.addRule(buyIfBelowRule);

            admin.wallet.addAmount("ETH", 10000);
            admin.wallet.addAmount("BTC", 10000);

            monitor.setValueFor(50, "ETH/BTC");
            monitor.setValueFor(30, "ETH/BTC");

            expect(admin.wallet.getAmount("BTC")).toStrictEqual(10000);
            expect(admin.wallet.getAmount("ETH")).toStrictEqual(10000);

            monitor.setValueFor(14, "ETH/BTC");
            
            expect(admin.wallet.getAmount("BTC")).toStrictEqual(8600);
            expect(admin.wallet.getAmount("ETH")).toStrictEqual(10100)
        });
    });
});