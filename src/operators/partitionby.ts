import { Func, Operator } from "../common/types";
import { identity } from "../common/utils";
import { wrapInIterable, wrapInThunk } from "../common/wrap";

function _partitionby<T>(source: Iterable<T>, keySelector: Func<T, any>) {
    return wrapInIterable(function* () {
        const iterator = source[Symbol.iterator]();
        let pack: T[] = [];
        let result;

        if (!(result = iterator.next()).done) {
            let previousKey = keySelector(result.value);
            pack.push(result.value);

            while (!(result = iterator.next()).done) {
                var currentKey = keySelector(result.value);

                if (previousKey === currentKey) {
                    pack.push(result.value);
                } else {
                    yield pack;
                    pack = [result.value];
                }

                previousKey = currentKey;
            }
        }

        if (pack.length > 0) {
            yield pack;
        }
    });
}

export function partitionby<T>(source: Iterable<T>, keySelector: Func<T, any>): Iterable<T[]>;
export function partitionby<T>(keySelector: Func<T, any>): Operator<T, T[]>;
export function partitionby() {
    return wrapInThunk(arguments, _partitionby);
}