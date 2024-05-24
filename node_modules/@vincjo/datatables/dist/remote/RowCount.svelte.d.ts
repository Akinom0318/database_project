import { SvelteComponentTyped } from "svelte";
import type { DataHandler, Row } from './';
declare class __sveltets_Render<T extends Row> {
    props(): {
        [x: string]: any;
        handler: DataHandler<T>;
        small?: boolean;
    };
    events(): {} & {
        [evt: string]: CustomEvent<any>;
    };
    slots(): {};
}
export type RowCountProps<T extends Row> = ReturnType<__sveltets_Render<T>['props']>;
export type RowCountEvents<T extends Row> = ReturnType<__sveltets_Render<T>['events']>;
export type RowCountSlots<T extends Row> = ReturnType<__sveltets_Render<T>['slots']>;
export default class RowCount<T extends Row> extends SvelteComponentTyped<RowCountProps<T>, RowCountEvents<T>, RowCountSlots<T>> {
}
export {};
