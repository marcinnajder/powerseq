import {Enumerable} from "../enumerable";

export interface Grouping<TKey,T> extends Iterable<T> {
    key:TKey
}
export function groupby<T,TKey>(source: Iterable<T>, keySelector:(item:T) => TKey) : Iterable<Grouping<TKey,T>>;
export function groupby<T,TKey,TResult>(source: Iterable<T>, keySelector:(item:T) => TKey, resultSelector:(key:TKey, items:Iterable<T>) => TResult) : Iterable<TResult>;
export function* groupby<T,TKey,TResult>(source: Iterable<T>, keySelector:(item:T) => TKey, resultSelector?:(key:TKey, items:Iterable<T>) => TResult) : Iterable<TResult>{
    var map = new Map<TKey, T[]>();
    var key:TKey, items:T[];

    for(var item of source){
        key = keySelector(item);
        items = map.get(key);
        if(typeof items === "undefined"){
            map.set(key, [item]);
        }else{
            items.push(item);
        }
    }

    if(typeof resultSelector === "undefined"){
        for(var [entryKey, entryValue] of map.entries()){
            yield <any> <Grouping<TKey,T>> {
                key:entryKey,
                [Symbol.iterator]: () => entryValue[Symbol.iterator]()
            }
        }
    }
    else{
        for(var [entryKey, entryValue] of map.entries()){
            yield resultSelector(entryKey, entryValue);
        }
    }
}
declare module '../enumerable' {
    interface Enumerable<T> {
        groupby<TKey>(keySelector:(item:T) => TKey) : Enumerable<Grouping<TKey,T>>;
        groupby<TKey,TResult>(keySelector:(item:T) => TKey, resultSelector:(key:TKey, items:Iterable<T>) => TResult) : Enumerable<TResult>;
    
    }
}
Enumerable.prototype.groupby = function<T,TKey, TResult>(this:Enumerable<T>, keySelector:(item:T) => TKey, resultSelector?:(key:TKey, items:Iterable<T>) => TResult) : Enumerable<TResult>{
    return new Enumerable<TResult>(groupby(this,keySelector, resultSelector)); 
};