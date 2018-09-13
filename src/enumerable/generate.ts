import { Enumerable } from "../enumerable_";
import { wrapInIterable } from "../common/wrap";

export function generate<TState, TResult>(initState: TState, condition: (state: TState) => boolean, iterate: (state: TState) => TState, resultSelector: (state: TState) => TResult) {
    return wrapInIterable(function* () {
        for (var state = initState; condition(state); state = iterate(state)) {
            yield resultSelector(state);
        }
    });
}
declare module '../enumerable_' {
    namespace Enumerable {
        function generate<TState, TResult>(initState: TState, condition: (state: TState) => boolean, iterate: (state: TState) => TState, resultSelector: (state: TState) => TResult): Enumerable<TResult>;
    }
}
Enumerable.generate = function <TState, TResult>(initState: TState, condition: (state: TState) => boolean, iterate: (state: TState) => TState, resultSelector: (state: TState) => TResult): Enumerable<TResult> {
    return new Enumerable<TResult>(generate(initState, condition, iterate, resultSelector));
}