/*
	Chooply 2011
	Main part 
*/

$(document).ready(function(){


	//add div on body of the page to create the bar
	$('body').append('<div id="chooply_bar">My Bar</div>');
	
	//get text of the page
	//$('#chooply_bar').append($('body').text() +"<hr>");
	var words = $('body>div').text().match(/\b([a-zA-Zéèàê]{4,14})\b/g);
	
	
	for(key in words)
	{
		$('#chooply_bar').append(words[key] +"<br>");
	}
	
})
