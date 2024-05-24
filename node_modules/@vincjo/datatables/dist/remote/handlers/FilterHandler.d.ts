import type { Filter } from '..';
import type Context from '../Context';
import type { Writable } from 'svelte/store';
export default class FilterHandler<Row> {
    filters: Writable<Filter<Row>[]>;
    constructor(context: Context<Row>);
    set(value: string | number, filterBy: keyof Row): void;
    remove(): void;
}
