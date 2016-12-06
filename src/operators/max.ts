import {Enumerable} from "../enumerable";
import {keySelector} from "../common/types";
import {maxmin} from "../common/maxmin";

export function max<T>(source: Iterable<T>, keySelector?:keySelector<T,any>) : T|undefined{
    return maxmin(source, keySelector, (key, minmaxKey) => key > minmaxKey);
}
declare module '../enumerable' {
    interface Enumerable<T> {
        max(keySelector?:keySelector<T,any>) : T|undefined;
    }
}
Enumerable.prototype.max = function<T>(this: Enumerable<T>, keySelector?:keySelector<T,any>):T|undefined{
    return max(this,keySelector); 
};