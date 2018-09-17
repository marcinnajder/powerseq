import { predicate, Operator } from "../common/types";
import { Enumerable } from "../enumerable_";
import { wrapInIterable, wrapInThunk } from "../common/wrap";


function _cast<TResult>(source: Iterable<any>, type: Function) {
    return wrapInIterable(function* () {
        for (var item of source) {
            if (item instanceof type) {
                yield <TResult>item;
            }
            else {
                throw TypeError(`An element in the sequence cannot be cast to type '${type.name}'.`);
            }
        }
    });
}

export function cast<TResult>(source: Iterable<any>, type: Function): Iterable<TResult>;
export function cast<TResult>(type: Function): Operator<any, TResult>;
export function cast() {
    return wrapInThunk(arguments, _cast);
}


declare module '../enumerable_' {
    interface Enumerable<T> {
        cast<TResult>(type: Function): Enumerable<TResult>;
    }
}
Enumerable.prototype.cast = function <T, TResult>(this: Enumerable<T>, type: Function) {
    return new Enumerable<TResult>(_cast<TResult>(this, type));
};

