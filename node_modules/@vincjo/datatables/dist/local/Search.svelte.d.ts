import { SvelteComponentTyped } from "svelte";
import type { DataHandler, Row } from './';
declare class __sveltets_Render<T extends Row> {
    props(): {
        [x: string]: any;
        handler: DataHandler<T>;
    };
    events(): {} & {
        [evt: string]: CustomEvent<any>;
    };
    slots(): {};
}
export type SearchProps<T extends Row> = ReturnType<__sveltets_Render<T>['props']>;
export type SearchEvents<T extends Row> = ReturnType<__sveltets_Render<T>['events']>;
export type SearchSlots<T extends Row> = ReturnType<__sveltets_Render<T>['slots']>;
export default class Search<T extends Row> extends SvelteComponentTyped<SearchProps<T>, SearchEvents<T>, SearchSlots<T>> {
}
export {};
