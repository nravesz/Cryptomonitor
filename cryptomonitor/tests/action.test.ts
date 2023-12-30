import { Action } from "../src/actions/action";
import Admin from "../src/admin";
import { BuyAction } from "../src/actions/buy_action";
import ConstantValue from "../src/values/constant_value";
import { SellAction } from "../src/actions/sell_action";
import { SetVariableAction } from "../src/actions/set_variable_action";
import { Wallet } from "../src/wallet";
import Monitor from "../src/monitor";
import binanceServiceMock from "./mocks/binance_api_service";

const createMonitor = () => {
    const admin = new Admin("mail@mail.com", "1234");
    return new Monitor(admin);
};

describe ("Action", () => {

    describe ("Action", () => {
        it ("should return an action when created", () => {
            const action: Action = new Action(new ConstantValue(2));
            expect(action).toBeDefined();
            expect(action).toBeInstanceOf(Action);
        });
    });

    
    describe ("Buy Action", () => {
        it ("should buy the evaluated ammount when executed", async () => {
            const monitor: Monitor = createMonitor();
            const wallet: Wallet = monitor.admin.wallet;
            const action: Action = new BuyAction(
                monitor,
                "USD/BTC",
                new ConstantValue(2),
                binanceServiceMock,
            );
            
            monitor.setValueFor(1, "USD/BTC");

            await action.execute();

            expect(wallet.getAmount("USD")).toStrictEqual(2);
        });
    });

    describe ("Sell Action", () => {
        it ("should sell the evaluated ammount when executed", async () => {
            const monitor: Monitor = createMonitor();
            const wallet: Wallet = monitor.admin.wallet;
            const action: Action = new SellAction(
                monitor,
                "ETH/USDT",
                new ConstantValue(2),
                binanceServiceMock
            );
            
            monitor.setValueFor(1, "ETH/USDT");
            wallet.addAmount("ETH",40)
            
            await action.execute();

            expect(wallet.getAmount("ETH")).toStrictEqual(38);
        });
    });

    describe ("Set Variable Action", () => {
        it("should set correctly the variable to the user when executed", () => {
            const admin: Admin = new Admin("email@mail.com","password");
            const action: Action = new SetVariableAction(admin,"VARIABLE", new ConstantValue(2));

            action.execute()

            expect(admin.getVariable("VARIABLE")).toStrictEqual(2);
        });
    });

});