import {Enumerable} from "../enumerable";

export function* entries<TValue>(obj) : Iterable<[string,TValue]>{
    var keys = Object.keys(obj);
    for(var key of keys){
        yield [key, obj[key]];
    }
}
declare module '../enumerable' {
    namespace Enumerable {
        function entries<TValue>(obj):Enumerable<[string,TValue]>; 
    }
}
Enumerable.entries = function<TValue>(obj) : Enumerable<[string,TValue]>{
    return new Enumerable<[string,TValue]>(entries<TValue>(obj));
}