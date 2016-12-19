import {keySelector} from "../common/types";

// export function maxmin<T>(source: Iterable<T>,keySelector:keySelector<T,any>, isGreaterOrLess : (key, minmaxKey) => boolean) : T|undefined{
//     if(typeof keySelector === "undefined"){
//         keySelector = item => item;
//     }
//     var iterator = source[Symbol.iterator]();
//     var value = iterator.next();
//     if(value.done) return undefined;

//     var maxminItem = value.value;
//     var maxminKey = keySelector(maxminItem);
//     var item, key;

//     while(true){
//         value = iterator.next();
//         if(value.done) return maxminItem;

//         item = value.value;
//         key = keySelector(item);

//         if(isGreaterOrLess(key, maxminKey)){
//             maxminKey = key;
//             maxminItem = item;
//         }
//     }
// }

export function maxmin<T,TValue>(source: Iterable<T>, valueSelector:keySelector<T,TValue>,
    isGreaterOrLess : (key:TValue, minmaxKey:TValue) => boolean, returnValueOrItem:boolean) : TValue|T|undefined{
        
    var iterator = source[Symbol.iterator]();
    var iteratorValue = iterator.next();
    if(iteratorValue.done) return undefined;

    var maxminItem = iteratorValue.value;
    var maxminValue = valueSelector(maxminItem);
    var item, value;

    while(true){
        iteratorValue = iterator.next();
        if(iteratorValue.done) {
            return returnValueOrItem ? maxminValue : maxminItem; 
        }

        item = iteratorValue.value;
        value = valueSelector(item);

        if(isGreaterOrLess(value, maxminValue)){
            maxminValue = value;
            maxminItem = item;
        }
    }
}
