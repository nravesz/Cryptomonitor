import AverageValue from "../values/callValues/average_value";
import DistinctValue from "../values/callValues/distinct_value";
import DivisionValue from "../values/callValues/division_value";
import EqualValue from "../values/callValues/equal_value";
import LastValue from "../values/callValues/last_value";
import LessThanEqualsValue from "../values/callValues/lessthanequals_value";
import LessThanValue from "../values/callValues/lessthan_value";
import MaxValue from "../values/callValues/max_value";
import MinusValue from "../values/callValues/minus_value";
import MinValue from "../values/callValues/min_value";
import MoreThanEqualsValue from "../values/callValues/morethanequals_value";
import MoreThanValue from "../values/callValues/morethan_value";
import MultiplicationValue from "../values/callValues/multiplication_value";
import NegationValue from "../values/callValues/negation_value";
import PlusValue from "../values/callValues/plus_value";
import StdDevValue from "../values/callValues/stddev_value";

class CallValueFactory {
    public create(name: string, args: any[] | any) {
        switch(name) {
            case "+":
                return new PlusValue(args);
            case "*":
                return new MultiplicationValue(args);
            case "AVERAGE":
                return new AverageValue(args);
            case "STDDEV":
                return new StdDevValue(args);
            case "MIN":
                return new MinValue(args);
            case "MAX":
                return new MaxValue(args);
            case "LAST":
                return new LastValue(args);
            case "==":
                return new EqualValue(args);
            case "DISTINCT":
                return new DistinctValue(args);
            case "<":
                return new LessThanValue(args);
            case ">":
                return new MoreThanValue(args);
            case "<=":
                return new LessThanEqualsValue(args);
            case ">=":
                return new MoreThanEqualsValue(args);
            case "NEGATE":
                return new NegationValue(args);
            case "-":
                return new MinusValue(args);
            case "/":
                return new DivisionValue(args);
        }
    };
};

export default CallValueFactory;