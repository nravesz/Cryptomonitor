import Monitor from "../monitor";
import ConstantValue from "../values/constant_value";
import DataValue from "../values/data_value";
import { Evaluable } from "../values/evaluable";
import VariableValue from "../values/variable_value";
import WalletValue from "../values/wallet_value";
import CallValueFactory from "./call_value_factory";

class ValueFactory {

    private callValueFactory = new CallValueFactory();

    constructor(
        private monitor: Monitor,
    ) {};

    create(parsedValue): Evaluable {
        switch(parsedValue.type) {
            case "CONSTANT":
                return new ConstantValue(parsedValue.value);
            case "VARIABLE":
                return new VariableValue(this.monitor.admin, parsedValue.name);
            case "WALLET":
                return new WalletValue(this.monitor.admin.wallet, parsedValue.symbol);
            case "DATA":
                return new DataValue(
                    this.monitor,
                    parsedValue.symbol,
                    parsedValue.from,
                    parsedValue.until,
                );
            case "CALL":
                if (!(parsedValue.arguments instanceof Array)) {
                    const arg = this.create(parsedValue.arguments);
                    return this.callValueFactory.create(parsedValue.name, arg);
                }
                const args: Evaluable[] = [];
                parsedValue.arguments.forEach(argument => {  
                    args.push(this.create(argument));
                });
                return this.callValueFactory.create(parsedValue.name, args);                
        }
    }
};

export default ValueFactory;