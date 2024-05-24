import type { Filter, Field, Comparator, EventHandler, Criterion } from '..';
import type Context from '../Context';
import { type Writable, type Readable } from 'svelte/store';
type Value = string | number | null | undefined | boolean | number[] | Criterion[];
export default class FilterHandler<Row> {
    protected filters: Writable<Filter<Row>[]>;
    protected event: EventHandler;
    private collection;
    constructor(context: Context<Row>);
    set(value: Value, filterBy: Field<Row>, comparator?: Comparator<Row>, name?: string): void;
    clear(): void;
    get(): Readable<{
        value: unknown;
        filterBy: Field<Row>;
        check: string;
    }[]>;
    private createCollection;
}
export {};
