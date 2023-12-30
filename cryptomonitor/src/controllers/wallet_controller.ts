import { Request, Response, Router } from "express";
import BinanceApiService from "../../services/binance_api_service";
import WalletService from "../../services/wallet_service";
import { authenticateRolPermit, authenticateToken } from "./auth_controller";

const walletController = Router();

const walletService = new WalletService();
const binanceApiService = new BinanceApiService();

walletController.get('/', authenticateToken , (req: Request, res: Response) => {
    try {
        return res.json(walletService.getBalance());
    } catch {
        res.sendStatus(500)
        .send("There was an error getting the Wallet balance")
    }
});

walletController.get('/history', authenticateToken, (req: Request, res: Response) => {
    const history = walletService.getAllHistory();
    return res.json(history);
});

walletController.get('/history/:currency', authenticateToken, (req: Request, res: Response) => {
    const currency: string = req.params.currency;
    return res.json(walletService.getCurrencyHistory(currency));
});

export default walletController;