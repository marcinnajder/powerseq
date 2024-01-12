
export function empty<T>(): Iterable<T> {
    return {
        [Symbol.iterator]() {
            return {
                next() {
                    return { done: true, value: undefined };
                }
            };
        }
    }
}