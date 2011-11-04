/*
	Chooply 2011
	Main part 
*/

$(document).ready(function(){

	var score = new Array();	//score of each words
	

	//fonction to count the frequence of each words
	function calcul_score(words)
	{
		for(i=0; i<words.length; i++)
		{
		 	word = words[i].toLowerCase();;
		 
		 	//if words is in the array	
		 	if(score[word])
		 	{
		 		score[word] += 1;
		 	}
		 	else
		 	{
		 		score[word] = 1;
		 	}
		 }	
	}



	//add div on body of the page to create the bar
	$('body').append('<div id="chooply_bar">My Bar</div>');
	
	
	//get words of the first div
	var words = $('body>div').text().match(/\b([a-zA-Zéèàê]{4,14})\b/g);
	
	
	calcul_score(words);
	
	
	
	//debug
	for(key in score)
	{
		$('#chooply_bar').append(key + " : "+ score[key] +"<br>");
	}
	
	
})
