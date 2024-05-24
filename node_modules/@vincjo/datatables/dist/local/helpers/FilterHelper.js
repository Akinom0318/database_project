import { check } from '../Comparator';
export default class FilterHelper {
    filterHandler;
    filterBy;
    uid;
    comparator;
    callback;
    constructor(filterHandler, filterBy, comparator) {
        this.filterHandler = filterHandler;
        this.filterBy = filterBy;
        this.uid = 'f_' + (Math.random()).toString(28).substring(2);
        this.comparator = comparator ?? check.isLike;
        this.callback = () => null;
    }
    set(value, comparator) {
        if (comparator) {
            this.comparator = comparator;
        }
        this.filterHandler.set(value, this.filterBy, this.comparator, this.uid);
    }
    clear() {
        this.callback();
        this.filterHandler.set(undefined, this.filterBy);
    }
    on(event, callback) {
        this.callback = callback;
    }
}
