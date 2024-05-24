import type Context from '../Context';
export default class SelectHandler<Row> {
    private rows;
    private selected;
    private isAllSelected;
    private selectBy;
    constructor(context: Context<Row>);
    set(value: Row | Row[keyof Row]): void;
    all(): void;
    clear(): void;
}
