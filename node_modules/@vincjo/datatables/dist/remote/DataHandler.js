import Context from './Context';
import TriggerHandler from './handlers/TriggerHandler';
import SortHandler from './handlers/SortHandler';
import SelectHandler from './handlers/SelectHandler';
import PageHandler from './handlers/PageHandler';
import SearchHandler from './handlers/SearchHandler';
import FilterHandler from './handlers/FilterHandler';
export default class DataHandler {
    context;
    triggerHandler;
    sortHandler;
    selectHandler;
    pageHandler;
    searchHandler;
    filterHandler;
    i18n;
    constructor(data = [], params = { rowsPerPage: 5 }) {
        this.i18n = this.translate(params.i18n);
        this.context = new Context(data, params);
        this.triggerHandler = new TriggerHandler(this.context);
        this.sortHandler = new SortHandler(this.context);
        this.selectHandler = new SelectHandler(this.context);
        this.pageHandler = new PageHandler(this.context);
        this.searchHandler = new SearchHandler(this.context);
        this.filterHandler = new FilterHandler(this.context);
    }
    onChange(callback) {
        this.triggerHandler.set(callback);
    }
    invalidate() {
        this.triggerHandler.invalidate();
    }
    setRows(data) {
        this.context.rows.set(data);
    }
    setTotalRows(value) {
        this.context.totalRows.set(value);
    }
    getRows() {
        return this.context.rows;
    }
    select(value) {
        this.selectHandler.set(value);
    }
    getSelected() {
        return this.context.selected;
    }
    selectAll() {
        this.selectHandler.all();
    }
    isAllSelected() {
        return this.context.isAllSelected;
    }
    getSelectedCount() {
        return this.context.selectedCount;
    }
    clearSelection() {
        this.selectHandler.clear();
    }
    getRowsPerPage() {
        return this.context.rowsPerPage;
    }
    sort(orderBy) {
        this.setPage(1);
        this.sortHandler.set(orderBy);
    }
    applySort(params = null) {
        this.sortHandler.apply(params);
    }
    sortAsc(orderBy) {
        this.setPage(1);
        this.sortHandler.asc(orderBy);
    }
    sortDesc(orderBy) {
        this.setPage(1);
        this.sortHandler.desc(orderBy);
    }
    getSort() {
        return this.context.sort;
    }
    search(value) {
        this.setPage(1);
        this.context.search.set(value);
    }
    clearSearch() {
        this.searchHandler.remove();
    }
    filter(value, filterBy) {
        this.setPage(1);
        return this.filterHandler.set(value, filterBy);
    }
    clearFilters() {
        this.filterHandler.remove();
    }
    getPages(params = { ellipsis: false }) {
        if (params.ellipsis) {
            return this.context.pagesWithEllipsis;
        }
        return this.context.pages;
    }
    getPageCount() {
        return this.context.pageCount;
    }
    getPageNumber() {
        return this.context.pageNumber;
    }
    setPage(value) {
        switch (value) {
            case 'previous': return this.pageHandler.previous();
            case 'next': return this.pageHandler.next();
            default: return this.pageHandler.goto(value);
        }
    }
    getRowCount() {
        return this.context.rowCount;
    }
    on(event, callback) {
        this.context.event.add(event, callback);
    }
    translate(i18n) {
        return {
            ...{
                search: 'Search...',
                show: 'Show',
                entries: 'entries',
                filter: 'Filter',
                rowCount: 'Showing {start} to {end} of {total} entries',
                noRows: 'No entries found',
                previous: 'Previous',
                next: 'Next',
                selectedCount: '{count} of {total} row(s).'
            },
            ...i18n
        };
    }
    /**
     *
     * @depracted use on('change', callback) instead
     */
    getTriggerChange() {
        return this.context.event.triggerChange;
    }
    /**
     *
     * @deprecated use applySort() instead
     */
    applySorting(params = null) {
        this.applySort(params);
    }
    /**
     *
     * @deprecated use getSort() instead
     */
    getSorted() {
        return this.getSort();
    }
}
