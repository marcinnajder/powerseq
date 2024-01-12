import { wrapInIterable } from "../common/wrap";

export function range(start: number, count: number) {
    return wrapInIterable(function* () {
        const end = start + count;
        for (let i = start; i < end; i++) {
            yield i;
        }
    });
}
