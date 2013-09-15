/**
<<<<<<< HEAD
 * inserts slider into specified container and makes everything
 * @param  {string}  parameters.path        folder name or path "folder1/folder2"
 * @param  {string}  parameters.images      images list separated with ","
 * @param  {string}  parameters.placeholder id of element to which insert slider
 * @param  {number}  parameters.width       width of container and images
 * @param  {number}  parameters.height      height of container and images
 * @param  {number}  parameters.direction   forward backward sliding (+1 | -1)
 * @param  {number}  parameters.duration    interval
 */
function Slider(parameters) {
	var self = this;

	// --------------------- PRIVATE ----------------------------
	var path = parameters.path? parameters.path + "/" : ""; // root if empty
	var imagesArray = parameters.images.replace(new RegExp(" ",'g'),"").split(","); // remove all empty spaces and make Array
	var placeholder = document.getElementById(parameters.placeholder);
	var width = parameters.width? parseInt(parameters.width) : 472; // some verification and magic should be there
    var height = parameters.height?  parseInt(parameters.height) : 238;
=======
 * inserts slider into specified container and makes evererything
 * @param  {string}  path        folder name or path "folder1/folder2"
 * @param  {string}  images      images list separated with ","
 * @param  {string}  placeholder id of element to which insert slider
 * @param  {number}  width       width of container and images
 * @param  {number}  height      height of container and images
 * @param  {-1 | +1} direction   forward backward sliding
 * @param  {number}  duration    interval
 */
function slider(parameters) {

	///////////////////////// settings /////////////////////////
	var path = parameters.path? parameters.path + "/" : ""; // root if empty
	var imagesArray = parameters.images.replace(new RegExp(" ",'g'),"").split(","); // remove all empty spaces and make Array
	var placeholder = document.getElementById(parameters.placeholder);
	var width = parameters.width? parameters.width : 472;
	var height = parameters.height?  parameters.height : 238;
>>>>>>> dcbaab308e11c6efa15c936ad6793057d25385f1
	var duration = parameters.duration? parameters.duration : "2000";
	var direction = parameters.direction? parameters.direction : +1;

	///////////////////////// styling /////////////////////////
	placeholder.className += " slideWrapper"; // common class for css styles
	placeholder.style.width = width + "px";
<<<<<<< HEAD


	// --------------------- PUBLIC ----------------------------

	/**
	 * 1) generates HTML of Prev and Next links
	 * 2) bind events on them
	 */
	this.generateNav = function () {
		var prevNav = document.createElement("a");
		prevNav.className = "prev";
		prevNav.href = "#";
		var nextNav = prevNav.cloneNode(true);
		nextNav.className = "next";
		// lets insert two links
		placeholder.appendChild(prevNav);
		placeholder.appendChild(nextNav);
		prevNav.addEventListener('click', function(e) {
			window.clearInterval(timer);
			counter(-1);
			addSlide(step, 0);
			e.preventDefault();
		});
		nextNav.addEventListener('click', function(e) {
			window.clearInterval(timer);
			counter(+1);
			addSlide(step, 0);
			e.preventDefault();
		});
	};
	this.generateNav();

	/**
	 * 1) generates HTML of miniatures
	 * 2) bind events on them
	 */
	this.generatePlayPause = function () {
		var playNav = document.createElement("a");
		playNav.className = "play";
		playNav.href = "#";
		var pauseNav = playNav.cloneNode(true);
		pauseNav.className = "pause";
		// lets insert two links
		placeholder.appendChild(playNav);
		placeholder.appendChild(pauseNav);
	};
	this.generatePlayPause();

	/**
	 * generates HTML of slides wrapper
	 */
	this.generateSlidesWrapper = function () {
		var el = document.createElement("div");
		el.className = "slidesContainer";
		placeholder.appendChild(el);
		el.style.width = width + "px";
		el.style.height = height + "px";
	};
	this.generateSlidesWrapper();
	
	/**
	 * 1) generates HTML of miniatures
	 * 2) bind events on them
	 */
	this.generateThumbnails = function () {
		var el = document.createElement("div"); // placeholder.
		el.className = "thumbnails";
		placeholder.appendChild(el);
		el.style.width = width + "px";
		
		for (var i = 0; i < imagesArray.length; i++) {
			el.appendChild( makeImgTag(imagesArray[i], "tmbn") );
		}
	};
	this.generateThumbnails();

	/**
	 * moves last of slides from [fromPos] to [toPos] and removes previous slide after that
	 * @param  {HTMLElement} 	opts.target		moved element
	 * @param  {Boolean} 	opts.removeAfterMoving		moved element
	 * @param  {number} 		opts.shift
	 */
	this.animate = function (opts) {
		var target = opts.target;
		var fromPos = parseInt(target.style.left);			// 472
		var toPos = fromPos + opts.shift;					// -472

		var slidePos = fromPos;

		window.setTimeout(function run() {
			if (opts.shift < 0 && slidePos > toPos ) {		// moving to left && not arrived yet
				slidePos -= Math.round(width/20);
				target.style.left = slidePos + "px";
				window.setTimeout(run, 10);
			} else if (opts.shift > 0 && slidePos < toPos ) {
				slidePos += Math.round(width/20);
				target.style.left = slidePos + "px";
				window.setTimeout(run, 10);
			} else {
				if (opts.removeAfterMoving) {
					target.parentNode.removeChild(target);
				}
				target.style.left = toPos + "px";			// re-align if we have rounding inaccuracy
			}
		}, 10 );
	};






	///////////////////////// start auto rotating /////////////////////////
	var newSlide = addSlide(0, 0);
	var step = 0;
	var numberOfSlides = imagesArray.length;

	var timer = window.setInterval(function() {


		self.animate({                                                           // moving CURRENT slide
			target: newSlide,
			shift: direction > 0 ? -width : width,
			removeAfterMoving: true                                                // and delete CURRENT slide
		});
		counter(direction);                                                        // step++
		newSlide = addSlide(step, direction > 0 ? width : -width);                 // add NEXT slide
		self.animate({                                                           // moving NEXT slide
			target: newSlide,
			shift: direction > 0 ? -width : width,
			removeAfterMoving: false
		});


	}, duration); // +1 or -1 for now only!


	//function

	/**
	 * counts from 1 to (numberOfSlides-1) [or backward, depends on direction] and gives slide number to addSlide() function
	 * @param  {number} direction	(+1 | -1)
	 *
	 * @return {number} step		N of current slide
	 */
	function counter(direction) {
		step = step + direction;
		if (step > numberOfSlides - 1) {
			step = 0;
		}
		if (step < 0) {
			step = numberOfSlides - 1;
		}
		return step;
=======
	placeholder.style.height = height + "px";

	///////////////////////// controls /////////////////////////
	var prevNav = document.createElement("a");
	prevNav.className = "prev";
	prevNav.href = "#";
	var nextNav = prevNav.cloneNode(true);
	nextNav.className = "next";
	// lets insert two links
	placeholder.appendChild(prevNav);
	placeholder.appendChild(nextNav);
	
	///////////////////////// attaching events to controls /////////////////////////
	prevNav.addEventListener('click', function() { 
		window.clearInterval(timer);
		letsCount(-1);
		return false;
	}); 
	nextNav.addEventListener('click', function() { 
		window.clearInterval(timer);
		letsCount(+1);
		return false;
	}); 

	///////////////////////// start auto rotating /////////////////////////
	showSlide(0, direction);
	var timer = window.setInterval(function() { letsCount(direction) }, duration); // +1 or -1 for now only!

	///////////////////////// functions /////////////////////////
	/**
	 * counts from 1 to (numberOfSlides-1) [or backward, depends on direction] and gives slide number to showSlide() function
	 * @param  {+1 | -1} direction
	 */
	var step = 0;
	var numberOfSlides = imagesArray.length;
	function letsCount(direction) {
		step = step + direction;
		if ((direction > 0) && (step > numberOfSlides - 1)) {
			step = 0;
		} else if ((direction < 0) && (step < 0)) {
			step = numberOfSlides - 1;
		}
		showSlide(step, direction); // ANIMATE
>>>>>>> dcbaab308e11c6efa15c936ad6793057d25385f1
	} 


	/**
<<<<<<< HEAD
	 * appends image tag to container and starts animate
	 * @param {number}	whatSlideToShow  	array of images key
	 * @param {number}	initialPosition
	 *
	 * @return {HTMLElement} newSlide
	 */
	function addSlide(whatSlideToShow, initialPosition) {
		
		newSlide = makeImgTag(imagesArray[whatSlideToShow], "slide");
		placeholder.getElementsByClassName("slidesContainer")[0].appendChild(newSlide); // append <img> with next or previous jpg
		newSlide.style.left = initialPosition + "px";

		return newSlide;
	}


	/**
	 * converts image name to image tag
	 * @param imgFilename {string}	imgFilename  single image name from array
	 * @param className {string}	class that applies to image
	 *
	 * @returns {HTMLElement}		full <img> tag
	 */
	function makeImgTag(imgFilename, className) {
		var imgTag = document.createElement("img");
		imgTag.className = className;
		imgTag.href = "#";
		imgTag.src = path + imgFilename;
		return imgTag;
	}



=======
	 * appends image tag to container and starts animation
	 * @param  {number}  whatSlideToShow  array of images key
	 * @param  {+1 | -1} direction       
	 */
	function showSlide(whatSlideToShow, direction) {
		placeholder.appendChild( makeImgTag(imagesArray[whatSlideToShow]) ); // append <img> with next or previous jpg
		animation((direction > 0)? width : -width, 0);
	} 


	/**
	 * converts image name to image tag 
	 * @param  {string} imgFilename  single image name from array
	 * @return {string}              full <img> tag
	 */
	function makeImgTag(imgFilename) {
		var imgTag = document.createElement("img");
		imgTag.className = "slide";
		imgTag.href = "#";
		imgTag.src = path + imgFilename;
		return imgTag;
	} 


	/**
	 * moves last of slides from [fromPos] to [toPos] and removes previous slide after that
	 * @param  {[type]} fromPos  position of start (from left corner)
	 * @param  {[type]} toPos    position of finish (from left corner)
	 */
	//var sliding = false;
	function animation(fromPos, toPos) {
		curSlide = placeholder.lastChild;
		curSlide.style.left = fromPos + "px";
		var slidePos = fromPos;

		window.setTimeout(function run() {
		//sliding = setInterval(function() {
			if (fromPos >= 0 && slidePos > toPos ) {
				slidePos -= width/20;
				curSlide.style.left = slidePos + "px";
				sliding = window.setTimeout(run, 10);
			} else if (fromPos <= 0 && slidePos < toPos ) {
				slidePos += width/20;
				curSlide.style.left = slidePos + "px";
				sliding = window.setTimeout(run, 10);
			} else {
				//clearInterval(sliding); 
				if (curSlide.previousElementSibling && curSlide.previousElementSibling.className == "slide") {
					placeholder.removeChild(curSlide.previousElementSibling);
				}
				curSlide.style.left = toPos + "px";
        	}
	    }, 10 );
	} 
>>>>>>> dcbaab308e11c6efa15c936ad6793057d25385f1

} // END slider()
