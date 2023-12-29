import { wrapInThunkAlways } from "../common/wrap";
import { OperatorR } from "../common/types";

export function sequenceequal<T>(source1: Iterable<T>, source2: Iterable<T>): boolean;
export function sequenceequal<T>(source1: Iterable<T>, source2: Iterable<T>, source3: Iterable<T>): boolean;
export function sequenceequal<T>(source1: Iterable<T>, source2: Iterable<T>, source3: Iterable<T>, source4: Iterable<T>): boolean;
export function sequenceequal<T>(source1: Iterable<T>, source2: Iterable<T>, source3: Iterable<T>, source4: Iterable<T>, source5: Iterable<T>): boolean;
export function sequenceequal<T>(...args: Iterable<T>[]): boolean;
export function sequenceequal<T>(...args: Iterable<T>[]): boolean {
    var iterators = args.map((i: Iterable<any>) => i[Symbol.iterator]());
    var value: IteratorResult<any>, firstValue: IteratorResult<any> | undefined;

    while (true) {
        firstValue = undefined;
        for (var i = 0; i < iterators.length; i++) {
            value = iterators[i].next();
            if (typeof firstValue === "undefined") {
                firstValue = value;
            } else {
                if (firstValue.done !== value.done || firstValue.value !== value.value) {
                    return false;
                }
            }
        }

        if (typeof firstValue === "undefined" || firstValue.done) {
            return true;
        }
    }
}


export function sequenceequalp<T>(source2: Iterable<T>): OperatorR<T, boolean>;
export function sequenceequalp<T>(source2: Iterable<T>, source3: Iterable<T>): OperatorR<T, boolean>;
export function sequenceequalp<T>(source2: Iterable<T>, source3: Iterable<T>, source4: Iterable<T>): OperatorR<T, boolean>;
export function sequenceequalp<T>(source2: Iterable<T>, source3: Iterable<T>, source4: Iterable<T>, source5: Iterable<T>): OperatorR<T, boolean>;
export function sequenceequalp<T>(...args: Iterable<T>[]): OperatorR<T, boolean>;
export function sequenceequalp() {
    return wrapInThunkAlways(arguments, sequenceequal);
}
