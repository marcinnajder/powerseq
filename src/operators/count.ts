import {predicate} from "../common/types";
import {Enumerable} from "../enumerable";

export /**async**/function count<T>(source:/**Async**/Iterable<T>, predicate?:predicate<T>): /**Promise<**/number/**>**/{
    var count = 0;
    if(typeof predicate === "undefined"){
        if(Array.isArray(source)){
            return source.length;
        }
        for /**await**/(var item of source){
            count++;
        }
        return count;
    }
    else{
        var index = 0;
        for /**await**/(var item of source){
            if(predicate(item, index++)){
               count++;
            }
        }
        return count;
    }
}
declare module '../enumerable' {
    interface /**Async**/Enumerable<T> {
        count(predicate?:predicate<T>): /**Promise<**/number/**>**/;
    }
}
/**Async**/Enumerable.prototype.count = function<T>(this:/**Async**/Enumerable<T>,predicate?:predicate<T>): /**Promise<**/number/**>**/{
    return count(this, predicate);
};