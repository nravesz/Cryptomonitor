import { BuyAction } from "../../src/actions/buy_action";
import { SellAction } from "../../src/actions/sell_action";
import { SetVariableAction } from "../../src/actions/set_variable_action";
import Admin from "../../src/admin";
import ActionFactory from "../../src/factories/action_factory";
import Monitor from "../../src/monitor";
import { Action } from "../../src/rule_parser";

describe ("ActionFactory", () => {
    const admin = new Admin("mail@mail.com", "1234");
    const monitor = new Monitor(admin);
    const actionFactory = new ActionFactory(monitor);

    describe("create", () => {
        it ("should create a BuyAction", () => {
            const buyMarketActionJson: Action = {
                type: "BUY_MARKET",
                symbol: "BTC/USDT",
                amount: {
                    type: "CONSTANT",
                    value: 0.1,
                }
            };

            const action = actionFactory.create(buyMarketActionJson);
            expect(action).toBeInstanceOf(BuyAction);
        });

        it ("should create a SellAction", () => {
            const sellMarketActionJson: Action = {
                type: "SELL_MARKET",
                symbol: "BTC/USDT",
                amount: {
                    type: "CONSTANT",
                    value: 0.1,
                }
            };

            const action = actionFactory.create(sellMarketActionJson);
            expect(action).toBeInstanceOf(SellAction);
        });

        it ("should create a SetVariableAction", () => {
            const setVariableActionJson: Action = {
                type: "SET_VARIABLE",
                name: "LAST_SELL_VALUE_BTC/USDT",
                value: {
                    type: "CALL",
                    name: "LAST",
                    arguments: {
                        type: "DATA",
                        symbol: "BTC/USDT",
                        from: 3600,
                        until: 0
                    }
                }
            };

            const action = actionFactory.create(setVariableActionJson);
            expect(action).toBeInstanceOf(SetVariableAction);
        });
    });

});