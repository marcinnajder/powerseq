import { Selector } from "../common/types";

export function maxmin<T, TValue>(source: Iterable<T>, valueSelector: Selector<T, TValue>,
    isGreaterOrLess: (key: TValue, minmaxKey: TValue) => boolean, returnValueOrItem: boolean): TValue | T | undefined {

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
