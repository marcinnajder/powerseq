import { Predicate, OperatorR } from "../common/types";
import { wrapInThunk } from "../common/wrap";


function _single<T>(source: Iterable<T>, predicate?: Predicate<T>, defaultValue?: T): T | undefined {
    let hasValue = false;
    let value = defaultValue;

    if (typeof predicate === "undefined") {
        for (const item of source) {
            if (!hasValue) {
                value = item;
                hasValue = true;
            } else {
                return defaultValue; // throw new TypeError("More than one element satisfies the condition in predicate.");
            }
        }
    } else {
        let index = 0;
        for (const item of source) {
            if (predicate(item, index++)) {
                if (!hasValue) {
                    value = item;
                    hasValue = true;
                } else {
                    return defaultValue;
                }
            }
        }
    }
    return value;
}

// "single(source: Iterable<T>, defaultValue: T): T" <- that overload would be very convenient,
// but if type T is a function there in no way to differentiate from -> single(source: Iterable<T>, predicate?: Predicate<T>)

export function single<T>(source: Iterable<T>, predicate?: Predicate<T>): T | undefined;
export function single<T>(source: Iterable<T>, predicate: Predicate<T>, defaultValue: T): T;
export function single<T>(predicate?: Predicate<T>): OperatorR<T, T | undefined>;
export function single<T>(predicate: Predicate<T>, defaultValue: T): OperatorR<T, T>;
export function single() {
    return wrapInThunk(arguments, _single);
}
