/*
	Chooply 2011
	Main part 
*/

$(document).ready(function(){

	var score = new Array();	//score of each words
	var total = 0;				//total of words in the page
	
	
	
	
	
	/////////////////////////////////////////////////
	//fonction to sort array by number
	function sortNumber(a,b)
	{
		return a - b;
	}
	
	
	/////////////////////////////////////////////////
	//fonction to count the frequence of each words
	function calcul_score(words, importance)
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
			 	if(/^[A-Z][a-z]{3,16}$/.test(word))
			 	{
			 		mul_maj = 2;
			 	}
			 	word = word.toLowerCase();
		
		
			 	var note = 1 * mul_maj * importance;	
			 
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
				 		if(/^[A-Z][a-z]{3,16}$/.test(word_double))
				 		{
				 			mul_maj += 2;
				 		}
				 		word = word.toLowerCase();
				 		
				 		var note = 1 * mul_maj  * importance;
				 	
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


	/////////////////////
	//modify original page
	//add margin top to original page for the bar
	$('html').css("margin-top","30px");

	//add div on body of the page to create the bar
	$('body').prepend('<div id="chooply_bar"><ul id="chooply_keywords"></ul><a id="chooply_more">more</a> <div id="chooply_share"><a name="fb_share" type="icon_link" href="http://www.facebook.com/sharer.php">share</a></div><script src="http://static.ak.fbcdn.net/connect.php/js/FB.Share"></script></div>');
	
	
	
	
	////////////////////////
	//get content
	//get words of the first div
	var words = $('body>div div').text().match(/\b([a-zA-Zéèàê]{4,14})\b/g);		//increase importance of depth div
	calcul_score(words , 1);	//content of div importance of 1
	
	var hn = $('h1, h2').text().match(/\b([a-zA-Zéèàê]{4,14})\b/g);		//increase importance of depth div
	calcul_score(words , 2);	//content of h1 and h2 importance of 2
	
	var hn = $('title').text().match(/\b([a-zA-Zéèàê]{4,14})\b/g);		//increase importance of depth div
	calcul_score(words , 4);	//content of title importance of 4
	
	
	
	
	//////////////////
	//sort associative array
	var score_sort = new Array();		//to store words
	var score_note = new Array();		//to store score
	
	for(key in score)
	{
	
		//focus on more important words
		if(score[key] > total/130)
		{	
		
			//test plurials
			if((/s$/.test(key)) && (score[key.replace(/s$/, "")]))
			{
				key = key.replace(/s$/, "");
			}		
			
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


		}	
	}
	
	
	
	
	
	
	var keywords_used = new Array;
	
	
	///////////////////////
	//show keywords
	score_note = score_note.sort(sortNumber).reverse();
	for(note in score_note)
	{
		//$('#chooply_bar').append(score_note[note] +"<br>");	//show frequence
		for(word in score_sort[score_note[note]])
		{
		
			//test if it's bigram. words in bigrams could be only use one time
			if(/[a-z]*\s[a-z]/.test(score_sort[score_note[note]][word]))
			{
				//extract each words
				var bigram_words = score_sort[score_note[note]][word].split(' ');
				
				
				//test if words used before in keywords
				if((!keywords_used[bigram_words[0]]) && (!keywords_used[bigram_words[1]]))
				{
					$('#chooply_bar #chooply_keywords').append("<li><span>" + score_sort[score_note[note]][word] + "</span></li>");
					
					//set words used
					keywords_used[bigram_words[0]] = 1;
					keywords_used[bigram_words[1]] = 1;				
				}	
				
				
			}
			else		//simple words
			{
				//test if used
				if(!keywords_used[score_sort[score_note[note]][word]])
				{
					$('#chooply_bar #chooply_keywords').append("<li><span>" + score_sort[score_note[note]][word] + "</span></li>");
					
					//set word use
					keywords_used[score_sort[score_note[note]][word]] = 1;				
				}
			
			}

		}
	
	}	//end show keywords
	
	
	
	
	
	////////////////////////
	//more button
	
	//show button more if necessary
	var max_size = $('#chooply_bar #chooply_keywords').height();
	if( max_size > 50)
	{
		$('#chooply_bar #chooply_more').show();
	}
	
	//set max line of ul for labels on one line
	$('#chooply_bar #chooply_keywords').css("max-height", "20px");
	
	
	//click on more
	$('#chooply_bar #chooply_more').click(function() {
		$('#chooply_bar #chooply_keywords').css('height','auto').css('max-height',350);
	});
	
	
	
})
