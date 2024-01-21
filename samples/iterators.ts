// //iterators_forof();
// //iterators_cutomiterator();
// //iterators_generators();
// //iterators_generatorsEcho();
// //asyncWithCallbacks();
// //asyncWithPromises();
// //asyncWithIterators();
// asyncWithAsyncAwait();



// function iterators_definition(){}

// function iterators_forof(){
//     console.log(iterators_forof.name);

//     var interable : Iterable<number> = [1,2,3];

//     for(var item of interable){
//         console.log(item);
//     }

//     var iter = interable[Symbol.iterator]();
//     var iterRes : IteratorResult<number>;
//     while(!(iterRes = iter.next()).done){
//         var item = iterRes.value;

//         console.log(item);
//     } 
// }

// function iterators_cutomiterator(){
//     console.log(iterators_cutomiterator.name);

//     var return123Iterable : Iterable<number> = {
//         [Symbol.iterator](){
//             var i = 1;
//             return {
//                 next(value){
//                     return {done:i>3, value:i++};
//                 },
//             }
//         }
//     }

//     for(var item of return123Iterable){
//         console.log(item);
//     }
// }

// function iterators_es6(){
//     ///node_modules/typescript/lib/lib.es2015.iterable.d.ts
// }


// function iterators_generators(){
//     console.log(iterators_generators.name);

//     function* return123(){
//         for(var i=1; i<=3; ++i){
//             yield i;
//         }
//     }

//     var return123Iterable : Iterable<number> = return123();
//     for(var item of return123Iterable){
//         console.log(item);
//     }

//     function* return123123(){
//         yield* return123();
//         yield* return123();
//     }
// }

// function iterators_generatorsInEs5(){
//     console.log(iterators_generatorsInEs5.name);
//     //https://babeljs.io/repl/#?babili=false&evaluate=true&lineWrap=false&presets=es2015%2Creact%2Cstage-2&code=%20%20%20function*%20return123()%7B%0A%20%20%20%20%20%20%20%20for(var%20i%3D1%3B%20i%3C%3D3%3B%20%2B%2Bi)%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20yield%20i%3B%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%7D

// /*
// function return123$(_context) {
//         while (1) {
//             switch (_context.prev = _context.next) {
//                 case 0:
//                     i = 1;

//                 case 1:
//                     if (!(i <= 3)) {
//                         _context.next = 7;
//                         break;
//                     }

//                     _context.next = 4;
//                     return i;

//                 case 4:
//                     ++i;
//                     _context.next = 1;
//                     break;

//                 case 7:
//                 case "end":
//                     return _context.stop();
//             }
//         }
//     }
// */
// }

// function getData<T>(value:T):Promise<T>;
// function getData<T>(value:T, cb: (err, data:T) => void);    
// function getData<T>(value:T, cb?: (err, data:T) => void):Promise<T>{
//     if(arguments.length==2){
//         setTimeout(function() {
//             cb(null, value);
//         }, 1000);
//     }
//     else{
//         return new Promise<T>( (res,rej) =>{
//             setTimeout(function() {
//                 res(value);
//             }, 1000);
//         });
//     }
// }

// function asyncWithCallbacks(){
//     console.log(asyncWithCallbacks.name);

//     function asyncWork(cb: (err,data?) => void){
//         getData(1, (err, data) => {
//             if(err){
//                 cb(err);
//             }
//             else{
//                 console.log(data);

//                 getData(2, (err, data) =>{
//                     if(err)return cb(err);
//                     console.log(data); 
                    
//                     getData(3, (err, data) =>{
//                         if(err)return cb(err);
//                         console.log(data); 
//                         cb(null,data);
//                     });
//                 });
//             }
//         });
//     }

//     asyncWork((err,data) => console.log(" ->",data));
// }


// function asyncWithPromises(){
//     console.log(asyncWithPromises.name);

//     function asyncWork() : Promise<number>{
//         return getData(1)
//             .then(data => {
//                 console.log(data);
//                 return getData(2);
//             })
//             .then(data => {
//                 console.log(data);
//                 return getData(3);
//             })
//             .then(data => {
//                 console.log(data);
//                 return data;
//             });
//     }

//     asyncWork().then(data => console.log(" ->",data));
// }



// function iterators_generatorsEcho(){
//     console.log(iterators_generatorsEcho.name);
    
//     function* return123(){
//         for(var i=1; i<=3; ++i){
//             var value = yield i;
//             console.log(`yield ${i} -> ${value}`);
//         }
//     }

//     var iter = return123()[Symbol.iterator]();
//     var iterRes : IteratorResult<number>;
//     var value : number = undefined;

//     while(!(iterRes = iter.next(value)).done){
//         value = iterRes.value;
//     } 
// }


// function asyncWithIterators(){
//     console.log(asyncWithIterators.name);

//     function* asyncWork() : Iterable<Promise<any>>{
//         var p : Promise<number> = getData(1); 
//         var data : number = yield p;

//         console.log(data);
//         data = yield getData(2);
//         console.log(data);
//         data = yield getData(3);
//         console.log(data);
//     }

//     spawn(asyncWork());
// }

// function spawn(iterable:Iterable<Promise<any>>){
//     var iter = iterable[Symbol.iterator]();
//     var iterRes : IteratorResult<Promise<any>>;
//     var value:any;

//     function moveNext(err?, value?){
//         if(err){
//             iterRes = iter.throw(value);
//         }else{
//             iterRes = iter.next(value);
//         }

//         if(!iterRes.done){
//             iterRes.value.then(
//                 value => {
//                     moveNext(null, value);
//                 },
//                 err => {
//                     moveNext(err);
//                 });
//         }
//     }

//     moveNext();
// }


// function asyncWithAsyncAwait(){
//     console.log(asyncWithAsyncAwait.name);

//     async function asyncWork() : Promise<number>{
//         var p : Promise<number> = getData(1); 
//         var data : number = await p;

//         console.log(data);
//         data = await getData(2);
//         console.log(data);
//         data = await getData(3);
//         console.log(data);
//         return 3;
//     }

//     asyncWork().then(data => console.log(" ->",data));
// }

