import { Func, Operator } from "../common/types";
import { wrapInIterable, wrapInThunkIfOnlyFirstArgumentIsIterable, isIterable } from "../common/wrap";

function _intersect<T>(source: Iterable<T>, source2: Iterable<T>, keySelector?: Func<T, any>) {
    return wrapInIterable(function* () {
        if (typeof keySelector === "undefined") {
            keySelector = item => item;
        }
        var set = new Set<any>();
        var resultSet = new Set<any>();
        for (var s of source) {
            set.add(keySelector(s));
        }
        var key;
        for (var item of source2) {
            key = keySelector(item);
            if (set.has(key) && !resultSet.has(key)) {
                resultSet.add(key);
                yield item;
            }
        }
    });
}

export function intersect<T>(source: Iterable<T>, source2: Iterable<T>, keySelector?: Func<T, any>): Iterable<T>;
export function intersect<T>(source2: Iterable<T>, keySelector?: Func<T, any>): Operator<T, T>;
export function intersect() {
    return wrapInThunkIfOnlyFirstArgumentIsIterable(arguments, _intersect);
}
