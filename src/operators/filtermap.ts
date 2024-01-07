import { Func2, Nothing, Operator, Predicate } from "../common/types";
import { isNotNothing } from "../common/utils";
import { wrapInIterable, wrapInThunk } from "../common/wrap";

function _filtermap<T, R>(source: Iterable<T>, projection: Func2<T, number, R | Nothing>): Iterable<R> {
    return wrapInIterable(function* () {
        let index = 0;
        for (const item of source) {
            const items2 = projection(item, index++);
            if (isNotNothing(items2)) {
                yield items2;
            }
        }
    });
}

export function filtermap<T, R>(source: Iterable<T>, projection: Func2<T, number, R | Nothing>): Iterable<R>;
export function filtermap<T, R>(projection: Func2<T, number, R | Nothing>): Operator<T, R>;
export function filtermap() {
    return wrapInThunk(arguments, _filtermap);
}
