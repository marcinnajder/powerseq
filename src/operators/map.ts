import { wrapInIterable, wrapInThunk } from "../common/wrap";
import { Func2, Operator } from "../common/types";

function _map<T, R>(source: Iterable<T>, projection: Func2<T, number, R>) {
    return wrapInIterable(function* () {
        let index = 0;
        for (const item of source) {
            yield projection(item, index++);
        }
    });
}

export function map<T, R>(source: Iterable<T>, projection: Func2<T, number, R>): Iterable<R>;
export function map<T, R>(projection: Func2<T, number, R>): Operator<T, R>;
export function map() {
    return wrapInThunk(arguments, _map);
}
