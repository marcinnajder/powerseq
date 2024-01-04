import { Predicate, OperatorR } from "../common/types";
import { wrapInThunk } from "../common/wrap";

// ta funkcja jest dziwna bo rzuca blad jak jest wiecej jak jeden, ale jak nie ma zadnego to zwraca undefined tzn to jest 
// niespojne, w Koltin jest SingleOrNull i to dziala spokojnie

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

export function single<T>(source: Iterable<T>, predicate?: Predicate<T>): T | undefined;
export function single<T>(source: Iterable<T>, predicate: Predicate<T>, defaultValue: T): T;
export function single<T>(predicate?: Predicate<T>): OperatorR<T, T | undefined>;
export function single<T>(predicate: Predicate<T>, defaultValue: T): OperatorR<T, T>;
export function single() {
    return wrapInThunk(arguments, _single);
}
