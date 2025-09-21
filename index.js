
let countryList = {}
let countryArray=[];
let correctAnswer = "";
let keyIndex=0;
let correctAns="";

let score=0;
let highscore=0;

//Updates score, and highscore after each correct guess/giveup
function updateScore(){
    document.getElementById("score").textContent="Score: "+score;
     document.getElementById("highscore").textContent="High Score: "+highscore;

}


//Call the getData function and start outline game by default
async function init(gametype){
    countryList=await getData();
    countryArray = Object.keys(countryList);
    showGame(gametype);
}


function randomizeNumber(minimumVal, maximumVal){
    return Math.floor(Math.random() * (maximumVal-minimumVal) + minimumVal);
}

//getData() function used to collect the necessary information on the countries used in this game
async function getData(){
    try{
    const response = await fetch('https://restcountries.com/v3.1/all?fields=name,cca2,capital,flags,population,independent');
    const countries = await response.json();
    const countryLib={};
    for (const country of countries){
       
        
            const name = country.name.common;
            const cca2 = country.cca2;
            const capital = country.capital?.[0] || null;
            const outlineurl =`https://raw.githubusercontent.com/djaiss/mapsicon/master/all/${cca2.toLowerCase()}/1024.png`;
            const flag=country.flags.svg;
            const population = country.population;
            const independent = country.independent;

            
        if (capital && outlineurl && flag && cca2 && population>250000 && independent){
            countryLib[name]={
                cca2: cca2,
                capital: capital,
                outline: outlineurl,
                flag: flag
             
            }
        }
            
    }
    return countryLib;
 }
 catch{
    console.log("ERROR FINDING DATA")
 }
}

//showGame() function used to display the correct information and fetch the correct answers
function showGame(name){ 
 
    
    if (name==="outlines"){
        document.getElementById("country-outline").style.filter = "brightness(0) invert(1)";
        correctAnswer=randomizeCountry(countryArray);
        

        document.getElementById("outline-game").class="game-active";
        document.getElementById("flag-game").class="game-hidden";
        document.getElementById("capital-game").class="game-hidden";

        document.getElementById("country-outline").src=countryList[correctAnswer].outline;
        document.getElementById("country-name").textContent="";
        document.getElementById("input").placeholder="Enter country name...";
        gametype="outlines";
         
    }
    else if (name==="flags"){
        document.getElementById("country-outline").style.filter = "";
        correctAnswer=randomizeCountry(countryArray);

        document.getElementById("flag-game").class="game-active";
        document.getElementById("outline-game").class="game-hidden";
        document.getElementById("capital-game").class="game-hidden";

        document.getElementById("country-outline").src=countryList[correctAnswer].flag;
        document.getElementById("country-name").textContent="";
        document.getElementById("input").placeholder="Enter country name...";
        gametype="flags";
    }
    else if (name==="capitals"){
        document.getElementById("country-outline").style.filter = "brightness(0) invert(1)";

        correctCountry=randomizeCountry(countryArray);
        correctAnswer=countryList[correctCountry].capital;

        document.getElementById("capital-game").class="game-active";
        document.getElementById("outline-game").class="game-hidden";
        document.getElementById("flag-game").class="game-hidden";

        document.getElementById("country-outline").src=countryList[correctCountry].outline;
        document.getElementById("country-name").textContent=correctCountry;
        document.getElementById("input").placeholder="Enter capital name...";
        gametype="capitals";

    }


    }
   
//Verify the users answer when they submit
function checkGuess(){ 
    
    const userGuess=document.getElementById("input").value.trim();

    if (userGuess.toLowerCase() === correctAnswer.toLowerCase()){
        document.querySelector(".feedback").innerHTML = "Correct";
        document.querySelector(".feedback").style.color = "hsl(122, 78%, 42%)";
        score+=1;
        if (score>highscore){
            highscore=score;
        }

        updateScore();
        init(gametype);
    }
    else {
        document.querySelector(".feedback").innerHTML = "Try Again";
        document.querySelector(".feedback").style.color = "red";
    }
    document.getElementById("input").value = "";
   
}

//When user presses give up button reset their score and and continue playing
function giveup(){
    document.querySelector(".feedback").textContent="The correct answer was "+correctAnswer;
    document.querySelector(".feedback").style.color = "red"
    score=0;
    updateScore();
    init(gametype);
}

//Tab visual
function switchTab(element, gameType){
    const indicator = document.querySelector(".tab-indicator");
    indicator.style.width = element.offsetWidth + "px";
    indicator.style.left= element.offsetLeft + "px";

    showGame(gameType);
}

window.onload = function(){
    const firstTab = document.querySelector(".tab");
    switchTab(firstTab, 'outlines');

}

//Select a random country in the array of coutnries
function randomizeCountry(countryArray){

let keyIndex=randomizeNumber(0, countryArray.length);
let correctAnswer = countryArray[keyIndex];
 return correctAnswer;
}

//Default to playing the outlines game
init('outlines');

//If user wants to use enter key
document.getElementById("input").addEventListener("keydown", function(event){
 if (event.key==="Enter"){
    event.preventDefault();
    checkGuess();
 }
});
