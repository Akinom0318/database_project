import type { Criterion } from './';
export declare const check: {
    isLike: (entry: any, value: any) => boolean;
    isNotLike: (entry: any, value: any) => boolean;
    startsWith: (entry: any, value: any) => boolean;
    endsWith: (entry: any, value: any) => boolean;
    isEqualTo: (entry: any, value: any) => boolean;
    isNotEqualTo: (entry: any, value: any) => boolean;
    isGreaterThan: (entry: number, value: number) => boolean;
    isGreaterThanOrEqualTo: (entry: number, value: number) => boolean;
    isLessThan: (entry: number, value: number) => boolean;
    isLessThanOrEqualTo: (entry: number, value: number) => boolean;
    isBetween: (entry: number, value: [min: number, max: number]) => boolean;
    isStrictlyBetween: (entry: number, value: [min: number, max: number]) => boolean;
    isTrue: (entry: boolean, _: any) => boolean;
    isFalse: (entry: boolean, _: any) => boolean;
    isNull: (entry: null, _: any) => boolean;
    isNotNull: (entry: any, _: any) => boolean;
    whereIn: (entry: any, values?: Criterion[]) => boolean;
    /**
     * @deprecated use "isLike" instead
     * @since 1.12.7 2023-09-27
     */
    contains: (entry: any, value: any) => boolean;
};
