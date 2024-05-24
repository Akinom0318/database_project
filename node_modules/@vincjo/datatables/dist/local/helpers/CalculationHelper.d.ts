import type { Field } from '..';
import type Context from '../Context';
import { type Readable } from 'svelte/store';
export default class CalcultationHandler<Row> {
    private rawRows;
    private filteredRows;
    private callback;
    private precision;
    constructor(context: Context<Row>, field: Field<Row>, param: {
        precision: number;
    });
    distinct(callback?: (values: any[]) => any[]): {
        value: string;
        count: unknown;
    }[];
    avg(callback?: (values: number[]) => any[]): Readable<number>;
    sum(callback?: (values: number[]) => any[]): Readable<number>;
    bounds(callback?: (values: number[]) => any[]): [min: number, max: number];
    setPrecision(value: number): void;
    private round;
}
