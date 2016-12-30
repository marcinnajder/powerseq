import { Enumerable } from "../enumerable";
import wrap from "../common/wrap";

export function range(start: number, count: number) {
    return wrap(function* () {
        let end = start + count;
        for (var i = start; i < end; i++) {
            yield i;
        }
    });
}
declare module '../enumerable' {
    namespace Enumerable {
        export function range(start: number, count: number): Enumerable<number>;
    }
}
Enumerable.range = function (start: number, count: number): Enumerable<number> {
    return new Enumerable<number>(range(start, count));
}