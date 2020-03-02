//Global Variable
var input;
var style = document.getElementsByTagName("style")[0];

/* 1. Grab the input value */
document.querySelector(".js-go").addEventListener('click',function(e){
	//console.log(e);
	 input = document.querySelector("input").value;

	 trigger(input);
});

document.querySelector(".js-userinput").addEventListener('keyup',function(e){
	 //console.log(e);
	 input = document.querySelector("input").value;

	 // if the key ENTER is pressed...
	 if (e.key === "Enter") {
	 	trigger(input);
	 } else {
	 	return ("error");
	 }
	 
});



/* 2. do the data stuff with the API */

function trigger(input) {
	
	input = input.split(" ").join("+");
	console.log(input);
	var url="http://api.giphy.com/v1/gifs/search?q="+input+"&api_key=dc6zaTOxFJmzC";
	console.log(url);

	// AJAX Request
	var GiphyAJAXCall = new XMLHttpRequest();
	GiphyAJAXCall.open('GET',url,true);
	GiphyAJAXCall.send();

	GiphyAJAXCall.addEventListener('load',function(e){
	var data = e.target.response;
	pushToDOM(data);

});

};


/* 3. Show me the GIFs */
function pushToDOM(input) {
	var response = JSON.parse(input);
	var imageUrls = response.data;
	var container = document.querySelector(".js-container");
	container.innerHTML = "";

	imageUrls.forEach(function(image){
		var src = image.images.fixed_height.url;
 		container.innerHTML+= "<img src=\"" + src + "\">";
 		/*style.innerHTML = `
	  		img {
	  		margin: 0px 2.5px;
		  }
		  `;
		document.head.appendChild(style);*/

	});


}
 