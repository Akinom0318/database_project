import { isNotNull } from '../utils';
import { derived } from 'svelte/store';
import { parseField } from '../utils';
// type Collection<Row> = {
//     value: unknown
//     filterBy: Field<Row>
//     set: (value: unknown, comparator: Comparator<Row>) => void,
//     clear: () => void
// }
export default class FilterHandler {
    filters;
    event;
    collection;
    constructor(context) {
        this.filters = context.filters;
        this.event = context.event;
    }
    set(value, filterBy, comparator = null, name) {
        const { callback, identifier, key } = parseField(filterBy, name);
        const filter = { value, identifier, callback, comparator, key };
        this.filters.update((store) => {
            store = store.filter((item) => item.identifier !== identifier);
            if (isNotNull(value)) {
                store.push(filter);
            }
            return store;
        });
    }
    clear() {
        this.filters.set([]);
        this.event.trigger('change');
        this.event.trigger('clearFilters');
    }
    get() {
        if (this.collection) {
            return this.collection;
        }
        this.collection = this.createCollection();
        return this.collection;
    }
    createCollection() {
        return derived(this.filters, ($filters) => {
            return $filters.map(({ value, callback, key, comparator }) => {
                const filterBy = key ?? callback;
                return {
                    value,
                    filterBy,
                    check: comparator ? comparator.name : 'isLike'
                    // set: (value: Value, comparator: Comparator<Row> = check.isLike) => {
                    //     this.set(value, filterBy, comparator)
                    // },
                    // clear: () => {
                    //     this.set(undefined, filterBy)
                    // }
                };
            });
        });
    }
}
