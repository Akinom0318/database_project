import type Context from '../Context';
import type { Field } from '..';
export default class SearchHandler<Row> {
    private search;
    private event;
    constructor(context: Context<Row>);
    set(value: string, scope?: Field<Row>[]): void;
    clear(): void;
}
