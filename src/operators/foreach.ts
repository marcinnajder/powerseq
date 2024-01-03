import { Func2, OperatorR } from "../common/types";
import { wrapInThunk } from "../common/wrap";

function _foreach<T>(source: Iterable<T>, action?: Func2<T, number, void>): void {
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

export function foreach<T>(source: Iterable<T>, action?: Func2<T, number, void>): void;
export function foreach<T>(action?: Func2<T, number, void>): OperatorR<T, void>;
export function foreach() {
    return wrapInThunk(arguments, _foreach);
}
