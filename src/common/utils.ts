import { Nothing } from "./types"

export function isNothing<T>(value: T | Nothing): value is Nothing {
    return value === null || typeof value === "undefined";
}

export function isNotNothing<T>(value: T | Nothing): value is T {
    return !isNothing(value);
}

export function identity<T>(value: T) {
    return value;
}