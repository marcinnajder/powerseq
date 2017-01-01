import { predicate } from "../common/types";
import { Enumerable } from "../enumerable";
import wrap from "../common/wrap";


export function cast<TResult>(source: Iterable<any>, type: Function) {
    return wrap(function* () {
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
declare module '../enumerable' {
    interface Enumerable<T> {
        cast<TResult>(type: Function): Enumerable<TResult>;
    }
}
Enumerable.prototype.cast = function <T, TResult>(this: Enumerable<T>, type: Function) {
    return new Enumerable<TResult>(cast<TResult>(this, type));
};

