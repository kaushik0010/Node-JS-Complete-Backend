
const buffer1 = Buffer.alloc(10);
console.log(buffer1);

const bufString = Buffer.from("Hello");
console.log(bufString);

const bufFromArray = Buffer.from([1,2,3,4,5]);
console.log(bufFromArray);

buffer1.write('Node js');
console.log('After writing to buf1:', buffer1.toString());

console.log(bufString[0]);

console.log(bufString.slice(0, 3));

const concatBuff = Buffer.concat([buffer1, bufString]);
console.log(concatBuff);

console.log(concatBuff.toJSON());