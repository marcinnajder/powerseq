import * as assert from "assert";
import { Enumerable, cast } from "../../src/index";

class Animal {
    type = "animal";
}
class Dog extends Animal {
    type = "dog";
}

it('cast', function () {
    var animals: any[] = [new Animal(), new Animal(), new Dog()];
    assert.deepEqual(Array.from(cast<Animal>(animals, Animal)).length, 3);
    assert.deepEqual(Enumerable.from(animals).cast<Animal>(Animal).toarray().length, 3);
    assert.throws(() => {
        var r = Enumerable.from(animals).cast<Dog>(Dog).toarray();
    }, "An element in the sequence cannot be cast to type TResult.")
});


export const samples = [
    () => cast<number>([new Number(1), new Number(2), 's', false], Number),
];

export const linq = "Cast";
export const fsharp = "cast";