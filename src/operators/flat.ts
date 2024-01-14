import { Func2, Operator } from "../common/types";
import { wrapInIterable, wrapInThunk } from "../common/wrap";

function _flat<T>(source: Iterable<T>, depthOrFunc?: number | Func2<ItemOf<T, 0>, number, boolean>): Iterable<ItemOf<T, 1>> {
    return wrapInIterable(function* () {

        const func: Func2<ItemOf<T, 0>, number, boolean> = typeof depthOrFunc === "function" ? depthOrFunc :
            typeof depthOrFunc === "number" ? ((_, depth) => depth <= depthOrFunc) : ((_, depth) => depth <= 1);

        yield* go(source, func, 1);
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function* go(items: any, goDeeper: Func2<ItemOf<T, 0>, number, boolean>, currentDepth: number): Iterable<ItemOf<T, 1>> {
        for (const item of items) {
            if ((typeof item[Symbol.iterator]) !== "undefined") {
                if (goDeeper(item, currentDepth)) {
                    yield* go(item, goDeeper, currentDepth + 1);
                } else {
                    yield item;
                }
            } else {
                yield item;
            }
        }
    }
}


export type ItemOf<T, D extends number> = FlatIterable<Iterable<T>, D>

export function flat<T>(source: Iterable<T>): Iterable<ItemOf<T, 1>>;
export function flat<T, D extends number = 1>(source: Iterable<T>, depth?: D): Iterable<ItemOf<T, D>>;
export function flat<T, D extends number = 20>(source: Iterable<T>, goDeeper: (item: ItemOf<T, 0>, depth: number) => boolean): Iterable<ItemOf<T, D>>;
export function flat<T>(): Operator<T, ItemOf<T, 1>>;
export function flat<T, D extends number = 1>(depth?: D): Operator<T, ItemOf<T, D>>;
export function flat<T, D extends number = 20>(goDeeper: (item: ItemOf<T, 0>, depth: number) => boolean): Operator<T, ItemOf<T, D>>;
export function flat() {
    return wrapInThunk(arguments, _flat);
}


// type 'FlatIterable' is based on types from file "/node_modules/typescript/lib/lib.es2019.array.d.ts"
// interface Array<T> { flat<A, D extends number = 1>( this: A, depth?: D ): FlatArray<A, D>[]; }
// type FlatArray<T, Depth extends number> = { ... } 
type FlatIterable<T, Depth extends number> = {
    done: T;
    recur: T extends Iterable<infer I> ? FlatIterable<I, [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20][Depth]>
    : T;
}[Depth extends -1 ? "done" : "recur"];



// ************************************
// simpler "one level" implementation

// function _flat<T>(source: Iterable<Iterable<T>>): Iterable<T> {
//     return wrapInIterable(function* () {
//         for (const collection of source) {
//             yield* collection;
//         }
//     });
// }

// export type ItemOf<C> = C extends Iterable<infer T> ? T : never;

// export function flat<T, C extends Iterable<T>>(source: Iterable<C>): Iterable<ItemOf<C>>;
// export function flat<T, C extends Iterable<T>>(): Operator<C, ItemOf<C>>;
// export function flat() {
//     return wrapInThunk(arguments, _flat);
// }