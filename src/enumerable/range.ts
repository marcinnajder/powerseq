import {Enumerable} from "../enumerable";


export function* range<T>(start:number, count:number) : Iterable<number>{
    let end = start + count;
    for(var i=start; i<end; i++){
        yield i;
    }
}
declare module '../enumerable' {
    namespace Enumerable {
        export function range<T>(start:number, count:number) : Enumerable<number>;
    }
}
Enumerable.range = function <T>(start:number, count:number) : Enumerable<number>{
    return new Enumerable<number>(range(start, count));
}