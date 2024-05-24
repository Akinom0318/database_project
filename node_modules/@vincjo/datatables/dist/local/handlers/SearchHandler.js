export default class SearchHandler {
    search;
    event;
    constructor(context) {
        this.search = context.search;
        this.event = context.event;
    }
    set(value, scope = null) {
        this.search.update((store) => {
            store = {
                value: value ?? '',
                scope: scope ?? null,
            };
            return store;
        });
    }
    clear() {
        this.search.set({ value: null, scope: null });
        this.event.trigger('change');
        this.event.trigger('clearSearch');
    }
}
