import { test } from "./orderby";
import { orderby, thenby } from "../../src/index";

it('thenby', test);

export const samples = [
    () => thenby(orderby(['xa', 'a', 'fg', 'ert', 'b'], x => x.length), x => x)
];

export const jsarray = "sort";
export const linq = "ThenBy";
export const lodash = ["orderBy", "sortBy"];
export const fsharp = ["sort", "sortBy"];