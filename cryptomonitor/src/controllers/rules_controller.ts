import { Router } from "express";
import RulesService from "../../services/rules_service";
import { authenticateRolPermit, authenticateToken } from "./auth_controller";

const rulesController = Router();

const rulesService = new RulesService();

rulesController.get('', authenticateToken, (req, res) => {
    res.send({ rules: rulesService.allRules() });
});

rulesController.get('/name', authenticateToken , (req, res) => {
    res.send({ rules: rulesService.rulesByName(req.body.name) });
});

rulesController.post('',authenticateToken,authenticateRolPermit,  (req, res) => {
  try {
    rulesService.addRules(req.body);
    res.sendStatus(200);  
  } catch {
    res.status(500)
    .send("There was an error parsing the Rule/s. Please check that the format is valid");
  }
});

export default rulesController;