import { Operator } from "../common/types";
import { wrapInIterable, wrapInThunk } from "../common/wrap";


function _cast<R>(source: Iterable<any>, type: Function) {
    return wrapInIterable(function* () {
        for (var item of source) {
            if (item instanceof type) {
                yield <R>item;
            }
            else {
                throw TypeError(`An element in the sequence cannot be cast to type '${type.name}'.`);
            }
        }
    });
}

export function cast<R>(source: Iterable<any>, type: Function): Iterable<R>;
export function cast<R>(type: Function): Operator<any, R>;
export function cast() {
    return wrapInThunk(arguments, _cast);
}