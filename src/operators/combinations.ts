import { Operator } from "../common/types";
import { wrapInIterable, wrapInThunk } from "../common/wrap";

function _combinations<T>(source: Iterable<T>, size: number) {
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

        const allTuples: T[][] = [[]];
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
            allTuples.push(...newTuples);
        }
    });
}

export function combinations<T>(source: Iterable<T>, size: number): Iterable<T[]>;
export function combinations<T>(size: number): Operator<T, T[]>;
export function combinations() {
    return wrapInThunk(arguments, _combinations);
}

