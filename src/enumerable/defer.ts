import { wrapInIterable } from "../common/wrap";

export function defer<T>(factory: () => Iterable<T>) {
    return wrapInIterable(function* () {
        yield* factory();
    });
}
