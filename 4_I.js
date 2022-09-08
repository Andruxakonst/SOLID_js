// Inteface segregation principle

//Классы, не использующие методы наследуемого класса не должны зависеть от этих методов

// class Animal{
//     constructor(name){
//         this.name = name;
//     }

//     walk(){
//         console.log(`${this.name} умеет ходить.`)
//     }

//     swim(){
//         console.log(`${this.name} умеет плавать.`)
//     }

//     fly(){
//         console.log(`${this.name} умеет летать.`)
//     }
// }

// class Dog extends Animal{
//     fly(){
//         return null; //Собаки плавать не умеют
//     }
// }
// class Eagle extends Animal{
//     swim(){
//         return null; //Орлы не плавают
//     }
// }
// class Whale extends Animal{
//     walk(){
//         return null; //Киты не ходят
//     }

//     fly(){
//         return null; //Киты не летают
//     }
// }

// const dog = new Dog('Рэкс')
// dog.walk();
// dog.swim();
// dog.fly(); //вернет null т.к. собаки не летают

// const eagle = new Eagle('Opeл')
// eagle.walk();
// eagle.swim(); //вернет null т.к. орлы не плавают
// eagle.fly();

// const whale = new Whale('Синий')
// whale.walk();//вернет null т.к. киты не ходят
// whale.swim(); 
// whale.fly();//вернет null т.к. киты не летают

//! Функционал не корректный т.к. базовый клас слишком обобщен и приходится переопределять методы
//* Необходимо изменить код на следующий

class Animal {
    constructor(name){
        this.name = name;
    }
}

//Создадим объекты добавляющие поведения

const walker = {
    walk(){
        console.log(`${this.name} умеет ходить.`)
    }
}

const swimer = {
    swim(){
        console.log(`${this.name} умеет плавать.`)
    }
}
const flyer = {
    fly(){
        console.log(`${this.name} умеет летать.`)
    }
}


//Создаем классы объектов наших зверушек

class Dog extends Animal{}
class Eagle extends Animal{}
class Whale extends Animal{}

//При помощи метода assign содиняем наших зверей с их поведениями (наделяем возможностями)
Object.assign(Dog.prototype, walker, swimer);
Object.assign(Eagle.prototype, walker, flyer);
Object.assign(Whale.prototype, swimer);

const dog = new Dog('Рэкс')
dog.walk();
dog.swim();
//dog.fly();      //Получим ошибку dog.fly() is not a function т.к. такого поведения мы не добавляли

const eagle = new Eagle('Opeл')
eagle.walk();
//eagle.swim();   //Получим ошибку dog.fly() is not a function т.к. такого поведения мы не добавляли
eagle.fly();

const whale = new Whale('Синий')
//whale.walk();   //Получим ошибку dog.fly() is not a function т.к. такого поведения мы не добавляли
whale.swim(); 
//whale.fly();    //Получим ошибку dog.fly() is not a function т.к. такого поведения мы не добавляли

console.log('eagle',eagle.prototype)
console.log('whale',whale.prototype)