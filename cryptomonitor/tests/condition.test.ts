import { Condition } from '../src/conditions/condition'
import { DistinctCondition } from '../src/conditions/distinct_condition';
import { EqualCondition } from '../src/conditions/equal_condition';
import { Evaluable } from '../src/values/evaluable';
import { LessThanCondition } from '../src/conditions/lessthan_condition';
import { MoreThanCondition } from '../src/conditions/morethan_condition';
import ConstantValue from '../src/values/constant_value';
import { LessThanEqualsCondition } from '../src/conditions/lessthanequals_condition';
import { MoreThanEqualsCondition } from '../src/conditions/morethanequals_condition';

describe ("Condition", () => {

    describe ("initialize", () => {
        it ("should return a Condition when created", () => {
            const condition: Condition = new Condition();
            expect(condition).toBeDefined();
            expect(condition).toBeInstanceOf(Condition);
        });
    });

    
    describe ("Trivial condition", () => {
        it ("should always check for true", () => {
            const condition: Condition = new Condition();
    
            expect(condition.check()).toStrictEqual(true);
        });
    });

    describe ("Equal condition", () => {
        it ("should return true if all its arguments evualuate to the same value", () => {
            const evaluable1: Evaluable = new ConstantValue(1);
            const evaluable2: Evaluable = new ConstantValue(1);

            const evaluables:Evaluable[] = [evaluable1,evaluable2];
            const condition: Condition = new EqualCondition(evaluables);

            expect(condition.check()).toStrictEqual(true);
        });
    });

    describe ("Distinct condition", () => {
        it ("should return true if all arguments evaluate to different values", () => {
            const evaluable1: Evaluable = new ConstantValue(1);
            const evaluable2: Evaluable = new ConstantValue(2);

            const evaluables:Evaluable[] = [evaluable1,evaluable2];
            const condition: Condition = new DistinctCondition(evaluables);

            expect(condition.check()).toStrictEqual(true);
        });
    });

    describe ("LessThan condition", () => {
        it ("should return true if first argument is less than right argument", () => {
            const evaluable1: Evaluable = new ConstantValue(1);
            const evaluable2: Evaluable = new ConstantValue(2);

            const condition: Condition = new LessThanCondition([evaluable1, evaluable2]);

            expect(condition.check()).toStrictEqual(true);
        });
    });

    describe ("MoreThan condition", () => {
        it ("should return true if first argument is more than right argument", () => {
            const evaluable1: Evaluable = new ConstantValue(2);
            const evaluable2: Evaluable = new ConstantValue(1);

            const condition: Condition = new MoreThanCondition([evaluable1, evaluable2]);

            expect(condition.check()).toStrictEqual(true);
        });
    });

    describe ("MoreThenEquals condition", () => {
        it ("should return true if every argument is gte than its rightmost argument", () => {
            const eval1: Evaluable = new ConstantValue(5);
            const eval2: Evaluable = new ConstantValue(5);
            const eval3: Evaluable = new ConstantValue(4.5);
            const eval4: Evaluable = new ConstantValue(3);

            const condition: Condition = new MoreThanEqualsCondition([
                eval1, eval2, eval3, eval4
            ]);

            expect(condition.check()).toStrictEqual(true);
        });
    });

    describe ("LessThanEquals condition", () => {
        it ("should return true if every argument is lte than its rightmost argument", () => {
            const eval1: Evaluable = new ConstantValue(5);
            const eval2: Evaluable = new ConstantValue(5);
            const eval3: Evaluable = new ConstantValue(5.5);
            const eval4: Evaluable = new ConstantValue(8);
    
            const condition: Condition = new LessThanEqualsCondition([
                eval1, eval2, eval3, eval4
            ]);
    
            expect(condition.check()).toStrictEqual(true);
        });
    });
});