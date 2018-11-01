import { Operator, OperatorR } from "./types";

export function wrapInIterable<T>(generator: () => Iterator<T>): Iterable<T> {
    return { [Symbol.iterator]: generator }
}

export function wrapInThunk(args: IArguments, operator: Function): Operator<any, any> | OperatorR<any, any> | any | Iterable<any> {
    if (isIterable(args[0])) {
        return operator(...argumentsToIterable(args));
    }
    return wrapInThunkAlways(args, operator);
}

export function wrapInThunkIfOnlyFirstArgumentIsIterable(args: IArguments, operator: Function): Operator<any, any> | OperatorR<any, any> | any | Iterable<any> {
    if (isIterable(args[0]) && isIterable(args[1])) {
        return operator(...argumentsToIterable(args));
    }
    return wrapInThunkAlways(args, operator);
}

export function wrapInThunkAlways(args: IArguments, operator: Function): Operator<any, any> | OperatorR<any, any> {
    return iterable => operator(iterable, ...argumentsToIterable(args));
}

export function isIterable<T>(iterable: Iterable<T> | T): iterable is Iterable<T> {
    return typeof iterable !== "undefined" && typeof iterable[Symbol.iterator] !== "undefined";
}

/** in IE 11 arguments is not a iterable and this can't be polyfilled  */
function argumentsToIterable(args: IArguments): Iterable<any> {
    if (isIterable(args as any)) {
        return args;
    }
    // code for IE 11
    var iterable = [];
    for (var _i = 0; _i < args.length; _i++) {
        iterable[_i] = args[_i];
    }
    return iterable;
}
