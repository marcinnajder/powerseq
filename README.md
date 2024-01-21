## Documentation

```typescript
import { pipe, range, filter, take, toarray } from "powerseq"; // npm install powerseq

// calling one operator
for(var item of filter([1,2,3,4,5], x => x % 2 === 0)){
    console.log(item);
}

// chaining many operators 
const items = pipe(range(1, Number.MAX_VALUE), filter(x => x % 2 === 0), take(5), toarray());
console.log(items);
```

- thanks to function overloading the same operator can be called alone or as a part of `pipe(..., operator(), ...)` expression
- for some operators a special counterparts ending with `p` are provided (`concatp`,`defaultifemptyp`,`includesp`,`sequenceequalp`,`zipp`,`interleavep`), those functions must be used inside `pipe(..., opp())`, so we call `concat([1,2,3], [4,5,6])` or `pipe([1,2,3], concatp([4,5,6]) )`  
- [mapping](#mapping) powerseq operators to [LINQ](https://msdn.microsoft.com/en-us/library/system.linq.enumerable(v=vs.110).aspx), [RxJS](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html), [JS Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array), [lodash](https://lodash.com/docs/4.17.2), [F#](https://fsharp.github.io/fsharp-core-docs/reference/fsharp-collections-seqmodule.html), [Clojure](https://clojure.org/api/cheatsheet), [Kotlin](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin.sequences/-sequence/), [Java](https://docs.oracle.com/en/java/javase/19/docs/api/java.base/java/util/stream/Stream.html)

### functions

- creators: [defer](#defer), [empty](#empty), [entries](#entries), [generate](#generate), [range](#range), [repeatvalue](#repeatvalue), [throww](#throww)
- operators: [average](#average), [buffer](#buffer), [cast](#cast), [combinations](#combinations), [concat](#concat), [count](#count), [countby](#countby), [defaultifempty](#defaultifempty), [distinct](#distinct), [distinctby](#distinctby), [distinctuntilchanged](#distinctuntilchanged), [doo](#doo), [elementat](#elementat), [every](#every), [except](#except), [exceptby](#exceptby), [expand](#expand), [filter](#filter), [filtermap](#filtermap), [find](#find), [findindex](#findindex), [flat](#flat), [flatmap](#flatmap), [foreach](#foreach), [groupby](#groupby), [groupjoin](#groupjoin), [ignoreelements](#ignoreelements), [includes](#includes), [interleave](#interleave), [interpose](#interpose), [intersect](#intersect), [intersectby](#intersectby), [isempty](#isempty), [join](#join), [last](#last), [map](#map), [max](#max), [maxby](#maxby), [memoize](#memoize), [min](#min), [minby](#minby), [oftype](#oftype), [orderby](#orderby), [orderbydescending](#orderbydescending), [pairwise](#pairwise), [partitionby](#partitionby), [reduce](#reduce), [repeat](#repeat), [reverse](#reverse), [scan](#scan), [sequenceequal](#sequenceequal), [share](#share), [single](#single), [skip](#skip), [skiplast](#skiplast), [skipwhile](#skipwhile), [some](#some), [sum](#sum), [take](#take), [takelast](#takelast), [takewhile](#takewhile), [thenby](#thenby), [thenbydescending](#thenbydescending), [toarray](#toarray), [tomap](#tomap), [toobject](#toobject), [toobjectgrouping](#toobjectgrouping), [union](#union), [unionby](#unionby), [zip](#zip)

### creators

##### [defer](https://github.com/marcinnajder/powerseq/tree/master/src/creators/defer.ts)
- ```defer(() => [1, 2, 3] /* executed on demand */)``` -> ```seq [1, 2, 3]```
##### [empty](https://github.com/marcinnajder/powerseq/tree/master/src/creators/empty.ts)
- ```empty()``` -> ```seq []```
##### [entries](https://github.com/marcinnajder/powerseq/tree/master/src/creators/entries.ts)
- ```entries({ 'a': 1, b: 2 })``` -> ```seq [['a', 1], ['b', 2]]```
- ```entries([1, 2, 3])``` -> ```seq [[0, 1], [1, 2], [2, 3]]```
##### [generate](https://github.com/marcinnajder/powerseq/tree/master/src/creators/generate.ts)
- ```generate(0, x => x < 4, x => x + 1, x => 'a'.repeat(x))``` -> ```seq ['', 'a', 'aa', 'aaa']```
##### [range](https://github.com/marcinnajder/powerseq/tree/master/src/creators/range.ts)
- ```range(10, 4)``` -> ```seq [10, 11, 12, 13]```
##### [repeatvalue](https://github.com/marcinnajder/powerseq/tree/master/src/creators/repeatvalue.ts)
- ```repeatvalue(true, 4)``` -> ```seq [true, true, true, true]```
- ```take(repeatvalue(true), 2)``` -> ```seq [true, true]```
##### [throww](https://github.com/marcinnajder/powerseq/tree/master/src/creators/throww.ts)
- ```throww(new Error('exception ...'))``` -> ```error: exception ...```


### operators

##### [average](https://github.com/marcinnajder/powerseq/tree/master/src/operators/average.ts)
- ```average([1, 2, 3, 4])``` -> ```2.5```
- ```average(['a', 'aa', 'aaa'], s => s.length)``` -> ```2```
##### [buffer](https://github.com/marcinnajder/powerseq/tree/master/src/operators/buffer.ts)
- ```buffer([1, 2, 3, 4, 5, 6, 7], 2)``` -> ```seq [[1, 2], [3, 4], [5, 6], [7]]```
- ```buffer([1, 2, 3, 4, 5, 6, 7], 2, /*skip*/ 4)``` -> ```seq [[1, 2], [5, 6]]```
##### [cast](https://github.com/marcinnajder/powerseq/tree/master/src/operators/cast.ts)
- ```cast([new Number(1), new Number(2), 's', false], Number)``` -> ```error: An element in the sequence cannot be cast to type 'Number'.```
##### [combinations](https://github.com/marcinnajder/powerseq/tree/master/src/operators/combinations.ts)
- ```combinations([1, 2, 3, 4], 2)``` -> ```seq [[1, 2], [1, 3], [2, 3], [1, 4], [2, 4], [3, 4]]```
- ```combinations([1, 2, 3, 4], 3)``` -> ```seq [[1, 2, 3], [1, 2, 4], [1, 3, 4], [2, 3, 4]]```
##### [concat](https://github.com/marcinnajder/powerseq/tree/master/src/operators/concat.ts)
- ```concat([1, 2], [3, 5], [6])``` -> ```seq [1, 2, 3, 5, 6]```
##### [count](https://github.com/marcinnajder/powerseq/tree/master/src/operators/count.ts)
- ```count([2, 2, 2])``` -> ```3```
- ```count([2, 4, 6], x => x > 2)``` -> ```2```
##### [countby](https://github.com/marcinnajder/powerseq/tree/master/src/operators/countby.ts)
- ```countby(['a', 'a', 'cc', 'ddd', 'xx'], x => x.length)``` -> ```Map {1 => 2, 2 => 2, 3 => 1}```
- ```pipe(['a', 'a', 'cc', 'ddd', 'xx'], countby(x => x), toobject())``` -> ```{ a:2, cc:1, ddd:1, xx:1 }```
##### [defaultifempty](https://github.com/marcinnajder/powerseq/tree/master/src/operators/defaultifempty.ts)
- ```defaultifempty([1, 2, 3])``` -> ```seq [1, 2, 3]```
- ```defaultifempty([])``` -> ```seq [undefined]```
- ```defaultifempty([], 10)``` -> ```seq [10]```
##### [distinct](https://github.com/marcinnajder/powerseq/tree/master/src/operators/distinct.ts)
- ```distinct([1, 2, 1, 3, 2])``` -> ```seq [1, 2, 3]```
- ```distinct(['a', 'aa', 'ab', 'abc'], x => x.length)``` -> ```seq [1, 2, 3]```
##### [distinctby](https://github.com/marcinnajder/powerseq/tree/master/src/operators/distinctby.ts)
- ```distinctby(['a', 'aa', 'ab', 'abc'], x => x.length)``` -> ```seq ['a', 'aa', 'abc']```
##### [distinctuntilchanged](https://github.com/marcinnajder/powerseq/tree/master/src/operators/distinctuntilchanged.ts)
- ```distinctuntilchanged([1, 1, 2, 2, 2, 1, 3, 3])``` -> ```seq [1, 2, 1, 3]```
##### [doo](https://github.com/marcinnajder/powerseq/tree/master/src/operators/doo.ts)
- ```doo([1, 2, 3,], (x) => { /* executed during iteration */ ; })``` -> ```seq [1, 2, 3]```
##### [elementat](https://github.com/marcinnajder/powerseq/tree/master/src/operators/elementat.ts)
- ```elementat([1, 2, 12, 15], 2)``` -> ```12```
- ```elementat([1, 2, 12, 15], 20)``` -> ```undefined```
- ```elementat([1, 2, 12, 15], 20, 100)``` -> ```100```
##### [every](https://github.com/marcinnajder/powerseq/tree/master/src/operators/every.ts)
- ```every([1, 2, 12, 15], x => x > 0)``` -> ```true```
- ```every([1, 2, 12, 15], x => x < 10)``` -> ```false```
##### [except](https://github.com/marcinnajder/powerseq/tree/master/src/operators/except.ts)
- ```except([1, 2, 2, 3, 4], [2, 3])``` -> ```seq [1, 4]```
##### [exceptby](https://github.com/marcinnajder/powerseq/tree/master/src/operators/exceptby.ts)
- ```exceptby(['a', 'b', 'ba', 'xde'], ['poc'], x => x.length)``` -> ```seq ['a', 'ba']```
##### [expand](https://github.com/marcinnajder/powerseq/tree/master/src/operators/expand.ts)
- ```expand([1], x => x > 8 ? [] : [10, x * 2])``` -> ```seq [1, 10, 2, 10, 4, 10, 8, 10, 16]```
##### [filter](https://github.com/marcinnajder/powerseq/tree/master/src/operators/filter.ts)
- ```filter([1, 2, 2, 3, 4], x => x > 2)``` -> ```seq [3, 4]```
- ```filter([1, 2, 2, 3, 4], (x, index) => x - 1 === index)``` -> ```seq [1, 2]```
##### [filtermap](https://github.com/marcinnajder/powerseq/tree/master/src/operators/filtermap.ts)
- ```filtermap([1, 2, 3, 4], x => x % 2 === 0 ? (x * 10).toString() : null)``` -> ```seq ['20', '40']```
- ```filtermap([1, 2, 3, 4], (x, i) => i % 2 === 0 ? (x * 10).toString() : null)```
    - ```seq ['10', '30']```
##### [find](https://github.com/marcinnajder/powerseq/tree/master/src/operators/find.ts)
- ```find([1, 2, 2, 3, 4])``` -> ```1```
- ```find([1, 2, 2, 3, 4], x => x > 2)``` -> ```3```
- ```find([1, 2, 2, 3, 4], x => x > 4)``` -> ```undefined```
- ```find([1, 2, 2, 3, 4], x => x > 4, 100)``` -> ```100```
- ```find([1, 2, 2, 3, 4], (x, index) => x > 1 && index > 2)``` -> ```3```
##### [findindex](https://github.com/marcinnajder/powerseq/tree/master/src/operators/findindex.ts)
- ```findindex([1, 2, 2, 3, 4], x => x > 1)``` -> ```1```
- ```findindex([1, 2, 2, 3, 4], (x, index) => x > 1 && index > 2)``` -> ```3```
##### [flat](https://github.com/marcinnajder/powerseq/tree/master/src/operators/flat.ts)
- ```flat([1, [2, 3], [[4, 5], 6], []])``` -> ```seq [1, 2, 3, [4, 5], 6]```
- ```flat([1, [2, 3], [[4, 5], 6], []], 1)``` -> ```seq [1, 2, 3, [4, 5], 6]```
- ```flat([1, [2, 3], [[4, 5], 6], []], 2)``` -> ```seq [1, 2, 3, 4, 5, 6]```
- ```flat(['a', ['b', ['c', 'd']], 'e'], (item, depth) => typeof item !== 'string')```
    - ```seq ['a', 'b', 'c', 'd', 'e']```
##### [flatmap](https://github.com/marcinnajder/powerseq/tree/master/src/operators/flatmap.ts)
- ```flatmap([{ ns: [1] }, { ns: [99, 10] }, { ns: [6, 3] }], x => x.ns)``` -> ```seq [1, 99, 10, 6, 3]```
- ```flatmap(['abc', 'cd'], text => text, (text, char) => text + '-' + char)```
    - ```seq ['abc-a', 'abc-b', 'abc-c', 'cd-c', 'cd-d']```
##### [foreach](https://github.com/marcinnajder/powerseq/tree/master/src/operators/foreach.ts)
- ```foreach([1, 2, 3], x => { /* some action */ ; })``` -> ```undefined```
##### [groupby](https://github.com/marcinnajder/powerseq/tree/master/src/operators/groupby.ts)
- ```groupby(['a', 'b', 'cc', 'ddd', 'xx'], x => x.length)``` -> ```Map {1 => ['a', 'b'], 2 => ['cc', 'xx'], 3 => ['ddd']}```
- ```groupby(['a', 'b', 'cc', 'ddd', 'xx'], x => x.length, x => x.toUpperCase())```
    - ```Map {1 => ['A', 'B'], 2 => ['CC', 'XX'], 3 => ['DDD']}```
- ```groupby(['a', 'b', 'cc', 'ddd', 'xx'], x => x.length, (x, k) => k)``` -> ```Map {1 => [1, 1], 2 => [2, 2], 3 => [3]}```
- ```pipe(['a', 'b', 'cc', 'ddd', 'xx'], groupby(x => x.length), map(([key, values]) => ({ key, values })))```
    - ```seq [{ key:1, values:['a', 'b'] }, { key:2, values:['cc', 'xx'] }, { key:3, values:['ddd'] }]```
- ```pipe(['a', 'b', 'cc', 'ddd', 'xx'], groupby(x => x.length), toobject())```
    - ```{ 1:['a', 'b'], 2:['cc', 'xx'], 3:['ddd'] }```
##### [groupjoin](https://github.com/marcinnajder/powerseq/tree/master/src/operators/groupjoin.ts)
- ```groupjoin([1, 3, 2, 1], ['a', 'b', 'cc'], x => x, y => y.length, (x, ys) => x + ':' + ys)```
    - ```seq ['1:a,b', '3:', '2:cc', '1:a,b']```
##### [ignoreelements](https://github.com/marcinnajder/powerseq/tree/master/src/operators/ignoreelements.ts)
- ```ignoreelements([1, 3, 2])``` -> ```seq []```
##### [includes](https://github.com/marcinnajder/powerseq/tree/master/src/operators/includes.ts)
- ```includes([1, 2, 3], 2)``` -> ```true```
- ```includes([1, 2, 3], 5)``` -> ```false```
- ```includes([1, 2, 3], 3, /*fromIndex*/ 4)``` -> ```false```
##### [interleave](https://github.com/marcinnajder/powerseq/tree/master/src/operators/interleave.ts)
- ```interleave([1, 2, 3], [10, 20])``` -> ```seq [1, 10, 2, 20]```
- ```interleave([-1], [1, 2, 3], [10, 20])``` -> ```seq [-1, 1, 10]```
- ```interleave([1, 2, 3])``` -> ```seq [1, 2, 3]```
##### [interpose](https://github.com/marcinnajder/powerseq/tree/master/src/operators/interpose.ts)
- ```interpose([1, 2, 3], 0)``` -> ```seq [1, 0, 2, 0, 3]```
- ```interpose([1], 0)``` -> ```seq [1]```
- ```interpose([], 0)``` -> ```seq []```
##### [intersect](https://github.com/marcinnajder/powerseq/tree/master/src/operators/intersect.ts)
- ```intersect([1, 2, 2, 3], [3, 3, 1])``` -> ```seq [3, 1]```
##### [intersectby](https://github.com/marcinnajder/powerseq/tree/master/src/operators/intersectby.ts)
- ```intersectby(['a', 'c', 'ddd'], ['r', 'ww', 'ttt', 'oooo'], x => x.length)```
    - ```seq ['r', 'ttt']```
##### [isempty](https://github.com/marcinnajder/powerseq/tree/master/src/operators/isempty.ts)
- ```isempty([])``` -> ```true```
- ```isempty([1, 2])``` -> ```false```
##### [join](https://github.com/marcinnajder/powerseq/tree/master/src/operators/join.ts)
- ```join([1, 2, 3], ['a', 'bb', 'x'], x => x, y => y.length, (x, y) => x + ':' + y)```
    - ```seq ['1:a', '1:x', '2:bb']```
##### [last](https://github.com/marcinnajder/powerseq/tree/master/src/operators/last.ts)
- ```last([1, 2, 3])``` -> ```3```
- ```last([])``` -> ```undefined```
- ```last([1, 2, 3, 4, 5], x => x > 2)``` -> ```5```
- ```last([1, 2, 3, 4, 5], (x, index) => x > 2 && index < 4)``` -> ```4```
- ```last([1, 2, 3, 4, 5], x => x > 10)``` -> ```undefined```
- ```last([1, 2, 3, 4, 5], x => x > 10, -1)``` -> ```-1```
##### [map](https://github.com/marcinnajder/powerseq/tree/master/src/operators/map.ts)
- ```map([1, 2, 3], x => x * 10)``` -> ```seq [10, 20, 30]```
- ```map([1, 2, 3], (x, index) => x * 10 + index)``` -> ```seq [10, 21, 32]```
##### [max](https://github.com/marcinnajder/powerseq/tree/master/src/operators/max.ts)
- ```max([1, 2, 3, 1])``` -> ```3```
- ```max(['a', 'bb', 'rrr', 'd'], x => x.length)``` -> ```3```
##### [maxby](https://github.com/marcinnajder/powerseq/tree/master/src/operators/maxby.ts)
- ```maxby(['a', 'bb', 'rrr', 'd'], x => x.length)``` -> ```'rrr'```
##### [memoize](https://github.com/marcinnajder/powerseq/tree/master/src/operators/memoize.ts)
- ```pipe(range(0, 4), map(i => ({ i })), memoize(), xs => zip(xs, xs, (x1, x2) => [x1.i, x2.i, x1 === x2]))```
    - ```seq [[0, 0, true], [1, 1, true], [2, 2, true], [3, 3, true]]```
##### [min](https://github.com/marcinnajder/powerseq/tree/master/src/operators/min.ts)
- ```min([1, 2, 3, 1])``` -> ```1```
- ```min(['a', 'bb', 'rrr', 'd'], x => x.length)``` -> ```1```
##### [minby](https://github.com/marcinnajder/powerseq/tree/master/src/operators/minby.ts)
- ```minby(['a', 'bb', 'rrr', 'd'], x => x.length)``` -> ```'a'```
##### [oftype](https://github.com/marcinnajder/powerseq/tree/master/src/operators/oftype.ts)
- ```oftype([new Number(1), new Number(2), 's', false], Number)``` -> ```seq [{  }, {  }]```
##### [orderby](https://github.com/marcinnajder/powerseq/tree/master/src/operators/orderby.ts)
- ```orderby([1, 4, 2, 3, 5, 1], x => x)``` -> ```seq [1, 1, 2, 3, 4, 5]```
- ```orderby(['abc', 'dd', 'sdfe', 'f'], x => x.length)``` -> ```seq ['f', 'dd', 'abc', 'sdfe']```
##### [orderbydescending](https://github.com/marcinnajder/powerseq/tree/master/src/operators/orderbydescending.ts)
- ```orderbydescending([1, 4, 2, 3, 5, 1], x => x)``` -> ```seq [5, 4, 3, 2, 1, 1]```
- ```orderbydescending(['abc', 'dd', 'sdfe', 'f'], x => x.length)``` -> ```seq ['sdfe', 'abc', 'dd', 'f']```
##### [pairwise](https://github.com/marcinnajder/powerseq/tree/master/src/operators/pairwise.ts)
- ```pairwise([1, 2, 3, 4])``` -> ```seq [[1, 2], [2, 3], [3, 4]]```
##### [partitionby](https://github.com/marcinnajder/powerseq/tree/master/src/operators/partitionby.ts)
- ```partitionby([1, 2, 4, 6, 3, 4], n => n % 2 === 0)``` -> ```seq [[1], [2, 4, 6], [3], [4]]```
##### [reduce](https://github.com/marcinnajder/powerseq/tree/master/src/operators/reduce.ts)
- ```reduce([1, 2, 3], (a, x) => a + x)``` -> ```6```
- ```reduce([1, 2, 3], (a, x) => a + (x * 10), '')``` -> ```'102030'```
##### [repeat](https://github.com/marcinnajder/powerseq/tree/master/src/operators/repeat.ts)
- ```repeat([1, 2, 3], 2)``` -> ```seq [1, 2, 3, 1, 2, 3]```
- ```take(repeat([1, 2, 3]), 5)``` -> ```seq [1, 2, 3, 1, 2]```
##### [reverse](https://github.com/marcinnajder/powerseq/tree/master/src/operators/reverse.ts)
- ```reverse([1, 2, 3])``` -> ```seq [3, 2, 1]```
##### [scan](https://github.com/marcinnajder/powerseq/tree/master/src/operators/scan.ts)
- ```scan([1, 2, 3], (a, x) => a + x)``` -> ```seq [3, 6]```
- ```scan([1, 2, 3], (a, x) => a + (x * 10), '')``` -> ```seq ['', '10', '1020', '102030']```
##### [sequenceequal](https://github.com/marcinnajder/powerseq/tree/master/src/operators/sequenceequal.ts)
- ```sequenceequal([1, 2, 3], [1, 2, 3])``` -> ```true```
- ```sequenceequal([1, 2, 3], [1, 2, 2])``` -> ```false```
- ```sequenceequal([1, 2, 3], [1, 2])``` -> ```false```
##### [share](https://github.com/marcinnajder/powerseq/tree/master/src/operators/share.ts)
- ```pipe(range(0, 4), map(i => ({ i })), share(), xs => zip(xs, xs, (x1, x2) => [x1.i, x2.i, x1 === x2]))```
    - ```seq [[0, 1, false], [2, 3, false]]```
##### [single](https://github.com/marcinnajder/powerseq/tree/master/src/operators/single.ts)
- ```single([1])``` -> ```1```
- ```single([1, 2, 3], x => x > 2)``` -> ```3```
- ```single([1, 2, 3], x => x > 10)``` -> ```undefined```
- ```single([1, 2, 3], x => x > 10, -1)``` -> ```-1```
##### [skip](https://github.com/marcinnajder/powerseq/tree/master/src/operators/skip.ts)
- ```skip([1, 2, 3, 4, 5], 2)``` -> ```seq [3, 4, 5]```
##### [skiplast](https://github.com/marcinnajder/powerseq/tree/master/src/operators/skiplast.ts)
- ```skiplast([1, 2, 3, 4], 2)``` -> ```seq [1, 2]```
- ```skiplast([1, 2, 3, 4], 0)``` -> ```seq [1, 2, 3, 4]```
- ```skiplast([1, 2, 3, 4], 5)``` -> ```seq []```
##### [skipwhile](https://github.com/marcinnajder/powerseq/tree/master/src/operators/skipwhile.ts)
- ```skipwhile([1, 2, 2, 3, 3, 4, 5], x => x < 3)``` -> ```seq [3, 3, 4, 5]```
##### [some](https://github.com/marcinnajder/powerseq/tree/master/src/operators/some.ts)
- ```some([1])``` -> ```true```
- ```some([])``` -> ```false```
- ```some([1, 2, 3], x => x > 2)``` -> ```true```
- ```some([1, 2, 3], x => x > 3)``` -> ```false```
##### [sum](https://github.com/marcinnajder/powerseq/tree/master/src/operators/sum.ts)
- ```sum([1, 2, 3])``` -> ```6```
- ```sum(['a', 'asd', 'yy'], x => x.length)``` -> ```6```
##### [take](https://github.com/marcinnajder/powerseq/tree/master/src/operators/take.ts)
- ```take([1, 2, 3, 4, 5], 2)``` -> ```seq [1, 2]```
##### [takelast](https://github.com/marcinnajder/powerseq/tree/master/src/operators/takelast.ts)
- ```takelast([1, 2, 3], 2)``` -> ```seq [2, 3]```
- ```takelast([1, 2, 3], 0)``` -> ```seq []```
- ```takelast([1, 2, 3], 5)``` -> ```seq [1, 2, 3]```
##### [takewhile](https://github.com/marcinnajder/powerseq/tree/master/src/operators/takewhile.ts)
- ```takewhile([1, 2, 2, 3, 3, 4, 5], x => x < 3)``` -> ```seq [1, 2, 2]```
##### [thenby](https://github.com/marcinnajder/powerseq/tree/master/src/operators/thenby.ts)
- ```thenby(orderby(['xa', 'a', 'fg', 'ert', 'b'], x => x.length), x => x)``` -> ```seq ['a', 'b', 'fg', 'xa', 'ert']```
##### [thenbydescending](https://github.com/marcinnajder/powerseq/tree/master/src/operators/thenbydescending.ts)
- ```thenbydescending(orderby(['xa', 'a', 'fg', 'ert', 'b'], x => x.length), x => x)```
    - ```seq ['b', 'a', 'xa', 'fg', 'ert']```
##### [toarray](https://github.com/marcinnajder/powerseq/tree/master/src/operators/toarray.ts)
- ```toarray([1, 2, 2])``` -> ```[1, 2, 2]```
##### [tomap](https://github.com/marcinnajder/powerseq/tree/master/src/operators/tomap.ts)
- ```tomap(['a', 'bb', 'ccc'], x => x.length)``` -> ```Map {1 => 'a', 2 => 'bb', 3 => 'ccc'}```
- ```tomap(['a', 'bb', 'ccc'], x => x.length, x => x.toUpperCase())``` -> ```Map {1 => 'A', 2 => 'BB', 3 => 'CCC'}```
##### [toobject](https://github.com/marcinnajder/powerseq/tree/master/src/operators/toobject.ts)
- ```toobject(['a', 'bb', 'ccc'], x => x.length)``` -> ```{ 1:'a', 2:'bb', 3:'ccc' }```
- ```toobject(['a', 'bb', 'ccc'], x => x.length, x => x.toUpperCase())``` -> ```{ 1:'A', 2:'BB', 3:'CCC' }```
- ```toobject(['a', 'bb', 'ccc'], x => x.length, (x, k) => k)``` -> ```{ 1:1, 2:2, 3:3 }```
- ```toobject(new Map([[1, 'one'], [2, 'two']]))``` -> ```{ 1:'one', 2:'two' }```
##### [toobjectgrouping](https://github.com/marcinnajder/powerseq/tree/master/src/operators/toobjectgrouping.ts)
- ```toobjectgrouping(['a', 'bb', 'ccc', 'e', 'ff'], x => x.length)``` -> ```{ 1:['a', 'e'], 2:['bb', 'ff'], 3:['ccc'] }```
- ```toobjectgrouping(['a', 'bb', 'ccc', 'e', 'ff'], x => x.length, xs => xs.join(','))```
    - ```{ 1:'a,e', 2:'bb,ff', 3:'ccc' }```
- ```toobjectgrouping(['a', 'bb', 'ccc', 'e', 'ff'], x => x.length, xs => xs.length)```
    - ```{ 1:2, 2:2, 3:1 }```
- ```toobjectgrouping(['a', 'bb', 'ccc', 'e', 'ff'], x => x.length, (xs, key) => xs.map(_ => key))```
    - ```{ 1:[1, 1], 2:[2, 2], 3:[3] }```
##### [union](https://github.com/marcinnajder/powerseq/tree/master/src/operators/union.ts)
- ```union([1, 2, 2], [2, 3, 3, 4])``` -> ```seq [1, 2, 3, 4]```
##### [unionby](https://github.com/marcinnajder/powerseq/tree/master/src/operators/unionby.ts)
- ```unionby(['a', 'c', 'ddd'], ['r', 'ww', 'ttt', 'oooo'], x => x.length)``` -> ```seq ['a', 'ddd', 'ww', 'oooo']```
##### [zip](https://github.com/marcinnajder/powerseq/tree/master/src/operators/zip.ts)
- ```zip(['a', 'b', 'c'], [1, 2], (s, n) => s + n)``` -> ```seq ['a1', 'b2']```
- ```zip(['a', 'b', 'c'], [1, 2], [false], (s, n, b) => s + n + b)``` -> ```seq ['a1false']```


### mapping

- **average** - Average (linq), mean, meanBy (lodash), average, averageBy (fsharp), average (kotlin), C.averaging*, C.summarizing* (java)
- **buffer** - Chunk (linq), bufferCount, pairwise (rxjs), chunk (lodash), chunkBySize, windowed, pairwise (fsharp), partition-all, partition~ (clojure), chunked, windowed (kotlin)
- **cast** - Cast (linq), cast (fsharp)
- **combinations** - 
- **concat** - Concat (linq), concat (rxjs), concat (jsarray), concat (lodash), append (fsharp), concat (clojure), plus, plusElement (kotlin), concat (java)
- **count** - Count (linq), count (rxjs), size (lodash), length (fsharp), count (clojure), count (kotlin), count, C.counting, C.summarizing* (java)
- **countby** - countBy (fsharp)
- **defaultifempty** - DefaultIfEmpty (linq), defaultIfEmpty (rxjs), ifEmpty (kotlin)
- **defer** - defer (rxjs), delay (fsharp)
- **distinct** - Distinct (linq), distinct (rxjs), uniq, uniqWith (lodash), distinct (fsharp), distinct (clojure), distinct (kotlin), distinct (java)
- **distinctby** - DistinctBy (linq), uniqBy (lodash), distinctBy (fsharp), distinctBy (kotlin)
- **distinctuntilchanged** - distinctUntilChanged, distinctUntilKeyChanged (rxjs), dedupe (clojure)
- **doo** - do (rxjs), onEach (kotlin), peek (java)
- **elementat** - ElementAt, ElementAtOrDefault (linq), elementAt (rxjs), nth (lodash), nth (fsharp), nth, get~ (clojure), elementAt, elementAtOrElse, elementAtOrNull (kotlin)
- **empty** - empty (rxjs), empty (fsharp), emptySequence (kotlin), empty (java)
- **entries** - pairs (rxjs), entries (jsarray)
- **every** - All (linq), every (rxjs), every (jsarray), every (lodash), forall (fsharp), every? (clojure), all (kotlin), allMatch (java)
- **except** - Except (linq), difference, without (lodash), difference~ (clojure), minus~ (kotlin)
- **exceptby** - ExceptBy (linq), differenceBy, differenceWith (lodash)
- **expand** - expand (rxjs), unfold (fsharp)
- **filter** - Where (linq), filter (rxjs), filter (jsarray), filter (lodash), filter, where (fsharp), filter (clojure), filter, filterIndexed (kotlin), filter (java)
- **filtermap** - choose (fsharp), keep (clojure), mapNotNull, mapIndexedNotNull (kotlin)
- **find** - First, FirstOrDefault (linq), find, first (rxjs), find (jsarray), first, head, find (lodash), find~, tryFind, head (fsharp), first~ (clojure), find, first~ (kotlin), findFirst~ (java)
- **findindex** - findIndex (rxjs), findIndex (jsarray), findIndex (lodash), findIndex~, tryFindIndex (fsharp), indexOfFirst, indexOf~ (kotlin)
- **flat** - flat~ (jsarray), flatten (lodash), flatten~ (clojure), flatten (kotlin)
- **flatmap** - SelectMany (linq), flatMap (jsarray), flatMap (lodash), collect (fsharp), mapcat (clojure), flatMap (kotlin), flatMap, mapMulti (java)
- **foreach** - forEach (jsarray), each, forEach (lodash), iter, iteri (fsharp), forEach, forEachIndexed (kotlin), forEach (java)
- **generate** - init, initInfinite (fsharp), iterate, repeatedly (clojure), generate (kotlin), iterate (java)
- **groupby** - GroupBy (linq), groupBy (rxjs), groupBy (lodash), groupBy (fsharp), group-by (clojure), groupBy, groupingBy (kotlin), C.groupingBy (java)
- **groupjoin** - GroupJoin (linq)
- **ignoreelements** - ignoreElements (rxjs)
- **includes** - Contains (linq), includes (jsarray), includes (lodash), contains (fsharp), contains? (clojure), contains (kotlin)
- **interleave** - interleave (clojure)
- **interpose** - interpose (clojure)
- **intersect** - Intersect (linq), intersection (lodash), intersection~ (clojure), intersect~ (kotlin)
- **intersectby** - IntersectBy (linq), intersectionBy, intersectionWith (lodash)
- **isempty** - isEmpty (rxjs), isEmpty (fsharp), empty? (clojure), none (kotlin)
- **join** - Join (linq)
- **last** - Last, LastOrDefault (linq), last (rxjs), findLast (lodash), last (fsharp), findLast, last~ (kotlin)
- **map** - Select (linq), map (rxjs), map (jsarray), map (lodash), map, mapi (fsharp), map (clojure), map, mapIndexed (kotlin), map (java)
- **max** - Max (linq), max (rxjs), max (lodash), max (fsharp), maxOf (kotlin), max (java)
- **maxby** - MaxBy (linq), maxBy (lodash), maxBy (fsharp), max-key (clojure), maxBy (kotlin), C.maxBy, C.summarizing* (java)
- **memoize** - cache (fsharp)
- **min** - Min (linq), min (rxjs), min (lodash), min (fsharp), minOf (kotlin), min (java)
- **minby** - MinBy (linq), minBy (lodash), minBy (fsharp), min-key (clojure), minBy (kotlin), C.minBy, C.summarizing* (java)
- **oftype** - OfType (linq)
- **orderby** - OrderBy (linq), sort (jsarray), orderBy, sortBy (lodash), sort, sortBy (fsharp), sort, sort-by (clojure), sorted, sortedBy (kotlin), sorted (java)
- **orderbydescending** - OrderByDescending (linq), sort (jsarray), orderBy, sortBy (lodash), sort, sortBy (fsharp), sortedDescending, sortedByDescending (kotlin)
- **pairwise** - pairwise (rxjs), pairwise (fsharp)
- **partitionby** - partition-by (clojure)
- **range** - Range (linq), range (rxjs), range (lodash), range (clojure)
- **reduce** - Aggregate (linq), reduce (rxjs), reduce (jsarray), reduce (lodash), fold, reduce (fsharp), reduce (clojure), fold, reduce, reduceOrNull (kotlin), reduce (java)
- **repeat** - repeat (rxjs), cycle (clojure)
- **repeatvalue** - repeat (clojure)
- **reverse** - Reverse (linq), reverse (jsarray), reverse (lodash), reverse (clojure)
- **scan** - scan (rxjs), scan (fsharp), reductions (clojure), scan, runningFold, runningReduce (kotlin)
- **sequenceequal** - SequenceEqual (linq), sequenceEqual (rxjs)
- **share** - share (rxjs)
- **single** - Single, SingleOrDefault (linq), single (rxjs), exactlyOne (fsharp), single, singleOrNull (kotlin)
- **skip** - Skip (linq), skip (rxjs), drop, tail (lodash), skip~ (fsharp), drop (clojure), drop (kotlin), skip (java)
- **skiplast** - dropRight, initial (lodash), drop-last (clojure)
- **skipwhile** - SkipWhile (linq), skipWhile (rxjs), dropWhile (lodash), skipWhile (fsharp), drop-while (clojure), dropWhile (kotlin), dropwhile (java)
- **some** - Any (linq), some (jsarray), some (lodash), exists (fsharp), some (clojure), any (kotlin), anyMatch (java)
- **sum** - Sum (linq), sum, sumBy (lodash), sum, sumBy (fsharp), sum, sumOf (kotlin), C.summing*, C.summarizing* (java)
- **take** - Take (linq), take (rxjs), take (lodash), truncate, ~take (fsharp), take (clojure), take (kotlin), limit (java)
- **takelast** - takeLast (rxjs), last, takeRight (lodash), take-last (clojure)
- **takewhile** - TakeWhile (linq), takeWhile (rxjs), takeWhile (lodash), takeWhile (fsharp), take-while (clojure), takeWhile (kotlin), takeWhile (java)
- **thenby** - ThenBy (linq), sort (jsarray), orderBy, sortBy (lodash), sort, sortBy (fsharp)
- **thenbydescending** - ThenByDescending (linq), sort (jsarray), orderBy, sortBy (lodash), sort, sortBy (fsharp)
- **throww** - throw (rxjs)
- **toarray** - ToArray (linq), toArray (fsharp), toList (kotlin), toArray, toList, C.toList (java)
- **tomap** - ToDictionary (linq), toMap (kotlin), C.toMap (java)
- **toobject** - fromPairs, keyBy (lodash), associate, associateBy, associateWith (kotlin), C.toMap (java)
- **toobjectgrouping** - 
- **union** - Union (linq), union (lodash), union~ (clojure), union~ (kotlin)
- **unionby** - UnionBy (linq), unionBy, unionWith (lodash)
- **zip** - Zip (linq), zip (rxjs), zip, zipWith (lodash), zip, zip3 (fsharp), map (clojure), zip (kotlin)


