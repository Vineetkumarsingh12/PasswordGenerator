let range=document.querySelector(".sld");
let Rvalue=0;
let up=document.querySelector("#upper");
let low=document.querySelector("#lower");
let num=document.querySelector("#number");
let symbol=document.querySelector("#symbol");
let copy=document.querySelector("[popup]");
let indi=document.querySelector("#ind");
let password=document.querySelector("#pass");
let copyBtn=document.querySelector(".fa-copy");
let allCheckBox=document.querySelectorAll("input[type=checkbox]");
let generateButton=document.querySelector(".stnth");
let checkCount=0;
let pswd="";
// length

function getInd(clr){
   indi.style.backgroundColor=clr;
   indi.style.boxShadow = `0px 0px 20px 0 ${clr}`;
}
let lenElement = document.querySelector(".len");
setRange();

function setRange(){
 range.value=Rvalue;
lenElement.textContent = Rvalue;
const min=range.min;
const max=range.max;
range.style.backgroundSize=((Rvalue-min)*100/(max-min))+"% 100%" 
}
function handleCheckBoxChange(){
    checkCount=0;
    allCheckBox.forEach((checkbox)=>{
        if(checkbox.checked)
        checkCount++;
    });
    if(Rvalue<checkCount){
    Rvalue=checkCount;
   
    }
    setRange();

}

allCheckBox.forEach((checkbox)=>{
   checkbox.addEventListener('change',handleCheckBoxChange); 
});
  


function getRandom(min,max){
    return   (Math.floor(Math.random()*(max-min+1))+min);
}

function getInt(){
    return getRandom(0,9);
}
function getLChar(){
    return String.fromCharCode(getRandom(97,122));
}
function getUchar(){
    return String.fromCharCode(getRandom(65,90));
}

let sym="!@#$%~^&*()_+?><-";
function getSrandom(){
    return sym[getRandom(0,15)];
}




function calcStrength()
{
   let cnt=0;
  
    if(up.checked) 
    cnt++;
    if(low.checked)
     cnt++;
    if(num.checked)
     cnt++;
    if(symbol.checked) 
    cnt++;

    console.log(cnt);
   
   if(cnt==1)
   {
getInd("white");

   }
   else if(cnt==2)
   {
    getInd("yellow");
   }
   else if(cnt==3)
   {
    getInd("blue");
   }
   else
   {
    getInd("green");
   }
}

 


async function passCopy()
{
try{
    //
await  navigator.clipboard.writeText(password.value);
copy.textContent="Copied";
}
catch{
copy.textContent="failed";
}
copy.style.opacity = '1';
setTimeout(()=>{
    copy.style.opacity = '0';
},1000);
}

range.addEventListener('input',(e)=>{
Rvalue=e.target.value;
setRange();
});

 copyBtn.addEventListener('click',
()=>{
    if(password.value)
    passCopy();
})

generateButton.addEventListener('click',()=>{
    if(checkCount<=0)return ;
   
    if(Rvalue<checkCount){
        Rvalue=checkCount;
        setRange();
    }
    
let funArr=[];
    // passwordEmpty
    let temp=checkCount;
pswd="";
if(up.checked){
    funArr.push(getUchar);
    pswd+=getUchar();
temp--;
}
if(low.checked){
    funArr.push(getLChar);
    pswd+=getLChar();
    temp--;
}
if(symbol.checked){
    funArr.push(getSrandom);
    pswd+=getSrandom();
    temp--;
}
if(num.checked){
    funArr.push(getInt);
    pswd+=getInt();
    temp--;
}

// for(let i=0;i<checkCount;i++)
// pswd+=funArr[getRandom(0,checkCount-1)]();


for(let i=0;i<Rvalue-checkCount;i++)
pswd+=funArr[getRandom(0,funArr.length-1)]();

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  
  function shuffleString(inputString) {
    // Convert the string into an array of characters
    const charArray = inputString.split('');
  
    // Shuffle the array using the shuffleArray function
    const shuffledArray = shuffleArray(charArray);
  
    // Join the shuffled array back into a string
    const shuffledString = shuffledArray.join('');
  
    return shuffledString;
  }
  pswd=shuffleString(pswd);
// show
password.value=pswd;

calcStrength();
} )