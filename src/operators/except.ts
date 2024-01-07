import { Operator } from "../common/types";
import { identity } from "../common/utils";
import { wrapInThunkIfOnlyFirstArgumentIsIterable } from "../common/wrap";
import { _exceptby } from "./exceptby";

function _except<T>(source: Iterable<T>, source2: Iterable<T>) {
    return _exceptby(source, source2, identity);
}

export function except<T>(source: Iterable<T>, source2: Iterable<T>): Iterable<T>;
export function except<T>(source2: Iterable<T>): Operator<T, T>;
export function except() {
    return wrapInThunkIfOnlyFirstArgumentIsIterable(arguments, _except);
}
