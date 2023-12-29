import * as assert from "assert";
import { oftype } from "../../src/index";

class Animal {
    type = "animal";
}
class Dog extends Animal {
    type = "dog";
}

it('oftype', function () {
    var animals: any[] = [new Animal(), new Animal(), new Dog()];
    assert.deepEqual([...oftype<Animal>(animals, Animal)].length, 3);
    assert.deepEqual([...oftype<Animal>(animals, Animal)].length, 3);
    assert.deepEqual([...oftype<Dog>(animals, Dog)].length, 1);
    assert.deepEqual([...oftype<String>(animals, String)].length, 0);
    assert.deepEqual([...oftype<Animal>(Animal)(animals)].length, 3);
});

export const linq = "OfType";

export const samples = [
    () => oftype<number>([new Number(1), new Number(2), 's', false], Number),
];