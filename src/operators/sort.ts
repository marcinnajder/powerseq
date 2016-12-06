import {Enumerable} from "../enumerable";
import {comparer} from "../common/types";

export function* sort<T, TKey>(source:Iterable<T>, keySelector:(item:T) => TKey, comparer?: comparer<TKey>): Iterable<T>{
    if(typeof comparer === "undefined"){
        yield* Array.from(source).sort((a,b) => keySelector(a) < keySelector(b) ? -1 : 1);
    }else{
        yield* Array.from(source).sort((a,b) => comparer(keySelector(a),keySelector(b)));
    }
}
declare module '../enumerable' {
    interface Enumerable<T> {
        sort<TKey>(keySelector:(item:T) => TKey, comparer?: comparer<TKey>): Enumerable<T>;
    }
}
Enumerable.prototype.sort = function<T,TKey>(this:Enumerable<T>,keySelector:(item:T) => TKey, comparer?: comparer<TKey>):Enumerable<T>{
    return new Enumerable<T>(sort(this, keySelector, comparer));
};