import { Operator } from "../common/types";
import { identity } from "../common/utils";
import { wrapInThunkIfOnlyFirstArgumentIsIterable } from "../common/wrap";
import { _intersectby } from "./intersectby";

function _intersect<T>(source: Iterable<T>, source2: Iterable<T>) {
    return _intersectby(source, source2, identity);
}

export function intersect<T>(source: Iterable<T>, source2: Iterable<T>): Iterable<T>;
export function intersect<T>(source2: Iterable<T>): Operator<T, T>;
export function intersect() {
    return wrapInThunkIfOnlyFirstArgumentIsIterable(arguments, _intersect);
}
