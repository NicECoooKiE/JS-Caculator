document.querySelector(".subtitle").textContent="JS計算機";

const oneBtn = document.querySelector("#calc-one");
const twoBtn = document.querySelector("#calc-two");
const threeBtn = document.querySelector("#calc-three");
const fourBtn = document.querySelector("#calc-four");
const fiveBtn = document.querySelector("#calc-five");
const sixBtn = document.querySelector("#calc-six");
const sevenBtn = document.querySelector("#calc-seven");
const eightBtn = document.querySelector("#calc-eight");
const nineBtn = document.querySelector("#calc-nine");
const zeroBtn = document.querySelector("#calc-zero");

const decimalBtn = document.querySelector("#calc-decimal");
const clearBtn = document.querySelector("#calc-clear");
const backspaceBtn = document.querySelector("#calc-backspace");
const displayValElement = document.querySelector("#calc-display-val");

let calcNumBtns = document.querySelectorAll(".calc-btn-num");
let calcOperatorBtns = document.querySelectorAll(".calc-btn-operator");

//initial updateDisplayVal()
let displayVal = "0"; //顯示數字
let pendingVal = ''; //待相加數字 (被運算數字暫存)
let evalStringArray = [];

//清除
clearBtn.onclick = () =>{
    displayVal = "0"; //顯示區變數歸零
    pendingVal = ''; //清除pendingVal(待運算暫存)
    evalStringArray = []; //運算區清空
    displayValElement.textContent = displayVal; //把顯示區變數 同步到顯示區
}
//小數點
decimalBtn.onclick = () =>{
    if(!displayVal.includes('.')){
        displayVal += '.';
    }
    displayValElement.textContent = displayVal;
}
//到退鍵
backspaceBtn.onclick = () =>{
    let lengthofDisplayVal = displayVal.length;
    displayVal = displayVal.slice(0, lengthofDisplayVal -1);

    if(displayVal === ""){
        displayVal = "0";
    }
    displayValElement.textContent = displayVal;
}

//顯示數字
let updateDisplayVal = (clickObj) =>{
    let btnText = clickObj.target.textContent;
    if(displayVal === "0"){ //若原本是0，清掉以後再加入輸入的值
        displayVal = '';
    }
    displayVal += btnText;
    displayValElement.textContent = displayVal;
}
let performOperation = (clickObj) =>{
    let operator = clickObj.target.textContent;
    switch(operator){
        case '+':
            pendingVal = displayVal;
            displayVal = "0";
            displayValElement.textContent = displayVal;
            evalStringArray.push(pendingVal);
            evalStringArray.push('+');
            break;
        case '-':
            pendingVal = displayVal;
            displayVal = "0";
            displayValElement.textContent = displayVal;
            evalStringArray.push(pendingVal);
            evalStringArray.push('-');
            break;
        case 'x':
            pendingVal = displayVal;
            displayVal = "0";
            displayValElement.textContent = displayVal;
            evalStringArray.push(pendingVal);
            evalStringArray.push('*');
            break;
        case '÷':
            pendingVal = displayVal;
            displayVal = "0";
            displayValElement.textContent = displayVal;
            evalStringArray.push(pendingVal);
            evalStringArray.push('/');
            break;
        case '=':
            evalStringArray.push(displayVal);
            let evaluation = eval(evalStringArray.join(' '));
            displayVal = evaluation + '';
            displayValElement.textContent = displayVal;
            evalStringArray = [];
            break;
        default:
            break;
    }
    
}
//監聽
for(let i=0; i < calcNumBtns.length; i++){
    calcNumBtns[i].addEventListener("click", updateDisplayVal, false);
    }


for(let i=0; i < calcOperatorBtns.length; i++){ //這裡的解釋跟上方監聽數字按鈕相同
    calcOperatorBtns[i].addEventListener("click", performOperation, false);
    }


