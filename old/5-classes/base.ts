interface IPoint {
    x: number;

    onInit(): void;

    sum(): number;
}

class BasePoint implements IPoint {

    #e: number = 10;

    public constructor(
        public readonly x: number,
        protected readonly y: number,
        private readonly z: number,
    ) {
    }

    public onInit(): void {
        console.log(this.#e, this.z);
    }

    public sum(): number {
        return this.x + this.y;
    }
}

let p = new BasePoint(1, 2, 3);

class Point extends BasePoint {
    constructor(x: number, y: number, z: number) {
        super(x, y, z);
    }

    public onInit(): void {
        // some custom logic;
        super.onInit();
    }
}


// ===============================================

class Animal {
    private type: string;
    private name: string;
    private age!: number;
    private yearBirh: number;


    constructor(type: string, name: string, yearBirh: number) {
        this.type = type;
        this.name = name;
        this.yearBirh = yearBirh;
    }

    public nameGetter() {
        console.log(this.name);
        return;
    }

    public get getAnimalInfo() {
        return `
            type: ${this.type},
            name: ${this.name}
        `
    }

    public get getAge() {
        return this.calcAge(this.yearBirh);
    }

    private calcAge(birth: number) {
        this.age = new Date().getFullYear() - birth;
        return this.age;
    }
}

const rabbit = new Animal('rabbit', 'Banny', 1995);

console.log(rabbit.nameGetter());
console.log(rabbit.getAnimalInfo);
console.log(rabbit.getAge);
