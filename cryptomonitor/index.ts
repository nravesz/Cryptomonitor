import BinanceApiService from "./services/binance_api_service";
import Admin from "./src/admin";
import Monitor from "./src/monitor";

const admin = new Admin("admin@mail.com", "adminpass1234");
const monitor: Monitor = new Monitor(admin);
const sockets = {};

const binanceApiService = new BinanceApiService();
binanceApiService.getWallet().then(balance => monitor.admin.wallet.updateBalance(balance));

export { monitor, admin, sockets };