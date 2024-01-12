import { wrapInThunk } from "../common/wrap";
import { Operator } from "../common/types";

function _memoize<T>(source: Iterable<T>): Iterable<T> {
    const results: IteratorResult<T, any>[] = [], iterator = source[Symbol.iterator]();

    return {
        [Symbol.iterator]() {
            let i = 0;
            return {
                next() {
                    if (i < results.length) {
                        return results[i++];
                    }

                    const last = results[i - 1];
                    if (last?.done) {
                        return last;
                    }

                    return results[i++] = iterator.next();
                }
            };
        }
    };
}

export function memoize<T>(source: Iterable<T>): Iterable<T>;
export function memoize<T>(): Operator<T, T>;
export function memoize() {
    return wrapInThunk(arguments, _memoize);
}


// https://github.com/dotnet/fsharp/blob/main/src/FSharp.Core/seq.fs#L1214

