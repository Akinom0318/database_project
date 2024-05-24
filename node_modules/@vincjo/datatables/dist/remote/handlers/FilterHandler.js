export default class FilterHandler {
    filters;
    constructor(context) {
        this.filters = context.filters;
    }
    set(value, filterBy) {
        const filter = { filterBy, value };
        this.filters.update((store) => {
            store = store.filter((item) => {
                return (item.filterBy !== filterBy) && item.value;
            });
            if (value) {
                store.push(filter);
            }
            return store;
        });
    }
    remove() {
        this.filters.set([]);
    }
}
