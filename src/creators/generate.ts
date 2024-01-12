import { Func } from "../common/types";
import { wrapInIterable } from "../common/wrap";

export function generate<S, R>(initState: S, condition: Func<S, boolean>, iterate: Func<S, S>, resultSelector: Func<S, R>) {
    return wrapInIterable(function* () {
        for (let state = initState; condition(state); state = iterate(state)) {
            yield resultSelector(state);
        }
    });
}