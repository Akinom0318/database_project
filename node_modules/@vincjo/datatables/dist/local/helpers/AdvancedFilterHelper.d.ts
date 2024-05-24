import type { Field, Comparator } from '..';
import type FilterHandler from '../handlers/FilterHandler';
import { type Writable } from 'svelte/store';
type Value = string | number | [min: number, max: number];
export default class AdvancedFilterHandler<Row> {
    private filterHandler;
    private criteria;
    private filterBy;
    private selected;
    constructor(filterHandler: FilterHandler<Row>, filterBy: Field<Row>);
    set(value: Value, comparator?: Comparator<any>): void;
    getSelected(): Writable<Value[]>;
    clear(): void;
}
export {};
