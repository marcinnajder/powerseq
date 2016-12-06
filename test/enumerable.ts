import * as assert from "assert";
import {Enumerable, map, flatmap, concat} from "../src/index";

describe('enumerable', function () {

    function* return123() : IterableIterator<number>{
        yield 1;
        yield 2;
        yield 3; 
    }


    describe('enumerable functions', function () {
        it('from', function() {
            var result = Enumerable.from([1,2,3]);
            assert.deepEqual(result.toarray(), [1,2,3]);
        });
        it('entries', function() {
            assert.deepEqual(Enumerable.entries<number>({"a":123,"b":123123}).map(([key,value]) => key+value).toarray(), ["a123","b123123"]);
        });
        it('empty', function() {
            var result = Enumerable.empty<number>();
            assert.deepEqual(result.toarray(), []);
        });
        it('of', function() {
            var result = Enumerable.of(1,2,3,4)
            assert.deepEqual(result.toarray(), [1,2,3,4]);
        });
        it('range', function() {
            assert.deepEqual(Enumerable.range(0,2).toarray(), [0,1]);
            assert.deepEqual(Enumerable.range(0,-2).toarray(), []);
        });
         it('range', function() {
            assert.deepEqual(Enumerable.repeatvalue("a").take(5).toarray(), ["a","a","a","a","a"]);
            assert.deepEqual(Enumerable.repeatvalue("a",0).toarray(), []);
            assert.deepEqual(Enumerable.repeatvalue("a",3).toarray(), ["a","a","a"]);
        });
    });


    describe('operators', function () {

        it('toarray', function() {
            assert.deepEqual(Enumerable.from([]).toarray(), []);
            assert.deepEqual(Enumerable.from([1,2,3]).toarray(), [1,2,3]);
            assert.deepEqual(Enumerable.from(return123()).toarray(), [1,2,3]);
        });
        it('tomap', function() {
            var m1 = Enumerable.from([1,1,2]).tomap(x=>x);
            assert.equal(m1.size,2);
            assert.strictEqual(m1.get(1),1);
            assert.strictEqual(m1.get(2),2);
            var m2 = Enumerable.from([1,1,2]).tomap(x=>x, x => x.toString());
            assert.equal(m2.size,2);
            assert.strictEqual(m2.get(1),"1");
            assert.strictEqual(m2.get(2),"2");
        });
        it('toobject', function() {
            var o1 = Enumerable.from([1,1,2]).toobject(x=>x);
            assert.equal(Object.keys(o1).length,2);
            assert.strictEqual(o1[1],1);
            assert.strictEqual(o1[2],2);
            var o2 = Enumerable.from([1,1,2]).toobject(x=>x, x => x.toString());
            assert.equal(Object.keys(o2).length,2);
            assert.strictEqual(o2[1],"1");
            assert.strictEqual(o2[2],"2");
        });
        it('map', function() {
            assert.deepEqual(Enumerable.from([1,2,3]).map(x => x+1).toarray(), [2,3,4]);
            assert.deepEqual(Enumerable.from([1,2,3]).map((x,index) => x+index).toarray(), [1,3,5]);
            assert.deepEqual(Array.from(map(return123(), x => x.toString())), ["1", "2", "3"] ); // as standalone operator
        });
        it('filter', function() {
            assert.deepEqual(Enumerable.from([1,2,3,4]).filter(x => x % 2 === 0).toarray(), [2,4]);
            assert.deepEqual(Enumerable.from([1,2,3,4]).filter((x,index) => index % 2 === 0).toarray(), [1,3]);
        });
        it('take', function() {
            assert.deepEqual(Enumerable.from([1,2,3,4]).take(0).toarray(), []);
            assert.deepEqual(Enumerable.from([1,2,3,4]).take(2).toarray(), [1,2]);
            assert.deepEqual(Enumerable.from([1,2,3,4]).take(10).toarray(), [1,2,3,4]);
        });
        it('skip', function() {
            assert.deepEqual(Enumerable.from([1,2,3,4]).skip(0).toarray(), [1,2,3,4]);
            assert.deepEqual(Enumerable.from([1,2,3,4]).skip(1).toarray(), [2,3,4]);
            assert.deepEqual(Enumerable.from([1,2,3,4]).skip(5).toarray(), []);
        });
        it('takewhile', function() {
            assert.deepEqual(Enumerable.from([1,2,3,4]).takewhile( x => true).toarray(), [1,2,3,4]);
            assert.deepEqual(Enumerable.from([1,2,3,4]).takewhile( x => false).toarray(), []);
            assert.deepEqual(Enumerable.from([1,2,3,4]).takewhile( x => x < 3).toarray(), [1,2]);
            assert.deepEqual(Enumerable.from([1,2,3,4]).takewhile( (x,index) => index < 3).toarray(), [1,2,3]);
        });
        it('skipwhile', function() {
            assert.deepEqual(Enumerable.from([1,2,3,4]).skipwhile( x => true).toarray(), []);
            assert.deepEqual(Enumerable.from([1,2,3,4]).skipwhile( x => false).toarray(), [1,2,3,4]);
            assert.deepEqual(Enumerable.from([1,2,3,4]).skipwhile( x => x < 3).toarray(), [3,4]);
            assert.deepEqual(Enumerable.from([1,2,3,4]).skipwhile( (x,index) => index < 3).toarray(), [4]);
        });
        it('flatmap', function() {
            var items = [
                { name:"a", items:[] },
                { name:"b", items:[1] },
                { name:"c", items:[1,2], },
            ]
            assert.deepEqual(Enumerable.from(items).flatmap( x => x.items).toarray(), [1,1,2]);
            assert.deepEqual(Enumerable.from(items).flatmap( (x,index) => [index].concat(x.items)).toarray(), [0, 1,1, 2,1,2]);
            assert.deepEqual(Enumerable.from(items).flatmap( x => x.items, (item, subitem) => item.name + subitem).toarray(), ["b1", "c1","c2"]);
        });
        it('groupby', function() {
            assert.deepEqual(Enumerable.from(["a","b","cc", "ddd"]).groupby(x => x.length).map( x => x.key+":"+Array.from(x).join(",")).toarray(), ["1:a,b","2:cc", "3:ddd"]);
            assert.deepEqual(Enumerable.from(["a","b","cc", "ddd"]).groupby(x => x.length, (key, items) => key+":"+Array.from(items).join(",")).toarray(), ["1:a,b","2:cc", "3:ddd"]);
        });
        it('zip', function() {
            assert.deepEqual(Enumerable.from(["a","b","c"]).zip([1,2,3,4,5], [false,true], (s,n,b) => s+n+b).toarray(), ["a1false","b2true"]);
        });
        it('sort', function() {
            assert.deepEqual(Enumerable.from(["b","c","a"]).sort(x => x).toarray(), ["a","b", "c"]);
            assert.deepEqual(Enumerable.from(["bbb","c","aa"]).sort(x => x.length).toarray(), ["c","aa", "bbb"]);
            var [d1,d2,d3] = [new  Date("2016-01-02"),new Date("2014-01-02"),new Date("2017-01-02")];
            assert.deepEqual( Enumerable.from([d1,d2,d3]).sort(x => x.getTime(), (a,b) => b - a).toarray(), [d3,d1,d2]); //comparer, descending
        });
        it('reverse', function() {
            assert.deepEqual(Enumerable.from(["b","c","a"]).reverse().toarray(), ["a","c", "b"]);
        });
        it('find', function() {
            assert.deepEqual(Enumerable.from([1,2]).find(), 1);
            assert.deepEqual(Enumerable.from([]).find(), undefined);
            assert.deepEqual(Enumerable.from([1,2,3,4]).find(x => x > 2), 3);
            assert.deepEqual(Enumerable.from([1,2,3,4]).find(x => x > 4), undefined);
        });
        it('findIndex', function() {
            assert.deepEqual(Enumerable.from([1,2]).findIndex(x=> x > 0), 0);
            assert.deepEqual(Enumerable.from([1,2]).findIndex(x=> x > 1), 1);
            assert.deepEqual(Enumerable.from([1,2]).findIndex(x=> x > 2), undefined);
        });
        it('every', function() {
            assert.deepEqual(Enumerable.from([1,2]).every(x => x > 0), true);
            assert.deepEqual(Enumerable.from([1,2]).every(x => x > 1), false);
        });
        it('some', function() {
            assert.deepEqual(Enumerable.from([1,2]).some(), true);
            assert.deepEqual(Enumerable.from([]).some(), false);
            assert.deepEqual(Enumerable.from([1,2]).some(x => x > 1), true);
            assert.deepEqual(Enumerable.from([1,2]).every(x => x > 2), false);
        });
        it('concat', function() {
            assert.deepEqual(Array.from(concat([1,2,3],[4,5],[6,7])), [1,2,3,4,5,6,7]);
            assert.deepEqual(Enumerable.from([1,2,3]).concat().toarray(), [1,2,3]);
            assert.deepEqual(Enumerable.from([1,2,3]).concat([4,5],[6,7]).toarray(), [1,2,3,4,5,6,7]);
        });

        it('reduce', function() {
            assert.deepEqual(Enumerable.from([1,2,3,4]).reduce((p,c) => p + c), 1+2+3+4);
            assert.throws(() => {
                var r = Enumerable.from([]).reduce( (p,c) => p + c);
            }, "'Sequence contains no elements' exception should be thrown");
            assert.deepEqual(Enumerable.from([1,2,3,4]).reduce((p,c) => ({text:p.text + c}), {text:"-"}), {text:"-1234"});
            assert.deepEqual(Enumerable.from([]).reduce((p,c) => { throw new Error(); }, {text:"-"}), {text:"-"});
        });
        it('count', function() {
            assert.deepEqual(Enumerable.from([]).count(), 0);
            assert.deepEqual(Enumerable.from([1,2,3]).count(), 3);
            assert.deepEqual(Enumerable.from([1,2,3]).count(x => x>1), 2);
        });
        it('max', function() {
            assert.deepEqual(Enumerable.from([]).max(), undefined);
            assert.deepEqual(Enumerable.from([1]).max(), 1);
            assert.deepEqual(Enumerable.from([1,2,3,1,2,3]).max(), 3);
            assert.deepEqual(Enumerable.from([1,2,3,1,2,3]).max( x => -x), 1);
        });
        it('min', function() {
            assert.deepEqual(Enumerable.from([]).min(), undefined);
            assert.deepEqual(Enumerable.from([1]).min(), 1);
            assert.deepEqual(Enumerable.from([1,2,3,1,2,3]).min(), 1);
            assert.deepEqual(Enumerable.from([1,2,3,1,2,3]).min( x => -x), 3);
        });

        it('distinct', function() {
            assert.deepEqual(Enumerable.from([1,2,3,4,2,4]).distinct().toarray(), [1,2,3,4]);
            assert.deepEqual(Enumerable.from([1,2,3,4,2,4]).distinct(x => x % 3).toarray(), [1,2,3]);
        });
        it('union', function() {
            assert.deepEqual(Enumerable.from([1,2,3,4,2,4]).union([4,5,6]).toarray(), [1,2,3,4,5,6]);
            assert.deepEqual(Enumerable.from([4,1,1,2,4]).union([1,2,3,4,5,6], x => x % 3).toarray(), [4,2,3]);
        });
        it('intersect', function() {
            assert.deepEqual(Enumerable.from([1,2,3,4,2,4]).intersect([4,5,6,1]).toarray(), [4,1]);
            assert.deepEqual(Enumerable.from([1,2,3,4,2,4]).intersect([4,6], x => x % 3).toarray(), [4,6]); 
        });
        it('except', function() {
            assert.deepEqual(Enumerable.from([1,2,3,4,2,4]).except([4,5,6,1]).toarray(), [2,3]);
            assert.deepEqual(Enumerable.from([1,2,3,4,2,4]).except([4,6], x => x % 3).toarray(), [2]);
        });
        it('join', function() {
            var items1 = [{id:1, name:"one"},{id:2, name:"two"},{id:3, name:"three_"},{id:3, name:"three__"}];
            var items2 = [{id:1,value:"ONE"},{id:3, value:"THREE"},{id:4, value:"FOUR"}];
            var res = Enumerable.from(items1).join(items2, x => x.id, y => y.id, (x,y) => ({name:x.name, value:y.value })).toarray();
            assert.deepEqual(res,[ { name: 'one', value: 'ONE' },{ name: 'three_', value: 'THREE' }, { name: 'three__', value: 'THREE' } ])
        });

        // it('LINQ', function() {
        //     var aa = Enumerable
        //         .range(1,Number.MAX_VALUE)
        //         .filter( x => x % 2 === 0)
        //         .take(5)
        //         .reverse()
        //         .toarray();

        //     console.log(aa);
        // });

    });
});






// function assertInteration<T1,T2>(actual:Iterable<T1>, expected:Iterable<T2>){
//     var e1 = actual[Symbol.iterator]();
//     var e2 = expected[Symbol.iterator]();
//     while(e1.next)
//     assert.deepEqual
// }
