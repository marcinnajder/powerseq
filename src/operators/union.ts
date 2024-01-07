import { Operator } from "../common/types";
import { identity } from "../common/utils";
import { wrapInThunkIfOnlyFirstArgumentIsIterable } from "../common/wrap";
import { _unionby } from "./unionby";

function _union<T>(source: Iterable<T>, source2: Iterable<T>) {
    return _unionby(source, source2, identity);
}

export function union<T>(source: Iterable<T>, source2: Iterable<T>): Iterable<T>;
export function union<T>(source2: Iterable<T>): Operator<T, T>;
export function union() {
    return wrapInThunkIfOnlyFirstArgumentIsIterable(arguments, _union);
}
