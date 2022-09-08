//Dependency inversion principle

//Верхних уровень модулей не должен зависеть от абстракций нижнего уровня
//Изменение управлением зависимостей

class Fetch{
    request (url){
        //return fetch(url).then(r=>this.json())
        return Promise.resolve('Данные из запроса')
    }
}

//Предположим поступила задача хранить данные в LocalStorage
//Тогда создаем новый класс

class LocalStorage{
    get(){
        const dataFromLocalStorage = 'Данные из локального хранилища';
        return dataFromLocalStorage;
    }
}

//создаем новые классы для внедрения нового уровня абстракций
class FetchClient{
    constructor(){
        this.fetch = new Fetch();
    }

    clientGet(){
        return this.fetch.request('vk.com') 
    }
}

class LocalStorageClient{
    constructor(){
        this.localStorage = new LocalStorage()
    }

    clientGet(key){
        return this.localStorage.get(key)
    }
}

// Перепишем наш класс DataBase
// class Database {
//     constructor(){
//         //this.fetch = new Fetch()
//         //*вносим изсенения в конструктов в связи с новой задачей
//         this.localStorage = new LocalStorage()
//     }
//     getData(){
//         //return this.fetch.request('vk.com')
//         //*вносим изсенения в конструктов в связи с новой задачей
//         return this.localStorage.get('key');
//     }
// }

class DataBase{
    constructor(client){
        this.client = client;
    }

    getData(key){
        return this.client.clientGet(key);
    }
}

//перепишем истанс database
//const db = new Database();
//console.log(db.getData())
const db = new DataBase(new FetchClient());
console.log(db.getData('Test key'))

//Нам понадобилось поработать с localStorage
const dbLS = new DataBase(new LocalStorageClient());
console.log(dbLS.getData('Test key'))
