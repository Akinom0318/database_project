import { writable } from 'svelte/store';
import { check } from '../Comparator';
export default class AdvancedFilterHandler {
    filterHandler;
    criteria;
    filterBy;
    selected;
    constructor(filterHandler, filterBy) {
        this.filterHandler = filterHandler;
        this.filterBy = filterBy;
        this.criteria = [];
        this.selected = writable([]);
    }
    set(value, comparator = check.isLike) {
        if (this.criteria.find(criterion => criterion.value === value)) {
            this.criteria = this.criteria.filter(criterion => criterion.value !== value);
        }
        else {
            this.criteria = [{ value, comparator }, ...this.criteria];
        }
        if (this.criteria.length === 0) {
            return this.clear();
        }
        this.filterHandler.set(this.criteria, this.filterBy, check.whereIn);
        this.selected.set(this.criteria.map(criterion => criterion.value));
    }
    getSelected() {
        return this.selected;
    }
    clear() {
        this.criteria = [];
        this.selected.set([]);
        this.filterHandler.set(undefined, this.filterBy, check.whereIn);
    }
}
