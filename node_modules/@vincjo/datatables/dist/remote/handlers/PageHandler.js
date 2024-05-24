import { get } from 'svelte/store';
export default class PageHandler {
    totalRows;
    pageNumber;
    rowCount;
    rowsPerPage;
    event;
    pages;
    selected;
    constructor(context) {
        this.totalRows = context.totalRows;
        this.pageNumber = context.pageNumber;
        this.rowCount = context.rowCount;
        this.rowsPerPage = context.rowsPerPage;
        this.event = context.event;
        this.pages = context.pages;
        this.selected = context.selected;
    }
    get() {
        return this.pages;
    }
    goto(number) {
        const rowsPerPage = get(this.rowsPerPage);
        const totalRows = get(this.totalRows);
        this.pageNumber.update((store) => {
            if (rowsPerPage && totalRows) {
                if (number >= 1 && number <= Math.ceil(totalRows / rowsPerPage)) {
                    store = number;
                    this.event.trigger('change');
                }
                return store;
            }
            else {
                if (number >= 1) {
                    store = number;
                    this.event.trigger('change');
                }
                return store;
            }
        });
    }
    previous() {
        const number = get(this.pageNumber) - 1;
        this.goto(number);
    }
    next() {
        const number = get(this.pageNumber) + 1;
        this.goto(number);
    }
}
