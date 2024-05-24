import { SvelteComponentTyped } from "svelte";
import type { DataHandler, Field, Comparator, Row } from './';
declare class __sveltets_Render<T extends Row> {
    props(): {
        [x: string]: any;
        handler: DataHandler<T>;
        filterBy: Field<T>;
        align?: "center" | "left" | "right";
        comparator?: Comparator<T>;
    };
    events(): {} & {
        [evt: string]: CustomEvent<any>;
    };
    slots(): {};
}
export type ThFilterProps<T extends Row> = ReturnType<__sveltets_Render<T>['props']>;
export type ThFilterEvents<T extends Row> = ReturnType<__sveltets_Render<T>['events']>;
export type ThFilterSlots<T extends Row> = ReturnType<__sveltets_Render<T>['slots']>;
export default class ThFilter<T extends Row> extends SvelteComponentTyped<ThFilterProps<T>, ThFilterEvents<T>, ThFilterSlots<T>> {
}
export {};
