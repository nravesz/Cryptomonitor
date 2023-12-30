import { Router, Request, Response } from "express";
import { authenticateToken } from "./auth_controller";
import CurrenciesService from "../../services/currencies_service";

const currenciesController = Router();
const currenciesService = new CurrenciesService();

// Get all currencies
currenciesController.get("/", authenticateToken, async (req, res) => {
    return currenciesService.getAllCurrencies()
    .then((data) => {
        res.json(data);
    })
    .catch((err) => {
        return new Error("Error 500");
    })
});

export default currenciesController;