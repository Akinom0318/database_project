export default class SearchHandler {
    search;
    constructor(context) {
        this.search = context.search;
    }
    set(value) {
        this.search.set(value ?? null);
    }
    remove() {
        this.search.set(null);
    }
}
