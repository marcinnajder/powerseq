
import { Func, Comparer } from "./types";
import { wrapInIterable } from "./wrap";

export interface OrderingState<T> {
    originalIterable: Iterable<T>;
    keySelector: Func<T, any>;
    descending: boolean;
    prevState?: OrderingState<T>;
}

export interface OrderedIterable<T> extends Iterable<T> {
    state: OrderingState<T>;
}

export function ordebyImpl<T>(state: OrderingState<T>) {
    return wrapInIterable(function* () {
        yield* Array.from<T>(state.originalIterable).sort(buildComparer(state));
    });
}

function buildComparer<T>(state: OrderingState<T>): Comparer<T> {
    if (state.prevState) {
        var prevComparer = buildComparer(state.prevState);
        return (a, b) => {
            var res = prevComparer(a, b);
            if (res === 0) {
                return compare(a, b);
            }
            return res;
        }
    }
    else {
        return compare;
    }

    function compare(a: T, b: T) {
        var aKey = state.keySelector(a);
        var bKey = state.keySelector(b);
        if (aKey === bKey) {
            return 0;
        }
        return state.descending ? (aKey < bKey ? 1 : -1) : (aKey < bKey ? -1 : 1);
    };
}

