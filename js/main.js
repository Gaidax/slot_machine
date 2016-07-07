/// <reference path="jquery.js" />
var playerMoney = 1000;
var winnings = 0;
var jackpot = 5000;
var turn = 0;
var playerBet = 0;
var winNumber = 0;
var lossNumber = 0;
var spinResult=[];
var fruits = "";
var winRatio = 0;
var curr;
var curA = 0; //current position modificator of the slot A (the one that the player sees)
var curB = 0;
var curC = 0;
var times = 0;
var Fruits = {
 Grape: 0,
 Banana : 0,
 Orange : 0,
 Cherry : 0,
 Bar : 0,
 Bell : 0,
 Seven : 0,
 Blanks : 0
}



/* Utility function to show Player Stats */
function showPlayerStats()
{
    winRatio = winNumber / turn;
    $("#jackpot").text("Jackpot: " + jackpot);
    $("#playerMoney").text("Player Money: " + playerMoney);
    $("#playerTurn").text("Turn: " + turn);
    $("#playerWins").text("Wins: " + winNumber);
    $("#playerLosses").text("Losses: " + lossNumber);
    $("#playerWinRatio").text("Win Ratio: " + (winRatio * 100).toFixed(2) + "%");
}

/* Utility function to reset all fruit tallies */
function resetFruitTally() {
    grapes = 0;
    bananas = 0;
    oranges = 0;
    cherries = 0;
    bars = 0;
    bells = 0;
    sevens = 0;
    blanks = 0;
}

/* Utility function to reset the player stats */
function resetAll() {
    playerMoney = 1000;
    winnings = 0;
    jackpot = 5000;
    turn = 0;
    playerBet = 0;
    winNumber = 0;
    lossNumber = 0;
    winRatio = 0;
}


/* Check to see if the player won the jackpot */
function checkJackPot() {
    /* compare two random values */
    var jackPotTry = Math.floor(Math.random() * 51 + 1);
    var jackPotWin = Math.floor(Math.random() * 51 + 1);
    if (jackPotTry == jackPotWin) {
        alert("You Won the $" + jackpot + " Jackpot!!");
        playerMoney += jackpot;
        jackpot = 1000;
    }
}

/* Utility function to show a win message and increase player money */
function showWinMessage() {
    playerMoney += winnings;
    $("div#winOrLose>p").text("You Won: $" + winnings);
    resetFruitTally();
    checkJackPot();
}

/* Utility function to show a loss message and reduce player money */
function showLossMessage() {
    playerMoney -= playerBet;
    $("div#winOrLose>p").text("You Lost!");
    resetFruitTally();
}

/* Utility function to check if a value falls within a range of bounds */
function checkRange(value, lowerBounds, upperBounds) {
    if (value >= lowerBounds && value <= upperBounds)
    {
        return value;
    }
    else {
        return !value;
    }
}

/* When this function is called it determines the betLine results.
e.g. Bar - Orange - Banana */


/* This function calculates the player's winnings, if any */
function determineWinnings()
{
    if (Fruits.Blanks == 0)
    {
        if (Fruits.Grape == 3) {
            winnings = playerBet * 10;
        }
        else if(Fruits.Banana == 3) {
            winnings = playerBet * 20;
        }
        else if (Fruits[Orange] == 3) {
            winnings = playerBet * 30;
        }
        else if (Fruits[Cherry] == 3) {
            winnings = playerBet * 40;
        }
        else if (Fruits[Bar] == 3) {
            winnings = playerBet * 50;
        }
        else if (Fruits[Bell] == 3) {
            winnings = playerBet * 75;
        }
        else if (Fruits[Seven] == 3) {
            winnings = playerBet * 100;
        }
        else if (Fruits[Grape] == 2) {
            winnings = playerBet * 2;
        }
        else if (Fruits[Banana] == 2) {
            winnings = playerBet * 2;
        }
        else if (Fruits[Orange] == 2) {
            winnings = playerBet * 3;
        }
        else if (Fruits[Cherry] == 2) {
            winnings = playerBet * 4;
        }
        else if (Fruits[Bar] == 2) {
            winnings = playerBet * 5;
        }
        else if (Fruits[Bell] == 2) {
            winnings = playerBet * 10;
        }
        else if (Fruits[Seven] == 2) {
            winnings = playerBet * 20;
        }
        else if (Fruits[Seven] == 1) {
            winnings = playerBet * 5;
        }
        else {
            winnings = playerBet * 1;
        }
        winNumber++;
        showWinMessage();
    }
    else
    {
        lossNumber++;
        showLossMessage();
    }
    
}

function calcWinnings() {
    var fruitA = getFruit($("#slots_a .wrapper"), curA);
    var fruitB = getFruit($("#slots_b .wrapper"), curB);
    var fruitC = getFruit($("#slots_c .wrapper"), curC);


    $('#test2').text(fruitA);

}

function getFruit(fruit, cur) {
    fruit = fruit.html();
    var ind = fruit.indexOf(cur);
    if (ind >= 0){
       fruit = fruit.substring(ind-6,ind+2);
    }
    return fruit;
}

$(document).ready(
function(){
	createSlots();
}		
);

function createSlots() {
	addSlots($("#slots_a .wrapper"));
	addSlots($("#slots_b .wrapper"));
	addSlots($("#slots_c .wrapper"));
}

function spinSlots() {
	    moveSlots($("#slots_a .wrapper"));
	    moveSlots($("#slots_b .wrapper"));
	    moveSlots($("#slots_c .wrapper"));
}

function clearSlots() {
    $(".slot").remove();
}

//add 15 slots (slot divs to slots class) to spin them
function addSlots(jquery_obj){
        for(var fruit in Fruits) {
            spinResult.push(fruit);
        }
	for(var i = 0; i < 15; i++){
		var rand_pos = Math.floor(Math.random()*spinResult.length);
        var id = spinResult[rand_pos];
			jquery_obj.append("<div id="+id+i+" class='slot'>"+spinResult[rand_pos]+"</div>");
	}
} 

function incrCur(rand) {
    if(curr==0){
        curr=rand;
    } else {
        curr+=rand;
    }
}

function decrCur(rand) {
    if(curr==0){
        curr=rand;
    } else {
        curr -= rand;
    }
}

function checkCurSlot(jquery_obj){
    switch(jquery_obj.selector.substring(7,8)){
        case "a" :
        return curA;
        case "b" :
        return curB;
        case "c" :
        return curC;
    }
}

function saveCurSlot(jquery_obj) {
        switch(jquery_obj.selector.substring(7,8)){
        case "a" :
        return curA=curr;
        case "b" :
        return curB=curr;
        case "c" :
        return curC=curr;
    }
}

function moveSlots(jquery_obj){
		var time = 6500;
        var currSlot = checkCurSlot(jquery_obj);
        curr = currSlot;
		time += Math.round(Math.random()*1000);
	    jquery_obj.stop(true,true);
        var rand = Math.floor(Math.random() * 10) + 1;
		var marginTop = parseInt(jquery_obj.css("margin-top"), 10);
        var checkMarg = marginTop - (rand * 100);
        if(checkMarg >= -1406) { //margin-top goes beyond the size of our wrapper at this size
            marginTop = checkMarg; //this variable is to change the margin-top of the wrapper object (it moves slots that are inside) 
            incrCur(rand);
} else {
            checkMarg = marginTop + (rand * 100); 
            if(checkMarg >= 0){
               checkMarg = marginTop - (rand * 100);
               incrCur(rand);
            } else {
                decrCur(rand);
            }

            marginTop = checkMarg;
    }

        jquery_obj.animate( //"spin"" slots with easing.js animation 
		{"margin-top":marginTop+"px"},//changes margin-top
		{'duration' : time, 'easing' : "easeOutElastic"});
        saveCurSlot(jquery_obj);
        $('#test').text(rand);
        calcWinnings();

}

/* When the player clicks the spin button the game kicks off */
$("#spinButton").click(function () {
    //createSlots();
    playerBet = $("div#betEntry>input").val();

    if (playerMoney == 0)
    {
        if (confirm("You ran out of Money! \nDo you want to play again?")) {
            resetAll();
            showPlayerStats();
        }
    }
    else if (playerBet > playerMoney) {
        alert("You don't have enough Money to place that bet.");
    }
    else if (playerBet < 0) {
        alert("All bets must be a positive $ amount.");
    }
    else if (playerBet <= playerMoney) {

       spinSlots();
        fruits = spinResult[0] + " - " + spinResult[1] + " - " + spinResult[2];
        $("div#result>p").text(fruits);
        determineWinnings();
        turn++;
        showPlayerStats();

    }
    else {
        alert("Please enter a valid bet amount");
    }
    
});
