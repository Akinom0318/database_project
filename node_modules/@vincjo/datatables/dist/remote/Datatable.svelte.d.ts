import { SvelteComponentTyped } from "svelte";
import { type DataHandler, type Row } from './';
declare class __sveltets_Render<T extends Row> {
    props(): {
        [x: string]: any;
        handler: DataHandler<T>;
        search?: boolean;
        rowsPerPage?: boolean;
        rowCount?: boolean;
        selectedCount?: boolean;
        pagination?: boolean;
    };
    events(): {} & {
        [evt: string]: CustomEvent<any>;
    };
    slots(): {
        default: {};
    };
}
export type DatatableProps<T extends Row> = ReturnType<__sveltets_Render<T>['props']>;
export type DatatableEvents<T extends Row> = ReturnType<__sveltets_Render<T>['events']>;
export type DatatableSlots<T extends Row> = ReturnType<__sveltets_Render<T>['slots']>;
export default class Datatable<T extends Row> extends SvelteComponentTyped<DatatableProps<T>, DatatableEvents<T>, DatatableSlots<T>> {
}
export {};
