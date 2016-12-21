import { Enumerable } from "../enumerable";
import { EIterable } from "../common/types";

export function zip<T1, T2, TResult>(source1: Iterable<T1>, source2: Iterable<T2>, func: (item1: T1, item2: T2) => TResult): Iterable<TResult>;
export function zip<T1, T2, T3, TResult>(source1: Iterable<T1>, source2: Iterable<T2>, source3: Iterable<T3>, func: (item1: T1, item2: T2, item3: T3) => TResult): Iterable<TResult>;
export function zip<T1, T2, T3, T4, TResult>(source1: Iterable<T1>, source2: Iterable<T2>, source3: Iterable<T3>, source4: Iterable<T4>, func: (item1: T1, item2: T2, item3: T3, item4: T4) => TResult): Iterable<TResult>;
export function zip<T1, T2, T3, T4, T5, TResult>(source1: Iterable<T1>, source2: Iterable<T2>, source3: Iterable<T3>, source4: Iterable<T4>, source5: Iterable<T5>, func: (item1: T1, item2: T2, item3: T3, item4: T4, item5: T5) => TResult): Iterable<TResult>;
export function zip(...args): any;
export function* zip<TResult>(...args): Iterable<TResult> {
    var iterators = args.slice(0, args.length - 1).map((i: Iterable<any>) => i[Symbol.iterator]());
    var func: Function = args[args.length - 1];
    var values: IteratorResult<any>[];

    while (true) {
        values = iterators.map(i => i.next());
        if (values.some(x => x.done)) break;
        yield func.apply(null, values.map(x => x.value));
    }
}
declare module '../enumerable' {
    interface Enumerable<T> {
        zip<T2, TResult>(source2: EIterable<T2>, func: (item1: T, item2: T2) => TResult): Enumerable<TResult>;
        zip<T2, T3, TResult>(source2: EIterable<T2>, source3: EIterable<T3>, func: (item1: T, item2: T2, item3: T3) => TResult): Enumerable<TResult>;
        zip<T2, T3, T4, TResult>(source2: EIterable<T2>, source3: EIterable<T3>, source4: EIterable<T4>, func: (item1: T, item2: T2, item3: T3, item4: T4) => TResult): Enumerable<TResult>;
        zip<T2, T3, T4, T5, TResult>(source2: EIterable<T2>, source3: EIterable<T3>, source4: EIterable<T4>, source5: EIterable<T5>, func: (item1: T, item2: T2, item3: T3, item4: T4, item5: T5) => TResult): Enumerable<TResult>;
        zip(...args): any;
    }
}
Enumerable.prototype.zip = function <T>(this: Enumerable<T>, ...args): Enumerable<any> {
    return new Enumerable<any>(zip.apply(null, [this, ...args]));
};