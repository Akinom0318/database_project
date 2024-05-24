import type Context from '../Context';
export default class PageHandler<Row> {
    private pageNumber;
    private rowCount;
    private rowsPerPage;
    private event;
    constructor(context: Context<Row>);
    goto(number: number): void;
    previous(): void;
    next(): void;
}
