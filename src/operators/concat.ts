import {Enumerable} from "../enumerable";

export function* concat<T>(...args:Iterable<T>[]): Iterable<T>{
    for(var arg of args){
        yield* arg;
    }
}
declare module '../enumerable' {
    interface Enumerable<T> {
        concat(...args:Iterable<T>[]): Enumerable<T>;
    }
}
Enumerable.prototype.concat = function<T>(this:Enumerable<T>,...args:Iterable<T>[]): Enumerable<T>{
    return new Enumerable(concat(this, ...args));
};