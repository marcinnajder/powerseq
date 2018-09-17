import { Enumerable } from "../enumerable_";
import { OperatorR } from "../common/types";
import { wrapInThunk } from "../common/wrap";

function _foreach<T>(source: Iterable<T>, action?: (item: T, index: number) => void): void {
    if (typeof action === "undefined") {
        for (var item of source) {
        }
    }
    else {
        var index = 0;
        for (var item of source) {
            action(item, index++);
        }
    }
}

export function foreach<T>(source: Iterable<T>, action?: (item: T, index: number) => void): void;
export function foreach<T>(action?: (item: T, index: number) => void): OperatorR<T, void>;
export function foreach() {
    return wrapInThunk(arguments, _foreach);
}

declare module '../enumerable_' {
    interface Enumerable<T> {
        foreach(action?: (item: T, index: number) => void): void;
    }
}
Enumerable.prototype.foreach = function <T>(this: Enumerable<T>, action?: (item: T, index: number) => void) {
    _foreach(this, action);
};