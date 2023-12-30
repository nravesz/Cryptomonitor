import BinanceApiService from "../../services/binance_api_service";
import { BuyAction } from "../actions/buy_action";
import { SellAction } from "../actions/sell_action";
import { SetVariableAction } from "../actions/set_variable_action";
import Monitor from "../monitor";
import { Action } from "../rule_parser";
import ValueFactory from "./value_factory";

class ActionFactory {

    private valueFactory: ValueFactory = new ValueFactory(
        this.monitor,
    );

    constructor(
        private monitor: Monitor,
    ) {};

    create(parsedAction: Action) {
        const actionEvaluable = (parsedAction.amount) ?
            parsedAction.amount
            : parsedAction.value;

        const evaluable = this.valueFactory.create(actionEvaluable);
        const service = new BinanceApiService();

        switch(parsedAction.type) {
            case "BUY_MARKET":
                return new BuyAction(
                    this.monitor,
                    parsedAction.symbol,
                    evaluable,
                    service
                );
            case "SELL_MARKET":
                return new SellAction(
                    this.monitor,
                    parsedAction.symbol,
                    evaluable,
                    service
                );
            case "SET_VARIABLE":
                return new SetVariableAction(
                    this.monitor.admin,
                    parsedAction.name,
                    evaluable
                );
        }
    };
    
};

export default ActionFactory