import { Operator } from "../common/types";
import { wrapInThunkAlways } from "../common/wrap";
import { identity } from "../common/utils";
import { zip } from "./zip";
import { flatmap } from "./flatmap";

export function interleave<T>(...iterables: Iterable<T>[]): Iterable<T> {
    return flatmap(zip(...iterables, (...results: any[]) => results as Iterable<T>) as Iterable<Iterable<T>>, identity);
}

export function interleavep<T>(...iterables: Iterable<T>[]): Operator<T, T> {
    return wrapInThunkAlways(arguments, interleave);
}

