import { Operator } from "../common/types";
import { wrapInIterable, wrapInThunkAlways } from "../common/wrap";

export function zip<T1, T2, R>(source1: Iterable<T1>, source2: Iterable<T2>, func: (item1: T1, item2: T2) => R): Iterable<R>;
export function zip<T1, T2, T3, R>(source1: Iterable<T1>, source2: Iterable<T2>, source3: Iterable<T3>, func: (item1: T1, item2: T2, item3: T3) => R): Iterable<R>;
export function zip<T1, T2, T3, T4, R>(source1: Iterable<T1>, source2: Iterable<T2>, source3: Iterable<T3>, source4: Iterable<T4>, func: (item1: T1, item2: T2, item3: T3, item4: T4) => R): Iterable<R>;
export function zip<T1, T2, T3, T4, T5, R>(source1: Iterable<T1>, source2: Iterable<T2>, source3: Iterable<T3>, source4: Iterable<T4>, source5: Iterable<T5>, func: (item1: T1, item2: T2, item3: T3, item4: T4, item5: T5) => R): Iterable<R>;
export function zip(...args: any[]): any;
export function zip<R>(...args: any[]): Iterable<R> {
    return wrapInIterable(function* () {
        var iterators = args.slice(0, args.length - 1).map((i: Iterable<any>) => i[Symbol.iterator]());
        var func: Function = args[args.length - 1];
        var values: IteratorResult<any>[];

        while (true) {
            values = iterators.map(i => i.next());
            if (values.some(x => x.done)) break;
            yield func.apply(null, values.map(x => x.value));
        }
    });
}

export function zipp<T1, T2, R>(source2: Iterable<T2>, func: (item1: T1, item2: T2) => R): Operator<T1, R>;
export function zipp<T1, T2, T3, R>(source2: Iterable<T2>, source3: Iterable<T3>, func: (item1: T1, item2: T2, item3: T3) => R): Operator<T1, R>;
export function zipp<T1, T2, T3, T4, R>(source2: Iterable<T2>, source3: Iterable<T3>, source4: Iterable<T4>, func: (item1: T1, item2: T2, item3: T3, item4: T4) => R): Operator<T1, R>;
export function zipp<T1, T2, T3, T4, T5, R>(source2: Iterable<T2>, source3: Iterable<T3>, source4: Iterable<T4>, source5: Iterable<T5>, func: (item1: T1, item2: T2, item3: T3, item4: T4, item5: T5) => R): Operator<T1, R>;
export function zipp(...args: any[]): Operator<any, any>;
export function zipp() {
    return wrapInThunkAlways(arguments, zip);
}

