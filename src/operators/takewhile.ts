import {Enumerable} from "../enumerable";
import {predicate} from "../common/types";

export function* takewhile<T>(source: Iterable<T>, predicate:predicate<T>) : Iterable<T>{
    let index = 0;
    for(var item of source){
        if(!predicate(item, index++)){
            break;
        }
        yield item;
    }
}
declare module '../enumerable' {
    interface Enumerable<T> {
        takewhile(predicate:predicate<T>):Enumerable<T>;
    }
}
Enumerable.prototype.takewhile = function<T>(this:Enumerable<T>, predicate:predicate<T>) {
    return new Enumerable<T>(takewhile(this,predicate)); 
};