import type Context from '../Context';
export default class SortHandler<Row> {
    private event;
    private hasMultipleSort;
    private sort;
    constructor(context: Context<Row>);
    set(orderBy?: keyof Row): void;
    asc(orderBy: keyof Row): void;
    desc(orderBy: keyof Row): void;
    apply(params?: {
        orderBy: keyof Row;
        direction?: 'asc' | 'desc';
    }): any;
}
