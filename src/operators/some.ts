import {Enumerable} from "../enumerable";
import {predicate} from "../common/types";

export function some<T>(source:Iterable<T>, predicate?:predicate<T>): boolean{
    if(typeof predicate === "undefined"){
        for(var item of source){
            return true;
        }
        return false;
    }
    else{
        var index = 0;
        for(var item of source){
            if(predicate(item, index++)){
                return true;
            }
        }
        return false;
    }
}
declare module '../enumerable' {
    interface Enumerable<T> {
        some(predicate?:predicate<T>): boolean;
    }
}
Enumerable.prototype.some = function<T>(this:Enumerable<T>,predicate?:predicate<T>): boolean{
    return some(this, predicate);
};