import { monitor } from "../index";


class VariablesService {
    public getAllVariables() {
        return monitor.admin.variables;
    }

    public getVariable(variable: string) {
        const varValue = monitor.admin.getVariable(variable);
        if (!varValue)
            throw new Error("Variable does not exist");
        return varValue;
    }

    public addVariable(variable: string, value: number | string | boolean) {
        monitor.admin.setVariable(variable, value);
    }

    public editVariable(variable: string, value: number | string | boolean) {
        if (!monitor.admin.getVariable(variable))
            throw new Error("Variable does not exist");

        monitor.admin.setVariable(variable, value);
    }

    public deleteVariable(variable: string): boolean {
        return monitor.admin.deleteVariable(variable);
    }
};

export default VariablesService;