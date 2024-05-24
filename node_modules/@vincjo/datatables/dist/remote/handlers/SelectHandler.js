import { get } from 'svelte/store';
export default class SelectHandler {
    rows;
    selected;
    isAllSelected;
    selectBy;
    constructor(context) {
        this.rows = context.rows;
        this.selected = context.selected;
        this.isAllSelected = context.isAllSelected;
        this.selectBy = context.selectBy;
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
    all() {
        const rows = get(this.rows);
        const isAllSelected = get(this.isAllSelected);
        this.selected.update(store => {
            if (this.selectBy) {
                return store = store.filter(item => !rows.map((row) => row[this.selectBy]).includes(item));
            }
            return store = store.filter(item => !rows.includes(item));
        });
        if (!isAllSelected) {
            this.selected.update(store => {
                if (this.selectBy) {
                    store = [...rows.map((row) => row[this.selectBy]), ...store];
                }
                else {
                    store = [...rows, ...store];
                }
                return store;
            });
        }
    }
    clear() {
        this.selected.set([]);
    }
}
