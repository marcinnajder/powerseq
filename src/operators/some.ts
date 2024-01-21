import { Predicate, OperatorR } from "../common/types";
import { wrapInThunk } from "../common/wrap";

function _some<T>(source: Iterable<T>, predicate?: Predicate<T>): boolean {
    if (typeof predicate === "undefined") {
        for (const item of source) {
            return true;
        }
        return false;
    } else {
        let index = 0;
        for (const item of source) {
            if (predicate(item, index++)) {
                return true;
            }
        }
        return false;
    }
}

export function some<T>(source: Iterable<T>, predicate?: Predicate<T>): boolean;
export function some<T>(predicate?: Predicate<T>): OperatorR<T, boolean>;
export function some() {
    return wrapInThunk(arguments, _some);
}
