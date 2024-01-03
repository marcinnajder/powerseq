import { Operator } from "../common/types";
import { wrapInIterable, wrapInThunk } from "../common/wrap";

function _oftype<R>(source: Iterable<any>, type: Function) {
    return wrapInIterable(function* () {
        for (var item of source) {
            if (item instanceof type) {
                yield <R>item;
            }
        }
    });
}

export function oftype<R>(source: Iterable<any>, type: Function): Iterable<R>;
export function oftype<R>(type: Function): Operator<any, R>;
export function oftype() {
    return wrapInThunk(arguments, _oftype);
}

