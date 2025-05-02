
function delayFn(time) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, time);
    })
}

async function delayedGreet(name) {
    await delayFn(2000)
    console.log(name)
}

delayedGreet("Kaushik");

async function division(num1, num2) {
    try {
        if(num2 == 0) throw new Error('can not divide by 0');
        return num1/num2;
    } catch (error) {
        console.error('error', error);
        return null;
    }
}

async function mainF() {
    console.log(await division(10, 2));
    console.log(await division(10, 0));
}

mainF();