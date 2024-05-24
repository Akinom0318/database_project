import type Context from '../Context';
export default class SelectHandler<Row> {
    private filteredRows;
    private pagedRows;
    private selected;
    private scope;
    private isAllSelected;
    private event;
    constructor(context: Context<Row>);
    set(value: Row[keyof Row] | Row): void;
    all(selectBy?: keyof Row): void;
    clear(): void;
}
