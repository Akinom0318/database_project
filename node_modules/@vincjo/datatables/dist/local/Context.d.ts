import { type Writable, type Readable } from 'svelte/store';
import type { Filter, Sort } from './';
import type { Params } from './DataHandler';
import EventHandler from './handlers/EventHandler';
export default class Context<Row> {
    event: EventHandler;
    rowsPerPage: Writable<number | null>;
    pageNumber: Writable<number>;
    search: Writable<{
        value?: string;
        scope?: (keyof Row)[];
    }>;
    filters: Writable<Filter<Row>[]>;
    filterCount: Readable<number>;
    rawRows: Writable<Row[]>;
    filteredRows: Readable<Row[]>;
    pagedRows: Readable<Row[]>;
    rowCount: Readable<{
        total: number;
        start: number;
        end: number;
    }>;
    pages: Readable<number[]>;
    pagesWithEllipsis: Readable<number[]>;
    pageCount: Readable<number>;
    sort: Writable<(Sort<Row>)>;
    selected: Writable<(Row | Row[keyof Row])[]>;
    selectScope: Writable<'all' | 'currentPage'>;
    isAllSelected: Readable<boolean>;
    constructor(data: Row[], params: Params);
    private createFilterCount;
    private createFilteredRows;
    private match;
    private createPagedRows;
    private createRowCount;
    private createPages;
    private createPagesWithEllipsis;
    private createPageCount;
    private createIsAllSelected;
}
