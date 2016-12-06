import {keySelector} from "../common/types";

export function maxmin<T>(source: Iterable<T>, keySelector:keySelector<T,any>, isGreaterOrLess : (key, minmaxKey) => boolean) : T|undefined{
    if(typeof keySelector === "undefined"){
        keySelector = item => item;
    }
    var iterator = source[Symbol.iterator]();
    var value = iterator.next();
    if(value.done) return undefined;

    var maxminItem = value.value;
    var maxminKey = keySelector(maxminItem);
    var item, key;

    while(true){
        value = iterator.next();
        if(value.done) return maxminItem;

        item = value.value;
        key = keySelector(item);

        if(isGreaterOrLess(key, maxminKey)){
            maxminKey = key;
            maxminItem = item;
        }
    }
}