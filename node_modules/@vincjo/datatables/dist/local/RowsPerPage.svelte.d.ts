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
export type RowsPerPageProps<T extends Row> = ReturnType<__sveltets_Render<T>['props']>;
export type RowsPerPageEvents<T extends Row> = ReturnType<__sveltets_Render<T>['events']>;
export type RowsPerPageSlots<T extends Row> = ReturnType<__sveltets_Render<T>['slots']>;
export default class RowsPerPage<T extends Row> extends SvelteComponentTyped<RowsPerPageProps<T>, RowsPerPageEvents<T>, RowsPerPageSlots<T>> {
}
export {};
