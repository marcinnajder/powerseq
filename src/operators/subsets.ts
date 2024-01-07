import { Operator } from "../common/types";
import { wrapInIterable, wrapInThunk } from "../common/wrap";

function _subsets<T>(source: Iterable<T>, size: number) {
    return wrapInIterable(function* () {
        if (size <= 0) {
            return;
        }
        if (Array.isArray(source)) {
            if (size > source.length) {
                return;
            }
            if (size === source.length) {
                yield [...source]; // copy
                return;
            }
        }

        if (size === 1) {
            for (const item of source) {
                yield [item];
            }
        } else {
            const allTuples: T[][] = [];
            for (const item of source) {
                const newTuples: T[][] = [];
                for (const tuple of allTuples) {
                    const newTuple = [...tuple, item];
                    if (newTuple.length === size) {
                        yield newTuple;
                    } else {
                        newTuples.push(newTuple);
                    }
                }
                newTuples.push([item]);
                allTuples.push(...newTuples);
            }
        }
    });
}

export function subsets<T>(source: Iterable<T>, size: number): Iterable<T[]>;
export function subsets<T>(size: number): Operator<T, T[]>;
export function subsets() {
    return wrapInThunk(arguments, _subsets);
}

