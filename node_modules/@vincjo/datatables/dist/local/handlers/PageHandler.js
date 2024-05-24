import { get } from 'svelte/store';
export default class PageHandler {
    pageNumber;
    rowCount;
    rowsPerPage;
    event;
    constructor(context) {
        this.pageNumber = context.pageNumber;
        this.rowCount = context.rowCount;
        this.rowsPerPage = context.rowsPerPage;
        this.event = context.event;
    }
    goto(number) {
        this.pageNumber.update((store) => {
            const rowsPerPage = get(this.rowsPerPage);
            if (rowsPerPage) {
                const total = get(this.rowCount).total;
                if (number >= 1 && number <= Math.ceil(total / rowsPerPage)) {
                    store = number;
                    this.event.trigger('change');
                }
            }
            return store;
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
