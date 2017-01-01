import * as assert from "assert";
import { test } from "./orderby";
import { Enumerable, orderby, thenbydescending, OrderedEnumerable } from "../../src/index";

it('orderbydescending', test);
export const linq = "ThenByDescending";

export const samples = [
    () => thenbydescending(orderby(['xa', 'a', 'fg', 'ert', 'b'], x => x.length), x => x)
];