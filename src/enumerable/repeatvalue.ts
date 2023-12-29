import { wrapInIterable } from "../common/wrap";

export function repeatvalue<T>(value: T, count?: number) {
    return wrapInIterable(function* () {
        if (typeof count === "undefined") {
            while (true) {
                yield value;
            }
        }
        else {
            for (var i = 0; i < count; i++) {
                yield value;
            }
        }
    });
}