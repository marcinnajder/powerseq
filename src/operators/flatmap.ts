import { Func2, Operator } from "../common/types";
import { wrapInIterable, wrapInThunk } from "../common/wrap";

function _flatmap<T, C, R>(source: Iterable<T>, collectionSelector: Func2<T, number, Iterable<C>>, resultSelector?: Func2<T, C, R>): Iterable<R> {
    return wrapInIterable(function* () {
        var index = 0;
        if (typeof resultSelector === "undefined") {
            for (let item of source) {
                let collection = collectionSelector(item, index++);
                yield* <any>collection;
            }
        }
        else {
            for (let item of source) {
                let collection = collectionSelector(item, index++);
                for (let collectionItem of collection) {
                    yield resultSelector(item, collectionItem);
                }
            }
        }
    });
}

export function flatmap<T, C>(source: Iterable<T>, collectionSelector: Func2<T, number, Iterable<C>>): Iterable<C>;
export function flatmap<T, C, R>(source: Iterable<T>, collectionSelector: Func2<T, number, Iterable<C>>, resultSelector: Func2<T, C, R>): Iterable<R>;
export function flatmap<T, C>(collectionSelector: Func2<T, number, Iterable<C>>): Operator<T, C>;
export function flatmap<T, C, R>(collectionSelector: Func2<T, number, Iterable<C>>, resultSelector: Func2<T, C, R>): Operator<T, R>;
export function flatmap() {
    return wrapInThunk(arguments, _flatmap);
}
