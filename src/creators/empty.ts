import { wrapInIterable } from "../common/wrap";

export function empty<T>() {
    return wrapInIterable<T>(function* () {
    });
}