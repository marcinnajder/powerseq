import { Operator, OperatorR } from "./types";

export function wrapInIterable<T>(generator: () => Iterator<T>): Iterable<T> {
    return { [Symbol.iterator]: generator }
}

export function wrapInThunk(args: IArguments, operator: Function): Operator<any, any> | Iterable<any> | OperatorR<any, any> | any {
    if (isIterable(args[0])) {
        return operator(...args);
    }
    return iterable => operator(iterable, ...args);
}

export function isIterable<T>(iterable: Iterable<T> | T): iterable is Iterable<T> {
    return typeof iterable !== "undefined" && typeof iterable[Symbol.iterator] !== "undefined";
}
