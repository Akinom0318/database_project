import { type Writable, type Readable } from 'svelte/store';
import type { State, Sort, Filter } from './';
import type { Params } from './DataHandler';
import EventHandler from './handlers/EventHandler';
export default class Context<Row> {
    totalRows: Writable<number | undefined>;
    rowsPerPage: Writable<number>;
    pageNumber: Writable<number>;
    event: EventHandler;
    search: Writable<string>;
    filters: Writable<Filter<Row>[]>;
    rows: Writable<Row[]>;
    rowCount: Readable<{
        total: number;
        start: number;
        end: number;
    }>;
    pages: Readable<number[]>;
    pagesWithEllipsis: Readable<number[]>;
    pageCount: Readable<number>;
    sort: Writable<Sort<Row>>;
    selected: Writable<(Row | Row[keyof Row])[]>;
    isAllSelected: Readable<boolean>;
    selectedCount: Readable<{
        count: number;
        total: number;
    }>;
    selectBy: keyof Row | undefined;
    constructor(data: Row[], params: Params);
    getState(): State;
    private createPages;
    private createPagesWithEllipsis;
    private createPageCount;
    private createRowCount;
    private createIsAllSelected;
    private createSelectedCount;
}
