import { selector, EIterable, Operator } from "../common/types";
import { Enumerable } from "../enumerable_";
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

declare module '../enumerable_' {
    interface Enumerable<T> {
        flatmap<TCollection>(collectionSelector: selector<T, EIterable<TCollection>>): Enumerable<TCollection>;
        flatmap<TCollection, TResult>(collectionSelector: selector<T, EIterable<TCollection>>, resultSelector: (item: T, collectionItem: TCollection) => TResult): Enumerable<TResult>;
    }
}
Enumerable.prototype.flatmap = function <T, TCollection, TResult>(this: Enumerable<T>, collectionSelector: selector<T, EIterable<TCollection>>, resultSelector?: (item: T, collectionItem: TCollection) => TResult): Enumerable<TResult> {
    return new Enumerable<TResult>(_flatmap(this, collectionSelector, resultSelector));
};