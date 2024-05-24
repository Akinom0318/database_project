import { get, derived } from 'svelte/store';
import { parseField } from '../utils';
export default class CalcultationHandler {
    rawRows;
    filteredRows;
    callback;
    precision;
    constructor(context, field, param) {
        this.rawRows = context.rawRows;
        this.filteredRows = context.filteredRows;
        this.callback = parseField(field).callback;
        this.precision = param.precision;
    }
    distinct(callback = null) {
        const rawRows = get(this.rawRows);
        const values = rawRows.map(row => this.callback(row));
        const array = callback ? callback(values) : values;
        const result = array.reduce((acc, curr) => {
            acc[curr] = (acc[curr] ?? 0) + 1;
            return acc;
        }, {});
        return Object.entries(result).map(([value, count]) => ({ value, count }));
    }
    avg(callback = null) {
        return derived(this.filteredRows, $filteredRows => {
            if ($filteredRows.length === 0)
                return 0;
            const values = $filteredRows.map(row => this.callback(row)).filter(Boolean);
            const array = callback ? callback(values) : values;
            return this.round(array.reduce((acc, curr) => acc + curr, 0) / array.length);
        });
    }
    sum(callback = null) {
        return derived(this.filteredRows, $filteredRows => {
            const values = $filteredRows.map(row => this.callback(row));
            const array = callback ? callback(values) : values;
            return this.round(array.reduce((acc, curr) => acc + curr, 0));
        });
    }
    bounds(callback = null) {
        const rawRows = get(this.rawRows);
        const values = rawRows.map(row => this.callback(row));
        const numbers = callback ? callback(values) : values;
        return [
            Math.min(...numbers.filter(Boolean)),
            Math.max(...numbers.filter(Boolean))
        ];
    }
    setPrecision(value) {
        this.precision = value;
    }
    round(value) {
        if (this.precision === 0) {
            return Math.round(value);
        }
        const denominator = Math.pow(10, this.precision);
        return Math.round((value + Number.EPSILON) * denominator) / denominator;
    }
}
