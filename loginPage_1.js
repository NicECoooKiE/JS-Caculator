document.getElementById("welcome").textContent="Welcome to login page";
//account part
var RealAccount = "nicecookie";
var word1 = document.getElementById("word1");
word1.textContent = "Account: ";
var input1 = document.getElementById("input1");

//password part
var RealPassword = "123";
var word2 = document.getElementById("word2");
word2.textContent = "Password: ";
var input2 = document.getElementById("input2");

//登入按鈕，兩種實現內容方式
var button1 = document.getElementById("button1");
button1.textContent = "Login";

//Button1 Login
button1.onclick = function(){
    //Set InputData
    var InputAccount = input1.value;
    var InputPassword = input2.value;
    if(RealAccount===InputAccount){        
        if(RealPassword===InputPassword){
            window.location.href = "https://www.google.com";
        }
        else{
            alert("Password wrong");
            location.reload();
            //window.location.href = "login.html";
        }
    }
    else{
        alert("Account wrong");
        location.reload();
        //window.location.href = "login.html";
        }
    
};

//Button2 Forget Password
var button2 = document.getElementById("word3");
button2.textContent = "Forget Password";
button2.onclick = function(){
    var InputAccount = input1.value;
    if(RealAccount === InputAccount){
        alert(RealPassword)
    }
    else{
        alert("No way");
    }
};

