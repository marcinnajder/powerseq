
import { wrapInIterable } from "../common/wrap";

export function throww<T>(error: any) {
    return wrapInIterable<T>(function* () {
        throw error;
    });
}