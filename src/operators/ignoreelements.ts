import { wrapInIterable, wrapInThunk } from "../common/wrap";
import { Operator } from "../common/types";

function _ignoreelements<T>(source: Iterable<T>): Iterable<T> {
    return wrapInIterable(function* () {
        for (var item of source) {
        }
    });
}

export function ignoreelements<T>(source: Iterable<T>): Iterable<T>;
export function ignoreelements<T>(): Operator<T, T>;
export function ignoreelements() {
    return wrapInThunk(arguments, _ignoreelements);
}
