
function delayFn(time) {
    return new Promise((resolve) => setTimeout(resolve, time))
}

console.log('Promise lecture starts');
delayFn(2000).then(() => console.log('after 2 seconds promise resolved'));
console.log('end');

function divideFn(num1, num2) {
    return new Promise((resolve, reject) => {
        if(num2 == 0){
            reject('cannot perform division by 0');
        } else {
            resolve(num1/num2);
        }
    })
}

divideFn(10, 0)
    .then((result) => console.log(result))
    .catch(error => console.log("err", error));