import { /**Async**/Enumerable } from "../enumerable";
import { selector } from "../common/types";
import wrap from "../common/wrap";

export function map<T, TResult>(source: /**Async**/Iterable<T>, projection: selector<T, TResult>) {
    return wrap(/**async**/ function* () {
        var index = 0;
        for /**await**/(var item of source) {
            yield projection(item, index++);
        }
    });
}
declare module '../enumerable' {
    interface /**Async**/Enumerable<T> {
        map<TResult>(projection: selector<T, TResult>): /**Async**/Enumerable<TResult>;
    }
}
/**Async**/Enumerable.prototype.map = function <T, TResult>(this: /**Async**/Enumerable<T>, projection: selector<T, TResult>) {
    return new /**Async**/Enumerable<TResult>(map(this, projection));
};