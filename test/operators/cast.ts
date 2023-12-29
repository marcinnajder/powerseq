import * as assert from "assert";
import { cast } from "../../src/index";

class Animal {
    type = "animal";
}
class Dog extends Animal {
    type = "dog";
}

it('cast', function () {
    var animals: any[] = [new Animal(), new Animal(), new Dog()];
    assert.deepEqual([...cast<Animal>(animals, Animal)].length, 3);
    assert.deepEqual([...cast<Animal>(animals, Animal)].length, 3);
    assert.throws(() => {
        var r = [...cast<Dog>(animals, Dog)];
    }, "An element in the sequence cannot be cast to type TResult.")

    assert.deepEqual([...cast<Animal>(Animal)(animals)].length, 3);

});

export const samples = [
    () => cast<number>([new Number(1), new Number(2), 's', false], Number),
];

export const linq = "Cast";
export const fsharp = "cast";