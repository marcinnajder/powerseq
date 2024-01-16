
## installation and usage

```
npm install powerseq
```

executing single operator

```javascript 
import { filter } from "powerseq";

for(var item of filter([1,2,3,4,5], x => x % 2 === 0)){
    console.log(item);
}
```

chaining many operators 

```javascript
import { pipe, range, filter, take, reverse, toarray } from "powerseq";

const items = pipe(
    range(1, Number.MAX_VALUE),
    filter(x => x % 2 === 0),
    take(5),
    reverse(),
    toarray());

console.log(items);
```

most of the operators can be used as a single operator (`filter([1,2,3,4,5], x => x % 2 === 0)`) or as a part of the operator chain `pipe([1, 2, 3, 4, 5], filter(x => x % 2 === 0), ... )`.But some operators have special counterparts (concatp, defaultifemptyp, includesp, sequenceequalp, zipp, interleavep) when used with pipe, so we call `concat([1,2,3], [4,5,6])` but we have to call `pipe([1,2,3], concatp([4,5,6]), ... )` if we want to chain `concat` with other operators.

## operators
- [click](https://github.com/marcinnajder/powerseq/tree/master/docs/mapping.md) to see mapping powerseq operators to [LINQ](https://msdn.microsoft.com/en-us/library/system.linq.enumerable(v=vs.110).aspx), [RxJS](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html), [JS Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array), [lodash](https://lodash.com/docs/4.17.2), [F#](https://fsharp.github.io/fsharp-core-docs/reference/fsharp-collections-seqmodule.html), [Clojure](https://clojure.org/api/cheatsheet), [Kotlin](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin.sequences/-sequence/), [Java](https://docs.oracle.com/en/java/javase/19/docs/api/java.base/java/util/stream/Stream.html)

creators
<table><tr><td><span><a href="https://github.com/marcinnajder/powerseq/tree/master/src/creators/defer.ts">defer</a></span></td><td><span><a href="https://github.com/marcinnajder/powerseq/tree/master/src/creators/throww.ts">throww</a></span></td></tr><tr><td><span><a href="https://github.com/marcinnajder/powerseq/tree/master/src/creators/empty.ts">empty</a></span></td></tr><tr><td><span><a href="https://github.com/marcinnajder/powerseq/tree/master/src/creators/entries.ts">entries</a></span></td></tr><tr><td><span><a href="https://github.com/marcinnajder/powerseq/tree/master/src/creators/generate.ts">generate</a></span></td></tr><tr><td><span><a href="https://github.com/marcinnajder/powerseq/tree/master/src/creators/range.ts">range</a></span></td></tr><tr><td><span><a href="https://github.com/marcinnajder/powerseq/tree/master/src/creators/repeatvalue.ts">repeatvalue</a></span></td></tr></table>
operators
<table><tr><td><span><a href="https://github.com/marcinnajder/powerseq/tree/master/src/operators/asiterable.ts">asiterable</a></span></td><td><span><a href="https://github.com/marcinnajder/powerseq/tree/master/src/operators/filter.ts">filter</a></span></td><td><span><a href="https://github.com/marcinnajder/powerseq/tree/master/src/operators/last.ts">last</a></span></td><td><span><a href="https://github.com/marcinnajder/powerseq/tree/master/src/operators/single.ts">single</a></span></td></tr><tr><td><span><a href="https://github.com/marcinnajder/powerseq/tree/master/src/operators/average.ts">average</a></span></td><td><span><a href="https://github.com/marcinnajder/powerseq/tree/master/src/operators/filtermap.ts">filtermap</a></span></td><td><span><a href="https://github.com/marcinnajder/powerseq/tree/master/src/operators/map.ts">map</a></span></td><td><span><a href="https://github.com/marcinnajder/powerseq/tree/master/src/operators/skip.ts">skip</a></span></td></tr><tr><td><span><a href="https://github.com/marcinnajder/powerseq/tree/master/src/operators/buffer.ts">buffer</a></span></td><td><span><a href="https://github.com/marcinnajder/powerseq/tree/master/src/operators/find.ts">find</a></span></td><td><span><a href="https://github.com/marcinnajder/powerseq/tree/master/src/operators/max.ts">max</a></span></td><td><span><a href="https://github.com/marcinnajder/powerseq/tree/master/src/operators/skiplast.ts">skiplast</a></span></td></tr><tr><td><span><a href="https://github.com/marcinnajder/powerseq/tree/master/src/operators/cast.ts">cast</a></span></td><td><span><a href="https://github.com/marcinnajder/powerseq/tree/master/src/operators/findindex.ts">findindex</a></span></td><td><span><a href="https://github.com/marcinnajder/powerseq/tree/master/src/operators/maxby.ts">maxby</a></span></td><td><span><a href="https://github.com/marcinnajder/powerseq/tree/master/src/operators/skipwhile.ts">skipwhile</a></span></td></tr><tr><td><span><a href="https://github.com/marcinnajder/powerseq/tree/master/src/operators/combinations.ts">combinations</a></span></td><td><span><a href="https://github.com/marcinnajder/powerseq/tree/master/src/operators/flat.ts">flat</a></span></td><td><span><a href="https://github.com/marcinnajder/powerseq/tree/master/src/operators/memoize.ts">memoize</a></span></td><td><span><a href="https://github.com/marcinnajder/powerseq/tree/master/src/operators/some.ts">some</a></span></td></tr><tr><td><span><a href="https://github.com/marcinnajder/powerseq/tree/master/src/operators/concat.ts">concat</a></span></td><td><span><a href="https://github.com/marcinnajder/powerseq/tree/master/src/operators/flatmap.ts">flatmap</a></span></td><td><span><a href="https://github.com/marcinnajder/powerseq/tree/master/src/operators/min.ts">min</a></span></td><td><span><a href="https://github.com/marcinnajder/powerseq/tree/master/src/operators/sum.ts">sum</a></span></td></tr><tr><td><span><a href="https://github.com/marcinnajder/powerseq/tree/master/src/operators/count.ts">count</a></span></td><td><span><a href="https://github.com/marcinnajder/powerseq/tree/master/src/operators/foreach.ts">foreach</a></span></td><td><span><a href="https://github.com/marcinnajder/powerseq/tree/master/src/operators/minby.ts">minby</a></span></td><td><span><a href="https://github.com/marcinnajder/powerseq/tree/master/src/operators/take.ts">take</a></span></td></tr><tr><td><span><a href="https://github.com/marcinnajder/powerseq/tree/master/src/operators/countby.ts">countby</a></span></td><td><span><a href="https://github.com/marcinnajder/powerseq/tree/master/src/operators/groupby.ts">groupby</a></span></td><td><span><a href="https://github.com/marcinnajder/powerseq/tree/master/src/operators/oftype.ts">oftype</a></span></td><td><span><a href="https://github.com/marcinnajder/powerseq/tree/master/src/operators/takelast.ts">takelast</a></span></td></tr><tr><td><span><a href="https://github.com/marcinnajder/powerseq/tree/master/src/operators/defaultifempty.ts">defaultifempty</a></span></td><td><span><a href="https://github.com/marcinnajder/powerseq/tree/master/src/operators/groupby1.ts">groupby1</a></span></td><td><span><a href="https://github.com/marcinnajder/powerseq/tree/master/src/operators/orderby.ts">orderby</a></span></td><td><span><a href="https://github.com/marcinnajder/powerseq/tree/master/src/operators/takewhile.ts">takewhile</a></span></td></tr><tr><td><span><a href="https://github.com/marcinnajder/powerseq/tree/master/src/operators/distinct.ts">distinct</a></span></td><td><span><a href="https://github.com/marcinnajder/powerseq/tree/master/src/operators/groupjoin.ts">groupjoin</a></span></td><td><span><a href="https://github.com/marcinnajder/powerseq/tree/master/src/operators/orderbydescending.ts">orderbydescending</a></span></td><td><span><a href="https://github.com/marcinnajder/powerseq/tree/master/src/operators/thenby.ts">thenby</a></span></td></tr><tr><td><span><a href="https://github.com/marcinnajder/powerseq/tree/master/src/operators/distinctby.ts">distinctby</a></span></td><td><span><a href="https://github.com/marcinnajder/powerseq/tree/master/src/operators/ignoreelements.ts">ignoreelements</a></span></td><td><span><a href="https://github.com/marcinnajder/powerseq/tree/master/src/operators/pairwise.ts">pairwise</a></span></td><td><span><a href="https://github.com/marcinnajder/powerseq/tree/master/src/operators/thenbydescending.ts">thenbydescending</a></span></td></tr><tr><td><span><a href="https://github.com/marcinnajder/powerseq/tree/master/src/operators/distinctuntilchanged.ts">distinctuntilchanged</a></span></td><td><span><a href="https://github.com/marcinnajder/powerseq/tree/master/src/operators/includes.ts">includes</a></span></td><td><span><a href="https://github.com/marcinnajder/powerseq/tree/master/src/operators/partitionby.ts">partitionby</a></span></td><td><span><a href="https://github.com/marcinnajder/powerseq/tree/master/src/operators/toarray.ts">toarray</a></span></td></tr><tr><td><span><a href="https://github.com/marcinnajder/powerseq/tree/master/src/operators/doo.ts">doo</a></span></td><td><span><a href="https://github.com/marcinnajder/powerseq/tree/master/src/operators/interleave.ts">interleave</a></span></td><td><span><a href="https://github.com/marcinnajder/powerseq/tree/master/src/operators/reduce.ts">reduce</a></span></td><td><span><a href="https://github.com/marcinnajder/powerseq/tree/master/src/operators/tomap.ts">tomap</a></span></td></tr><tr><td><span><a href="https://github.com/marcinnajder/powerseq/tree/master/src/operators/elementat.ts">elementat</a></span></td><td><span><a href="https://github.com/marcinnajder/powerseq/tree/master/src/operators/interpose.ts">interpose</a></span></td><td><span><a href="https://github.com/marcinnajder/powerseq/tree/master/src/operators/repeat.ts">repeat</a></span></td><td><span><a href="https://github.com/marcinnajder/powerseq/tree/master/src/operators/toobject.ts">toobject</a></span></td></tr><tr><td><span><a href="https://github.com/marcinnajder/powerseq/tree/master/src/operators/every.ts">every</a></span></td><td><span><a href="https://github.com/marcinnajder/powerseq/tree/master/src/operators/intersect.ts">intersect</a></span></td><td><span><a href="https://github.com/marcinnajder/powerseq/tree/master/src/operators/reverse.ts">reverse</a></span></td><td><span><a href="https://github.com/marcinnajder/powerseq/tree/master/src/operators/toobjectgrouping.ts">toobjectgrouping</a></span></td></tr><tr><td><span><a href="https://github.com/marcinnajder/powerseq/tree/master/src/operators/except.ts">except</a></span></td><td><span><a href="https://github.com/marcinnajder/powerseq/tree/master/src/operators/intersectby.ts">intersectby</a></span></td><td><span><a href="https://github.com/marcinnajder/powerseq/tree/master/src/operators/scan.ts">scan</a></span></td><td><span><a href="https://github.com/marcinnajder/powerseq/tree/master/src/operators/union.ts">union</a></span></td></tr><tr><td><span><a href="https://github.com/marcinnajder/powerseq/tree/master/src/operators/exceptby.ts">exceptby</a></span></td><td><span><a href="https://github.com/marcinnajder/powerseq/tree/master/src/operators/isempty.ts">isempty</a></span></td><td><span><a href="https://github.com/marcinnajder/powerseq/tree/master/src/operators/sequenceequal.ts">sequenceequal</a></span></td><td><span><a href="https://github.com/marcinnajder/powerseq/tree/master/src/operators/unionby.ts">unionby</a></span></td></tr><tr><td><span><a href="https://github.com/marcinnajder/powerseq/tree/master/src/operators/expand.ts">expand</a></span></td><td><span><a href="https://github.com/marcinnajder/powerseq/tree/master/src/operators/join.ts">join</a></span></td><td><span><a href="https://github.com/marcinnajder/powerseq/tree/master/src/operators/share.ts">share</a></span></td><td><span><a href="https://github.com/marcinnajder/powerseq/tree/master/src/operators/zip.ts">zip</a></span></td></tr></table>


creators
- defer
    - ```defer(() => [1, 2, 3] /* executed on demand */)``` -> ```seq [1, 2, 3]```
- empty
    - ```empty()``` -> ```seq []```
- entries
    - ```entries({ 'a': 1, b: 2 })``` -> ```seq [['a', 1], ['b', 2]]```
    - ```entries([1, 2, 3])``` -> ```seq [[0, 1], [1, 2], [2, 3]]```
- generate
    - ```generate(0, x => x < 4, x => x + 1, x => 'a'.repeat(x))``` -> ```seq ['', 'a', 'aa', 'aaa']```
- range
    - ```range(10, 4)``` -> ```seq [10, 11, 12, 13]```
- repeatvalue
    - ```repeatvalue(true, 4)``` -> ```seq [true, true, true, true]```
    - ```take(repeatvalue(true), 2)``` -> ```seq [true, true]```
- throww
    - ```throww(new Error('exception ...'))``` -> ```error: exception ...```

operators
- asiterable
    - ```asiterable([1, 2] /**changes seq type to help TypeScript*/)``` -> ```[1, 2]```
- average
    - ```average([1, 2, 3, 4])``` -> ```2.5```
    - ```average(['a', 'aa', 'aaa'], s => s.length)``` -> ```2```
- buffer
    - ```buffer([1, 2, 3, 4, 5, 6, 7], 2)``` -> ```seq [[1, 2], [3, 4], [5, 6], [7]]```
    - ```buffer([1, 2, 3, 4, 5, 6, 7], 2, /*skip*/ 4)``` -> ```seq [[1, 2], [5, 6]]```
- cast
    - ```cast([new Number(1), new Number(2), 's', false], Number)``` -> ```error: An element in the sequence cannot be cast to type 'Number'.```
- combinations
    - ```combinations([1, 2, 3, 4], 2)``` -> ```seq [[1, 2], [1, 3], [2, 3], [1, 4], [2, 4], [3, 4]]```
    - ```combinations([1, 2, 3, 4], 3)``` -> ```seq [[1, 2, 3], [1, 2, 4], [1, 3, 4], [2, 3, 4]]```
- concat
    - ```concat([1, 2], [3, 5], [6])``` -> ```seq [1, 2, 3, 5, 6]```
- count
    - ```count([2, 2, 2])``` -> ```3```
    - ```count([2, 4, 6], x => x > 2)``` -> ```2```
- countby
    - ```countby(['a', 'a', 'cc', 'ddd', 'xx'], x => x.length)``` -> ```Map {1 => 2, 2 => 2, 3 => 1}```
    - ```pipe(['a', 'a', 'cc', 'ddd', 'xx'], countby(x => x), toobject())``` -> ```{ a:2, cc:1, ddd:1, xx:1 }```
- defaultifempty
    - ```defaultifempty([1, 2, 3])``` -> ```seq [1, 2, 3]```
    - ```defaultifempty([])``` -> ```seq [undefined]```
    - ```defaultifempty([], 10)``` -> ```seq [10]```
- distinct
    - ```distinct([1, 2, 1, 3, 2])``` -> ```seq [1, 2, 3]```
    - ```distinct(['a', 'aa', 'ab', 'abc'], x => x.length)``` -> ```seq [1, 2, 3]```
- distinctby
    - ```distinctby(['a', 'aa', 'ab', 'abc'], x => x.length)``` -> ```seq ['a', 'aa', 'abc']```
- distinctuntilchanged
    - ```distinctuntilchanged([1, 1, 2, 2, 2, 1, 3, 3])``` -> ```seq [1, 2, 1, 3]```
- doo
    - ```doo([1, 2, 3,], (x) => { /* executed during iteration */ ; })``` -> ```seq [1, 2, 3]```
- elementat
    - ```elementat([1, 2, 12, 15], 2)``` -> ```12```
    - ```elementat([1, 2, 12, 15], 20)``` -> ```undefined```
    - ```elementat([1, 2, 12, 15], 20, 100)``` -> ```100```
- every
    - ```every([1, 2, 12, 15], x => x > 0)``` -> ```true```
    - ```every([1, 2, 12, 15], x => x < 10)``` -> ```false```
- except
    - ```except([1, 2, 2, 3, 4], [2, 3])``` -> ```seq [1, 4]```
- exceptby
    - ```exceptby(['a', 'b', 'ba', 'xde'], ['poc'], x => x.length)``` -> ```seq ['a', 'ba']```
- expand
    - ```expand([1], x => x > 8 ? [] : [10, x * 2])``` -> ```seq [1, 10, 2, 10, 4, 10, 8, 10, 16]```
- filter
    - ```filter([1, 2, 2, 3, 4], x => x > 2)``` -> ```seq [3, 4]```
    - ```filter([1, 2, 2, 3, 4], (x, index) => x - 1 === index)``` -> ```seq [1, 2]```
- filtermap
    - ```filtermap([1, 2, 3, 4], x => x % 2 === 0 ? (x * 10).toString() : null)``` -> ```seq ['20', '40']```
    - ```filtermap([1, 2, 3, 4], (x, i) => i % 2 === 0 ? (x * 10).toString() : null)```
        - ```seq ['10', '30']```
- find
    - ```find([1, 2, 2, 3, 4])``` -> ```1```
    - ```find([1, 2, 2, 3, 4], x => x > 2)``` -> ```3```
    - ```find([1, 2, 2, 3, 4], x => x > 4)``` -> ```undefined```
    - ```find([1, 2, 2, 3, 4], x => x > 4, 100)``` -> ```100```
    - ```find([1, 2, 2, 3, 4], (x, index) => x > 1 && index > 2)``` -> ```3```
- findindex
    - ```findindex([1, 2, 2, 3, 4], x => x > 1)``` -> ```1```
    - ```findindex([1, 2, 2, 3, 4], (x, index) => x > 1 && index > 2)``` -> ```3```
- flat
    - ```flat([1, [2, 3], [[4, 5], 6], []])``` -> ```seq [1, 2, 3, [4, 5], 6]```
    - ```flat([1, [2, 3], [[4, 5], 6], []], 1)``` -> ```seq [1, 2, 3, [4, 5], 6]```
    - ```flat([1, [2, 3], [[4, 5], 6], []], 2)``` -> ```seq [1, 2, 3, 4, 5, 6]```
    - ```flat(['a', ['b', ['c', 'd']], 'e'], (item, depth) => typeof item !== 'string')```
        - ```seq ['a', 'b', 'c', 'd', 'e']```
- flatmap
    - ```flatmap([{ ns: [1] }, { ns: [99, 10] }, { ns: [6, 3] }], x => x.ns)``` -> ```seq [1, 99, 10, 6, 3]```
    - ```flatmap(['abc', 'cd'], text => text, (text, char) => text + '-' + char)```
        - ```seq ['abc-a', 'abc-b', 'abc-c', 'cd-c', 'cd-d']```
- foreach
    - ```foreach([1, 2, 3], x => { /* some action */ ; })``` -> ```undefined```
- groupby
    - ```groupby(['a', 'b', 'cc', 'ddd', 'xx'], x => x.length)``` -> ```Map {1 => ['a', 'b'], 2 => ['cc', 'xx'], 3 => ['ddd']}```
    - ```groupby(['a', 'b', 'cc', 'ddd', 'xx'], x => x.length, x => x.toUpperCase())```
        - ```Map {1 => ['A', 'B'], 2 => ['CC', 'XX'], 3 => ['DDD']}```
    - ```groupby(['a', 'b', 'cc', 'ddd', 'xx'], x => x.length, (x, k) => k)``` -> ```Map {1 => [1, 1], 2 => [2, 2], 3 => [3]}```
    - ```pipe(['a', 'b', 'cc', 'ddd', 'xx'], groupby(x => x.length), map(([key, values]) => ({ key, values })))```
        - ```seq [{ key:1, values:['a', 'b'] }, { key:2, values:['cc', 'xx'] }, { key:3, values:['ddd'] }]```
    - ```pipe(['a', 'b', 'cc', 'ddd', 'xx'], groupby(x => x.length), toobject())```
        - ```{ 1:['a', 'b'], 2:['cc', 'xx'], 3:['ddd'] }```
- groupby1
    - ```groupby1(['a', 'b', 'cc', 'ddd', 'xx'], x => x.length)``` -> ```seq [enum ['a', 'b'], enum ['cc', 'xx'], enum ['ddd']]```
    - ```groupby(['a', 'b', 'cc', 'ddd', 'xx'], x => x.length)``` -> ```Map {1 => ['a', 'b'], 2 => ['cc', 'xx'], 3 => ['ddd']}```
    - ```groupby1(['a', 'b', 'cc', 'ddd', 'xx'], x => x.length, x => x.toUpperCase())```
        - ```seq [enum ['A', 'B'], enum ['CC', 'XX'], enum ['DDD']]```
    - ```groupby(['a', 'b', 'cc', 'ddd', 'xx'], x => x.length, x => x.toUpperCase())```
        - ```Map {1 => ['A', 'B'], 2 => ['CC', 'XX'], 3 => ['DDD']}```
    - ```groupby1(['a', 'b', 'cc', 'ddd', 'xx'], x => x.length, x => x, (key, values) => ({ key, values: [...values], min: min(values) }))```
        - ```seq [{ key:1, values:['a', 'b'], min:'a' }, { key:2, values:['cc', 'xx'], min:'cc' }, { key:3, values:['ddd'], min:'ddd' }]```
    - ```pipe(['a', 'b', 'cc', 'ddd', 'xx'], groupby(x => x.length), map(([key, values]) => ({ key, values, min: min(values) })))```
        - ```seq [{ key:1, values:['a', 'b'], min:'a' }, { key:2, values:['cc', 'xx'], min:'cc' }, { key:3, values:['ddd'], min:'ddd' }]```
    - ```pipe(['a', 'b', 'cc', 'ddd', 'xx'], groupby1(x => x.length), toobject(gr => gr.key, gr => [...gr]))```
        - ```{ 1:['a', 'b'], 2:['cc', 'xx'], 3:['ddd'] }```
    - ```pipe(['a', 'b', 'cc', 'ddd', 'xx'], groupby(x => x.length), toobject())```
        - ```{ 1:['a', 'b'], 2:['cc', 'xx'], 3:['ddd'] }```
    - ```pipe(['a', 'b', 'cc', 'ddd', 'xx'], toobjectgrouping(x => x.length))``` -> ```{ 1:['a', 'b'], 2:['cc', 'xx'], 3:['ddd'] }```
    - ```pipe(['a', 'b', 'cc', 'ddd', 'xx'], groupby1(x => x.length), toobject(gr => gr.key, gr => [...gr].map(x => x.toUpperCase())))```
        - ```{ 1:['A', 'B'], 2:['CC', 'XX'], 3:['DDD'] }```
    - ```pipe(['a', 'b', 'cc', 'ddd', 'xx'], groupby(x => x.length, x => x.toUpperCase()), toobject())```
        - ```{ 1:['A', 'B'], 2:['CC', 'XX'], 3:['DDD'] }```
    - ```pipe(['a', 'b', 'cc', 'ddd', 'xx'], toobjectgrouping(x => x.length, valies => valies.map(x => x.toUpperCase())))```
        - ```{ 1:['A', 'B'], 2:['CC', 'XX'], 3:['DDD'] }```
    - ```pipe(['a', 'b', 'cc', 'ddd', 'xx'], groupby1(x => x.length, x => x, (key, values) => ({ key, min: min(values) })), toobject(({ key }) => key, ({ min }) => min))```
        - ```{ 1:'a', 2:'cc', 3:'ddd' }```
    - ```pipe(['a', 'b', 'cc', 'ddd', 'xx'], groupby1(x => x.length), toobject(gr => gr.key, gr => min(gr)))```
        - ```{ 1:'a', 2:'cc', 3:'ddd' }```
    - ```pipe(['a', 'b', 'cc', 'ddd', 'xx'], groupby(x => x.length), toobject(([key, values]) => key, ([key, values]) => min(values)))```
        - ```{ 1:'a', 2:'cc', 3:'ddd' }```
    - ```pipe(['a', 'b', 'cc', 'ddd', 'xx'], toobjectgrouping(x => x.length, values => min(values)))```
        - ```{ 1:'a', 2:'cc', 3:'ddd' }```
- groupjoin
    - ```groupjoin([1, 3, 2, 1], ['a', 'b', 'cc'], x => x, y => y.length, (x, ys) => x + ':' + ys)```
        - ```seq ['1:a,b', '3:', '2:cc', '1:a,b']```
- ignoreelements
    - ```ignoreelements([1, 3, 2])``` -> ```seq []```
- includes
    - ```includes([1, 2, 3], 2)``` -> ```true```
    - ```includes([1, 2, 3], 5)``` -> ```false```
    - ```includes([1, 2, 3], 3, /*fromIndex*/ 4)``` -> ```false```
- interleave
    - ```interleave([1, 2, 3], [10, 20])``` -> ```seq [1, 10, 2, 20]```
    - ```interleave([-1], [1, 2, 3], [10, 20])``` -> ```seq [-1, 1, 10]```
    - ```interleave([1, 2, 3])``` -> ```seq [1, 2, 3]```
- interpose
    - ```interpose([1, 2, 3], 0)``` -> ```seq [1, 0, 2, 0, 3]```
    - ```interpose([1], 0)``` -> ```seq [1]```
    - ```interpose([], 0)``` -> ```seq []```
- intersect
    - ```intersect([1, 2, 2, 3], [3, 3, 1])``` -> ```seq [3, 1]```
- intersectby
    - ```intersectby(['a', 'c', 'ddd'], ['r', 'ww', 'ttt', 'oooo'], x => x.length)```
        - ```seq ['r', 'ttt']```
- isempty
    - ```isempty([])``` -> ```true```
    - ```isempty([1, 2])``` -> ```false```
- join
    - ```join([1, 2, 3], ['a', 'bb', 'x'], x => x, y => y.length, (x, y) => x + ':' + y)```
        - ```seq ['1:a', '1:x', '2:bb']```
- last
    - ```last([1, 2, 3])``` -> ```3```
    - ```last([])``` -> ```undefined```
    - ```last([1, 2, 3, 4, 5], x => x > 2)``` -> ```5```
    - ```last([1, 2, 3, 4, 5], (x, index) => x > 2 && index < 4)``` -> ```4```
    - ```last([1, 2, 3, 4, 5], x => x > 10)``` -> ```undefined```
    - ```last([1, 2, 3, 4, 5], x => x > 10, -1)``` -> ```-1```
- map
    - ```map([1, 2, 3], x => x * 10)``` -> ```seq [10, 20, 30]```
    - ```map([1, 2, 3], (x, index) => x * 10 + index)``` -> ```seq [10, 21, 32]```
- max
    - ```max([1, 2, 3, 1])``` -> ```3```
    - ```max(['a', 'bb', 'rrr', 'd'], x => x.length)``` -> ```3```
- maxby
    - ```maxby(['a', 'bb', 'rrr', 'd'], x => x.length)``` -> ```'rrr'```
- memoize
    - ```pipe(range(0, 4), map(i => ({ i })), memoize(), xs => zip(xs, xs, (x1, x2) => [x1.i, x2.i, x1 === x2]))```
        - ```seq [[0, 0, true], [1, 1, true], [2, 2, true], [3, 3, true]]```
- min
    - ```min([1, 2, 3, 1])``` -> ```1```
    - ```min(['a', 'bb', 'rrr', 'd'], x => x.length)``` -> ```1```
- minby
    - ```minby(['a', 'bb', 'rrr', 'd'], x => x.length)``` -> ```'a'```
- oftype
    - ```oftype([new Number(1), new Number(2), 's', false], Number)``` -> ```seq [{  }, {  }]```
- orderby
    - ```orderby([1, 4, 2, 3, 5, 1], x => x)``` -> ```seq [1, 1, 2, 3, 4, 5]```
    - ```orderby(['abc', 'dd', 'sdfe', 'f'], x => x.length)``` -> ```seq ['f', 'dd', 'abc', 'sdfe']```
- orderbydescending
    - ```orderbydescending([1, 4, 2, 3, 5, 1], x => x)``` -> ```seq [5, 4, 3, 2, 1, 1]```
    - ```orderbydescending(['abc', 'dd', 'sdfe', 'f'], x => x.length)``` -> ```seq ['sdfe', 'abc', 'dd', 'f']```
- pairwise
    - ```pairwise([1, 2, 3, 4])``` -> ```seq [[1, 2], [2, 3], [3, 4]]```
- partitionby
    - ```partitionby([1, 2, 4, 6, 3, 4], n => n % 2 === 0)``` -> ```seq [[1], [2, 4, 6], [3], [4]]```
- reduce
    - ```reduce([1, 2, 3], (a, x) => a + x)``` -> ```6```
    - ```reduce([1, 2, 3], (a, x) => a + (x * 10), '')``` -> ```'102030'```
- repeat
    - ```repeat([1, 2, 3], 2)``` -> ```seq [1, 2, 3, 1, 2, 3]```
    - ```take(repeat([1, 2, 3]), 5)``` -> ```seq [1, 2, 3, 1, 2]```
- reverse
    - ```reverse([1, 2, 3])``` -> ```seq [3, 2, 1]```
- scan
    - ```scan([1, 2, 3], (a, x) => a + x)``` -> ```seq [3, 6]```
    - ```scan([1, 2, 3], (a, x) => a + (x * 10), '')``` -> ```seq ['', '10', '1020', '102030']```
- sequenceequal
    - ```sequenceequal([1, 2, 3], [1, 2, 3])``` -> ```true```
    - ```sequenceequal([1, 2, 3], [1, 2, 2])``` -> ```false```
    - ```sequenceequal([1, 2, 3], [1, 2])``` -> ```false```
- share
    - ```pipe(range(0, 4), map(i => ({ i })), share(), xs => zip(xs, xs, (x1, x2) => [x1.i, x2.i, x1 === x2]))```
        - ```seq []```
- single
    - ```single([1])``` -> ```1```
    - ```single([1, 2, 3], x => x > 2)``` -> ```3```
    - ```single([1, 2, 3], x => x > 10)``` -> ```undefined```
    - ```single([1, 2, 3], x => x > 10, -1)``` -> ```-1```
- skip
    - ```skip([1, 2, 3, 4, 5], 2)``` -> ```seq [3, 4, 5]```
- skiplast
    - ```skiplast([1, 2, 3, 4], 2)``` -> ```seq [1, 2]```
    - ```skiplast([1, 2, 3, 4], 0)``` -> ```seq [1, 2, 3, 4]```
    - ```skiplast([1, 2, 3, 4], 5)``` -> ```seq []```
- skipwhile
    - ```skipwhile([1, 2, 2, 3, 3, 4, 5], x => x < 3)``` -> ```seq [3, 3, 4, 5]```
- some
    - ```some([1])``` -> ```true```
    - ```some([])``` -> ```false```
    - ```some([1, 2, 3], x => x > 2)``` -> ```true```
    - ```some([1, 2, 3], x => x > 3)``` -> ```false```
- sum
    - ```sum([1, 2, 3])``` -> ```6```
    - ```sum(['a', 'asd', 'yy'], x => x.length)``` -> ```6```
- take
    - ```take([1, 2, 3, 4, 5], 2)``` -> ```seq [1, 2]```
- takelast
    - ```takelast([1, 2, 3], 2)``` -> ```seq [2, 3]```
    - ```takelast([1, 2, 3], 0)``` -> ```seq []```
    - ```takelast([1, 2, 3], 5)``` -> ```seq [1, 2, 3]```
- takewhile
    - ```takewhile([1, 2, 2, 3, 3, 4, 5], x => x < 3)``` -> ```seq [1, 2, 2]```
- thenby
    - ```thenby(orderby(['xa', 'a', 'fg', 'ert', 'b'], x => x.length), x => x)``` -> ```seq ['a', 'b', 'fg', 'xa', 'ert']```
- thenbydescending
    - ```thenbydescending(orderby(['xa', 'a', 'fg', 'ert', 'b'], x => x.length), x => x)```
        - ```seq ['b', 'a', 'xa', 'fg', 'ert']```
- toarray
    - ```toarray([1, 2, 2])``` -> ```[1, 2, 2]```
- tomap
    - ```tomap(['a', 'bb', 'ccc'], x => x.length)``` -> ```Map {1 => 'a', 2 => 'bb', 3 => 'ccc'}```
    - ```tomap(['a', 'bb', 'ccc'], x => x.length, x => x.toUpperCase())``` -> ```Map {1 => 'A', 2 => 'BB', 3 => 'CCC'}```
- toobject
    - ```toobject(['a', 'bb', 'ccc'], x => x.length)``` -> ```{ 1:'a', 2:'bb', 3:'ccc' }```
    - ```toobject(['a', 'bb', 'ccc'], x => x.length, x => x.toUpperCase())``` -> ```{ 1:'A', 2:'BB', 3:'CCC' }```
    - ```toobject(['a', 'bb', 'ccc'], x => x.length, (x, k) => k)``` -> ```{ 1:1, 2:2, 3:3 }```
    - ```toobject(new Map([[1, 'one'], [2, 'two']]))``` -> ```{ 1:'one', 2:'two' }```
- toobjectgrouping
    - ```toobjectgrouping(['a', 'bb', 'ccc', 'e', 'ff'], x => x.length)``` -> ```{ 1:['a', 'e'], 2:['bb', 'ff'], 3:['ccc'] }```
    - ```toobjectgrouping(['a', 'bb', 'ccc', 'e', 'ff'], x => x.length, xs => xs.join(','))```
        - ```{ 1:'a,e', 2:'bb,ff', 3:'ccc' }```
    - ```toobjectgrouping(['a', 'bb', 'ccc', 'e', 'ff'], x => x.length, xs => xs.length)```
        - ```{ 1:2, 2:2, 3:1 }```
    - ```toobjectgrouping(['a', 'bb', 'ccc', 'e', 'ff'], x => x.length, (xs, key) => xs.map(_ => key))```
        - ```{ 1:[1, 1], 2:[2, 2], 3:[3] }```
- union
    - ```union([1, 2, 2], [2, 3, 3, 4])``` -> ```seq [1, 2, 3, 4]```
- unionby
    - ```unionby(['a', 'c', 'ddd'], ['r', 'ww', 'ttt', 'oooo'], x => x.length)``` -> ```seq ['a', 'ddd', 'ww', 'oooo']```
- zip
    - ```zip(['a', 'b', 'c'], [1, 2], (s, n) => s + n)``` -> ```seq ['a1', 'b2']```
    - ```zip(['a', 'b', 'c'], [1, 2], [false], (s, n, b) => s + n + b)``` -> ```seq ['a1false']```


