import { get } from 'svelte/store';
import { parseField } from '../utils';
export default class SortHandler {
    rawRows;
    event;
    sort;
    backup;
    constructor(context) {
        this.rawRows = context.rawRows;
        this.event = context.event;
        this.sort = context.sort;
        this.backup = [];
    }
    set(orderBy = null, uid) {
        if (!orderBy)
            return;
        const sort = get(this.sort);
        const { identifier } = parseField(orderBy, uid);
        if (sort.identifier !== identifier) {
            this.sort.update((store) => (store.direction = null));
        }
        if (sort.direction === null || sort.direction === 'desc') {
            this.asc(orderBy, uid);
        }
        else if (sort.direction === 'asc') {
            this.desc(orderBy, uid);
        }
    }
    asc(orderBy, uid) {
        if (!orderBy)
            return;
        const { identifier, callback, key } = parseField(orderBy, uid);
        this.sort.set({ identifier, callback, direction: 'asc', key });
        this.rawRows.update((store) => {
            store.sort((x, y) => {
                const [a, b] = [callback(x), callback(y)];
                if (a === b)
                    return 0;
                if (a === null)
                    return 1;
                if (b === null)
                    return -1;
                if (typeof a === 'boolean')
                    return a === false ? 1 : -1;
                if (typeof a === 'string')
                    return a.localeCompare(b);
                if (typeof a === 'number')
                    return a - b;
                if (typeof a === 'object')
                    return JSON.stringify(a).localeCompare(JSON.stringify(b));
                else
                    return String(a).localeCompare(String(b));
            });
            return store;
        });
        this.log({ identifier, callback, direction: 'asc' });
        this.event.trigger('change');
    }
    desc(orderBy, uid) {
        if (!orderBy)
            return;
        const { identifier, callback, key } = parseField(orderBy, uid);
        this.sort.set({ identifier, callback, direction: 'desc', key });
        this.rawRows.update((store) => {
            store.sort((x, y) => {
                const [a, b] = [callback(x), callback(y)];
                if (a === b)
                    return 0;
                if (a === null)
                    return 1;
                if (b === null)
                    return -1;
                if (typeof b === 'boolean')
                    return b === false ? 1 : -1;
                if (typeof b === 'string')
                    return b.localeCompare(a);
                if (typeof b === 'number')
                    return b - a;
                if (typeof b === 'object')
                    return JSON.stringify(b).localeCompare(JSON.stringify(a));
                else
                    return String(b).localeCompare(String(a));
            });
            return store;
        });
        this.log({ identifier, callback, direction: 'desc' });
        this.event.trigger('change');
    }
    apply(params = null) {
        if (params) {
            switch (params.direction) {
                case 'asc': return this.asc(params.orderBy);
                case 'desc': return this.desc(params.orderBy);
                default: return this.set(params.orderBy);
            }
        }
        else {
            this.restore();
        }
    }
    clear() {
        this.backup = [];
        this.sort.set({});
    }
    define(orderBy, direction = 'asc') {
        if (!orderBy)
            return;
        const { identifier, callback, key } = parseField(orderBy);
        this.sort.set({ identifier, callback, direction, key });
    }
    restore() {
        for (const sort of this.backup) {
            const { key, callback, direction } = sort;
            const param = key ?? callback;
            this[direction](param);
        }
    }
    log(sort) {
        this.backup = this.backup.filter(item => item.identifier !== sort.identifier);
        if (this.backup.length >= 3) {
            const [_, slot2, slot3] = this.backup;
            this.backup = [slot2, slot3, sort];
        }
        else {
            this.backup = [...this.backup, sort];
        }
    }
}
