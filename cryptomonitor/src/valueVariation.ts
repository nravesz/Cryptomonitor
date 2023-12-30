abstract class MarketState {
    public abstract getMarketState();
}

class Estable extends MarketState {
    public getMarketState() {
        return "Estable";
    }
}

class EnSuba extends MarketState {
    public getMarketState() {
        return "En Suba";
    }
}

class EnBaja extends MarketState {
    public getMarketState() {
        return "En Baja";
    }
}

export { MarketState, Estable, EnSuba, EnBaja }