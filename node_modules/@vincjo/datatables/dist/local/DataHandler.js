import Context from './Context';
import SortHandler from './handlers/SortHandler';
import SelectHandler from './handlers/SelectHandler';
import PageHandler from './handlers/PageHandler';
import SearchHandler from './handlers/SearchHandler';
import FilterHandler from './handlers/FilterHandler';
import FilterHelper from './helpers/FilterHelper';
import AdvancedFilterHelper from './helpers/AdvancedFilterHelper';
import CalculationHelper from './helpers/CalculationHelper';
export default class DataHandler {
    context;
    sortHandler;
    selectHandler;
    pageHandler;
    searchHandler;
    filterHandler;
    i18n;
    constructor(data = [], params = { rowsPerPage: null }) {
        this.i18n = this.translate(params.i18n);
        this.context = new Context(data, params);
        this.sortHandler = new SortHandler(this.context);
        this.selectHandler = new SelectHandler(this.context);
        this.pageHandler = new PageHandler(this.context);
        this.searchHandler = new SearchHandler(this.context);
        this.filterHandler = new FilterHandler(this.context);
    }
    setRows(data) {
        this.context.rawRows.set(data);
        this.context.event.trigger('change');
        this.applySort();
    }
    getRows() {
        return this.context.pagedRows;
    }
    getAllRows() {
        return this.context.filteredRows;
    }
    getRowCount() {
        return this.context.rowCount;
    }
    getRowsPerPage() {
        return this.context.rowsPerPage;
    }
    getPages(param = { ellipsis: false }) {
        if (param.ellipsis) {
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
    search(value, scope = null) {
        this.searchHandler.set(value, scope);
    }
    clearSearch() {
        this.searchHandler.clear();
    }
    sort(orderBy, identifier) {
        this.setPage(1);
        this.sortHandler.set(orderBy, identifier);
    }
    sortAsc(orderBy, identifier) {
        this.setPage(1);
        this.sortHandler.asc(orderBy, identifier);
    }
    sortDesc(orderBy, identifier) {
        this.setPage(1);
        this.sortHandler.desc(orderBy, identifier);
    }
    getSort() {
        return this.context.sort;
    }
    applySort(params = null) {
        this.sortHandler.apply(params);
    }
    defineSort(orderBy, direction) {
        this.sortHandler.define(orderBy, direction);
    }
    clearSort() {
        this.sortHandler.clear();
    }
    filter(value, filterBy, comparator = null) {
        this.filterHandler.set(value, filterBy, comparator);
    }
    getFilters() {
        return this.filterHandler.get();
    }
    createFilter(filterBy, comparator) {
        return new FilterHelper(this.filterHandler, filterBy, comparator);
    }
    createAdvancedFilter(filterBy) {
        return new AdvancedFilterHelper(this.filterHandler, filterBy);
    }
    getFilterCount() {
        return this.context.filterCount;
    }
    clearFilters() {
        this.filterHandler.clear();
    }
    select(value) {
        this.selectHandler.set(value);
    }
    getSelected() {
        return this.context.selected;
    }
    selectAll(params = {}) {
        this.context.selectScope.set(params.scope === 'currentPage' ? 'currentPage' : 'all');
        this.selectHandler.all(params.selectBy ?? null);
    }
    isAllSelected() {
        return this.context.isAllSelected;
    }
    on(event, callback) {
        this.context.event.add(event, callback);
    }
    createCalculation(field, param = null) {
        return new CalculationHelper(this.context, field, { precision: param?.precision ?? 2 });
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
                next: 'Next'
            },
            ...i18n
        };
    }
    /**
     * @deprecated use setRows() instead
     * @since v0.9.99 2023-01-16
     */
    update(data) {
        console.log('%c%s', 'color:#e65100;background:#fff3e0;font-size:12px;border-radius:4px;padding:4px;text-align:center;', `DataHandler.update(data) method is deprecated. Please use DataHandler.setRows(data) instead`);
        this.context.rawRows.set(data);
    }
    /**
     * @deprecated use applySort() instead
     * @since v1.11.0 2023-07-11
     */
    applySorting(params = null) {
        this.applySort(params);
    }
    /**
     * @deprecated use getSort() instead
     * @since v1.11.0 2023-07-11
     */
    getSorted() {
        return this.getSort();
    }
    getTriggerChange() {
        return this.context.event.triggerChange;
    }
}
