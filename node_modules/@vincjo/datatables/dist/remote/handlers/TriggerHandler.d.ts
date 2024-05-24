import type { State } from '..';
import type Context from '../Context';
export default class TriggerHandler<Row> {
    private context;
    private reload;
    constructor(context: Context<Row>);
    set(callback: (state: State) => Promise<Row[]>): void;
    invalidate(): Promise<void>;
}
