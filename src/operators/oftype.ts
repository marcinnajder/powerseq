import { predicate } from "../common/types";
import { Enumerable } from "../enumerable";
import wrap from "../common/wrap";

export function oftype<TResult>(source: Iterable<any>, type: Function) {
    return wrap(function* () {
        for (var item of source) {
            if (item instanceof type) {
                yield <TResult>item;
            }
        }
    });
}
declare module '../enumerable' {
    interface Enumerable<T> {
        oftype<TResult>(type: Function): Enumerable<TResult>;
    }
}
Enumerable.prototype.oftype = function <T, TResult>(this: Enumerable<T>, type: Function) {
    return new Enumerable<TResult>(oftype<TResult>(this, type));
};

