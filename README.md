
    
```javascript
import {Enumerable} from "powerseq";

var q = Enumerable
    .range(1,Number.MAX_VALUE)
    .filter( x => x % 2 === 0)
    .take(5)
    .reverse();

console.log(q.toarray());
```

enumerable
<table><tr><td><span><a class="tooltip" href="https://github.com/marcinnajder/powerseq/tree/master/test/enumerable/defer.ts" >defer</a> </span></td><td><span><a class="tooltip" href="https://github.com/marcinnajder/powerseq/tree/master/test/enumerable/repeatvalue.ts" >repeatvalue</a> </span></td></tr><tr><td><span><a class="tooltip" href="https://github.com/marcinnajder/powerseq/tree/master/test/enumerable/empty.ts" >empty</a> </span></td></tr><tr><td><span><a class="tooltip" href="https://github.com/marcinnajder/powerseq/tree/master/test/enumerable/entries.ts" >entries</a> </span></td></tr><tr><td><span><a class="tooltip" href="https://github.com/marcinnajder/powerseq/tree/master/test/enumerable/from.ts" >from</a> </span></td></tr><tr><td><span><a class="tooltip" href="https://github.com/marcinnajder/powerseq/tree/master/test/enumerable/of.ts" >of</a> </span></td></tr><tr><td><span><a class="tooltip" href="https://github.com/marcinnajder/powerseq/tree/master/test/enumerable/range.ts" >range</a> (Range)</span></td></tr></table>

operators
<table><tr><td><span><a class="tooltip" href="https://github.com/marcinnajder/powerseq/tree/master/test/operators/asiterable.ts" >asiterable</a> </span></td><td><span><a class="tooltip" href="https://github.com/marcinnajder/powerseq/tree/master/test/operators/filter.ts" title=" filter([1, 2, 2, 3, 4], x => x > 2) -> [3,4]&#013; filter([1, 2, 2, 3, 4], (x, index) => x - 1 === index) -> [1,2]">filter</a> (Where)</span></td><td><span><a class="tooltip" href="https://github.com/marcinnajder/powerseq/tree/master/test/operators/max.ts" >max</a> (Max)</span></td><td><span><a class="tooltip" href="https://github.com/marcinnajder/powerseq/tree/master/test/operators/skipwhile.ts" >skipwhile</a> (SkipWhile)</span></td></tr><tr><td><span><a class="tooltip" href="https://github.com/marcinnajder/powerseq/tree/master/test/operators/average.ts" title=" average([1, 2, 3, 4]) -> 2.5&#013; average(['a', 'aa', 'aaa'], s => s.length) -> 2">average</a> (Average)</span></td><td><span><a class="tooltip" href="https://github.com/marcinnajder/powerseq/tree/master/test/operators/find.ts" >find</a> (First)</span></td><td><span><a class="tooltip" href="https://github.com/marcinnajder/powerseq/tree/master/test/operators/maxby.ts" >maxby</a> </span></td><td><span><a class="tooltip" href="https://github.com/marcinnajder/powerseq/tree/master/test/operators/some.ts" >some</a> (Any)</span></td></tr><tr><td><span><a class="tooltip" href="https://github.com/marcinnajder/powerseq/tree/master/test/operators/buffer.ts" >buffer</a> </span></td><td><span><a class="tooltip" href="https://github.com/marcinnajder/powerseq/tree/master/test/operators/findindex.ts" >findindex</a> </span></td><td><span><a class="tooltip" href="https://github.com/marcinnajder/powerseq/tree/master/test/operators/min.ts" >min</a> (Min)</span></td><td><span><a class="tooltip" href="https://github.com/marcinnajder/powerseq/tree/master/test/operators/sum.ts" >sum</a> (Sum)</span></td></tr><tr><td><span><a class="tooltip" href="https://github.com/marcinnajder/powerseq/tree/master/test/operators/cast.ts" >cast</a> (Cast)</span></td><td><span><a class="tooltip" href="https://github.com/marcinnajder/powerseq/tree/master/test/operators/flatmap.ts" >flatmap</a> (SelectMany)</span></td><td><span><a class="tooltip" href="https://github.com/marcinnajder/powerseq/tree/master/test/operators/minby.ts" >minby</a> </span></td><td><span><a class="tooltip" href="https://github.com/marcinnajder/powerseq/tree/master/test/operators/take.ts" >take</a> (Take)</span></td></tr><tr><td><span><a class="tooltip" href="https://github.com/marcinnajder/powerseq/tree/master/test/operators/concat.ts" title=" concat([1, 2], [3, 5], [6]) -> [1,2,3,5,6]">concat</a> (Concat)</span></td><td><span><a class="tooltip" href="https://github.com/marcinnajder/powerseq/tree/master/test/operators/foreach.ts" >foreach</a> </span></td><td><span><a class="tooltip" href="https://github.com/marcinnajder/powerseq/tree/master/test/operators/oftype.ts" >oftype</a> (OfType)</span></td><td><span><a class="tooltip" href="https://github.com/marcinnajder/powerseq/tree/master/test/operators/takelast.ts" >takelast</a> </span></td></tr><tr><td><span><a class="tooltip" href="https://github.com/marcinnajder/powerseq/tree/master/test/operators/count.ts" title=" count([2, 2, 2]) -> 3&#013; count([2, 4, 6], x => x > 2) -> 2">count</a> (Count)</span></td><td><span><a class="tooltip" href="https://github.com/marcinnajder/powerseq/tree/master/test/operators/groupby.ts" >groupby</a> (GroupBy)</span></td><td><span><a class="tooltip" href="https://github.com/marcinnajder/powerseq/tree/master/test/operators/orderby.ts" >orderby</a> (OrderBy)</span></td><td><span><a class="tooltip" href="https://github.com/marcinnajder/powerseq/tree/master/test/operators/takewhile.ts" >takewhile</a> (TakeWhile)</span></td></tr><tr><td><span><a class="tooltip" href="https://github.com/marcinnajder/powerseq/tree/master/test/operators/defaultifempty.ts" title=" defaultifempty([1, 2, 3]) -> [1,2,3]&#013; defaultifempty([]) -> [undefined]&#013; defaultifempty([], 10) -> [10]">defaultifempty</a> (DefaultIfEmpty)</span></td><td><span><a class="tooltip" href="https://github.com/marcinnajder/powerseq/tree/master/test/operators/groupjoin.ts" >groupjoin</a> (GroupJoin)</span></td><td><span><a class="tooltip" href="https://github.com/marcinnajder/powerseq/tree/master/test/operators/orderbydescending.ts" >orderbydescending</a> (OrderByDescending)</span></td><td><span><a class="tooltip" href="https://github.com/marcinnajder/powerseq/tree/master/test/operators/thenby.ts" >thenby</a> (ThenBy)</span></td></tr><tr><td><span><a class="tooltip" href="https://github.com/marcinnajder/powerseq/tree/master/test/operators/distinct.ts" title=" distinct([1, 2, 1, 3, 2]) -> [1,2,3]&#013; distinct(['a', 'aa', 'ab', 'abc'], x => x.length) -> ['a','aa','abc']">distinct</a> (Distinct)</span></td><td><span><a class="tooltip" href="https://github.com/marcinnajder/powerseq/tree/master/test/operators/ignoreelements.ts" >ignoreelements</a> </span></td><td><span><a class="tooltip" href="https://github.com/marcinnajder/powerseq/tree/master/test/operators/reduce.ts" >reduce</a> (Aggregate)</span></td><td><span><a class="tooltip" href="https://github.com/marcinnajder/powerseq/tree/master/test/operators/thenbydescending.ts" >thenbydescending</a> (ThenByDescending)</span></td></tr><tr><td><span><a class="tooltip" href="https://github.com/marcinnajder/powerseq/tree/master/test/operators/distinctuntilchanged.ts" title=" distinctuntilchanged([1, 1, 2, 2, 2, 1, 3, 3]) -> [1,2,1,3]">distinctuntilchanged</a> </span></td><td><span><a class="tooltip" href="https://github.com/marcinnajder/powerseq/tree/master/test/operators/includes.ts" >includes</a> (Contains)</span></td><td><span><a class="tooltip" href="https://github.com/marcinnajder/powerseq/tree/master/test/operators/reverse.ts" >reverse</a> (Reverse)</span></td><td><span><a class="tooltip" href="https://github.com/marcinnajder/powerseq/tree/master/test/operators/toarray.ts" >toarray</a> (ToArray)</span></td></tr><tr><td><span><a class="tooltip" href="https://github.com/marcinnajder/powerseq/tree/master/test/operators/doo.ts" >doo</a> </span></td><td><span><a class="tooltip" href="https://github.com/marcinnajder/powerseq/tree/master/test/operators/intersect.ts" >intersect</a> (Intersect)</span></td><td><span><a class="tooltip" href="https://github.com/marcinnajder/powerseq/tree/master/test/operators/scan.ts" >scan</a> </span></td><td><span><a class="tooltip" href="https://github.com/marcinnajder/powerseq/tree/master/test/operators/tomap.ts" >tomap</a> </span></td></tr><tr><td><span><a class="tooltip" href="https://github.com/marcinnajder/powerseq/tree/master/test/operators/elementat.ts" title=" elementat([1, 2, 12, 15], 2) -> 12&#013; elementat([1, 2, 12, 15], 20) -> undefined">elementat</a> (ElementAt)</span></td><td><span><a class="tooltip" href="https://github.com/marcinnajder/powerseq/tree/master/test/operators/join.ts" >join</a> (Join)</span></td><td><span><a class="tooltip" href="https://github.com/marcinnajder/powerseq/tree/master/test/operators/sequenceequal.ts" >sequenceequal</a> (SequenceEqual)</span></td><td><span><a class="tooltip" href="https://github.com/marcinnajder/powerseq/tree/master/test/operators/toobject.ts" >toobject</a> </span></td></tr><tr><td><span><a class="tooltip" href="https://github.com/marcinnajder/powerseq/tree/master/test/operators/every.ts" title=" every([1, 2, 12, 15], x => x > 0) -> true&#013; every([1, 2, 12, 15], x => x < 10) -> false">every</a> (All)</span></td><td><span><a class="tooltip" href="https://github.com/marcinnajder/powerseq/tree/master/test/operators/last.ts" >last</a> (Last)</span></td><td><span><a class="tooltip" href="https://github.com/marcinnajder/powerseq/tree/master/test/operators/single.ts" >single</a> (Single)</span></td><td><span><a class="tooltip" href="https://github.com/marcinnajder/powerseq/tree/master/test/operators/union.ts" >union</a> (Union)</span></td></tr><tr><td><span><a class="tooltip" href="https://github.com/marcinnajder/powerseq/tree/master/test/operators/except.ts" title=" except([1, 2, 2, 3, 4], [2, 3]) -> [1,4]&#013; except(['a', 'b', 'ba', 'xde'], ['poc'], x => x.length) -> ['a','ba']">except</a> (except)</span></td><td><span><a class="tooltip" href="https://github.com/marcinnajder/powerseq/tree/master/test/operators/map.ts" >map</a> (Select)</span></td><td><span><a class="tooltip" href="https://github.com/marcinnajder/powerseq/tree/master/test/operators/skip.ts" >skip</a> (Skip)</span></td><td><span><a class="tooltip" href="https://github.com/marcinnajder/powerseq/tree/master/test/operators/zip.ts" >zip</a> (Zip)</span></td></tr></table>
