/**
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
	var duration = parameters.duration? parameters.duration : "2000";
	var direction = parameters.direction? parameters.direction : +1;

	// styling
	placeholder.className += " slideWrapper"; // common class for css styles
	placeholder.style.width = width + "px";



	/**
	 * counts from 1 to (numberOfSlides-1) [or backward, depends on direction] 
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
	} 


	/**
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
		// lets add events
		prevNav.addEventListener('click', function(e) {
			window.clearInterval(timer);
			doIt(-1);
			e.preventDefault();
		});
		nextNav.addEventListener('click', function(e) {
			window.clearInterval(timer);
			doIt(+1);
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
		// lets add events
		pauseNav.addEventListener('click', function(e) {
			window.clearInterval(timer);
			e.preventDefault();
		});
		playNav.addEventListener('click', function(e) {
			window.clearInterval(timer);
			timer = window.setInterval(function() {
				doIt(+1);
			}, duration); // +1 or -1 for now only!
			e.preventDefault();
		});
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
			var tmbn = makeImgTag(imagesArray[i], "tmbn");
			el.appendChild(tmbn);
			tmbn.addEventListener('click', function(e) {
				//window.clearInterval(timer);
				console.log(i, step, i - step);
				e.preventDefault();
			});
		}
	};
	this.generateThumbnails();

	/**
	 * moves last of slides from [fromPos] to [toPos] and removes previous slide after that
	 * @param  {HTMLElement}	opts.target					moved element
	 * @param  {Boolean}		opts.removeAfterMoving		moved element
	 * @param  {number}			opts.shift
	 */
	this.animate = function (opts) {
		var target = opts.target;
		var fromPos = parseInt(target.style.left);
		var toPos = fromPos + opts.shift;

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

	function doIt(direction) {
		var shift = direction > 0 ? -width : width;

		self.animate({															// moving CURRENT slide
			target: newSlide,
			shift: shift,
			removeAfterMoving: true												// and delete CURRENT slide
		});
		counter(direction);														// step++
		newSlide = addSlide(step, direction > 0 ? width : -width);				// add NEXT slide
		self.animate({															// moving NEXT slide
			target: newSlide,
			shift: shift,
			removeAfterMoving: false
		});
	}

	var timer = window.setInterval(function() {
		doIt(+1);
	}, duration); // +1 or -1 for now only!







} // END slider()
