import { writable } from 'svelte/store';
export default class EventHandler {
    events = {
        change: [],
        clearFilters: [],
        clearSearch: []
    };
    triggerChange = writable(0); // legacy
    add(event, callback) {
        this.events[event].push(callback);
    }
    trigger(event) {
        for (const callback of this.events[event]) {
            callback();
        }
        /* legacy: support for triggerChange store */
        if (event === 'change') {
            this.triggerChange.update((store) => { return store + 1; });
        }
    }
}
