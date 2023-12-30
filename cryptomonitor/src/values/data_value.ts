import { DEFAULT_MAX_VERSION } from "tls";
import Monitor from "../monitor";
import { Evaluable } from "./evaluable";

class DataValue implements Evaluable {

    constructor(
        private monitor: Monitor,
        private symbol: string,
        private from: number,
        private until: number,
        private def?: Evaluable | Evaluable [],
    ) {};

    evaluate() {
        const data = this.monitor.getCurrency(this.symbol)
            .getHistoryInRange(this.from, this.until);
        if (data.length > 0)
            return data;
        
        if (this.def instanceof Array) {
            return this.def.map(evaluable => evaluable.evaluate());
        } else {
            return this.def.evaluate();
        }
    };

    public toJSON() {
        const json = {
            type: "DATA",
            symbol: this.symbol,
            from: this.from,
            until: this.until
        };

        if (this.def) {
            const defaultValues = (this.def instanceof Array) ?
                this.def.map(def => def.toJSON()) :
                this.def.toJSON();
            json['default'] = defaultValues;
        }

        return json;
    }
};

export default DataValue;