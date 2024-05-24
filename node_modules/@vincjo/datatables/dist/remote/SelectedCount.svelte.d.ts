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
export type SelectedCountProps<T extends Row> = ReturnType<__sveltets_Render<T>['props']>;
export type SelectedCountEvents<T extends Row> = ReturnType<__sveltets_Render<T>['events']>;
export type SelectedCountSlots<T extends Row> = ReturnType<__sveltets_Render<T>['slots']>;
export default class SelectedCount<T extends Row> extends SvelteComponentTyped<SelectedCountProps<T>, SelectedCountEvents<T>, SelectedCountSlots<T>> {
}
export {};
