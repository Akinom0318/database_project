import type { Field, Comparator } from '..';
import type FilterHandler from '../handlers/FilterHandler';
type Value = string | number | boolean;
export default class FilterHelper<Row> {
    private filterHandler;
    private filterBy;
    private uid;
    private comparator;
    private callback;
    constructor(filterHandler: FilterHandler<Row>, filterBy: Field<Row>, comparator?: Comparator<Row>);
    set(value: Value, comparator?: Comparator<any>): void;
    clear(): void;
    on(event: 'clear', callback: () => void): void;
}
export {};
