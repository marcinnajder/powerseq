import { Func2 } from "../common/types";

export function maxmin<T, V>(source: Iterable<T>, valueSelector: Func2<T, number, V>,
    isGreaterOrLess: (key: V, minmaxKey: V) => boolean, returnValueOrItem: boolean): V | T | undefined {

    const iterator = source[Symbol.iterator]();
    let iteratorValue = iterator.next();

    if (iteratorValue.done) {
        return undefined;
    }

    let index = 0;
    let maxminItem = iteratorValue.value;
    let maxminValue = valueSelector(maxminItem, index);
    index++;

    while (true) {
        iteratorValue = iterator.next();
        if (iteratorValue.done) {
            return returnValueOrItem ? maxminValue : maxminItem;
        }

        const item = iteratorValue.value;
        const value = valueSelector(item, index);

        if (isGreaterOrLess(value, maxminValue)) {
            maxminValue = value;
            maxminItem = item;
        }
        index++;
    }
}
