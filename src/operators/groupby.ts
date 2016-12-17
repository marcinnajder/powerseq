import {Enumerable} from "../enumerable";

export interface IterableGroup<TKey,T> extends Iterable<T> {
    key:TKey
}
export interface EnumerableGroup<TKey,T> extends Enumerable<T> {
    key:TKey
}
export function groupby<T,TKey>(source: Iterable<T>, keySelector:(item:T,index:number) => TKey) : Iterable<IterableGroup<TKey,T>>;
export function groupby<T,TKey,TElement>(source: Iterable<T>, keySelector:(item:T,index:number) => TKey, elementSelector:(item:T) => TElement) : Iterable<IterableGroup<TKey,TElement>>;
export function groupby<T,TKey,TResult>(source: Iterable<T>, keySelector:(item:T,index:number) => TKey, resultSelector:(key:TKey, items:Iterable<T>) => TResult) : Iterable<TResult>;
export function groupby<T,TKey,TElement,TResult>(source: Iterable<T>, keySelector:(item:T,index:number) => TKey, elementSelector:(item:T) => TElement, resultSelector:(key:TKey, items:Iterable<TElement>) => TResult) : Iterable<TResult>;
export function* groupby<T,TKey,TElement,TResult>(source: Iterable<T>, keySelector:(item:T,index:number) => TKey, elementSelector?:(item:T) => TElement, resultSelector?:(key:TKey, items:Iterable<TElement>) => TResult) : Iterable<TResult|IterableGroup<TKey,TElement>>{
    var map = new Map<TKey, TElement[]>();
    var key:TKey, element:TElement, items:TElement[];

    if(typeof resultSelector === "undefined"){ // if not all arguments are specified
        if(typeof elementSelector === "undefined"){ // if only keySelector is specified
            elementSelector = <any> (x => x);
        }
        else { // if elementSelector or resultSelector is specified
            if(elementSelector.length === 2){ // if elementSelector is a resultSelector
                resultSelector = <any> elementSelector;
                elementSelector = <any> (x => x);
            }
        }
    }

    var index = 0;
    for(var item of source){
        key = keySelector(item, index++);
        element = elementSelector(item);
        items = map.get(key);
        if(typeof items === "undefined"){
            map.set(key, [element]);
        }else{
            items.push(element);
        }
    }

    if(typeof resultSelector === "undefined"){
        for(var [entryKey, entryValue] of map.entries()){
            var enumerable = <EnumerableGroup<TKey,TElement>> new Enumerable<TElement>(entryValue);
            enumerable.key = entryKey;
            yield enumerable;
        }
    }
    else{
        for(var [entryKey, entryValue] of map.entries()){
            yield resultSelector(entryKey, new Enumerable<TElement>(entryValue));
        }
    }
}
declare module '../enumerable' {
    interface Enumerable<T> {
        groupby<TKey>(keySelector:(item:T,index:number) => TKey) : Enumerable<EnumerableGroup<TKey,T>>;
        groupby<TKey,TElement>(keySelector:(item:T,index:number) => TKey, elementSelector:(item:T) => TElement) : Enumerable<EnumerableGroup<TKey,TElement>>;
        groupby<TKey,TResult>(keySelector:(item:T,index:number) => TKey, resultSelector:(key:TKey, items:Enumerable<T>) => TResult) : Enumerable<TResult>;
        groupby<TKey,TElement,TResult>(keySelector:(item:T,index:number) => TKey, elementSelector:(item:T) => TElement, resultSelector:(key:TKey, items:Enumerable<TElement>) => TResult) : Enumerable<TResult>;
    }
}
Enumerable.prototype.groupby = function<T,TKey,TElement,TResult>(this:Enumerable<T>, keySelector:(item:T,index:number) => TKey, elementSelector?:(item:T) => TElement, resultSelector?:(key:TKey, items:Iterable<TElement>) => TResult) : Enumerable<TResult>{
     return new Enumerable<TResult>(groupby(this,keySelector, elementSelector, resultSelector)); 
};