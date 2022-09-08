//Open Close Principle

//Какие-то классы объекта должны быть открыты для расшитения но закрыты для модификации


//Предположим что заказчик после того как мы написали код, попросит добавить еще одну фигуру.
//Тогда нам потребудется как новый класс этой фигуры, так и добавление функционала в класс калькулятора

class Shape{
    area(){
        throw new Error('area метод не имплементирован!')
    }
}

//Для этого реализуем новый класс Shape - фигура и унаследуем все фигуры от него

class Scuare extends Shape { // Наследуемся от Shape
    constructor(size){
        super() //подтягиваем родительский конструктор
        //type теперь не нужен
        //this.type = 'scuare';
        this.size = size;
    }

    area(){ //реализуем метод area для подсчета площади квадрата
        return this.size **2
    }
}

class Circle extends Shape { // Наследуемся от Shape
    constructor(radius){
        super()//подтягиваем родительский конструктор
        //type теперь не нужен
        //this.type = 'circle';
        this.radius = radius;
    }

    area(){ //реализуем метод area для подсчета площади круга
        return (this.radius ** 2) * Math.PI;
    }
}


//Добавляем класс для новой фигуры которую нас попросили добавить
class Rect extends Shape {
    constructor(width, heigth){
        super()
        this.width = width
        this.heigth = heigth;
    }

    area(){
        return this.width * this.heigth;
    }
}

//класс для работы с площадью объектов
class AreaCalc{
    constructor(shapes = []){
        this.shapes = shapes;
    }

    summ(){
        return this.shapes.reduce((aсc, shape)=>{
            //Теперь перепишим логику подсчета суммы
            // if(shape.type === 'circle'){
            //     aсc += (shape.radius ** 2) * Math.PI;
            // }
            // if(shape.type === 'scuare'){
            //     aсc += shape.size ** 2;
            // }
            aсc += shape.area();
            return aсc
        },0)
    }
}

fig1 = new Scuare(10);
fig2 = new Circle(1);
fig3 = new Circle(5);

//Добавим инстенс для квадрата

fig4 = new Rect(10,20);

const calc = new AreaCalc([
    fig1,
    fig2,
    fig3,
    fig4
]);

console.log(calc.summ());