// - chodzi na ES6
// - https://github.com/ReactiveX/IxJS/tree/master/iterable
// https://github.com/Reactive-Extensions/Rx.NET/tree/master/Ix.NET/Source/System.Interactive
// - jak zrobic aby linq chodzilo w mongo shell ? modul UMD ? czy tam sa generatory ?
// -- generatory i lamby dzialaja, tylko jesli piszemy modulowo ES6 kod, to kod JS sie gubi w mongo shell nie ma modulowosc
// (pewnie jakos sprytnie trzeba wspoldzieli kod, ale miec 2 modulwosci; nalezy pamietac ze dziala JS to jedno,
// ale jeszcze musi dzialac TS)

// todo: fromObject, toObject

// features:
// - leniwosc, kompatybilnosc z LINQ, IxJS
// - mozna korzystac z samych metod osobnych
// - mozna dodawac swoje metody
// - mozna na stronie osadzic tylko to z czego sie faktyczne korzysta
// - TS czyli wypowalnosc (w tym przeladowania, this, dynamiczne dodawanie metod, ...)
// - operatory nie korzystaja z siebie nawazajem


export class Enumerable<T> implements Iterable<T>{
    constructor(public _iterable:Iterable<T>){
    }
    [Symbol.iterator] = function(){
        return this._iterable[Symbol.iterator]();
    };
}

export type selector<T,TResult> = (item:T,index:number) => TResult;
export type predicate<T> = (item:T, index:number) => boolean;
export type comparer<T> = (a:T,b:T) => number;
export type Dictionary<T> = {
    [key:string] : T;
}
export type keySelector<T,TKey> = (item:T)=>TKey;






//////////////////////////////////////////////////////////////////////////////////////////
declare module './enumerable' {
    namespace Enumerable {
        function from<T>(iterable: Iterable<T>):Enumerable<T>; 
    }
}
Enumerable.from = function<T>(iterable: Iterable<T>):Enumerable<T>{
    return new Enumerable<T>(iterable);
}


//////////////////////////////////////////////////////////////////////////////////////////
export function* entries<TValue>(obj) : Iterable<[string,TValue]>{
    var keys = Object.keys(obj);
    for(var key of keys){
        yield [key, obj[key]];
    }
}
declare module './enumerable' {
    namespace Enumerable {
        function entries<TValue>(obj):Enumerable<[string,TValue]>; 
    }
}
Enumerable.entries = function<TValue>(obj) : Enumerable<[string,TValue]>{
    return new Enumerable<[string,TValue]>(entries<TValue>(obj));
}


//////////////////////////////////////////////////////////////////////////////////////////
export function* empty<T>() : Iterable<T>{
}
declare module './enumerable' {
    namespace Enumerable {
        //export let empty :  <T>(item :T ) => string;
        export function empty<T>():Enumerable<T>; 
    }
}
Enumerable.empty = function <T>() : Enumerable<T>{
    return new Enumerable<T>(empty<T>());
}

//////////////////////////////////////////////////////////////////////////////////////////
export function* of<T>(...args:T[]) : Iterable<T>{
    for(var item of args){
        yield <T> item;
    }
}
declare module './enumerable' {
    namespace Enumerable {
        export function of<T>(...args:T[]):Enumerable<T>; 
    }
}
Enumerable.of = function <T>(...args:T[]) : Enumerable<T>{
    return new Enumerable<T>(of<T>(...args));
}

//////////////////////////////////////////////////////////////////////////////////////////
export function* range<T>(start:number, count:number) : Iterable<number>{
    let end = start + count;
    for(var i=start; i<end; i++){
        yield i;
    }
}
declare module './enumerable' {
    namespace Enumerable {
        export function range<T>(start:number, count:number) : Enumerable<number>;
    }
}
Enumerable.range = function <T>(start:number, count:number) : Enumerable<number>{
    return new Enumerable<number>(range(start, count));
}


//////////////////////////////////////////////////////////////////////////////////////////
export function* repeatvalue<T>(value:T, count?:number) : Iterable<T>{
    if(typeof count === "undefined"){
        while(true){
            yield value;
        }
    }
    else{
        for(var i=0; i<count; i++){
            yield value;
        }
    }
}
declare module './enumerable' {
    namespace Enumerable {
        export function repeatvalue<T>(value:T, count?:number) : Enumerable<T>;
    }
}
Enumerable.repeatvalue = function <T>(value:T, count?:number) : Enumerable<T>{
    return new Enumerable<T>(repeatvalue(value,count));
}






//////////////////////////////////////////////////////////////////////////////////////////
export function toarray<T>(source: Iterable<T>) : T[]{
    if(Array.isArray(source)){
        return source;
    }
    var result:T[] = [];
    for(var item of source){
        result.push(item);
    }
    return result;  
}
declare module './enumerable' {
    interface Enumerable<T> {
       toarray():T[]
    }
}
Enumerable.prototype.toarray = function<T>(this:Enumerable<T>) {
    return toarray(this._iterable); 
};

//////////////////////////////////////////////////////////////////////////////////////////
export function tomap<T, TKey>(source: Iterable<T>, keySelector: (item: T) => TKey): Map<TKey, T>;
export function tomap<T, TKey, TElement>(source: Iterable<T>, keySelector: (item: T) => TKey, elementSelector: (item: T) => TElement): Map<TKey, TElement>;
export function tomap<T, TKey, TElement>(source: Iterable<T>, keySelector: (item: T) => TKey, elementSelector?: (item: T) => TElement): Map<TKey, TElement> {
    var map = new Map<TKey, TElement>();

    if (typeof elementSelector === "undefined") {
        for (var item of source) {
            //if(map.has(key)) throw new TypeError("keySelector produces duplicate keys for two elements");
            map.set(keySelector(item), <any>item);
        }
    }
    else {
        for (var item of source) {
            map.set(keySelector(item), elementSelector(item));
        }
    }
    return map;
}
declare module './enumerable' {
    interface Enumerable<T> {
       tomap<TKey>(keySelector: (item: T) => TKey): Map<TKey, T>;
       tomap<TKey,TElement>(keySelector: (item: T) => TKey, elementSelector: (item: T) => TElement): Map<TKey, TElement>;
    }
}
Enumerable.prototype.tomap = function<T, TKey, TElement>(this:Enumerable<T>, keySelector: (item: T) => TKey, elementSelector?: (item: T) => TElement): Map<TKey, TElement>{
    return tomap(this._iterable, keySelector, elementSelector); 
};


//////////////////////////////////////////////////////////////////////////////////////////
export function toobject<T>(source: Iterable<T>, keySelector: (item: T) => any): Dictionary<T>;
export function toobject<T, TElement>(source: Iterable<T>, keySelector: (item: T) => any, elementSelector: (item: T) => TElement): Dictionary<TElement>
export function toobject<T, TElement>(source: Iterable<T>, keySelector: (item: T) => any, elementSelector?: (item: T) => TElement): Dictionary<TElement> {
    var map : Dictionary<TElement> = {};

    if (typeof elementSelector === "undefined") {
        for (var item of source) {
            map[keySelector(item)] = <any>item;
        }
    }
    else {
        for (var item of source) {
            map[keySelector(item)] = elementSelector(item);
        }
    }
    return map;
}
declare module './enumerable' {
    interface Enumerable<T> {
       toobject(keySelector: (item: T) => any): Dictionary<T>;
       toobject<TElement>(keySelector: (item: T) => any, elementSelector: (item: T) => TElement): Dictionary<TElement>;
    }
}
Enumerable.prototype.toobject = function<T,TElement>(this:Enumerable<T>, keySelector: (item: T) => any, elementSelector?: (item: T) => TElement): Dictionary<TElement>{
    return toobject(this._iterable, keySelector, elementSelector); 
};





//////////////////////////////////////////////////////////////////////////////////////////
export function* map<T,TResult>(source: Iterable<T>, projection:selector<T,TResult>) : Iterable<TResult>{
    var index = 0;
    for(var item of source){
        yield projection(item, index++);
    }
}
declare module './enumerable' {
    interface Enumerable<T> {
        map<TResult>(projection:selector<T,TResult>):Enumerable<TResult>;
    }
}
Enumerable.prototype.map = function<T,TResult>(this:Enumerable<T>, projection:selector<T,TResult>) {
    return new Enumerable<TResult>(map(this,projection)); 
};




//////////////////////////////////////////////////////////////////////////////////////////
export function* filter<T>(source: Iterable<T>, predicate:predicate<T>) : Iterable<T>{
    var index = 0;
    for(var item of source){
        if(predicate(item, index++)){
            yield item;
        }
    }
}
declare module './enumerable' {
    interface Enumerable<T> {
        filter(pedicate:predicate<T>):Enumerable<T>;
    }
}
Enumerable.prototype.filter = function<T>(this:Enumerable<T>, predicate:predicate<T>) {
    return new Enumerable<T>(filter(this,predicate)); 
};


//////////////////////////////////////////////////////////////////////////////////////////
export function* take<T>(source: Iterable<T>, count:number) : Iterable<T>{
    if(count>0){
        for(var item of source){
            yield item;
            if(--count === 0) break;
        }
    }
}
declare module './enumerable' {
    interface Enumerable<T> {
        take(count:number):Enumerable<T>;
    }
}
Enumerable.prototype.take = function<T>(this:Enumerable<T>, count:number) {
    return new Enumerable<T>(take<T>(this,count)); 
};


//////////////////////////////////////////////////////////////////////////////////////////
export function* skip<T>(source: Iterable<T>, count:number) : Iterable<T>{
    if(count>=0){
        var iterator = source[Symbol.iterator]();
        var value : IteratorResult<T>;

        var i=0;
        while(i++<count){
            value = iterator.next();
            if(value.done) return;
        }

        while(true){
            var value = iterator.next();
            if(value.done) return;
            yield value.value;
        }
    }
}
declare module './enumerable' {
    interface Enumerable<T> {
        skip(count:number):Enumerable<T>;
    }
}
Enumerable.prototype.skip = function<T>(this:Enumerable<T>, count:number) {
    return new Enumerable<T>(skip<T>(this,count)); 
};


//////////////////////////////////////////////////////////////////////////////////////////
export function* takewhile<T>(source: Iterable<T>, predicate:predicate<T>) : Iterable<T>{
    let index = 0;
    for(var item of source){
        if(!predicate(item, index++)){
            break;
        }
        yield item;
    }
}
declare module './enumerable' {
    interface Enumerable<T> {
        takewhile(predicate:predicate<T>):Enumerable<T>;
    }
}
Enumerable.prototype.takewhile = function<T>(this:Enumerable<T>, predicate:predicate<T>) {
    return new Enumerable<T>(takewhile(this,predicate)); 
};



//////////////////////////////////////////////////////////////////////////////////////////
export function* skipwhile<T>(source: Iterable<T>, predicate:predicate<T>) : Iterable<T>{
    var iterator = source[Symbol.iterator]();
    var value : IteratorResult<T>;
    var index = 0;

    while(true){
        value = iterator.next();
        if(value.done) return;
        if(predicate(value.value,index++)) continue;
        yield value.value;
        break;
    }

    while(true){
        var value = iterator.next();
        if(value.done) return;
        yield value.value;
    }
}
declare module './enumerable' {
    interface Enumerable<T> {
        skipwhile(predicate:predicate<T>):Enumerable<T>;
    }
}
Enumerable.prototype.skipwhile = function<T>(this:Enumerable<T>, predicate:predicate<T>) {
    return new Enumerable<T>(skipwhile(this,predicate)); 
};



//////////////////////////////////////////////////////////////////////////////////////////
export function flatmap<T,TCollection>(source: Iterable<T>, collectionSelector:selector<T, Iterable<TCollection>>) : Iterable<TCollection>;
export function flatmap<T,TCollection, TResult>(source: Iterable<T>, collectionSelector:selector<T, Iterable<TCollection>>, resultSelector: (item:T, collectionItem:TCollection) => TResult) : Iterable<TResult>;
export function* flatmap<T,TCollection, TResult>(source: Iterable<T>, collectionSelector:selector<T, Iterable<TCollection>>, resultSelector?: (item:T, collectionItem:TCollection) => TResult) : Iterable<TResult>{
    var index = 0; 
    if(typeof resultSelector === "undefined"){
        for(let item of source){
            let collection = collectionSelector(item, index++);
            yield* <any> collection;
        }
    }
    else{
        for(let item of source){
            let collection = collectionSelector(item, index++);
            for(let collectionItem of collection){
                yield resultSelector(item, collectionItem);
            }
        }
    }
}
declare module './enumerable' {
    interface Enumerable<T> {
        flatmap<TCollection>(collectionSelector:selector<T, Iterable<TCollection>>) : Enumerable<TCollection>;
        flatmap<TCollection, TResult>(collectionSelector:selector<T, Iterable<TCollection>>, resultSelector: (item:T, collectionItem:TCollection) => TResult) : Enumerable<TResult>;
    }
}
Enumerable.prototype.flatmap = function<T,TCollection, TResult>(this:Enumerable<T>, collectionSelector:selector<T, Iterable<TCollection>>, resultSelector?: (item:T, collectionItem:TCollection) => TResult) : Enumerable<TResult>{
    return new Enumerable<TResult>(flatmap(this,collectionSelector, resultSelector)); 
};

//////////////////////////////////////////////////////////////////////////////////////////
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
declare module './enumerable' {
    interface Enumerable<T> {
        groupby<TKey>(keySelector:(item:T) => TKey) : Enumerable<Grouping<TKey,T>>;
        groupby<TKey,TResult>(keySelector:(item:T) => TKey, resultSelector:(key:TKey, items:Iterable<T>) => TResult) : Enumerable<TResult>;
    
    }
}
Enumerable.prototype.groupby = function<T,TKey, TResult>(this:Enumerable<T>, keySelector:(item:T) => TKey, resultSelector?:(key:TKey, items:Iterable<T>) => TResult) : Enumerable<TResult>{
    return new Enumerable<TResult>(groupby(this,keySelector, resultSelector)); 
};

//////////////////////////////////////////////////////////////////////////////////////////
export function zip<T1,T2,TResult>(source1: Iterable<T1>, source2:Iterable<T2>, func: (item1:T1, item2:T2) => TResult): Iterable<TResult>;
export function zip<T1,T2,T3,TResult>(source1: Iterable<T1>, source2:Iterable<T2>, source3:Iterable<T3>, func: (item1:T1, item2:T2,item3:T3) => TResult): Iterable<TResult>;
export function zip<T1,T2,T3,T4,TResult>(source1: Iterable<T1>, source2:Iterable<T2>, source3:Iterable<T3>, source4:Iterable<T4>,func: (item1:T1, item2:T2,item3:T3,item4:T4) => TResult): Iterable<TResult>;
export function zip<T1,T2,T3,T4,T5,TResult>(source1: Iterable<T1>, source2:Iterable<T2>, source3:Iterable<T3>, source4:Iterable<T4>, source5:Iterable<T5>,func: (item1:T1, item2:T2,item3:T3,item4:T4,item5:T5) => TResult): Iterable<TResult>;
export function zip(...args):any;
export function* zip<TResult>(...args): Iterable<TResult>{
    var iterators = args.slice(0,args.length-1).map( (i:Iterable<any>) => i[Symbol.iterator]() );
    var func : Function = args[args.length-1];
    var values : IteratorResult<any>[];

    while(true){
        values = iterators.map( i => i.next());
        if(values.some( x => x.done)) break;
        yield func.apply(null, values.map(x=>x.value));
    }
}
declare module './enumerable' {
    interface Enumerable<T> {
        zip<T2,TResult>(source2:Iterable<T2>, func: (item1:T, item2:T2) => TResult): Enumerable<TResult>;
        zip<T2,T3,TResult>(source2:Iterable<T2>, source3:Iterable<T3>, func: (item1:T, item2:T2,item3:T3) => TResult): Enumerable<TResult>;
        zip<T2,T3,T4,TResult>(source2:Iterable<T2>, source3:Iterable<T3>, source4:Iterable<T4>,func: (item1:T, item2:T2,item3:T3,item4:T4) => TResult): Enumerable<TResult>;
        zip<T2,T3,T4,T5,TResult>(source2:Iterable<T2>, source3:Iterable<T3>, source4:Iterable<T4>, source5:Iterable<T5>,func: (item1:T, item2:T2,item3:T3,item4:T4,item5:T5) => TResult): Enumerable<TResult>;
        zip(...args):any;    
    }
}
Enumerable.prototype.zip = function<T>(this:Enumerable<T>, ...args):Enumerable<any>{
    return new Enumerable<any>(zip.apply(null, [this, ...args])); 
};





//////////////////////////////////////////////////////////////////////////////////////////
export function* sort<T, TKey>(source:Iterable<T>, keySelector:(item:T) => TKey, comparer?: comparer<TKey>): Iterable<T>{
    if(typeof comparer === "undefined"){
        yield* Array.from(source).sort((a,b) => keySelector(a) < keySelector(b) ? -1 : 1);
    }else{
        yield* Array.from(source).sort((a,b) => comparer(keySelector(a),keySelector(b)));
    }
}
declare module './enumerable' {
    interface Enumerable<T> {
        sort<TKey>(keySelector:(item:T) => TKey, comparer?: comparer<TKey>): Enumerable<T>;
    }
}
Enumerable.prototype.sort = function<T,TKey>(this:Enumerable<T>,keySelector:(item:T) => TKey, comparer?: comparer<TKey>):Enumerable<T>{
    return new Enumerable<T>(sort(this, keySelector, comparer));
};


//////////////////////////////////////////////////////////////////////////////////////////
export function* reverse<T>(source:Iterable<T>): Iterable<T>{
    yield* Array.from(source).reverse();
}
declare module './enumerable' {
    interface Enumerable<T> {
        reverse(): Enumerable<T>;
    }
}
Enumerable.prototype.reverse = function<T>(this:Enumerable<T>):Enumerable<T>{
    return new Enumerable<T>(reverse<T>(this));
};



//////////////////////////////////////////////////////////////////////////////////////////
export function find<T>(source:Iterable<T>, predicate?:predicate<T>): T|undefined{
    if(typeof predicate === "undefined"){
        for(var item of source){
            return item;
        }
    }
    else{
        var index = 0;
        for(var item of source){
            if(predicate(item, index++)){
                return item;
            }
        }
    }
}
declare module './enumerable' {
    interface Enumerable<T> {
        find(predicate?:predicate<T>): T|undefined;
    }
}
Enumerable.prototype.find = function<T>(this:Enumerable<T>,predicate?:predicate<T>): T|undefined{
    return find(this, predicate);
};


//////////////////////////////////////////////////////////////////////////////////////////
export function findIndex<T>(source:Iterable<T>, predicate:predicate<T>): number|undefined{
    var index = 0;
    for(var item of source){
        if(predicate(item, index)){
            return index;
        }
        index++;
    }
}
declare module './enumerable' {
    interface Enumerable<T> {
        findIndex(predicate:predicate<T>): number|undefined;
    }
}
Enumerable.prototype.findIndex = function<T>(this:Enumerable<T>,predicate:predicate<T>): number|undefined{
    return findIndex(this, predicate);
};




//////////////////////////////////////////////////////////////////////////////////////////
export function every<T>(source:Iterable<T>, predicate:predicate<T>): boolean{
    var index = 0;
    for(var item of source){
        if(!predicate(item, index++)){
            return false;
        }
    }
    return true;
}
declare module './enumerable' {
    interface Enumerable<T> {
        every(predicate:predicate<T>): boolean;
    }
}
Enumerable.prototype.every = function<T>(this:Enumerable<T>,predicate:predicate<T>): boolean{
    return every(this, predicate);
};


//////////////////////////////////////////////////////////////////////////////////////////
export function some<T>(source:Iterable<T>, predicate?:predicate<T>): boolean{
    if(typeof predicate === "undefined"){
        for(var item of source){
            return true;
        }
        return false;
    }
    else{
        var index = 0;
        for(var item of source){
            if(predicate(item, index++)){
                return true;
            }
        }
        return false;
    }
}
declare module './enumerable' {
    interface Enumerable<T> {
        some(predicate?:predicate<T>): boolean;
    }
}
Enumerable.prototype.some = function<T>(this:Enumerable<T>,predicate?:predicate<T>): boolean{
    return some(this, predicate);
};



//////////////////////////////////////////////////////////////////////////////////////////
export function* concat<T>(...args:Iterable<T>[]): Iterable<T>{
    for(var arg of args){
        yield* arg;
    }
}
declare module './enumerable' {
    interface Enumerable<T> {
        concat(...args:Iterable<T>[]): Enumerable<T>;
    }
}
Enumerable.prototype.concat = function<T>(this:Enumerable<T>,...args:Iterable<T>[]): Enumerable<T>{
    return new Enumerable(concat(this, ...args));
};



//////////////////////////////////////////////////////////////////////////////////////////
export function reduce<T>(source: Iterable<T>, func:(prev:T, item:T) => T) : T;
export function reduce<T,TAccumulate>(source: Iterable<T>, func:(prev:TAccumulate, item:T) => TAccumulate, seed:TAccumulate) : TAccumulate;
export function reduce<T,TAccumulate>(source: Iterable<T>, func:(prev:TAccumulate, item:T) => TAccumulate, seed?:TAccumulate) : TAccumulate{
    var iterator = source[Symbol.iterator]();
    var value : IteratorResult<T>;
    var accumulator = seed;
    var valueIsSet = typeof seed !== "undefined";

    if(typeof seed === "undefined"){
        value = iterator.next();
        if(value.done) throw new TypeError('Sequence contains no elements')
        accumulator = <any> value.value;
    }

    while(true){
        value = iterator.next();
        if(value.done) break;

        accumulator = func(accumulator, value.value);
    }

    return accumulator;
}
declare module './enumerable' {
    interface Enumerable<T> {
        reduce(func:(prev:T, item:T) => T) : T;
        reduce<TAccumulate>(func:(prev:TAccumulate, item:T) => TAccumulate, seed:TAccumulate) : TAccumulate;    
    }
}
Enumerable.prototype.reduce = function<T,TAccumulate>(this: Enumerable<T>, func:(prev:TAccumulate, item:T) => TAccumulate, seed?:TAccumulate) : TAccumulate{
    return reduce(this,func,seed); 
};




//////////////////////////////////////////////////////////////////////////////////////////
function maxmin<T>(source: Iterable<T>, keySelector:keySelector<T,any>, isGreaterOrLess : (key, minmaxKey) => boolean) : T|undefined{
    if(typeof keySelector === "undefined"){
        keySelector = item => item;
    }
    var iterator = source[Symbol.iterator]();
    var value = iterator.next();
    if(value.done) return undefined;

    var maxminItem = value.value;
    var maxminKey = keySelector(maxminItem);
    var item, key;

    while(true){
        value = iterator.next();
        if(value.done) return maxminItem;

        item = value.value;
        key = keySelector(item);

        if(isGreaterOrLess(key, maxminKey)){
            maxminKey = key;
            maxminItem = item;
        }
    }
}

//////////////////////////////////////////////////////////////////////////////////////////
export function max<T>(source: Iterable<T>, keySelector?:keySelector<T,any>) : T|undefined{
    return maxmin(source, keySelector, (key, minmaxKey) => key > minmaxKey);
}
declare module './enumerable' {
    interface Enumerable<T> {
        max(keySelector?:keySelector<T,any>) : T|undefined;
    }
}
Enumerable.prototype.max = function<T>(this: Enumerable<T>, keySelector?:keySelector<T,any>):T|undefined{
    return max(this,keySelector); 
};


//////////////////////////////////////////////////////////////////////////////////////////
export function min<T>(source: Iterable<T>, keySelector?:keySelector<T,any>) : T|undefined{
    return maxmin(source, keySelector, (key, minmaxKey) => key < minmaxKey);
}
declare module './enumerable' {
    interface Enumerable<T> {
        min(keySelector?:keySelector<T,any>) : T|undefined;
    }
}
Enumerable.prototype.min = function<T>(this: Enumerable<T>, keySelector?:keySelector<T,any>):T|undefined{
    return min(this,keySelector); 
};



//////////////////////////////////////////////////////////////////////////////////////////
export function count<T>(source:Iterable<T>, predicate?:predicate<T>): number{
    var count = 0;
    if(typeof predicate === "undefined"){
        for(var item of source){
            count++;
        }
        return count;
    }
    else{
        var index = 0;
        for(var item of source){
            if(predicate(item, index++)){
               count++;
            }
        }
        return count;
    }
}
declare module './enumerable' {
    interface Enumerable<T> {
        count(predicate?:predicate<T>): number;
    }
}
Enumerable.prototype.count = function<T>(this:Enumerable<T>,predicate?:predicate<T>): number{
    return count(this, predicate);
};




//////////////////////////////////////////////////////////////////////////////////////////
export function* distinct<T>(source:Iterable<T>, keySelector?: keySelector<T,any>): Iterable<T>{
    if(typeof keySelector === "undefined"){
        keySelector = item => item;
    }
    var set = new Set<any>();
    var key;
    for(var item of source){
        key = keySelector(item);
        if(!set.has(key)){
            set.add(key);
            yield item;
        }
    }
}
declare module './enumerable' {
    interface Enumerable<T> {
        distinct(keySelector?: keySelector<T,any>): Enumerable<T>;
    }
}
Enumerable.prototype.distinct = function<T>(this:Enumerable<T>,keySelector?: keySelector<T,any>): Enumerable<T>{
    return new Enumerable<T>(distinct<T>(this, keySelector));
};

//////////////////////////////////////////////////////////////////////////////////////////
export function* union<T>(source:Iterable<T>,source2:Iterable<T>,keySelector?: keySelector<T,any>): Iterable<T>{
    if(typeof keySelector === "undefined"){
        keySelector = item => item;
    }
    var set = new Set<any>();
    var key;
    for(var item of source){
        key = keySelector(item);
        if(!set.has(key)){
            set.add(key);
            yield item;
        }
    }
    for(var item of source2){
        key = keySelector(item);
        if(!set.has(key)){
            set.add(key);
            yield item;
        }
    }
}
declare module './enumerable' {
    interface Enumerable<T> {
        union(source2:Iterable<T>,keySelector?: keySelector<T,any>): Enumerable<T>;
    }
}
Enumerable.prototype.union = function<T>(this:Enumerable<T>,source2:Iterable<T>,keySelector?: keySelector<T,any>): Enumerable<T>{
    return new Enumerable<T>(union<T>(this,source2,keySelector));
};

//////////////////////////////////////////////////////////////////////////////////////////
export function* intersect<T>(source:Iterable<T>,source2:Iterable<T>,keySelector?: keySelector<T,any>): Iterable<T>{
    if(typeof keySelector === "undefined"){
        keySelector = item => item;
    }
    var set = new Set<any>();
    for(var s of source){
        set.add(keySelector(s));
    }
    var key;
    for(var item of source2){
        key = keySelector(item);
        if(set.has(key)){            
            yield item;
        }
    }
}
declare module './enumerable' {
    interface Enumerable<T> {
        intersect(source2:Iterable<T>,keySelector?: keySelector<T,any>): Enumerable<T>;
    }
}
Enumerable.prototype.intersect = function<T>(this:Enumerable<T>,source2:Iterable<T>,keySelector?: keySelector<T,any>): Enumerable<T>{
    return new Enumerable<T>(intersect<T>(this,source2,keySelector));
};


//////////////////////////////////////////////////////////////////////////////////////////
export function* except<T>(source:Iterable<T>,source2:Iterable<T>,keySelector?: keySelector<T,any>): Iterable<T>{
    if(typeof keySelector === "undefined"){
        keySelector = item => item;
    }
    var set = new Set<T>();
    var set2 = new Set<T>();
    var key;
    for(var s of source2){
        set2.add(keySelector(s));
    }
    for(var item of source){
        key = keySelector(item);
        if(!set.has(key)){
            set.add(key);
            if(!set2.has(key)){
                yield item;
            }            
        }
    }
}
declare module './enumerable' {
    interface Enumerable<T> {
        except(source2:Iterable<T>,keySelector?: keySelector<T,any>): Enumerable<T>;
    }
}
Enumerable.prototype.except = function<T>(this:Enumerable<T>,source2:Iterable<T>,keySelector?: keySelector<T,any>): Enumerable<T>{
    return new Enumerable<T>(except<T>(this,source2,keySelector));
};





//////////////////////////////////////////////////////////////////////////////////////////
export function* join<T,T2,TKey,TResult>(source1: Iterable<T>,source2: Iterable<T2>, key1Selector:keySelector<T,TKey>,
    key2Selector:keySelector<T2,TKey>, resultSelector:(item1:T, item2:T2) => TResult): Iterable<TResult> {

    var map2 = new Map<TKey, T2[]>();
    var key:TKey, values:T2[];

    for(var item2 of source2){
        key = key2Selector(item2);
        values = map2.get(key)
        if(typeof values === "undefined"){
            map2.set(key, [item2]);
        }
        else{
            values.push(item2);
        }
    }

    for(var item1 of source1){
        key = key1Selector(item1);
        values = map2.get(key);
        if(typeof values !== "undefined"){
            for(var item2 of values){
                yield resultSelector(item1, item2);
            }
        }
    }
}
declare module './enumerable' {
    interface Enumerable<T> {
        join<T2,TKey,TResult>(source2: Iterable<T2>, key1Selector:keySelector<T,TKey>,
            key2Selector:keySelector<T2,TKey>, resultSelector:(item1:T, item2:T2) => TResult) : Enumerable<TResult>;
    }
}
Enumerable.prototype.join = function<T,T2,TKey,TResult>(this:Enumerable<T>,source2: Iterable<T2>, key1Selector:keySelector<T,TKey>,
    key2Selector:keySelector<T2,TKey>, resultSelector:(item1:T, item2:T2) => TResult) : Enumerable<TResult>{
    return new Enumerable<TResult>(join(this,source2,key1Selector,key2Selector,resultSelector));
};


