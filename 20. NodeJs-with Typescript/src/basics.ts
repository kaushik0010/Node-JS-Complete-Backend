console.log('Hello Node js from TypeScript');

// basic types
let isDone : boolean = false;

let num : number = 100;

let str : string = 'Kaushik';

let list : number[] = [1,2,3];
let products : Array<string> = ['Laptop', 'Mobile', 'Desktop'];

let randomVal : any = 4;

let xyz : undefined = undefined;
let abc : null = null;

enum Color {
    Red, Green, Blue
};

let d : Color = Color.Blue


// tuples
let tuple : [string, number] = ["abc", 34];


// interface
interface User {
    name: string;
    id: number;
    email?: string  //optional
    readonly createdAt: Date
}

const user : User = {
    name: 'Kaushik',
    id: 1,
    createdAt: new Date(),
    email: 'xyz@mail.com'
}


type Product = {
    title: string,
    price: number
};

const product1 : Product = {
    title: 'Product 1',
    price: 50
};


// functions with type annotations
function add(a: number, b: number): number {
    return a+b;
}

// arrow functions
const multiply = (num1: number, num2: number): number => {
    return num1*num2;
};

function greet(name: string, greeting?: string): string {
    return `${name} ${greeting}`
};
console.log(greet('Kaushik', 'hello'));
