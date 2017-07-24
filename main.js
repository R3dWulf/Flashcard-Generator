var inquirer = require("inquirer");
var fs = require("fs");
var BasicCard = require("./BasicCard.js");
var ClozeCard = require("./ClozeCard.js");

var cardData = require("./basic_log.json");
var cardDataCloze = require("./cloze_log.json");

function whichType(which){
	this.which = which;
}

inquirer.prompt([
	{
		name: "which",
		message: "Which type of flash card would you like to create?",
		type : "list",
		choices : ["basic", "cloze"]
	}
]).then(function(answer){
	if (answer.which === "basic"){
		inquirer.prompt([{
			type : "input",
			name : "front",
			message : "Please enter what will be put on the front of the basic flash card?"
		},
		{
			type : "input",
			name :  "back",
			message : "Please enter what will fo on the back of the basic flash card."
	 	}]).then(function(input){
	 		var card = new BasicCard(input.front, input.back);
			cardData.push(card);
			console.log(card);
			var newCardData = JSON.stringify(cardData, null, "\t");
			fs.writeFile("./basic_log.json4", newCardData, function(err){
				if(err) throw err;
				console.log("Done");
			});
	 	});
	}

	if (answer.which === "cloze"){
		inquirer.prompt([{
			type : "input",
			name : "fullText",
			message : "Please enter what is the full text of the cloze flash card."
		},{
			type : "input",
			name : "answer",
			message : "Please enter the answer to the cloze flash card."
		}
		]).then(function(inputs){
			var card = new ClozeCard(inputs.fullText, inputs.answer);
			card.displayCard();
			cardDataCloze.push(card);
			var newCardDataCloze = JSON.stringify(cardDataCloze, null, "\t");
			fs.writeFile("./cloze_log.json", newCardDataCloze, function(err){
				if(err){
					console.log(err);
				} 
				console.log("Card added");
			});
		});
	}

});


//then(function(clozeInput){
			// var card = new ClozeCard(clozeInput.fullText, clozeInput.answer);
			// card.displayCard();
			// cardDataCloze.push(card);
			// var newCardDataCloze = JSON.stringify(cardDataCloze, null, "\t");
			// fs.writeFile("./cloze_log.json", newCardDataCloze, function(err){
			// 	if(err) throw err;
			// 	console.log("Card added");
			// });


