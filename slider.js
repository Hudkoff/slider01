/**
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
	var duration = parameters.duration? parameters.duration : "2000";
	var direction = parameters.direction? parameters.direction : +1;

	///////////////////////// styling /////////////////////////
	placeholder.className += " slideWrapper"; // common class for css styles
	placeholder.style.width = width + "px";
	placeholder.style.height = height + "px";

	///////////////////////// controls /////////////////////////
	var prevNav = document.createElement("a");
	prevNav.className = "prev";
	prevNav.href = "#";
	var nextNav = prevNav.cloneNode(true);
	nextNav.className = "next";
	// insert two links
	placeholder.appendChild(prevNav);
	placeholder.appendChild(nextNav);
	
	///////////////////////// attaching events to controls /////////////////////////
	//prevNav.id = "prev";
	//document.getElementById('prev').onclick = function() { alert('Клик') }
	//prevNav.setAttribute("onclick", "alert()");
	//nextNav.setAttribute("onclick", "prev()");
	//prevNav.addEventListener('click', function() { alert('sdfs') }, false);
	//document.getElementsByTagName("a")[0].addEventListener('click', function() { alert('dsfsdf') }, false);
	document.getElementsByClassName("slideWrapper")[0].addEventListener('click', function() {
		clearInterval(timer);
		letsCount(-1);
		return false;
	}, false);
	

	///////////////////////// start auto rotating /////////////////////////
	showSlide(0, direction);
	var timer = setInterval(function() { letsCount(direction) }, duration); // +1 or -1 for now only!

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
	} 


	/**
	 * appends image tag to container and starts animation
	 * @param  {number}  whatSlideToShow  array of images key
	 * @param  {+1 | -1} direction       
	 */
	function showSlide(whatSlideToShow, direction) {
		placeholder.innerHTML += makeImgTag(imagesArray[whatSlideToShow]); // append <img> with next or previous jpg
		animation((direction > 0)? width : -width, 0);
	} 


	/**
	 * converts image name to image tag 
	 * @param  {string} imgFilename  single image name from array
	 * @return {string}              full <img> tag
	 */
	function makeImgTag(imgFilename) {
		var imgTag = '<img src="' + path + imgFilename + '" class="slide" alt="" />';
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

		//sliding = clearInterval(sliding); // just in case
		
		setTimeout(function run() {
		//sliding = setTimeout(function run() {
		//sliding = setInterval(function() {
			if (fromPos >= 0 && slidePos > toPos ) {
				slidePos -= width/20;
				curSlide.style.left = slidePos + "px";
				sliding = setTimeout(run, 10)
			} else if (fromPos <= 0 && slidePos < toPos ) {
				slidePos += width/20;
				curSlide.style.left = slidePos + "px";
				sliding = setTimeout(run, 10)
			} else {
				//clearInterval(sliding); // does not clear interval ??
				if (curSlide.previousElementSibling && curSlide.previousElementSibling.className == "slide") {
					placeholder.removeChild(curSlide.previousElementSibling)  // WTF? why function don't stop after clearInterval - we need remove 1st <img> once manualy
				}
				curSlide.style.left = toPos + "px";
				//console.log( "piu piu piu" )
        	}
	    }, 10 );
	} 

} // END slider()
