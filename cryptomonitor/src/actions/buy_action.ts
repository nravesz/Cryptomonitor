import { Wallet } from "../wallet";
import { Action } from "./action";
import { Evaluable } from "../values/evaluable";
import Monitor from "../monitor";
import BinanceApiService from "../../services/binance_api_service";

export class BuyAction extends Action{

    private service: BinanceApiService;
    private monitor: Monitor;
    private wallet: Wallet;
    private currency: string;

    constructor(monitor: Monitor, symbol: string, evaluable: Evaluable, service: BinanceApiService){
        super(evaluable);
        this.monitor = monitor;
        this.wallet = monitor.admin.wallet;
        this.currency=symbol;
        this.service = service;
    }

    async execute() {
        try {
            const exchangeAmount = this.evaluable.evaluate();
            this.service.makeBuyOrder(this.currency, exchangeAmount);
            const walletBalance = await this.service.getWallet()
            this.wallet.updateBalance(walletBalance);
        } catch {
            console.error("There was an error executing the BuyAction", {
                currency: this.currency
            })
            throw new Error("BuylActionError")
        }
    };

    public toJSON() {
        return {
            type: "BUY_MARKET",
            symbol: this.currency,
            amount: this.evaluable.toJSON()
        }
    }
}