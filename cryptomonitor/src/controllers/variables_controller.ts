import { Router, Request, Response } from "express";
import { authenticateRolPermit, authenticateToken } from "./auth_controller";
import VariablesService from "../../services/variables_service";

const variablesController = Router();
const variablesService = new VariablesService();

variablesController.get(
    '/',
    authenticateToken,
    (req: Request, res: Response) => {
        return res.json(Object.fromEntries(variablesService.getAllVariables()));
});

variablesController.get(
    '/:variable',
    authenticateToken,
    (req: Request, res: Response) => {
        try {
            return res.json(variablesService.getVariable(req.params.variable));
        } catch {
            return res.status(404).send("Variable does not exist");
        }
});

variablesController.post(
    '/',
    authenticateToken,
    authenticateRolPermit,
    (req: Request, res: Response) => {
        const { variable, value } = req.body;
        variablesService.addVariable(variable, value);
        return res.status(200).send('OK');
});

variablesController.put(
    '/',
    authenticateToken,
    authenticateRolPermit,
    (req: Request, res: Response) => {
        const { variable, value } = req.body;
        try {
            variablesService.editVariable(variable, value);
            return res.status(200).send('OK');
        } catch {
            return res.status(404).send("Variable does not exist");
        }
});

variablesController.delete(
    '/:variable',
    authenticateToken,
    authenticateRolPermit,
    (req: Request, res: Response) => {
        const deleted: boolean = variablesService.deleteVariable(req.params.variable);
        return deleted ? res.status(200).send('OK')
        : res.status(404).send("Variable does not exist");
});

export default variablesController;