class Person {
  constructor(name, age) {
    this.name = name
    this.age = age
  }

  introduce() {
    console.log(`Hello... my name's ${this.name} and i'm ${this.age} years old`)
  }
}

const person1 = new Person(`Mike`, 30)
person1.introduce()


class Animal {
  constructor(name) {
    this.name = name
  }

  makeSound() {
    console.log(`${this.name} makes a sound`)
  }
}

const animal = new Animal('Dog')
animal.makeSound()