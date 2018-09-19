import * as assert from "assert";
import { Enumerable, oftype } from "../../src/enumerable";

class Animal {
    type = "animal";
}
class Dog extends Animal {
    type = "dog";
}

it('oftype', function () {
    var animals: any[] = [new Animal(), new Animal(), new Dog()];
    assert.deepEqual(Array.from(oftype<Animal>(animals, Animal)).length, 3);
    assert.deepEqual(Enumerable.from(animals).oftype<Animal>(Animal).toarray().length, 3);
    assert.deepEqual(Enumerable.from(animals).oftype<Dog>(Dog).toarray().length, 1);
    assert.deepEqual(Enumerable.from(animals).oftype<String>(String).toarray().length, 0);

    assert.deepEqual([...oftype<Animal>(Animal)(animals)].length, 3);
});

export const linq = "OfType";

export const samples = [
    () => oftype<number>([new Number(1), new Number(2), 's', false], Number),
];