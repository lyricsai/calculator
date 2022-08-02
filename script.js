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
const first__numberString = document.querySelector("#first__number");
const second__numberString = document.querySelector("#second__number");

const func = document.querySelector("#func");
const negative = document.querySelector("#negative");
const output = document.querySelector("#output");
const equal = document.querySelector("#equal");
const clear = document.querySelector("#clear");

const buttons__func = [...document.querySelectorAll("#buttons__func button")];
const buttons__numbers = [...document.querySelectorAll("#buttons__numbers button")];

let result = 0;

const calculator = ({action, first__number, second__number}) => {
    first__number = +first__number;
    second__number = +second__number;

    console.log(actions[action](first__number, second__number));
    return actions[action](first__number, second__number);

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

const reset = () => {
    first__numberString.value = "";
    second__numberString.value = "";
    output.value = "";
};

const actions = {
    "+": plus,
    "-": minus,
    "*": multiply,
    "/": subtract,
    "**": power,
    "!": factorial,
};

const state = {
    action: null,
    first__number: first__numberString?.value || '',
    second__number: second__numberString?.value || '',
    result: null
};

buttons__func.forEach(e => {
    e.addEventListener('click', () => {
        state.action = e.innerText;
        func.innerText = e.innerText;
    });
});

buttons__numbers.forEach(e => {
    e.addEventListener('click', () => {
        console.log(e.innerText);
        if(!state.action) {
            state.first__number += e.innerText;
            first__numberString.value += e.innerText;
            console.log(state.first__number);
        }
        else {
            state.second__number += e.innerText;
            second__numberString.value += e.innerText;
            console.log(state.second__number);
        }
    });
});

equal.addEventListener('click', () => {
    console.log(state);
    if(state.action && state.first__number && state.second__number) {
        let res = calculator(state);
        output.value = res;
        state.action = '';
        state.first__number = '';
        state.second__number = '';
        console.log(state);
    } else {return;}
});

clear.addEventListener('click', () => reset());