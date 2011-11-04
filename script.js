/*
	Chooply 2011
	Main part 
*/

$(document).ready(function(){

	var score = new Array();	//score of each words
	var total = 0;				//total of words in the page
	
	
	
	/////////////////////////////////////////////////
	//fonction to count the frequence of each words
	function calcul_score(words)
	{
		for(i=0; i<words.length; i++)
		{
		
			/////////////////////////////////
			//simple word
		 	var word = words[i];
		 	
		 	//if start with majuscule increase score
		 	var mul_maj = 1;
		 	if(/^[A-Z][a-z]{3,14}$/.test(word))
		 	{
		 		mul_maj = 2;
		 	}
		 	word = word.toLowerCase();
	
	
		 	var note = 1 * mul_maj;	
		 
		 	total++;	//increment total of words
		 
		 	//if words is in the array	
		 	if(score[word])
		 	{
		 		score[word] += note;
		 	}
		 	else
		 	{
		 		score[word] = note;
		 	}
		 	
		 	
		 	
		 	/////////////////////////////////
		 	//bigram
		 	if(i < words.length - 1)
		 	{

		 		var word_double = words[i+1];	
		 		word += " " + word_double;		//concate 2 words
		 		
		 		//if start with majuscule increase score
		 		if(/^[A-Z][a-z]{3,14}$/.test(word_double))
		 		{
		 			mul_maj += 2;
		 		}
		 		word = word.toLowerCase();
		 		
		 		var note = 1 * mul_maj;
		 	
		 		total++;
		 	
		 		//if bigram is in the array
		 		if(score[word])
		 		{
		 			score[word] += note;
		 		}
		 		else
		 		{
		 			score[word] = note;
		 		}
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
		//focus on more important words
		if(score[key] > total/100)
		{
			$('#chooply_bar').append(key + " : "+ score[key] +"<br>");
		}	
	}
	
	
})
