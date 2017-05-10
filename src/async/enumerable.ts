(Symbol as any).asyncIterator = Symbol.asyncIterator || Symbol("Symbol.asyncIterator");

export class AsyncEnumerable<T> implements AsyncIterable<T>{
    constructor(public _iterable: AsyncIterable<T>) {
    }
    [Symbol.asyncIterator] = function () {
        return this._iterable[Symbol.asyncIterator]();
    };
}