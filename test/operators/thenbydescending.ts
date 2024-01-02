import { test } from "./orderby";
import { orderby, thenbydescending } from "../../src/index";

it('orderbydescending', test);

export const samples = [
    () => thenbydescending(orderby(['xa', 'a', 'fg', 'ert', 'b'], x => x.length), x => x)
];

export const jsarray = "sort";
export const linq = "ThenByDescending";
export const lodash = ["orderBy", "sortBy"];
export const fsharp = ["sort", "sortBy"];