// Liskov substraction principal

//Функции, которые используют базовай тип должны "уметь" с ним взаимодействовать 
//и взаимодействовать с подтимами данного типа не зная ничего проэто


//*Пример 1

class Person{
    
}

//Добаляем классы Member и Guest
class Member extends Person{
    access(){
        console.log('Доступ разрешен');
    }
}
class Guest extends Person{
    isGuest = true;
}

//изменим наследование. Сотрудников компании унаследуем от класса Member
class Frontend extends Member{
    canCreateHtml(){
    }
}
class Backend extends Member{
    canCreateNode(){
    }
}

//Для примера добавим новый класс. Сотрудник другой компании
//Такое действие нарушает данный принцип 
//Что бы исправить данное нарушение необходимо добавить еще 1 слой абстракции в 
//виде классов Guest - гость и Member - сотрудник, и унаследоваться от класса Person
//Внесем правки в классы

//Остальных person унаследуем от класса Guest
class PersonFronDifferentCompany extends Guest{
    access(){
        throw new Error('Доступ отсутствует. Вы не являетесь сотрудником данной компании')
    }
}


//Фукция принимает аргумент тпа person не зная что это такое и как это работает, 
//то зная что у этого есть метод access
function openSecretDocs(member){
    member.access()
}

openSecretDocs(new Frontend()) //Доступ разрешен
openSecretDocs(new Backend()) //Доступ разрешен
//openSecretDocs(new PersonFronDifferentCompany()) //Доступ закрыт



//*Пример 2

class Component {
    isComponent = true
}

class TamplateComponent extends Component {
    render(){
        return `
            <div>Component</div>
        `
    }
}

class HigherOrderComponent extends Component {

}

class HeaderComponent extends TamplateComponent{
    onInit(){}   
}

class FooterComponent extends TamplateComponent{
    afterInit(){}
}

//ХОК компонент не имеет метода ренде,
//а получает на вход компонент и возвращает модифицированный класс
class HOC extends HigherOrderComponent{
    render(){
        throw new Error('Тут не может быть метода render');
    }

    wrapComponent(component){
        component.wrapped = true;
        return component;
    }
}

function renderComponent(component){
    console.log(component.render());
}

renderComponent(new HeaderComponent());
renderComponent(new FooterComponent());
//renderComponent(new HOC()); //В этом месте необъодима другая логика работы