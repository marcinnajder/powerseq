import { Operator } from "../common/types";
import { Enumerable } from "../enumerable_";
import { wrapInIterable, wrapInThunk } from "../common/wrap";

function _oftype<TResult>(source: Iterable<any>, type: Function) {
    return wrapInIterable(function* () {
        for (var item of source) {
            if (item instanceof type) {
                yield <TResult>item;
            }
        }
    });
}

export function oftype<TResult>(source: Iterable<any>, type: Function): Iterable<TResult>;
export function oftype<TResult>(type: Function): Operator<any, TResult>;
export function oftype() {
    return wrapInThunk(arguments, _oftype);
}

declare module '../enumerable_' {
    interface Enumerable<T> {
        oftype<TResult>(type: Function): Enumerable<TResult>;
    }
}
Enumerable.prototype.oftype = function <T, TResult>(this: Enumerable<T>, type: Function) {
    return new Enumerable<TResult>(_oftype<TResult>(this, type));
};

