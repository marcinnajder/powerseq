import { Enumerable } from "../enumerable";
import wrap from "../common/wrap";

export function generate<TState, TResult>(initState: TState, condition: (state: TState) => boolean, iterate: (state: TState) => TState, resultSelector: (state: TState) => TResult) {
    return wrap(function* () {
        for (var state = initState; condition(state); state = iterate(state)) {
            yield resultSelector(state);
        }
    });
}
declare module '../enumerable' {
    namespace Enumerable {
        function generate<TState, TResult>(initState: TState, condition: (state: TState) => boolean, iterate: (state: TState) => TState, resultSelector: (state: TState) => TResult): Enumerable<TResult>;
    }
}
Enumerable.generate = function <TState, TResult>(initState: TState, condition: (state: TState) => boolean, iterate: (state: TState) => TState, resultSelector: (state: TState) => TResult): Enumerable<TResult> {
    return new Enumerable<TResult>(generate(initState, condition, iterate, resultSelector));
}