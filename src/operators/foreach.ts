import { Func2, OperatorR } from "../common/types";
import { wrapInThunk } from "../common/wrap";

function _foreach<T>(source: Iterable<T>, action?: Func2<T, number, void>): void {
    if (typeof action === "undefined") {
        for (const item of source) { }
    }
    else {
        let index = 0;
        for (const item of source) {
            action(item, index++);
        }
    }
}

export function foreach<T>(source: Iterable<T>, action?: Func2<T, number, void>): void;
export function foreach<T>(action?: Func2<T, number, void>): OperatorR<T, void>;
export function foreach() {
    return wrapInThunk(arguments, _foreach);
}
