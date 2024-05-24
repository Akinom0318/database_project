import type Context from '../Context';
export default class SearchHandler<Row> {
    private search;
    constructor(context: Context<Row>);
    set(value: string): void;
    remove(): void;
}
