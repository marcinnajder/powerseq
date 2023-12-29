import { wrapInIterable } from "../common/wrap";

export function range(start: number, count: number) {
    return wrapInIterable(function* () {
        let end = start + count;
        for (var i = start; i < end; i++) {
            yield i;
        }
    });
}
