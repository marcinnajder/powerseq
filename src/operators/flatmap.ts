import { selector, EIterable, Operator } from "../common/types";
import { wrapInIterable, wrapInThunk } from "../common/wrap";

function _flatmap<T, TCollection, TResult>(source: Iterable<T>, collectionSelector: selector<T, Iterable<TCollection>>, resultSelector?: (item: T, collectionItem: TCollection) => TResult): Iterable<TResult> {
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

export function flatmap<T, TCollection>(source: Iterable<T>, collectionSelector: selector<T, Iterable<TCollection>>): Iterable<TCollection>;
export function flatmap<T, TCollection, TResult>(source: Iterable<T>, collectionSelector: selector<T, Iterable<TCollection>>, resultSelector: (item: T, collectionItem: TCollection) => TResult): Iterable<TResult>;
export function flatmap<T, TCollection>(collectionSelector: selector<T, Iterable<TCollection>>): Operator<T, TCollection>;
export function flatmap<T, TCollection, TResult>(collectionSelector: selector<T, Iterable<TCollection>>, resultSelector: (item: T, collectionItem: TCollection) => TResult): Operator<T, TResult>;
export function flatmap() {
    return wrapInThunk(arguments, _flatmap);
}
