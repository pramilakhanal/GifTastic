$(function(){
	renderButtons(animalArray,'searchButton', '#buttonsArea');
	console.log("Page Loaded");
})
// Initail array of Animals
var animalArray = ['Dog', 'Cat', 'Monkey', 'Bird', 'Cow', 'Horse', 'Giraffe', 'Deer', 'Bear', 'Goat', 'Sheep', 'Tiger', 'Lion'];

// Function to display animal data
function renderButtons(animalArray,classToAdd,areaToAddTo){
	// Deleting the animal button prior to add new
	$(areaToAddTo).empty();
	//looping through the array of animal
	for(var i=0; i<animalArray.length; i++){
		// dynamically generate buttons for each animal in the array
		var animalB = $('<button>');
		//Adding a class of animal to our button
		animalB.addClass(classToAdd);
		//Adding a data-attribute
		animalB.attr('data-type', animalArray[i]);
		//Providing the initial button text
		animalB.text(animalArray[i]);
		//Adding the button to the buttons-view div
		$(areaToAddTo).append(animalB);

	}
}

 //
 $(document).on('click','.searchButton',function(){
 	var type = $(this).data('type');
 	var queryURL = 'https://api.giphy.com/v1/gifs/search?q='+type+'&api_key=fG16nFVKuOdQ8OrNBrkyigVuw9FflmWN&limit=10';

 	//creating an Ajax call
 	$.ajax({
 		url: queryURL,
 		method: 'GET'})
 	.done(function(response){
 		$('.search-animal').empty();

 		for(var i=0; i<response.data.length;i++) {
 		// creating a div to hold the animal
 		var animalDiv = $('<div class="search-animal">');
 		// storing the rating data
 		var rating = response.data[i].rating;
 		//creating an element to hold the release year
 		var p = $('<p>').text('Rating: '+rating);
 		var animated = response.data[i].images.fixed_height.url;
 		var still = response.data[i].images.fixed_height_still.url;
 		//create an element to hold the image
 		var image = $('<img>');
 		//adding image-attribute as still first
 		image.attr('src',still);
 		image.attr('data-still' ,still);
 		//adding image-attribute as animated
 		image.attr('data-animated' ,animated);
 		image.attr('data-state','still');
 		image.addClass('searchImage');
 		animalDiv.append(p);
 		animalDiv.append(image);
 		$("#searches").append(animalDiv);
 		}
 	})

 })

 		$(document).on('click','.searchImage',function(){
 			var state = $(this).attr('data-state');
 			if(state == 'still'){
 				$(this).attr('src',$(this).data('animated'));
 				$(this).attr('data-state','animated');
 			} else {
 				$(this).attr('src',$(this).data('still'));
 				$(this).attr('data-state','still');

 			}

 		})

 		$('#addSearch').on('click',function(){
 			var newSearch = $('input').eq(0).val();
 			animalArray.push(newSearch);
 			renderButtons(animalArray,'searchButton', '#buttonsArea');
 			return false;
 		})


 		
