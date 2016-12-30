export class Enumerable<T> implements Iterable<T>{
    constructor(public _iterable:Iterable<T>){
    }
    [Symbol.iterator] = function(){
        return this._iterable[Symbol.iterator]();
    };
}