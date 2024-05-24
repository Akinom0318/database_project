import type Context from '../Context';
import { type Writable, type Readable } from 'svelte/store';
import type EventHandler from './EventHandler';
export default class PageHandler<Row> {
    totalRows: Writable<number>;
    pageNumber: Writable<number>;
    rowCount: Readable<{
        total: number;
        start: number;
        end: number;
    }>;
    rowsPerPage: Writable<number | null>;
    event: EventHandler;
    pages: Readable<number[]>;
    selected: Writable<(Row | Row[keyof Row])[]>;
    constructor(context: Context<Row>);
    get(): Readable<number[]>;
    goto(number: number): void;
    previous(): void;
    next(): void;
}
