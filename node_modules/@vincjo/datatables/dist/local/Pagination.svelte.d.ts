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
export type PaginationProps<T extends Row> = ReturnType<__sveltets_Render<T>['props']>;
export type PaginationEvents<T extends Row> = ReturnType<__sveltets_Render<T>['events']>;
export type PaginationSlots<T extends Row> = ReturnType<__sveltets_Render<T>['slots']>;
export default class Pagination<T extends Row> extends SvelteComponentTyped<PaginationProps<T>, PaginationEvents<T>, PaginationSlots<T>> {
}
export {};
