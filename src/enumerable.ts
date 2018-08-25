// <- here TypeScript helper methods will be placed during npm package bundling process ("node_modules/tslib/tslib.js"" file) 

// (Symbol as any).iterator = Symbol.iterator || Symbol("Symbol.iterator");
export class Enumerable<T> implements Iterable<T>{
    constructor(public _iterable: Iterable<T>) {
    }
    [Symbol.iterator] = function () {
        return this._iterable[Symbol.iterator]();
    };
}