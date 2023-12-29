import { wrapInIterable, wrapInThunk } from "../common/wrap";
import { Operator } from "../common/types";

function _buffer<T>(source: Iterable<T>, count: number, skip?: number) {
    return wrapInIterable(function* () {
        if (typeof count === "undefined" || count < 0) {
            return;
        }

        if (typeof skip === "undefined" || skip <= 0) {
            let result = new Array<T>(count);

            let i = 0;
            for (var item of source) {
                result[i] = item;
                i++;

                if (i === count) {
                    i = 0;
                    yield result;
                    result = new Array(count);
                }
            }

            if (i > 0) {
                result.splice(i);
                yield result;
            }
        } else {
            let results: T[][] = [];

            let index = 0;
            for (var item of source) {
                if (index % skip === 0) {
                    results.push([]);
                }

                for (let result of results) {
                    result.push(item);
                }

                if (results.length > 0 && results[0].length === count) {
                    yield results[0];
                    results.splice(0, 1);
                }

                index++;
            }

            for (let result of results) {
                yield result;
            }
        }
    });
}

export function buffer<T>(source: Iterable<T>, count: number, skip?: number): Iterable<T[]>;
export function buffer<T>(count: number, skip?: number): Operator<T, T[]>;
export function buffer() {
    return wrapInThunk(arguments, _buffer);
}