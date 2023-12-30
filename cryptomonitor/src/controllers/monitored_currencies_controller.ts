import { Router, Request, Response } from "express";
import MonitoredCurrenciesService from "../../services/monitored_currencies_service";
import { authenticateToken ,authenticateRolPermit } from "../controllers/auth_controller";
import { monitor, sockets } from "../../index";

const monitoredCurrenciesController = Router();
const monitoredCurrenciesService = new MonitoredCurrenciesService();

const WebSocket = require('ws');

// Get all currencies being monitored
monitoredCurrenciesController.get("/", authenticateToken, async (req, res) => {
    const data = monitoredCurrenciesService.getAllCurrenciesNames();
    res.json({
        "sucess": true,
        "data": data
    })
});

// Subscribe to a currency to see its values over time
monitoredCurrenciesController.post(
    "/subscribe",
    authenticateToken,
    authenticateRolPermit,
    (req, res) => {
    const symbol = req.body.currency;
    try {
        monitoredCurrenciesService.subscribe(symbol);
        res.json({
            "sucess": true
        });
    } catch (err) {
        res.json({
            "sucess": false,
            "message": "Unable to subscribe"
        })
    }
});

monitoredCurrenciesController.post(
    "/unsubscribe",
    authenticateToken,
    authenticateRolPermit,
    (req, res) => {
    const symbol = req.body.currency;
    try {
        monitoredCurrenciesService.unsubscribe(symbol);
        res.json({
            "sucess": true
        })
    } catch (err) {
        res.json({
            "sucess": false,
            "message": "Unable to unsubscribe"
        })
    }
})

// Get all currencies' value history
monitoredCurrenciesController.get("/history", authenticateToken, (req, res) => {
    const history = monitoredCurrenciesService.getAllHistory();
    res.json({
        "sucess": true,
        "data": history
    })
})

monitoredCurrenciesController.post("/mean", authenticateToken, (req, res) => {
    const { currency, initialDate, finalDate } = req.body;
    const mean = monitoredCurrenciesService.getMeanFor(currency, initialDate, finalDate);
    res.json({
        "sucess": true,
        "data": mean
    })
})

monitoredCurrenciesController.post("/limit", authenticateToken, authenticateRolPermit, (req, res) => {
    const { currency, limit } = req.body;
    monitoredCurrenciesService.setLimitFor(limit, currency);
    res.json({
        "sucess": true,
        "data": 'ok'
    })
})

monitoredCurrenciesController.get("/state/:currency", authenticateToken, (req, res) => {
    const state = monitoredCurrenciesService.getMarketStateFor(req.params.currency);
    res.json({
        "sucess": true,
        "data": state
    })
})

monitoredCurrenciesController.get("/operability/:currency", authenticateToken, (req, res) => {
    const oper = monitoredCurrenciesService.checkOperability(req.params.currency);
    res.json({
        "sucess": true,
        "data": oper
    })
})



export default monitoredCurrenciesController;
