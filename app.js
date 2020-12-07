
// get the dom
let pwdoup = document.querySelector('#pwdoup');
let pwdcopy = document.querySelector('.pwdcopy');
let pwdbar = document.querySelector(".pwd-bar");
let pwdbartxt = document.querySelector(".pwd-strong-txt");
let slider = document.querySelector('.pwd-slider');
let sliderval = document.querySelector(".pwd-length-oup");

// update the range slider value
sliderval.innerHTML = slider.value;

// checkboxes
let lowerchk = document.querySelector('.lower');
let upperchk = document.querySelector('.upper');
let numbchk = document.querySelector('.number');
let symbolchk = document.querySelector('.symbol');

let pwdgenbtn = document.querySelector('.pwdgenbtn');

// functions declaration
let randfunc = {
    lower:getrandLower,
    upper:getrandUpper,
    number:getrandNumber,
    symbol:getrandSymbol
}

pwdgenbtn.addEventListener('click', function(){
    let result = parseInt(slider.value);
    let haslower = lowerchk.checked;
    let hasupper = upperchk.checked;
    let hasnumber = numbchk.checked;
    let hassymbol = symbolchk.checked;
    
    genPwd(haslower, hasupper, hasnumber, hassymbol,result);
})

function getrandLower(){
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getrandUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getrandNumber() {
  return Math.floor(Math.random() * 10);
}

function getrandSymbol() {
    let symbol = "!@#$%^&*()_+?<>{}|~";
  return symbol[Math.floor(Math.random() * symbol.length)];
}

// slider val
slider.addEventListener('change', sliderRange)
function sliderRange(){
    
    sliderval.innerHTML = slider.value;
}

function genPwd(lower, upper, number, symbol, result) {
    let genpwd = "";
    let counts = lower+upper+number+symbol;
    let countarr = [{lower},{upper},{number},{symbol}].filter((item)=>{
        return Object.values(item)[0];
    });


    if (counts == 0) {
        return "";
    }

    for (let i = 0; i < result; i+=counts) {
        countarr.forEach((countitem) => {
            let funcname = Object.keys(countitem)[0];

            genpwd += randfunc[funcname]();
            let a = genpwd.slice(0, result);
            pwdoup.value = a;
            
            if (genpwd.length >= 10) {
                pwdbar.style.width = "50px";
                pwdbartxt.innerHTML = "weak";
                pwdbar.style.background = "red";
            }
            if (genpwd.length >= 20) {
              pwdbar.style.width = "70px";
              pwdbartxt.innerHTML = "average";
              pwdbar.style.background = "orange";
            }
            if (genpwd.length > 50) {
              pwdbar.style.width = "250px";
              pwdbartxt.innerHTML = "strong";
              pwdbar.style.background = "green";
            }
            if (genpwd.length <= 1) {
              pwdbar.style.width = "10px";
              pwdbartxt.innerHTML = "very weak";
              pwdbar.style.background = "red";
            }
        }); 
    }
}

pwdcopy.addEventListener('click', function(){
    let cpytxt = pwdoup;
    if (pwdoup.value === "") {
        alert("Field is empty");
    }else{
        cpytxt.select();
        document.execCommand('copy');
        alert("Password has been copied to clipedboard");
    }

})