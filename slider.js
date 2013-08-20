var output = "";

function slider(parameters) {

	///////////////////////// settings /////////////////////////
	// path to file if specified, root - if not
	var path = parameters.path? parameters.path + "/" : "";
	// images parameter processing
	var imagesArray = parameters.images.replace(new RegExp(" ",'g'),"").split(","); // remove all empty spaces and make Array
	// define block to whick insert slider
	var placeholder = document.getElementById(parameters.placeholder);
	// size
	placeholder.className += " slideWrapper";
	var width = parameters.width? parameters.width : 472;
	var height = parameters.height?  parameters.height : 238;
	placeholder.style.width = width + "px";
	placeholder.style.height = height + "px";
	// speed
	var duration = parameters.duration? parameters.duration : "500";
	// forward/backward
	var direction = parameters.direction? parameters.direction : +1;




	var children = placeholder.childNodes; // all slides

	var numberOfSlides = imagesArray.length;

	///////////////////////// processing /////////////////////////
	// for each image in array make html tag
	//for (var i = 0; i < numberOfSlides; i++) {
	//	output += makeImgTag(imagesArray[i]);
	//}

	///////////////////////// rendering /////////////////////////
	//placeholder.innerHTML = output;

	///////////////////////// rotating /////////////////////////
	showSlide(0);
	var timer = setInterval(function() { letsCount(direction) }, duration); // +1 or -1 for now only!


	var step = 0;
	function letsCount(direction) {

		//hideSlide(step); // REMOVE
		step = step + direction;

		if ((direction > 0) && (step > numberOfSlides - 1)) {
			step = 0;
		} else if ((direction < 0) && (step < 0)) {
			step = numberOfSlides - 1;
		}

		showSlide(step); // ANIMATE

	} // END letsCount()

	function makeImgTag(imgUrl) {
		var imgTag = '<img src="' + path + imgUrl + '" class="slide" alt="" />';
		return imgTag;
	} // END makeImgTag()


	//function hideSlide(whatSlideToHide) {
	//	setTimeout(function() {
	//		placeholder.removeChild(placeholder.firstChild);
	//	}, duration);
	//} // END showSlide()

	function showSlide(whatSlideToShow) {
		placeholder.innerHTML += makeImgTag(imagesArray[whatSlideToShow]); // append <img> with next or previous jpg
		animation((direction > 0)? width : -width, 0);
	} // END showSlide()

	var sliding = false;
	var slidePos = 0;

	function animation(fromPos, toPos) {

		curSlide = placeholder.lastChild;
		curSlide.style.left = fromPos + "px";
		slidePos = fromPos;

		sliding = clearInterval(sliding);
     
		sliding = setInterval(function() {
			if (fromPos >= 0 && slidePos > toPos ) {
				slidePos -= width/20;
				curSlide.style.left = slidePos + "px";
			} else if (fromPos <= 0 && slidePos < toPos ) {
				slidePos += 20;
				curSlide.style.left = slidePos + "px";
			} else {
				sliding = clearInterval(sliding);
				if (curSlide.previousElementSibling) placeholder.removeChild(curSlide.previousElementSibling);  // WTF? why function don't stop after clearInterval - we need remove 1st <img> once manualy
				curSlide.style.left = toPos + "px";
        	}
	    }, 10 );

	} // END animation()


} // END slider()
