import type { Writable, Readable } from 'svelte/store';
import type { Internationalization, Row, State, Sort } from './';
export type Params = {
    rowsPerPage?: number;
    totalRows?: number;
    selectBy?: keyof Row;
    i18n?: Internationalization;
};
export default class DataHandler<T extends Row = any> {
    private context;
    private triggerHandler;
    private sortHandler;
    private selectHandler;
    private pageHandler;
    private searchHandler;
    private filterHandler;
    i18n: Internationalization;
    constructor(data?: T[], params?: Params);
    onChange(callback: (state: State) => Promise<T[]>): void;
    invalidate(): void;
    setRows(data: T[]): void;
    setTotalRows(value: number): void;
    getRows(): Writable<T[]>;
    select(value: T[keyof T] | T): void;
    getSelected(): Writable<(T | T[keyof T])[]>;
    selectAll(): void;
    isAllSelected(): Readable<boolean>;
    getSelectedCount(): Readable<{
        count: number;
        total: number;
    }>;
    clearSelection(): void;
    getRowsPerPage(): Writable<number | null>;
    sort(orderBy: keyof T): void;
    applySort(params?: {
        orderBy: keyof T;
        direction?: 'asc' | 'desc';
    }): void;
    sortAsc(orderBy: keyof T): void;
    sortDesc(orderBy: keyof T): void;
    getSort(): Writable<Sort<T>>;
    search(value: string): void;
    clearSearch(): void;
    filter(value: string | number, filterBy: keyof T): void;
    clearFilters(): void;
    getPages(params?: {
        ellipsis: boolean;
    }): Readable<number[]>;
    getPageCount(): Readable<number>;
    getPageNumber(): Writable<number>;
    setPage(value: number | 'previous' | 'next'): void;
    getRowCount(): Readable<{
        total: number;
        start: number;
        end: number;
    }>;
    on(event: 'change', callback: () => void): void;
    translate(i18n: Internationalization): Internationalization;
    /**
     *
     * @depracted use on('change', callback) instead
     */
    getTriggerChange(): Writable<number>;
    /**
     *
     * @deprecated use applySort() instead
     */
    applySorting(params?: {
        orderBy: keyof T;
        direction?: 'asc' | 'desc';
    }): void;
    /**
     *
     * @deprecated use getSort() instead
     */
    getSorted(): Writable<Sort<T>>;
}
