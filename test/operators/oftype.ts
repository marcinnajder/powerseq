import * as assert from "assert";
import { Enumerable, oftype } from "../../src/index";

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
});

export const linq = "OfType";