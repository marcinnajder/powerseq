

export function throww<T>(error: any): Iterable<T> {
    return {
        [Symbol.iterator]() {
            return {
                next() {
                    throw error;
                }
            };
        }
    };
}