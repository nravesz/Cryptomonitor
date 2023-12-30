import BinanceApiService from "../../services/binance_api_service";

const binanceServiceMock = new (<any> BinanceApiService)() as jest.Mocked<BinanceApiService>;

binanceServiceMock.makeBuyOrder = jest.fn();

binanceServiceMock.getWallet = jest.fn(() => new Promise((resolve, reject) => {
    const walletBalance = [
        {
            currency: "USD",
            amount: 2
        },
        {
            currency: "ETH",
            amount: 38
        }
    ]
    resolve(walletBalance);
}));

export default binanceServiceMock;