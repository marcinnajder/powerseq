import { Operator } from "../common/types";
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