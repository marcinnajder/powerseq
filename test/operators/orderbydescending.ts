import * as assert from "assert";
import { test } from "./orderby";
import { Enumerable, OrderedEnumerable, orderbydescending } from "../../src/index";

it('orderbydescending', test);
export const linq = "OrderByDescending";

export const samples = [
    () => orderbydescending([1, 4, 2, 3, 5, 1], x => x),
    () => orderbydescending(['abc', 'dd', 'sdfe', 'f'], x => x.length)
];