import { Operator } from "../common/types";
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

