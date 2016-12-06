import {Enumerable} from "../enumerable";

export function* empty<T>() : Iterable<T>{
}
declare module '../enumerable' {
    namespace Enumerable {
        //export let empty :  <T>(item :T ) => string;
        export function empty<T>():Enumerable<T>; 
    }
}
Enumerable.empty = function <T>() : Enumerable<T>{
    return new Enumerable<T>(empty<T>());
}