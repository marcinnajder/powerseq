import { Operator } from "../common/types";
import { wrapInThunk } from "../common/wrap";
import { flatmap } from "./flatmap";
import { skip } from "./skip";

function _interpose<T>(source: Iterable<T>, separator: T): Iterable<T> {
    return skip(flatmap(source, item => [separator, item]), 1);
}

export function interpose<T>(source: Iterable<T>, separator: T): Iterable<T>;
export function interpose<T>(separator: T): Operator<T, T>;
export function interpose() {
    return wrapInThunk(arguments, _interpose);
}

