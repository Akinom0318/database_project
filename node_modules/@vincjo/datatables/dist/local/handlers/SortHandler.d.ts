import type Context from '../Context';
import type { Field } from '..';
export default class SortHandler<Row> {
    private rawRows;
    private event;
    private sort;
    private backup;
    constructor(context: Context<Row>);
    set(orderBy?: Field<Row>, uid?: string): void;
    asc(orderBy: Field<Row>, uid?: string): void;
    desc(orderBy: Field<Row>, uid?: string): void;
    apply(params?: {
        orderBy: Field<Row>;
        direction?: 'asc' | 'desc';
    }): void;
    clear(): void;
    define(orderBy: Field<Row>, direction?: 'asc' | 'desc'): void;
    private restore;
    private log;
}
