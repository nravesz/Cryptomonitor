import Admin from "../../src/admin";
import Monitor from "../../src/monitor";
import DataValue from "../../src/values/data_value";

const setMockValuesForMonitorCurrency = (monitor: Monitor, currency: string) => {
    monitor.setValueFor(250, currency);
    monitor.setValueFor(255, currency);
    monitor.setValueFor(260, currency);
    monitor.setValueFor(245, currency);
    monitor.setValueFor(250, currency);
}

describe ("DataValue", () => {
    describe ("evaluate", () => {
        it ("should evaluate to a range of data from the Monitor", () => {
            const admin = new Admin("mail@mail.com", "1234");
            const monitor = new Monitor(admin);
            setMockValuesForMonitorCurrency(monitor, "BTC/USDT");

            const value = new DataValue(
                monitor,
                "BTC/USDT",
                3600,
                0
            );

            expect(value.evaluate()).toStrictEqual([
                250,
                255,
                260,
                245,
                250
            ]);
        });

        it ("should evaluate to the current data from the Monitor", () => {
            const admin = new Admin("mail@mail.com", "1234");
            const monitor = new Monitor(admin);
            setMockValuesForMonitorCurrency(monitor, "BTC/USDT");

            const value = new DataValue(
                monitor,
                "BTC/USDT",
                3600,
                0
            );

            expect(value.evaluate()).toStrictEqual([
                250,
                255,
                260,
                245,
                250
            ]);

            monitor.setValueFor(300, "BTC/USDT");
            monitor.setValueFor(150, "BTC/USDT");

            expect(value.evaluate()).toStrictEqual([
                250,
                255,
                260,
                245,
                250,
                300,
                150
            ]);
        });
    });
});