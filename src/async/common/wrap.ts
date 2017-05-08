export default function wrap<T>(generator: () => AsyncIterator<T>): AsyncIterable<T> {
    return { [Symbol.asyncIterator]: generator }
}