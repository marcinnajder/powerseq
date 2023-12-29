import { predicate, OperatorR } from "../common/types";
import { wrapInThunk } from "../common/wrap";

function _some<T>(source: Iterable<T>, predicate?: predicate<T>): boolean {
    if (typeof predicate === "undefined") {
        for (var item of source) {
            return true;
        }
        return false;
    }
    else {
        var index = 0;
        for (var item of source) {
            if (predicate(item, index++)) {
                return true;
            }
        }
        return false;
    }
}

export function some<T>(source: Iterable<T>, predicate?: predicate<T>): boolean;
export function some<T>(predicate?: predicate<T>): OperatorR<T, boolean>;
export function some() {
    return wrapInThunk(arguments, _some);
}
