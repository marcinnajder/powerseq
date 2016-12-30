export default function wrap<T>(generator: () => Iterator<T>): Iterable<T> {
    return { [Symbol.iterator]: generator }
}