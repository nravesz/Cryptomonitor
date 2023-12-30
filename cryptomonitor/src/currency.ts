import { MarketState, Estable, EnSuba, EnBaja } from './valueVariation';
import QueryHistory from './queryHistory';

class Currency {
    public name: string;
    private marketState: MarketState;
    private queryHistory: QueryHistory;

    constructor(name: string) {
        this.name = name;
        this.marketState = new Estable();
        this.queryHistory = new QueryHistory();
    }

    public getMarketState() {
        return this.marketState.getMarketState();
    }

    public addValueToHistory(date: Date, value: number) {
        this.queryHistory.addEntry(date, value);
    }

    public getHistoryMean(initialDate: Date, finalDate: Date) {
        return this.queryHistory.getHistoryMean(initialDate, finalDate);
    }
    public getLastValue() {
        return this.queryHistory.getLastValue();
    }

    public getHistoryInRange(from: number, until: number) {
        return this.queryHistory.getHistoryInRange(from, until);
    }

    public getHistory() {
        return this.queryHistory.getHistory();
    }
}

export default Currency;