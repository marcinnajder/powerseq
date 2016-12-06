import {Enumerable} from "../enumerable";
import {selector} from "../common/types";

export function* map<T,TResult>(source: Iterable<T>, projection:selector<T,TResult>) : Iterable<TResult>{
    var index = 0;
    for(var item of source){
        yield projection(item, index++);
    }
}
declare module '../enumerable' {
    interface Enumerable<T> {
        map<TResult>(projection:selector<T,TResult>):Enumerable<TResult>;
    }
}
Enumerable.prototype.map = function<T,TResult>(this:Enumerable<T>, projection:selector<T,TResult>) {
    return new Enumerable<TResult>(map(this,projection)); 
};