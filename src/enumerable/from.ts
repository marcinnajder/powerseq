import {Enumerable} from "../enumerable";

export function from<T>(iterable: Iterable<T>):Iterable<T>{
    return iterable; 
}
declare module '../enumerable' {
    namespace Enumerable {
        function from<T>(iterable: Iterable<T>):Enumerable<T>; 
    }
}
Enumerable.from = function<T>(iterable: Iterable<T>):Enumerable<T>{
    return new Enumerable<T>(from<T>(iterable));
}