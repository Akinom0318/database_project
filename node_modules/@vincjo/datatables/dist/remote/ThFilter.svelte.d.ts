import { SvelteComponentTyped } from "svelte";
import type { DataHandler, Row } from './';
declare class __sveltets_Render<T extends Row> {
    props(): {
        [x: string]: any;
        handler: DataHandler<T>;
        filterBy: keyof T;
        align?: "center" | "left" | "right";
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
