import * as assert from "assert";
import { groupby, map, pipe, toobject, groupby1, min, toobjectgrouping } from "../../src/index";

it('groupby1', function () {

});



export const samples = [
    () => groupby1(['a', 'b', 'cc', 'ddd', 'xx'], x => x.length),
    () => groupby(['a', 'b', 'cc', 'ddd', 'xx'], x => x.length),

    () => groupby1(['a', 'b', 'cc', 'ddd', 'xx'], x => x.length, x => x.toUpperCase()),
    () => groupby(['a', 'b', 'cc', 'ddd', 'xx'], x => x.length, x => x.toUpperCase()),

    () => groupby1(['a', 'b', 'cc', 'ddd', 'xx'], x => x.length, x => x, (key, values) => ({ key, values: [...values], min: min(values) })),
    () => pipe(['a', 'b', 'cc', 'ddd', 'xx'], groupby(x => x.length), map(([key, values]) => ({ key, values, min: min(values) }))),

    () => pipe(['a', 'b', 'cc', 'ddd', 'xx'], groupby1(x => x.length), toobject(gr => gr.key, gr => [...gr])),
    () => pipe(['a', 'b', 'cc', 'ddd', 'xx'], groupby(x => x.length), toobject()),
    () => pipe(['a', 'b', 'cc', 'ddd', 'xx'], toobjectgrouping(x => x.length)),

    () => pipe(['a', 'b', 'cc', 'ddd', 'xx'], groupby1(x => x.length), toobject(gr => gr.key, gr => [...gr].map(x => x.toUpperCase()))),
    () => pipe(['a', 'b', 'cc', 'ddd', 'xx'], groupby(x => x.length, x => x.toUpperCase()), toobject()),
    () => pipe(['a', 'b', 'cc', 'ddd', 'xx'], toobjectgrouping(x => x.length, valies => valies.map(x => x.toUpperCase()))),

    () => pipe(['a', 'b', 'cc', 'ddd', 'xx'], groupby1(x => x.length, x => x, (key, values) => ({ key, min: min(values) })), toobject(({ key }) => key, ({ min }) => min)),
    () => pipe(['a', 'b', 'cc', 'ddd', 'xx'], groupby1(x => x.length), toobject(gr => gr.key, gr => min(gr))),
    () => pipe(['a', 'b', 'cc', 'ddd', 'xx'], groupby(x => x.length), toobject(([key, values]) => key, ([key, values]) => min(values))),
    () => pipe(['a', 'b', 'cc', 'ddd', 'xx'], toobjectgrouping(x => x.length, values => min(values))),
];

