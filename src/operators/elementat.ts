import { Enumerable } from "../enumerable_";
import { wrapInThunk } from "../common/wrap";
import { OperatorR } from "../common/types";

function _elementat<T>(source: Iterable<T>, index: number, defaultValue?: T): T | undefined {
    if (index >= 0) {
        var i = 0;
        for (var item of source) {
            if (i++ === index) {
                return item;
            }
        }
    }
    return defaultValue;
}

export function elementat<T>(source: Iterable<T>, index: number, defaultValue: T): T;
export function elementat<T>(source: Iterable<T>, index: number): T | undefined;
export function elementat<T>(index: number, defaultValue: T): OperatorR<T, T>;
export function elementat<T>(index: number): OperatorR<T, T | undefined>;
export function elementat() {
    return wrapInThunk(arguments, _elementat);
}


declare module '../enumerable_' {
    interface Enumerable<T> {
        elementat(index: number, defaultValue: T): T;
        elementat(index: number): T | undefined;
    }
}
Enumerable.prototype.elementat = function <T>(this: Enumerable<T>, index: number, defaultValue?: T): T | undefined {
    return _elementat<T>(this, index, defaultValue);
};