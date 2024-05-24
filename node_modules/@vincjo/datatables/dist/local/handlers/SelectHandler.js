import { get } from 'svelte/store';
export default class SelectHandler {
    filteredRows;
    pagedRows;
    selected;
    scope;
    isAllSelected;
    event;
    constructor(context) {
        this.filteredRows = context.filteredRows;
        this.pagedRows = context.pagedRows;
        this.selected = context.selected;
        this.scope = context.selectScope;
        this.isAllSelected = context.isAllSelected;
        this.event = context.event;
    }
    set(value) {
        const selected = get(this.selected);
        if (selected.includes(value)) {
            this.selected.set(selected.filter((item) => item !== value));
        }
        else {
            this.selected.set([value, ...selected]);
        }
    }
    all(selectBy = null) {
        const isAllSelected = get(this.isAllSelected);
        if (isAllSelected) {
            return this.clear();
        }
        const scope = get(this.scope);
        const rows = scope === 'currentPage' ? get(this.pagedRows) : get(this.filteredRows);
        if (scope === 'currentPage') {
            this.event.add('change', () => this.clear());
        }
        if (selectBy) {
            this.selected.set(rows.map((row) => row[selectBy]));
        }
        else {
            this.selected.set(rows);
        }
    }
    clear() {
        this.selected.set([]);
    }
}
