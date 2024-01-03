import { Predicate, OperatorR } from "../common/types";
import { wrapInThunk } from "../common/wrap";

function _every<T>(source: Iterable<T>, predicate: Predicate<T>): boolean {
    var index = 0;
    for (var item of source) {
        if (!predicate(item, index++)) {
            return false;
        }
    }
    return true;
}

export function every<T>(source: Iterable<T>, predicate: Predicate<T>): boolean;
export function every<T>(predicate: Predicate<T>): OperatorR<T, boolean>;
export function every() {
    return wrapInThunk(arguments, _every);
}