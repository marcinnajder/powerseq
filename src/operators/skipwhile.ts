import { predicate, Operator } from "../common/types";
import { wrapInIterable, wrapInThunk } from "../common/wrap";

function _skipwhile<T>(source: Iterable<T>, predicate: predicate<T>) {
    return wrapInIterable(function* () {
        var iterator = source[Symbol.iterator]();
        var value: IteratorResult<T>;
        var index = 0;

        while (true) {
            value = iterator.next();
            if (value.done) return;
            if (predicate(value.value, index++)) continue;
            yield value.value;
            break;
        }

        while (true) {
            var value = iterator.next();
            if (value.done) return;
            yield value.value;
        }
    });
}

export function skipwhile<T>(source: Iterable<T>, predicate: predicate<T>): Iterable<T>;
export function skipwhile<T>(predicate: predicate<T>): Operator<T, T>;
export function skipwhile() {
    return wrapInThunk(arguments, _skipwhile);
}
