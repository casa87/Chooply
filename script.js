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
		
		
			var word = words[i];
			if(!stopWords[word.toLowerCase()])
			{
				/////////////////////////////////
				//simple word
			 	
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
				 	if(!stopWords[word_double.toLowerCase()])
					{	
				 		
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
		 		
		 	
		 	}	//end stop words	

		 }
		 	
	}



	//add div on body of the page to create the bar
	$('body').append('<div id="chooply_bar">My Bar</div>');
	
	
	//get words of the first div
	var words = $('body>div').text().match(/\b([a-zA-Zéèàê]{4,14})\b/g);
	
	calcul_score(words);
	
	
	
	//sort associative array
	var score_sort = new Array();		//to store words
	var score_note = new Array();		//to store score
	
	for(key in score)
	{
		//focus on more important words
		if(score[key] > total/200)
		{
			//if score not present create an array of array
			if(score_sort[score[key]])
			{
			
				score_sort[score[key]].push(key);
			}
			else
			{
				score_note.push(score[key])
				score_sort[score[key]] = new Array();
				score_sort[score[key]].push(key);
			}
			$('#chooply_bar').append(key + " : "+ score[key] +"<br>");
		}	
	}
	
	
	
	
})
