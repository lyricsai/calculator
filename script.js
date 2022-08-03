const palindrome = (string) => {
    let str = string
        .replace(/[\s.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")
        .toLowerCase()
        .split("")
        .reverse()
        .join("");

    return (
        str ===
        string.replace(/[\s.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").toLowerCase()
    );
};

// add, subtract, get the sum, multiply, get the power, and find the factorial
const output = document.querySelector("#output");

const negative = document.querySelector("#negative");
const equal = document.querySelector("#equal");
const clear = document.querySelector("#clear");

const buttons__func = [...document.querySelectorAll("#buttons__func button")];
const buttons__numbers = [...document.querySelectorAll("#buttons__numbers button")];

let result = 0;

const calculator = ({action, first__number, second__number}) => {
    first__number = +first__number;
    second__number = +second__number;
    let res = actions[action](first__number, second__number);
    if(res === +(res).toFixed(2)) {return res;}
    return +res.toFixed(2);
};

const minus = (first__number, second__number) => first__number - second__number;

const subtract = (first__number, second__number) => first__number / second__number;

const plus = (first__number, second__number) => first__number + second__number;

const multiply = (first__number, second__number) => first__number * second__number;

const power = (first__number, second__number) => first__number ** second__number;

const factorial = (first__number) => {
    let val = 1;

    for(let i = 2; i <= first__number; i++)
        val *= i;

    return val;
};

const toggleNegative = (num) => num * (-1);

const state = {
    action: null,
    first__number: '',
    second__number: '',
    result: null
};

const reset = () => {
    output.value = "";
    state.first__number = "";
    state.second__number = "";
    state.action = "";
    state.result = "";
};

const actions = {
    "+": plus,
    "-": minus,
    "*": multiply,
    "/": subtract,
    "**": power,
    "!": factorial,
};

buttons__func.forEach(e => {
    e.addEventListener('click', () => {

        if(!state.first__number) {return;}

        if(state.first__number && state.second__number && state.action) {
            state.first__number = calculator(state);
            output.value = e.innerText;
            state.action = e.innerText;
            state.second__number = '';
            state.result = '';
        }

        state.action = e.innerText;
        output.value = e.innerText;
    });
});

buttons__numbers.forEach(e => {

    e.addEventListener('click', () => {

        console.log(output.value == 0);
        if(output.value == 0) {output.value = '';}

        if(state.result) {
            output.value = '';
            state.result = '';
        };

        if(!state.action) {
            state.first__number += e.innerText;
            output.value += e.innerText;
        }
        else {
            if(output.value === state.action) {output.value = '';}
            state.second__number += e.innerText;
            output.value += e.innerText;
        }
        console.log(state);
    });
});

equal.addEventListener('click', () => {

    if(state.action === '!') {
        let res = factorial(state.first__number);
        reset();
        output.value = res;
        state.result = res;
    }

    if(state.action && state.first__number && state.second__number) {
        let res = calculator(state);
        reset();
        output.value = res;
        state.result = res;
    } else {
        return;
    }
    console.log(state);
});

negative.addEventListener('click', (e) => {
    console.log('negative');
    if(state.first__number) {
        state.first__number = toggleNegative(state.first__number);
        output.value = state.first__number;
    } else {
        state.second__number = toggleNegative(state.second__number);
        output.value = state.second__number;
    }
});

clear.addEventListener('click', () => reset());