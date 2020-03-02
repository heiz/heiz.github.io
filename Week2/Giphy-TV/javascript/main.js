//Global Variable
var input;
var style = document.getElementsByTagName("style")[0];
var container = document.querySelector(".js-container");

/* 1. do the data stuff with the API */


	
	var url="http://api.giphy.com/v1/gifs/search?q=funny+cat&api_key=dc6zaTOxFJmzC";
	console.log(url);

	// AJAX Request
	var GiphyAJAXCall = new XMLHttpRequest();
	GiphyAJAXCall.open('GET',url,true);
	GiphyAJAXCall.send();

	GiphyAJAXCall.addEventListener('load',function(e){
	var data = e.target.response;
	pushToDOM(data);

});



/* 2. Show Giphy TV */
function pushToDOM(data) {
	var response = JSON.parse(data);
	var imageUrls = response.data;
	
	//container.innerHTML = "";
	console.log(imageUrls);
	
	imageUrls.forEach(function(image,index){

    var src = image.images.original.url;
    console.log(image);
    console.log(src);
    setTimeout(function(){
    	container.innerHTML = "<img src=\"" + src + "\" class=\"container-image\">";
    },index *3000);
    
  });
	/*style.innerHTML += `
	  		.js-container {
	  		text-align:center;
		  }
		  `;
		document.head.appendChild(style);
		*/

}
 