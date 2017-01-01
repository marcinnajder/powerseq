import * as assert from "assert";
import { test } from "./orderby";
import { Enumerable, orderby, thenby, OrderedEnumerable } from "../../src/index";

it('thenby', test);
export const linq = "ThenBy";

export const samples = [
    () => thenby(orderby(['xa', 'a', 'fg', 'ert', 'b'], x => x.length), x => x)
];