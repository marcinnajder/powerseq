import {Enumerable} from "../enumerable";
import {keySelector} from "../common/types";
import {maxmin} from "../common/maxmin";

export function min<T>(source: Iterable<T>, keySelector?:keySelector<T,any>) : T|undefined{
    return maxmin(source, keySelector, (key, minmaxKey) => key < minmaxKey);
}
declare module '../enumerable' {
    interface Enumerable<T> {
        min(keySelector?:keySelector<T,any>) : T|undefined;
    }
}
Enumerable.prototype.min = function<T>(this: Enumerable<T>, keySelector?:keySelector<T,any>):T|undefined{
    return min(this,keySelector); 
};