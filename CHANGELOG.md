<a name="2.0.3"></a>

# [2.0.3](https://github.com/marcinnajder/powerseq/releases/tag/2.0.3) (2024-09-28)

- type guards support for following operators: filter, takewhile, every, find, last, single

<a name="2.0.2"></a>

# [2.0.2](https://github.com/marcinnajder/powerseq/releases/tag/2.0.2) (2024-03-23)

- fix link to [Programming with sequences](https://marcinnajder.github.io/2022/11/02/programming-with-sequences-part-1-introduction-to-powerseq.html)

<a name="2.0.1"></a>

# [2.0.1](https://github.com/marcinnajder/powerseq/releases/tag/2.0.1) (2024-03-23)

- link to [Programming with sequences](https://marcinnajder.github.io/2022/11/02/programming-with-sequences-part-1-introduction-to-powerseq.html) series added to the documentation

<a name="2.0.0"></a>

# [2.0.0](https://github.com/marcinnajder/powerseq/releases/tag/2.0.0) (2024-01-23)

- upgrade dependencies, upgrade TypeScript from 3.x to 5.x
- TypeScript strict option
- remove many different bundles for source code, now only es2017 version with CommonJS module system
- breaking changes (BC)
- BC remove Enumerable type and 'of' and 'from' functions
- BC: groupby returns Map instead of custom type IterableGroup, no overload for 'resultSelector' function (use map operator)
- BC: changing 'distinct', introducing 'distinctby' (caution: previously distinct with lambda worked like today's 'distinctby' !)
- BC: adding 'defaultValue' parameter to 'last' operator
- BC: remove previous inconsistency, 'single' does not throw exception now, returns 'undefined'
- BC: new 'unionby', 'intersectby', 'exceptby' operators extracted from changed 'union', 'intersect', 'except'
- BC: 'scan' returns init value of acculumator
- BC: 'groupjoin' returns empty arrays for unmachted items
- BC: additional generic type argument to 'toobject' function
- BC: remove 'asiterable'
- new overload for toobject() passing Iterable<[K,E]> type (for example Map), usefull after groupby and countby
- new operators: countby, memoize, share, pairwise, partitionby, combinations, filtermap, interleave, interpose, flat, unionby, intersectby, exceptby, distinctby, groupbytoobject, groupbytotransformedobject
- add 'index' to lambda argument functions to operators: min, minby, max, maxby, sum, average
- shorter generic argument names like K, V, ... instead of TKey, TValue, ..., introduction of Func<T,R>
- new more generic type definition of pipe function, type 'Interable<T>' is no required now

<a name="1.0.4"></a>

# [1.0.4](https://github.com/marcinnajder/powerseq/releases/tag/1.0.4) (2018-11-01)

- revert PR with entries operator typings

<a name="1.0.3"></a>

# [1.0.3](https://github.com/marcinnajder/powerseq/releases/tag/1.0.3) (2018-11-01)

- bug fix with non-iterable `arguments` const in IE (11)
- correct typings of entries operator (PR)

<a name="1.0.2"></a>

# [1.0.2](https://github.com/marcinnajder/powerseq/releases/tag/1.0.2) (2018-09-27)

- publish correct README.md version to npm

<a name="1.0.1"></a>

# [1.0.1](https://github.com/marcinnajder/powerseq/releases/tag/1.0.1) (2018-09-27)

- introducing pipeable operators (api breaking changes)

<a name="0.0.10"></a>

# [0.0.10](https://github.com/marcinnajder/powerseq/releases/tag/0.0.10) (2017-05-10)

- esm as a default distribution format (tree shaking finally works)

<a name="0.0.9"></a>

# [0.0.9](https://github.com/marcinnajder/powerseq/releases/tag/0.0.9) (2017-05-09)

- upgrade to TS 2.3.0 (babel is not no longer required)
- distribution of ESM (support for webpack2)

<a name="0.0.8"></a>

# [0.0.8](https://github.com/marcinnajder/powerseq/releases/tag/0.0.8) (2017-01-13)

- new operators: generate, isempty, throww, expand, repeat, skiplast
- add documentation showing mapping between powerseq operators and LINQ, RxJS, JS Array, lodash, F# operators
- bug fixes

<a name="0.0.7"></a>

# [0.0.7](https://github.com/marcinnajder/powerseq/releases/tag/0.0.7) (2017-01-01)

- new operators: asiterable, scan, foreach, distinctuntilchanged, doo, ignoreelements, takelast, defer, buffer
- documentation inside operators tooltips
- type inference improvements
- truly lazy execution (like LINQ or F# seq module, each new iteration starts from the beginning)
- bug fixes (no duplicates returned by intersect operator)

<a name="0.0.6"></a>

# [0.0.6](https://github.com/marcinnajder/powerseq/releases/tag/0.0.6) (2016-12-21)

- new operators: orderby, orderbydescending, thenby, thenbydescending operators
- remove sort operator

<a name="0.0.5"></a>

# [0.0.5](https://github.com/marcinnajder/powerseq/releases/tag/0.0.5) (2016-12-20)

- full LINQ compiliant groupby operator implementation
- new operators: last, single, elementat, includes, minby, maxby, sum, average, sequenceequal, cast, oftype, defaultifempty, groupjoin

<a name="0.0.4"></a>

# [0.0.4](https://github.com/marcinnajder/powerseq/releases/tag/0.0.4) (2016-12-16)

- readme.md containing list of all operators

<a name="0.0.3"></a>

# [0.0.3](https://github.com/marcinnajder/powerseq/releases/tag/0.0.3) (2016-12-13)

- add client side support (ES5)

<a name="0.0.2"></a>

# [0.0.2](https://github.com/marcinnajder/powerseq/releases/tag/0.0.2) (2016-12-12)

- add readme.md

<a name="0.0.1"></a>

# [0.0.1](https://github.com/marcinnajder/powerseq/releases/tag/0.0.1) (2016-12-12)

- 6 enumerable methods (empty,entries,from,of,range,repeatvalue), 28 operators (concat,count,distinct,every,except,filter,find,findindex,flatmap,groupby,intersect,join,map,max,min,reduce,reverse,skip,skipwhile,some,s
  ort,take,takewhile,toarray,tomap,toobject,union,zip)
