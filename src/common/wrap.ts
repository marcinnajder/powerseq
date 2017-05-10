export default function wrap<T>(generator: () => /**Async**/Iterator<T>): /**Async**/Iterable<T> {
    return { [Symbol./**! iterator asyncIterator**/iterator]: generator }
}