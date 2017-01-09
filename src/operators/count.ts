import {predicate} from "../common/types";
import {Enumerable} from "../enumerable";

export function count<T>(source:Iterable<T>, predicate?:predicate<T>): number{
    var count = 0;
    if(typeof predicate === "undefined"){
        if(Array.isArray(source)){
            return source.length;
        }
        for(var item of source){
            count++;
        }
        return count;
    }
    else{
        var index = 0;
        for(var item of source){
            if(predicate(item, index++)){
               count++;
            }
        }
        return count;
    }
}
declare module '../enumerable' {
    interface Enumerable<T> {
        count(predicate?:predicate<T>): number;
    }
}
Enumerable.prototype.count = function<T>(this:Enumerable<T>,predicate?:predicate<T>): number{
    return count(this, predicate);
};