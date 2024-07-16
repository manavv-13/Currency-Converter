const BASE_URL =
"https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("#execute");
const fromCurr = document.querySelector("#from");
const toCurr = document.querySelector("#to");
let finalamt = 0;
const swap = document.querySelector("i");

for(let select of dropdowns){
    for(currencyCode in countryList)//countryList[currencyCode] = country Code
    { 
        let id = select.getAttribute("id");
        let newOption = document.createElement("option");
        newOption.innerText = currencyCode;
        newOption.value = currencyCode;
        if(id==="from" && newOption.value ==="USD")
            newOption.selected = "selected";
        if(id==="to" && newOption.value ==="INR")
            newOption.selected = "selected";
        select.append(newOption);
    }
    
    select.addEventListener("change",changeFlag);
}

function changeFlag(event){
    let element = event.target;
    let newSrc = `https://flagsapi.com/${countryList[element.value]}/flat/64.png`;
    let img = element.parentElement.querySelector("img");

    img.setAttribute("src",newSrc);
}

btn.addEventListener("click",calculate);

async function calculate(event){
    event.preventDefault();
    let amount = document.querySelector("form input");
    if(amount.value==="" || amount.value<1)
    {
        amount.value = 1;
    }
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[(fromCurr.value.toLowerCase())];
    let convertVal = rate[toCurr.value.toLowerCase()];
    finalamt = convertVal*amount.value;
    let result = document.querySelector("#result");

    result.innerText = `${amount.value} ${fromCurr.value} = ${finalamt.toPrecision(4)} ${toCurr.value}`;
}

swap.addEventListener("click",swapOptions);

function swapOptions(event){
    let helper = fromCurr.value;
    fromCurr.value = toCurr.value;
    toCurr.value = helper;
    let fromImg = document.querySelector(".from-drop-container img");
    let toImg = document.querySelector(".to-drop-container img");
    let fromSrc = `https://flagsapi.com/${countryList[fromCurr.value]}/flat/64.png`;
    let toSrc = `https://flagsapi.com/${countryList[toCurr.value]}/flat/64.png`;

    fromImg.src = fromSrc;
    toImg.src = toSrc;
    calculate(event);
}

