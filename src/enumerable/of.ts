import {Enumerable} from "../enumerable";

export function* of<T>(...args:T[]) : Iterable<T>{
    for(var item of args){
        yield <T> item;
    }
}
declare module '../enumerable' {
    namespace Enumerable {
        export function of<T>(...args:T[]):Enumerable<T>; 
    }
}
Enumerable.of = function <T>(...args:T[]) : Enumerable<T>{
    return new Enumerable<T>(of<T>(...args));
}