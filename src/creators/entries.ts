import { wrapInIterable } from "../common/wrap";

// ES2015 -> [...].keys/values/entries() returns Iterable<[number,T]>(), lazy but iterates only once like JS generators 
// ES2017 -> Object.entries/values() returns Array<[string,T]> for Objects and Arrays, not lazy
// powerseq -> is lazy, handles string vs number type for keys

// below order of overloads matters, when we execute entries(...) without generic argument, overload is searched from top to bottom
export function entries<T>(o: { [s: string]: T; }): [string, T][];
export function entries<T>(o: ArrayLike<T>): [number, T][];
export function entries(o: {}): [string, any][]; // copied from definition of "Object.entries", avoids 'unknown' type
export function entries<T>(objOrArray: any) {
    return wrapInIterable<[string | number, T]>(function* () {
        const keys: Iterable<string | number> = Array.isArray(objOrArray) ? objOrArray.keys() : Object.keys(objOrArray);
        for (const key of keys) {
            yield [key, objOrArray[key]];
        }
    });
}