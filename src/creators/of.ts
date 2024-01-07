import { wrapInIterable } from "../common/wrap";

export function of<T>(...args: T[]) {
    return wrapInIterable(function* () {
        for (var item of args) {
            yield item;
        }
    });
}
