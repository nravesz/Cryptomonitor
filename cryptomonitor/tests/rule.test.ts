import { Action } from '../src/actions/action';
import { BuyAction } from '../src/actions/buy_action';
import ConstantValue from '../src/values/constant_value';import { Rule } from '../src/rule'
import { Wallet } from '../src/wallet';
import { Condition } from '../src/conditions/condition';
import Monitor from '../src/monitor';
import Admin from '../src/admin';
import binanceServiceMock from './mocks/binance_api_service';
import { SellAction } from '../src/actions/sell_action';

describe ("Rule", () => {

    describe ("initialize", () => {
        it ("should return a Rule when created", () => {
            const rule: Rule = new Rule("Rule name");
            expect(rule).toBeDefined();
            expect(rule).toBeInstanceOf(Rule);
        });
    });

    
    describe ("Rule trigger", () => {
        it ("should trigger its action when no condition is given", async () => {
            const admin: Admin = new Admin("mail@mail.com", "1234");
            const monitor: Monitor = new Monitor(admin);
            const wallet: Wallet = monitor.admin.wallet;
            const action: Action = new SellAction(
                monitor,
                "ETH/TDD",
                new ConstantValue(2),
                binanceServiceMock
            );
            const rule: Rule = new Rule("Rule name");

            rule.addCondition(new Condition());
            rule.addAction(action);

            monitor.setValueFor(1, "ETH/TDD");
            
            wallet.addAmount("ETH", 40);
    
            await rule.trigger();

            expect(wallet.getAmount("ETH")).toStrictEqual(38);
        });
    });
    
});