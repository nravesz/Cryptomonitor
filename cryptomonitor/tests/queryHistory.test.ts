import QueryHistory from "../src/queryHistory";
import { Entry } from "../src/queryHistory";

describe("QueryHistory", () => {

    describe("getHistoryMean", () => {
        it ("if no entry was added, then the mean should be 0", () => {
            const queryHistory = new QueryHistory();
            const date1 = new Date(0);
            const date2 = new Date(1);
            expect(queryHistory.getHistoryMean(date1, date2)).toStrictEqual(0);
        });

        it ("if only a entry is added with a value of 2, then the mean should be 2", () => {
            const queryHistory = new QueryHistory();
            const date = new Date();
            queryHistory.addEntry(date, 2);
            expect(queryHistory.getHistoryMean(date, date)).toStrictEqual(2);
        });

        it ("mean should be 0 if date asked out of range", () => {
            const queryHistory = new QueryHistory();
            const date1 = new Date(0);
            const date2 = new Date(9);
            queryHistory.addEntry(date1, 4);
            queryHistory.addEntry(date2, 6);
            const date3 = new Date(10);
            const date4 = new Date(19);
            expect(queryHistory.getHistoryMean(date3, date4)).toStrictEqual(0);
        });

        it ("The history only saves entries from the last two days", () => {
            const queryHistory = new QueryHistory();
            const date1 = new Date();
            const date2 = new Date();
            date1.setDate(date1.getDate() - 3);
            queryHistory.addEntry(date1, 6);
            expect(queryHistory.getHistoryMean(date1, date2)).toStrictEqual(0);
        });

        it ("one entry should have the same date and value", () => {
            const queryHistory = new QueryHistory();
            const date = new Date();
            queryHistory.addEntry(date, 2);
            const history = queryHistory.getHistory();
            expect(history[0].date).toStrictEqual(date);
            expect(history[0].value).toStrictEqual(2);
        });
    });


});