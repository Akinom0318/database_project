import type { Row, Field } from './';
export declare const isNull: (value: any) => boolean;
export declare const isNotNull: (value: any) => boolean;
export declare const parseField: (field: Field<any>, uid?: string) => {
    callback: (row: Row) => any;
    identifier: string;
    key: string;
};
