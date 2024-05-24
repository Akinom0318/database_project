import { writable, derived } from 'svelte/store';
import { isNull, parseField } from './utils';
import { check } from './Comparator';
import EventHandler from './handlers/EventHandler';
export default class Context {
    event;
    rowsPerPage;
    pageNumber;
    search;
    filters;
    filterCount;
    rawRows;
    filteredRows;
    pagedRows;
    rowCount;
    pages;
    pagesWithEllipsis;
    pageCount;
    sort;
    selected;
    selectScope;
    isAllSelected;
    constructor(data, params) {
        this.event = new EventHandler();
        this.rowsPerPage = writable(params.rowsPerPage);
        this.pageNumber = writable(1);
        this.search = writable({});
        this.filters = writable([]);
        this.filterCount = this.createFilterCount();
        this.rawRows = writable(data);
        this.filteredRows = this.createFilteredRows();
        this.pagedRows = this.createPagedRows();
        this.rowCount = this.createRowCount();
        this.pages = this.createPages();
        this.pagesWithEllipsis = this.createPagesWithEllipsis();
        this.pageCount = this.createPageCount();
        this.sort = writable({});
        this.selected = writable([]);
        this.selectScope = writable('all');
        this.isAllSelected = this.createIsAllSelected();
    }
    createFilterCount() {
        return derived(this.filters, ($filters) => $filters.length);
    }
    createFilteredRows() {
        return derived([this.rawRows, this.search, this.filters], ([$rawRows, $search, $filters]) => {
            if ($search.value) {
                $rawRows = $rawRows.filter((row) => {
                    const fields = $search.scope ?? Object.keys(row);
                    const scope = fields.map((field) => {
                        const { callback } = parseField(field);
                        return callback;
                    });
                    return scope.some((callback) => {
                        return this.match(callback(row), $search.value);
                    });
                });
                this.pageNumber.set(1);
                this.selected.set([]);
                this.event.trigger('change');
            }
            if ($filters.length > 0) {
                $filters.forEach((filter) => {
                    return ($rawRows = $rawRows.filter((row) => {
                        const entry = filter.callback(row);
                        return this.match(entry, filter.value, filter.comparator);
                    }));
                });
                this.pageNumber.set(1);
                this.selected.set([]);
                this.event.trigger('change');
            }
            return $rawRows;
        });
    }
    match(entry, value, compare = null) {
        if (isNull(value)) {
            return true;
        }
        if (!entry && compare) {
            return compare(entry, value);
        }
        if (!entry)
            return check.isLike(entry, value);
        else if (typeof entry === 'object') {
            return Object.keys(entry).some((k) => {
                return this.match(entry[k], value, compare);
            });
        }
        if (!compare)
            return check.isLike(entry, value);
        return compare(entry, value);
    }
    createPagedRows() {
        return derived([this.filteredRows, this.rowsPerPage, this.pageNumber], ([$filteredRows, $rowsPerPage, $pageNumber]) => {
            if (!$rowsPerPage) {
                return $filteredRows;
            }
            return $filteredRows.slice(($pageNumber - 1) * $rowsPerPage, $pageNumber * $rowsPerPage);
        });
    }
    createRowCount() {
        return derived([this.filteredRows, this.pageNumber, this.rowsPerPage], ([$filteredRows, $pageNumber, $rowsPerPage]) => {
            const total = $filteredRows.length;
            if (!$rowsPerPage) {
                return { total: total, start: 1, end: total };
            }
            return {
                total: total,
                start: $pageNumber * $rowsPerPage - $rowsPerPage + 1,
                end: Math.min($pageNumber * $rowsPerPage, $filteredRows.length)
            };
        });
    }
    createPages() {
        return derived([this.rowsPerPage, this.filteredRows], ([$rowsPerPage, $filteredRows]) => {
            if (!$rowsPerPage) {
                return [1];
            }
            const pages = Array.from(Array(Math.ceil($filteredRows.length / $rowsPerPage)));
            return pages.map((_, i) => i + 1);
        });
    }
    createPagesWithEllipsis() {
        return derived([this.pages, this.pageNumber], ([$pages, $pageNumber]) => {
            if ($pages.length <= 7) {
                return $pages;
            }
            const ellipse = null;
            const firstPage = 1;
            const lastPage = $pages.length;
            if ($pageNumber <= 4) {
                return [
                    ...$pages.slice(0, 5),
                    ellipse,
                    lastPage
                ];
            }
            else if ($pageNumber < $pages.length - 3) {
                return [
                    firstPage,
                    ellipse,
                    ...$pages.slice($pageNumber - 2, $pageNumber + 1),
                    ellipse,
                    lastPage
                ];
            }
            else {
                return [
                    firstPage,
                    ellipse,
                    ...$pages.slice($pages.length - 5, $pages.length)
                ];
            }
        });
    }
    createPageCount() {
        return derived(this.pages, ($pages) => {
            return $pages.length;
        });
    }
    createIsAllSelected() {
        return derived([this.selected, this.pagedRows, this.filteredRows, this.selectScope], ([$selected, $pagedRows, $filteredRows, $selectScope]) => {
            const rowCount = $selectScope === 'currentPage' ? $pagedRows.length : $filteredRows.length;
            if (rowCount === $selected.length && rowCount !== 0) {
                return true;
            }
            return false;
        });
    }
}
