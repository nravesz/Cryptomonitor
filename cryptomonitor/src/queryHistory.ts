const RANGE_IN_DAYS = 2;

export interface Entry {
    date: Date;
    value: number;
}

class QueryHistory {
    private entries: Entry[];

    constructor() {
        this.entries = [];
    }


    public addEntry(date: Date, value: number) {
        this.keepHistoryInRange();
        this.entries.push({date, value});
    }

    public getLastValue() {
        return this.entries[this.entries.length - 1].value;
    }

    public getHistoryMean(initialDate: Date, finalDate: Date) {
        // TODO: validación de fechas
        this.keepHistoryInRange();

        let counter = 0;
        let total = 0
        for (let i = 0; i < this.entries.length; i++) {
            const query = this.entries[i];
            let date = query["date"];
            let value = query["value"];
            if (date >= initialDate) {
                if (date <= finalDate) {
                    counter++;
                    total += value;
                } else {
                    break;
                }
            }
        }
        if (counter == 0) {
            return 0;
        }
        return total / counter;
    }

    public getHistoryInRange(from: number, until: number): number[] {
        const now = new Date().getTime();
        const sinceMillis = now - (1000 * from);
        const untilMillis = now - (1000 * until);

        return this.entries.filter(entry => {
            return (entry.date.getTime() >= sinceMillis) &&
                (entry.date.getTime() <= untilMillis);
        }).map(entry => entry.value);
    }

    private keepHistoryInRange() {
        let limitDate = new Date();
        limitDate.setDate(limitDate.getDate() - RANGE_IN_DAYS);
        for (let i = 0; i < this.entries.length; i++) {
            let entry = this.entries[i];
            let date = entry["date"];
            if (date < limitDate) {
                this.entries.shift();
            }
            else {
                break;
            }
        }
    }

    public getHistory() {
        return this.entries;
    }
}

export default QueryHistory;