import {Enumerable} from "../enumerable";
import {predicate} from "../common/types";

export function find<T>(source:Iterable<T>, predicate?:predicate<T>): T|undefined{
    if(typeof predicate === "undefined"){
        for(var item of source){
            return item;
        }
    }
    else{
        var index = 0;
        for(var item of source){
            if(predicate(item, index++)){
                return item;
            }
        }
    }
}
declare module '../enumerable' {
    interface Enumerable<T> {
        find(predicate?:predicate<T>): T|undefined;
    }
}
Enumerable.prototype.find = function<T>(this:Enumerable<T>,predicate?:predicate<T>): T|undefined{
    return find(this, predicate);
};