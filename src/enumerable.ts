// (Symbol as any).asyncIterator = Symbol.asyncIterator || Symbol("Symbol.asyncIterator");
export class /**Async**/Enumerable<T> implements /**Async**/Iterable<T>{
    constructor(public _iterable:/**Async**/Iterable<T>) {
    }
    [Symbol./**! iterator asyncIterator**/iterator] = function () {
        return this._iterable[Symbol./**! iterator asyncIterator**/iterator]();
    };
}