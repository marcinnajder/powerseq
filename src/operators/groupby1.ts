import { wrapInIterable, wrapInThunk } from "../common/wrap";
import { Operator } from "../common/types";

// <- here TypeScript helper methods will be placed during npm package bundling process ("node_modules/tslib/tslib.js"" file) 
export class Enumerable<T> implements Iterable<T>{
    constructor(public _iterable: Iterable<T>) {
    }
    [Symbol.iterator] = function (this: any): Iterator<T> {
        return this._iterable[Symbol.iterator]();
    };
}


export interface IterableGroup<TKey, T> extends Iterable<T> {
    key: TKey
}
export interface EnumerableGroup<TKey, T> extends Enumerable<T> {
    key: TKey
}

export type KeySelectorFunc<T, TKey> = (item: T, index: number) => TKey;
export type ElementSelectorFunc<T, TElement> = (item: T) => TElement;
export type ResultSelectorFunc<TKey, T, TResult> = (key: TKey, items: Iterable<T>) => TResult

function _groupby1<T, TKey, TElement, TResult>(source: Iterable<T>, keySelector: KeySelectorFunc<T, TKey>, elementSelector?: (ElementSelectorFunc<T, TElement>) | (ResultSelectorFunc<TKey, TElement, TResult>), resultSelector?: ResultSelectorFunc<TKey, TElement, TResult>): Iterable<TResult | IterableGroup<TKey, TElement>> {
    return wrapInIterable(function* () {
        const map = new Map<TKey, TElement[]>();
        let key: TKey, element: TElement, items: TElement[];

        if (typeof resultSelector === "undefined") { // if not all arguments are specified
            if (typeof elementSelector === "undefined") { // if only keySelector is specified
                elementSelector = ((x: any) => x) as any;
            } else { // if elementSelector or resultSelector is specified
                if (elementSelector.length === 2) { // if elementSelector is a resultSelector
                    resultSelector = elementSelector as any;
                    elementSelector = ((x: any) => x) as any;
                }
            }
        }

        var index = 0;
        for (var item of source) {
            key = keySelector(item, index++);
            element = (elementSelector as ElementSelectorFunc<T, TElement>)(item);
            items = map.get(key)!;
            if (typeof items === "undefined") {
                map.set(key, [element]);
            } else {
                items.push(element);
            }
        }

        if (typeof resultSelector === "undefined") {
            for (var [entryKey, entryValue] of map.entries()) {
                var enumerable = <EnumerableGroup<TKey, TElement>>new Enumerable<TElement>(entryValue);
                enumerable.key = entryKey;
                yield enumerable;
            }
        } else {
            for (var [entryKey, entryValue] of map.entries()) {
                yield resultSelector(entryKey, new Enumerable<TElement>(entryValue));
            }
        }
    });
}

export function groupby1<T, TKey>(source: Iterable<T>, keySelector: KeySelectorFunc<T, TKey>): Iterable<IterableGroup<TKey, T>>;
export function groupby1<T, TKey, TElement>(source: Iterable<T>, keySelector: KeySelectorFunc<T, TKey>, elementSelector: ElementSelectorFunc<T, TElement>): Iterable<IterableGroup<TKey, TElement>>;
export function groupby1<T, TKey, TResult>(source: Iterable<T>, keySelector: KeySelectorFunc<T, TKey>, resultSelector: ResultSelectorFunc<TKey, T, TResult>): Iterable<TResult>;
export function groupby1<T, TKey, TElement, TResult>(source: Iterable<T>, keySelector: KeySelectorFunc<T, TKey>, elementSelector: ElementSelectorFunc<T, TElement>, resultSelector: ResultSelectorFunc<TKey, TElement, TResult>): Iterable<TResult>;
export function groupby1<T, TKey>(keySelector: KeySelectorFunc<T, TKey>): Operator<T, IterableGroup<TKey, T>>;
export function groupby1<T, TKey, TElement>(keySelector: KeySelectorFunc<T, TKey>, elementSelector: ElementSelectorFunc<T, TElement>): Operator<T, IterableGroup<TKey, TElement>>;
export function groupby1<T, TKey, TResult>(keySelector: KeySelectorFunc<T, TKey>, resultSelector: ResultSelectorFunc<TKey, T, TResult>): Operator<T, TResult>;
export function groupby1<T, TKey, TElement, TResult>(keySelector: KeySelectorFunc<T, TKey>, elementSelector: ElementSelectorFunc<T, TElement>, resultSelector: ResultSelectorFunc<TKey, TElement, TResult>): Operator<T, TResult>;
export function groupby1() {
    return wrapInThunk(arguments, _groupby1);
}

