import { SvelteComponentTyped } from "svelte";
import type { DataHandler, Field, Row } from './';
declare class __sveltets_Render<T extends Row> {
    props(): {
        [x: string]: any;
        handler: DataHandler<T>;
        orderBy: Field<T>;
        identifier?: string;
        align?: "center" | "left" | "right";
        rowSpan?: number;
    };
    events(): {} & {
        [evt: string]: CustomEvent<any>;
    };
    slots(): {
        default: {};
    };
}
export type ThProps<T extends Row> = ReturnType<__sveltets_Render<T>['props']>;
export type ThEvents<T extends Row> = ReturnType<__sveltets_Render<T>['events']>;
export type ThSlots<T extends Row> = ReturnType<__sveltets_Render<T>['slots']>;
export default class Th<T extends Row> extends SvelteComponentTyped<ThProps<T>, ThEvents<T>, ThSlots<T>> {
}
export {};
