import { get } from 'svelte/store';
export default class SortHandler {
    event;
    hasMultipleSort;
    sort;
    constructor(context) {
        this.event = context.event;
        this.hasMultipleSort = false;
        this.sort = context.sort;
    }
    set(orderBy = null) {
        if (!orderBy)
            return;
        const sort = get(this.sort);
        if (!sort || sort.orderBy !== orderBy) {
            this.asc(orderBy);
        }
        else if (sort.direction === 'asc') {
            this.desc(sort.orderBy);
        }
        else if (sort.direction === 'desc') {
            this.asc(orderBy);
        }
    }
    asc(orderBy) {
        if (!orderBy)
            return;
        this.sort.set({ orderBy, direction: 'asc' });
        this.event.trigger('change');
    }
    desc(orderBy) {
        if (!orderBy)
            return;
        this.sort.set({ orderBy, direction: 'desc' });
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
        const sort = get(this.sort);
        if (sort) {
            return this.apply({ orderBy: sort.orderBy, direction: sort.direction });
        }
        return;
    }
}
