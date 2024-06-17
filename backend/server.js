const app = require("./app");

const dotenv = require("dotenv");
const connectDatabase = require("./config/database");
const cloudinary = require("cloudinary")

// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`)
    process.exit(1)
})

// Config
dotenv.config({ path: "config/config.env" })

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

// Connecting to database
connectDatabase();

const server = app.listen(process.env.PORT, () => {

    console.log(`Server is working on http://localhost:${process.env.PORT}`)
})


// Unhandled Promise Rejection
process.on("unhandledRejection", err => {
    console.log(`Error:${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);

    server.close(() => {
        process.exit(1);
    })
});





//1
// let a=[];
// let b=[];
// console.log(a==b); //false
// console.log(a===b); //false
// it compare memory locaiton

//2
// let a = [];
// let b = a;
// console.log(a==b); //true;
// console.log(a===b); //true;

//3
// let a = [20];
// let b = [20];
// console.log(a[0]==b[0]) //true
// console.log(a[0]===b[0]) //true

//4
// let a = [20];
// let b = ["20"];
// console.log(a[0]==b[0]) //true
// console.log(a[0]===b[0]) //false 

//5
// let z= [1,2,3,4];
// let a = {name: 'anil'};
// console.log(...z) //1,2,3,4

//6
// console.log(typeof NaN) //number

//7
// let data = 10 - -10;
// console.log(data) //20

//8
//Set remove duplicate element.
// const set = new Set([1,1,2,2,3,4]);
// console.log(set) //{1,2,3,4};

//9
// let data = {name: "Anil"};
// console.log(delete data); //false : we cannot delete object
// console.log(delete data.name); //true; : we can delete property

//10
// const data = ["Peter", "anil", "sam"];
// const [y,z] = data;
// console.log(y,z) //Peter : It take first element

//11
// const data = ["Peter", "anil", "sam"];
// const [,y] = data;
// console.log(y) //anil

//12
// how to get name property without . operator
// const data = {name: "anil", age:29, skill:"JS"};
// const {name, age, skill} = data;
// console.log(name, age, skill)

//13 : Merge 2 objects
// let data = { name: "anil", age: 29, skill: "JS" };
// let info = { city: "Noida", mail: "ajay@test.com" };
// data = { ...data, ...info }
// console.log(data);
 /*{
  name: 'anil',
  age: 29,
  skill: 'JS',
  city: 'Noida',
  mail: 'ajay@test.com'
}*/

//14
// let data = { name: "anil", age: 29, skill: "JS" };
// let info = { city: "Noida", mail: "ajay@test.com" };
// data = { ...data, ...info }
// console.log(data);

//15
// let data = { name: "anil", age: 29, skill: "JS" };
// let info = { city: "Noida", skill: "Node" };
// data = {...data, ...info};
// console.log(data); // { name: 'anil', age: 29, skill: 'Node', city: 'Noida' }

//16
// const name = "anil";
// console.log(name()) // Error: name is not a function

//17
// const result = false || {} || null;
// console.log(result) //{} || operator check first positive value

//18
// const result = null || false || "";
// console.log(result) // : It take last value when all values are false.

//19
// const result = Promise.resolve(5);
// console.log(result) // 5

//20
// const result = [] || 0 || true;
// console.log(result); // []

//21
// JSON.parse();
// What this method will do:
// JSON.parse() to convert text into a JavaScript object

//22
// let name = "Sidhu";
// function getName(){
//     console.log(name);
//     let name = "Ajay"
// };
// getName() //Error: Cannot access 'name' before initialization


//23
// function sumValues (x,y,z){
//     return x + y + z;
// };
// console.log(sumValues())
//A : sumValues([...1,2,3])
//B : sumValues([...[1,2,3]])
//C : sumValues(...[1,2,3])
//D : sumValues([1,2,3])

//24
// const name = "code step by step";
// console.log(!typeof name === "object" ); //false : two operation perfoming {!, ===}
// console.log(!typeof name === 'string'); //false
// console.log(!typeof name === false); //true

//25
// const name = "Subscribe";
// const age = 21;
// console.log(isNaN(name)); //true
// console.log(isNaN(age)); //false

//26
// let person = {name: "Ajay"};
// //what can modify person object
// Object.seal(person); // after seal you cannot modify object but modify existing property
// person.lastname = "Navgire"
// console.log(person);

//27
// let data = [1,2,4,5];
// //remove first element;
// data.shift();
// data.pop();
// console.log(data)

//28
// Check any value is odd or even
// let a = 21;
// console.log(a%2);

//29
// let data = {name: "Anil"};
// delete data.name;
// console.log(data) //{}

//30
// convert data to boolean false value
// let data = "true";
// console.log( !data) // false : any value put "!" then it become boolean data type

//31
// convert data to boolean true value
// let data = "true";
// console.log( !!data);

//32 
// difference between map and forEach function
// map function return something but forEach not

//33
// let data = ["anil", "peter", "bruce"];
// delete data[1];
// console.log(data) // [ 'anil', <1 empty item>, 'bruce' ]
// console.log(data.length) // 3

//34
// merge two array
// let a = [1,2,3];
// let b = [4,5,6];
// let c = [...a, ...b];
// console.log(c) //[ 1, 2, 3, 4, 5, 6 ]

//35
// let a = [1,2,3,4];
// let b = [4,5,6];
// let c = [...a, ...b];
// console.log(c) // [ 1, 2, 3, 4, 4, 5, 6]

//36
// let c = 3 ** 3;
// console.log(c)//27

//37
// let a = 2;
// setTimeout(()=>{
//     console.log(a) // 100
// },0);
// a =100;

//38
// let a = 1;
// let c = 2;
// console.log(--c === a) // true

//39
// let a = 1;
// let b = 1;
// let c = 2;
// console.log(a === b === --c) // false

//40
// console.log(3**3)

//41
// console.log(a);
// var a; //undefined;

//42
// console.log(a) // a is not defined

//41
// console.log([[[[]]]])  //[[[[]]]];

//42
// how to find os name
// navigator.platform

//43
// function fruit(){
//     console.log(name);
//     console.log(price);

//     var name = "apple";
//     let price = 20;
// };
// fruit() // undefined, Error: Cannot access 'price' before initialization

//44
// for(var i=0; i<3; i++){
//     setTimeout(()=> console.log(i),1) // 3 3 3
// }

//44
// for(let i=0; i<3; i++){
//     setTimeout(()=> console.log(i),1) // 0 1 2
// } 

//45
// console.log(+true) // 1
// console.log(typeof +true) //number

//46
// console.log(!"Ajay"); //false;
// console.log(typeof ("Ajay")) // String

//47
// let data = 'size';
// const bird = {
//     size : "small"
// };

// console.log(bird[data]); // small  size
// console.log(bird['size']); // small 
// console.log(bird.size); // small
// console.log(bird.data); // undefined

//48
// let c = { name: 'peter'};
// let d;

// d = c;
// c.name = "anil";
// console.log(d.name) //anil

//49
// function fruit (){
//     console.log("Woof!")
// };

// fruit.name = "Apple";
// fruit() // Woof

//50
// function sum(a,b){
//     return a + b;
// };
// console.log(sum(1,"2")) //12

//51
// let number = 0;
// console.log(number++);//0
// console.log(++number);//2
// console.log(number); //2

//52
// function getAge(...args){
//     console.log(typeof args)
// };

// getAge(21)// object

//53
// function getAge(){
//     'use strict';
//     age = 21;
//     console.log(age)
// };
// getAge() // Uncaught Error: age is not defined

//54
// const sum = eval("10*10+5");
// console.log(sum); //105

//55
// const obj = { 1:"a", 2:"b",3:"c"};
// console.log(obj.hasOwnProperty("1")); //true
// console.log(obj.hasOwnProperty(1)) // true

//56
// const obj  = { a: "one", b:"two", a: "repeat"};
// console.log(obj) //{ a: 'repeat', b: 'two' }

//57
// for(let i=1; i<5; i++){
//     if(i===3) continue;
//     console.log(i) // 1 2 4
// }

//58
// const foo = () => console.log("First");
// const bar = () => setTimeout(()=> console.log('Second'));
// const baz = () => console.log("Third");

// bar();
// foo();
// baz();
// First Third Second

//59
// const person = { name: "Anil"};

// function sayHi (age){
//     return `${this.name} is ${age}`
// }

// console.log(sayHi.call(person, 21)) // Anil is 21
// console.log(sayHi.bind(person, 21)) // [Function: bound sayHi]
// console.log(sayHi.bind(person, 21)()) //Anil is 21


//60
// function sayHi(){
//     return (()=> 0)()
// }

// console.log(typeof sayHi()) //number

//61
// function sayHi(){
//     return ()=> 0
// };
// console.log(typeof sayHi()) // function

//62
// console.log(typeof typeof 1) // string

//63
// const number = [1,2,3];
// number [6] = 11;
// console.log(number) //[ 1, 2, 3, <3 empty items>, 11 ]

//64 
// const number = [1,2,3];
// number[5] = number;
// console.log(number); // [ 1, 2, 3, <2 empty items>, [infinite times number array] ]

//65
//Everything in Javascript is either a ...
// A : primitive or object // right answer
// B : function or object
// C : trick question! only objects
// D : number or object

//66
// console.log(!!null); //false
// console.log(!!""); //false
// console.log(!!1); //true

//67
// console.log(setInterval(()=> console.log("Hi")),5000);
// console.log(setInterval(()=> console.log("Hi")),5000);
// console.log(setInterval(()=> console.log("Hi")),5000);

// it print initially unique id to stop it's function.

//68
// console.log([..."anil"]) //[ 'a', 'n', 'i', 'l' ]

//69
// const firstPromise = new Promise((res, rej)=>{
//     setTimeout(res, 500, "one");
// });

// const secondPromise = new Promise((res, rej)=>{
//     setTimeout(res, 100, "two");
// });

// Promise.race([firstPromise, secondPromise])
// .then(res => console.log(res))                       // two

//70
// let person = { name: "peter"};
// const members = [person];
// person = null;
// console.log(members);  //[ { name: 'peter' } ]

//71 
// const person = {
//     name: "peter",
//     age : 21
// };

// for(const item in person){
//     console.log(item)            //name age
//     console.log(person[item])    //peter 21
// }

//72
// let data = 1 + 2 + "3";
// console.log(data) //33
// console.log(typeof data) // string

//73
// console.log(typeof 3 + 4 + "5") // number45

//74
// console.log(typeof ( 3 + 4 + "5" )) //string

//74
// console.log([]==[]) //false: compare memory location

//75
// let data = [1,2,3].map(num=> {
//     if(typeof num === 'number') return;
//     return num * 2;
// });

// console.log(data)  // [ undefined, undefined, undefined ] 
//                    // if you cannot return anything if by default return undefined

//76
// function getInfo(member){
//     member.name = 'Anil'
// };

// const person = { name: 'Sarah'};

// getInfo(person);

// console.log(person); //{name: 'Anil'} //passby reference

//77
// function Car(){
//     this.make = 'Tata';
//     return { make: 'Kia'}
// };

// const myCar = new Car();
// console.log(myCar.make);  // Kia

//78
// (()=>{
//     let x =  (y = 10);
// })();

// console.log(typeof x) // undefined : Have block scope

//79
// (()=>{
//     let x = y = 10;
// })();

// console.log(typeof y); // number : y become global varible without decleared keyword

//80
// (()=>{
//     let x = 10
// })();

// (()=>{
//     let x = 10
// })();

// console.log(typeof x); // undifined : let have block scope

//81
// (()=>{
//     let x = y =  10
// })();

// (()=>{
//     let x = y = 20
// })();

// console.log(typeof y); // number

//82
// let x =100;
// (()=>{
//     var x = 200
// })();

// console.log(x) // 100

//83
// console.log(- true)       //-1
// console.log(!true - true) //-1

//84
// console.log(true + + "10")  //11

//Lecture 2 : Array Traversing and Accessing 
