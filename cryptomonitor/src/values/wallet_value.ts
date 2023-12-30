import { Wallet } from "../wallet";
import { Evaluable } from "./evaluable";

class WalletValue implements Evaluable {

    constructor(
        private wallet: Wallet,
        private symbol: string,
    ) {};

    evaluate() {
        return this.wallet.getAmount(this.symbol);
    }

    public toJSON() {
        return {
            type: "WALLET",
            symbol: this.symbol
        }
    }
};

export default WalletValue;