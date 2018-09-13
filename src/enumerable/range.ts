import { Enumerable } from "../enumerable_";
import { wrapInIterable } from "../common/wrap";

export function range(start: number, count: number) {
    return wrapInIterable(function* () {
        let end = start + count;
        for (var i = start; i < end; i++) {
            yield i;
        }
    });
}
declare module '../enumerable_' {
    namespace Enumerable {
        export function range(start: number, count: number): Enumerable<number>;
    }
}
Enumerable.range = function (start: number, count: number): Enumerable<number> {
    return new Enumerable<number>(range(start, count));
}