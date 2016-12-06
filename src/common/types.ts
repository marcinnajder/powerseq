export type selector<T,TResult> = (item:T,index:number) => TResult;
export type predicate<T> = (item:T, index:number) => boolean;
export type comparer<T> = (a:T,b:T) => number;
export type Dictionary<T> = {
    [key:string] : T;
}
export type keySelector<T,TKey> = (item:T)=>TKey;
