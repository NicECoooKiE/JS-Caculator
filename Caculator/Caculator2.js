document.querySelector(".subtitle").textContent="JS 計算機2";

const displayValElement = document.querySelector("#calc-display-val");//下排白字
const displayGrayValElement = document.querySelector("#calc-temp-val");//上排灰字
const clearBtn = document.querySelector("#calc-clear");
const backspaceBtn = document.querySelector("#calc-backspace");

const decimalBtn = document.querySelector("#calc-decimal");
const equalBtn = document.querySelector("#calc-equal");
// === 狀態 ===
let token = [];          // 儲存整個運算序列，例如 ["12", "+", "3", "x", "2"]
let currentNumber = [];   // 正在輸入的數字字元陣列，例如 ["1","2",".","3"]
let lastWasOperator = true;  // 防止開頭輸入運算符
let resultDone = false;      // 按過等號後重新輸入會重置

let calcNumBtns = document.querySelectorAll(".calc-num");
let calcOperatorBtns = document.querySelectorAll(".calc-operator")


function pushcurrentNumber() {
    if (currentNumber.length > 0){
        token.push(currentNumber.join(''));
        currentNumber = [];
        console.log(token);
    }
}

function updateDisplay() {
    displayGrayValElement.textContent = token.join('');
    displayValElement.textContent = 
        /* currentNumber.length > 0 ? currentNumber.join('') : token[token.length - 1] || '0';*/
        currentNumber.length > 0 ? currentNumber.join('') :  '0';
}

function computeToken() {
    //先處理乘除，後加減
    let arr = [...token];

    for (let i = 0; i < arr.length; i++ ){
        if (!isNaN(arr[i])) {arr[i] = parseFloat(arr[i]);}
    }

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === "x" || arr[i] === "÷"){
            let left = arr[i-1];
            let right = arr[i+1];
            let res = arr[i] === "x" ? left*right : left/right;
            arr.splice(i-1, 3, res);
            i--;
        }
    }
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === "+" || arr[i] ==="-") {
            let left = arr[i-1];
            let right = arr[i+1];
            let res = arr[i] === "+" ? left+right : left-right;
            arr.splice(i-1, 3, res);
            i--; 
        }
    }
    return arr[0];
}

calcNumBtns.forEach( btn => {
    btn.onclick = (e) => {
        console.log(token);
        if (resultDone) {
            /*token = [];
            currentNumber = [];*/
            resultDone = false;
        }
        let n = e.target.textContent;

        if (currentNumber.length === 1 && currentNumber[0] === "0" && n !== "."){
            currentNumber[0] = n;
        }else{
            currentNumber.push(n);
        }

        lastWasOperator = false;
        updateDisplay();
    };
});

decimalBtn.onclick =() =>{
    if(resultDone){
        token = [];
        currentNumber = [];
        resultDone = false;
    }

    if(!currentNumber.includes(".")){
        if(currentNumber.length===0) {currentNumber.push("0");}
        currentNumber.push(".");
    }
    lastWasOperator = false;
    updateDisplay();
}

calcOperatorBtns.forEach( btn =>{
    btn.onclick = (e) => {
        const op = e.target.textContent;
        if (op === "=") {
            if (lastWasOperator) {return;}
            pushcurrentNumber();
            if(token.length < 3) {return;}

            displayGrayValElement.textContent = token.join("");
            const result = computeToken();
            /*token = [String(result)];*/
            token = [];
            currentNumber = [String(result)];
            displayValElement.textContent = result;
            resultDone = true;
            lastWasOperator = false;
            return;
        }

        if (lastWasOperator) return;
        pushcurrentNumber();
        token.push(op);
        lastWasOperator = true;
        updateDisplay();
    };
});

clearBtn.onclick =() => {
    currentNumber = [];
    token = [];
    lastWasOperator = true;
    resultDone = false;
    updateDisplay();   
}

backspaceBtn.onclick =() => {
    if (currentNumber.length > 0){
        currentNumber.pop();
    }else if (token.length > 0 && !isNaN(token[token.length -1])) {
        let num = token.pop().toString().split("");
        num.pop();
        if (num.length > 0) currentNumber = num;
    }
    updateDisplay();
}
/*
var displayTempVal = '';
var displayArray = [];
var textCount = 0; //計算本次輸入字元數量
var OperationSignal = 1; //不可直接輸入運算符號
String.tmp;

//clear
clearBtn.onclick = () => {
    displayArray = [];
    displayTempVal = '';
    textCount = 0;
    OperationSignal = 1;

    displayValElement.textContent = '0';
    displayGrayValElement.textContent = '';
}

//backspace
backspaceBtn.onclick = ()=>{
    displayArray.pop();
    displayTempVal = displayArray.join('');
    displayValElement.textContent = displayTempVal;
    textCount--;
}

//decimal
decimalBtn.onclick = () =>{
    //檢查是否已有小數點
    // 若有，訊號=1
    var Decimalsignal = 0;
    var DecimalCount = 0 - textCount;
    for (i=0; i>DecimalCount; i--){
        if (displayArray[i]==='.'){
            Decimalsignal = 1;
        }
    }
    //檢查訊號
    if (Decimalsignal === 1) { return; }
    else if (Decimalsignal === 0){
        displayArray.push('.');
        displayTempVal = displayArray.join('');
        displayValElement.textContent = displayTempVal;
    }
}
//updateDisplayVal
let updateDisplayVal = (clickobj) =>{
    textCount++;
    OperationSignal = 0;
    var n
    console.log(displayArray[1])
    if (displayArray[textCount] === 0){
        
        displayArray.pop();
    }
    
    displayArray.push(clickobj.target.textContent);
    displayTempVal = displayArray.join('');
    displayValElement.textContent = displayTempVal;

}

//operation
let performOperation = (clickobj)=>{
    operator = clickobj.target.textContent;
    if (OperationSignal === 1){ return;} //確認operation是不是第一個輸入的
    else if(OperationSignal === 0){
        OperationSignal = 1;
        switch(operator){
            case '+':
                //displayArray.push(displayVal);
                displayArray.push('+');
                displayTempVal = displayArray.join('');
                displayValElement.textContent = displayTempVal;
                break;
            case '-':
                //displayArray.push(displayVal);
                displayArray.push('-');
                displayTempVal = displayArray.join('');
                displayValElement.textContent = displayTempVal;
                break;
            case 'x':
                //displayArray.push(displayVal);
                displayArray.push('x');
                displayTempVal = displayArray.join('');
                displayValElement.textContent = displayTempVal;
                break;
            case '÷':
                //displayArray.push(displayVal);
                displayArray.push('÷');
                displayTempVal = displayArray.join('');
                displayValElement.textContent = displayTempVal;
                break;
            case '=':
                displayGrayValElement.textContent = displayValElement.textContent;
                for(i=0; i<displayArray.length; i++){
                    console.log(i);
                    if(displayArray[i]==='x'){
                        displayArray[i] = '*';
                    }
                    if(displayArray[i]==='÷'){
                        displayArray[i] = '/';
                    }
                }
                console.log(displayArray);

                tmp = eval(displayArray.join(''));
                displayArray =[];
                displayArray.push(tmp);
                displayValElement.textContent = tmp;
                OperationSignal = 0;
                textCount = 0;
                break;
        }
    }
}

for(var i=0; i < calcNumBtns.length; i++){
    calcNumBtns[i].addEventListener("click", updateDisplayVal, false);
}

for(var i=0; i < calcOperatorBtns.length; i++){
    calcOperatorBtns[i].addEventListener("click", performOperation, false);
}
*/