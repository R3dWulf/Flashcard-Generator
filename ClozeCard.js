function ClozeCard(fullText, answer){
	var clozePosition = deleteCloze(fullText, answer);
	this.partial = getPartial(fullText, clozePosition);
	this.answer = answer;
	function deleteCloze(fullText, answer){
		var start = fullText.indexOf(answer);
		//Check for answer if answer can be found in index
		if (start !== -1){
			return [start, start + answer.length];
		} 

		throw new Error("Cannot find answer");
	}

	function getPartial(fullText, clozePosition){
		var start = fullText.slice(0, clozePosition[0]);
		var end = fullText.slice(clozePosition[1], fullText.length);
		return start + " ... " + end;
	}
}

ClozeCard.prototype.displayCard = function displayCard(){
	console.log(this.partial.replace("...", this.answer));
}

module.exports = ClozeCard;