import {Enumerable} from "../enumerable";

export function toarray<T>(source: Iterable<T>) : T[]{
    if(Array.isArray(source)){
        return source;
    }
    var result:T[] = [];
    for(var item of source){
        result.push(item);
    }
    return result;  
}
declare module '../enumerable' {
    interface Enumerable<T> {
       toarray():T[]
    }
}
Enumerable.prototype.toarray = function<T>(this:Enumerable<T>) {
    return toarray(this._iterable); 
};