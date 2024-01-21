import { OperatorR } from "../common/types";
import { wrapInThunkAlways } from "../common/wrap";

export function includes<T>(source: Iterable<T>, searchElement: T, fromIndex?: number): boolean {
    if (typeof fromIndex === "undefined") {
        for (const item of source) {
            if (item === searchElement) {
                return true;
            }
        }
        return false;
    } else {
        const iterator = source[Symbol.iterator]();
        let value: IteratorResult<T>;
        let index = 0;

        while (index < fromIndex) {
            value = iterator.next();
            if (value.done) return false;
            index++;
        }

        while (true) {
            value = iterator.next();
            if (value.done) return false;

            if (value.value === searchElement) {
                return true;
            }
        }
    }
}

export function includesp<T>(searchElement: T, fromIndex?: number): OperatorR<T, boolean> {
    return wrapInThunkAlways(arguments, includes) as any;
}
