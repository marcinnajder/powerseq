import { wrapInIterable, wrapInThunk } from "../common/wrap";
import { Operator } from "../common/types";

function _doo<T>(source: Iterable<T>, action: (item: T, index: number) => void) {
    return wrapInIterable(function* () {
        let index = 0;
        for (const item of source) {
            action(item, index++);
            yield item;
        }
    });
}

export function doo<T>(source: Iterable<T>, action: (item: T, index: number) => void): Iterable<T>;
export function doo<T>(action: (item: T, index: number) => void): Operator<T, T>;
export function doo() {
    return wrapInThunk(arguments, _doo);
}
