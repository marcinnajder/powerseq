import { Func2, Func3, Operator } from "../common/types";
import { wrapInIterable, wrapInThunk } from "../common/wrap";

function _flatmap<T, C, R>(source: Iterable<T>, collectionSelector: Func2<T, number, Iterable<C>>, resultSelector?: Func3<T, C, number, R>): Iterable<R> {
    return wrapInIterable(function* () {
        let index = 0;
        if (typeof resultSelector === "undefined") {
            for (let item of source) {
                let collection = collectionSelector(item, index++);
                yield* <any>collection;
            }
        }
        else {
            let index2 = 0;
            for (let item of source) {
                let collection = collectionSelector(item, index++);
                for (let collectionItem of collection) {
                    yield resultSelector(item, collectionItem, index2++);
                }
            }
        }
    });
}

export function flatmap<T, C>(source: Iterable<T>, collectionSelector: Func2<T, number, Iterable<C>>): Iterable<C>;
export function flatmap<T, C, R>(source: Iterable<T>, collectionSelector: Func2<T, number, Iterable<C>>, resultSelector: Func3<T, C, number, R>): Iterable<R>;
export function flatmap<T, C>(collectionSelector: Func2<T, number, Iterable<C>>): Operator<T, C>;
export function flatmap<T, C, R>(collectionSelector: Func2<T, number, Iterable<C>>, resultSelector: Func3<T, C, number, R>): Operator<T, R>;
export function flatmap() {
    return wrapInThunk(arguments, _flatmap);
}
