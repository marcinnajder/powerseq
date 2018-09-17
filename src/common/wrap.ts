import { Operator, OperatorR } from "./types";

export function wrapInIterable<T>(generator: () => Iterator<T>): Iterable<T> {
    return { [Symbol.iterator]: generator }
}

export function wrapInThunk(args: IArguments, operator: Function): Operator<any, any> | OperatorR<any, any> | any | Iterable<any> {
    if (isIterable(args[0])) {
        return operator(...args);
    }
    return wrapInThunkAlways(args, operator);
}

export function wrapInThunkIfOnlyFirstArgumentIsIterable(args: IArguments, operator: Function): Operator<any, any> | OperatorR<any, any> | any | Iterable<any> {
    if (isIterable(args[0]) && isIterable(args[1])) {
        return operator(...args);
    }
    return wrapInThunkAlways(args, operator);
}

export function wrapInThunkAlways(args: IArguments, operator: Function): Operator<any, any> | OperatorR<any, any> {
    return iterable => operator(iterable, ...args);
}

export function isIterable<T>(iterable: Iterable<T> | T): iterable is Iterable<T> {
    return typeof iterable !== "undefined" && typeof iterable[Symbol.iterator] !== "undefined";
}
