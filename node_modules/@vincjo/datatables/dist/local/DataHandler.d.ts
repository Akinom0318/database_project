import FilterHelper from './helpers/FilterHelper';
import AdvancedFilterHelper from './helpers/AdvancedFilterHelper';
import CalculationHelper from './helpers/CalculationHelper';
import type { Readable, Writable } from 'svelte/store';
import type { Internationalization, Row, Field, Comparator } from './';
export type Params = {
    rowsPerPage?: number;
    i18n?: Internationalization;
};
export default class DataHandler<T extends Row = any> {
    private context;
    private sortHandler;
    private selectHandler;
    private pageHandler;
    private searchHandler;
    private filterHandler;
    i18n: Internationalization;
    constructor(data?: T[], params?: Params);
    setRows(data: T[]): void;
    getRows(): Readable<T[]>;
    getAllRows(): Readable<T[]>;
    getRowCount(): Readable<{
        total: number;
        start: number;
        end: number;
    }>;
    getRowsPerPage(): Writable<number | null>;
    getPages(param?: {
        ellipsis: boolean;
    }): Readable<number[]>;
    getPageCount(): Readable<number>;
    getPageNumber(): Readable<number>;
    setPage(value: number | 'previous' | 'next'): void;
    search(value: string, scope?: Field<T>[]): void;
    clearSearch(): void;
    sort(orderBy: Field<T>, identifier?: string): void;
    sortAsc(orderBy: Field<T>, identifier?: string): void;
    sortDesc(orderBy: Field<T>, identifier?: string): void;
    getSort(): Writable<{
        identifier?: string;
        direction?: 'asc' | 'desc';
    }>;
    applySort(params?: {
        orderBy: Field<T>;
        direction?: 'asc' | 'desc';
    }): void;
    defineSort(orderBy: Field<T>, direction?: 'asc' | 'desc'): void;
    clearSort(): void;
    filter(value: string | number | null | undefined | boolean | number[], filterBy: Field<T>, comparator?: Comparator<T>): void;
    getFilters(): Readable<{
        value: unknown;
        filterBy: Field<T>;
        check: string;
    }[]>;
    createFilter(filterBy: Field<T>, comparator?: Comparator<T>): FilterHelper<T>;
    createAdvancedFilter(filterBy: Field<T>): AdvancedFilterHelper<T>;
    getFilterCount(): Readable<number>;
    clearFilters(): void;
    select(value: T | T[keyof T]): void;
    getSelected(): Writable<(T | T[keyof T])[]>;
    selectAll(params?: {
        selectBy?: keyof T;
        scope?: 'all' | 'currentPage';
    }): void;
    isAllSelected(): Readable<boolean>;
    on(event: 'change' | 'clearFilters' | 'clearSearch', callback: () => void): void;
    createCalculation(field: Field<T>, param?: {
        precision: number;
    }): CalculationHelper<T>;
    translate(i18n: Internationalization): Internationalization;
    /**
     * @deprecated use setRows() instead
     * @since v0.9.99 2023-01-16
     */
    update(data: any[]): void;
    /**
     * @deprecated use applySort() instead
     * @since v1.11.0 2023-07-11
     */
    applySorting(params?: {
        orderBy: Field<T>;
        direction?: 'asc' | 'desc';
    }): void;
    /**
     * @deprecated use getSort() instead
     * @since v1.11.0 2023-07-11
     */
    getSorted(): Writable<{
        identifier?: string;
        direction?: "desc" | "asc";
    }>;
    getTriggerChange(): Writable<number>;
}
