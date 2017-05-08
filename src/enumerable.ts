export class /**Async**/Enumerable<T> implements /**Async**/Iterable<T>{
    constructor(public _iterable:/**Async**/Iterable<T>){
    }
    [Symbol./**! iterator asyncIterator**/iterator] = function(){
        return this._iterable[Symbol./**replace:iterator-asyncIterator**/iterator]();
    };
}