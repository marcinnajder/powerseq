import { wrapInIterable } from "../common/wrap";

export function generate<TState, TResult>(initState: TState, condition: (state: TState) => boolean, iterate: (state: TState) => TState, resultSelector: (state: TState) => TResult) {
    return wrapInIterable(function* () {
        for (var state = initState; condition(state); state = iterate(state)) {
            yield resultSelector(state);
        }
    });
}