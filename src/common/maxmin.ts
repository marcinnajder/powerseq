import { Func } from "../common/types";

export function maxmin<T, V>(source: Iterable<T>, valueSelector: Func<T, V>,
    isGreaterOrLess: (key: V, minmaxKey: V) => boolean, returnValueOrItem: boolean): V | T | undefined {

    var iterator = source[Symbol.iterator]();
    var iteratorValue = iterator.next();
    if (iteratorValue.done) return undefined;

    var maxminItem = iteratorValue.value;
    var maxminValue = valueSelector(maxminItem);
    var item, value;

    while (true) {
        iteratorValue = iterator.next();
        if (iteratorValue.done) {
            return returnValueOrItem ? maxminValue : maxminItem;
        }

        item = iteratorValue.value;
        value = valueSelector(item);

        if (isGreaterOrLess(value, maxminValue)) {
            maxminValue = value;
            maxminItem = item;
        }
    }
}
