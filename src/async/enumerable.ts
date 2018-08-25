// file was generated
// <- here TypeScript helper methods will be placed during npm package bundling process ("node_modules/tslib/tslib.js"" file) 

(Symbol as any).asyncIterator = Symbol.asyncIterator || Symbol("Symbol.asyncIterator");
export class AsyncEnumerable<T> implements AsyncIterable<T>{
    constructor(public _iterable: AsyncIterable<T>) {
    }
    [Symbol.asyncIterator] = function () {
        return this._iterable[Symbol.asyncIterator]();
    };
}