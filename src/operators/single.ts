import {Enumerable} from "../enumerable";
import {predicate} from "../common/types";

export function single<T>(source:Iterable<T>, predicate?:predicate<T>): T|undefined{
    var hasValue = false;
    var value : T|undefined =  undefined;

    if(typeof predicate === "undefined"){
        for(var item of source){
            if(!hasValue){
                value = item;
                hasValue = true;
            }
            else{
                throw new TypeError("More than one element satisfies the condition in predicate.");
            }
        }
    }
    else{
        var index = 0;
        for(var item of source){
            if(predicate(item, index++)){
                if(!hasValue){
                    value = item;
                    hasValue = true;
                }
                else{
                    throw new TypeError("More than one element satisfies the condition in predicate.");
                }
            }
        }
    }
    return value;
}
declare module '../enumerable' {
    interface Enumerable<T> {
        single(predicate?:predicate<T>): T|undefined;
    }
}
Enumerable.prototype.single = function<T>(this:Enumerable<T>,predicate?:predicate<T>): T|undefined{
    return single(this, predicate);
};