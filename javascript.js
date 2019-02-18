/* ====== SCROLL CHECKER ======*/
Kok.prototype.scrollChecker = function (distance, callback) {
    window.addEventListener("scroll", function checkScroll() {
        var scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
        if (scrollTop > distance) {
            window.removeEventListener("scroll", checkScroll, false);
            callback();
        }
    }, false);
}

Kok.prototype.removeScrollIcon = function () {
    alert("YES!");
}

// example without var
this.scrollChecker(40, this.removeScrollIcon);

// example with var
this.params.removeScrollIconFunction = this.removeScrollIcon;
this.scrollChecker(40, this.params.removeScrollIconFunction);

/* ====== DEBOUNCE FUNCTION ======*/
Kok.prototype.debounce = function (func, wait, immediate) {
    // 'private' variable for instance
    // The returned function will be able to reference this due to closure.
    // Each call to the returned function will share this common timer.
    var timeout;

    // Calling debounce returns a new anonymous function
    return function () {
        // reference the context and args for the setTimeout function
        var context = this,
            args = arguments;

        // Should the function be called now? If immediate is true
        //   and not already in a timeout then the answer is: Yes
        var callNow = immediate && !timeout;

        // This is the basic debounce behaviour where you can call this 
        //   function several times, but it will only execute once 
        //   [before or after imposing a delay]. 
        //   Each time the returned function is called, the timer starts over.
        clearTimeout(timeout);

        // Set the new timeout
        timeout = setTimeout(function () {

            // Inside the timeout function, clear the timeout variable
            // which will let the next execution run when in 'immediate' mode
            timeout = null;

            // Check if the function already ran with the immediate flag
            if (!immediate) {
                // Call the original function with apply
                // apply lets you define the 'this' object as well as the arguments 
                //    (both captured before setTimeout)
                func.apply(context, args);
            }
        }, wait);

        // Immediate mode and no wait timer? Execute the function..
        if (callNow) func.apply(context, args);
    };
}

// example
this.slideUpdateDebounce = this.debounce(function () {

}, duration);

//then call it as often you like
this.slideUpdateDebounce();


/* ====== EXECUTE FUNCTION BY NAME WITH ARGS ======*/
Kok.prototype.executeFunctionByName = function (functionName, context, args) {
    // only make array if not already array
    if (Object.prototype.toString.call(args) !== '[object Array]') {
        args = Array.prototype.slice.call(arguments, 2);
    }

    var namespaces = functionName.split(".");
    var func = namespaces.pop();
    for (var i = 0; i < namespaces.length; i++) {
        context = context[namespaces[i]];
    }
    return context[func].apply(context, args);
}

/* ====== LOG WITH COLOR ======*/
Kok.prototype.log = function (text, color) {
    let x = "blue";
    if (color) { x = color }
    console.log(`%c ${text} `, 'background: #fff; color: ' + x + '');
}


/* ====== SIMPLEST PASSWORD ======*/
// HTML:
//<div id="pwWrapper" style="    position: fixed; left: 0; top: 0; width: 100%; height: 100%; z-index: 99999999; background: #fff;"> <form>
//<label for="pswd">Enter your password: </label>
//<input type="password" id="pswd">
//<input class="inputButton" type="button" value="Submit" onclick="checkPswd();" />
//</form>
//</div>

function checkPswd() {
    var confirmPassword = "cari";
    var password = document.getElementById("pswd").value;
    if (password == confirmPassword) {
        document.getElementById('pwWrapper').remove();
    }
    else{
        alert("Passwords do not match.");
    }
}

/* ====== Normalize / Map Value Range to different Range ======*/
/* (currentValue, currentMin, currentMax, mapMin, mapMax) */
function normalize(v,vmin,vmax,tmin, tmax){

	var nv = Math.max(Math.min(v,vmax), vmin);
	var dv = vmax-vmin;
	var pc = (nv-vmin)/dv;
	var dt = tmax-tmin;
	var tv = tmin + (pc*dt);
	return tv;

}

/* ====== GSAP Timelinebase ======*/
var tl = new TimelineLite();
tl.fromTo(el1, {width:"0%"}, {width:"100%"});
tl.fromTo(el2, 1, {height:"0%"}, {height:"100%"},"-=2");

/* ====== GET INNER WIDTH FOR CANVAS RESIZING ======*/
let windowWidth = window.innerWidth
|| document.documentElement.clientWidth
|| document.body.clientWidth;

/* ====== Script to log console to dom (for debugging webview for example) ======*/

<script
src="https://code.jquery.com/jquery-2.2.4.js"
integrity="sha256-iT6Q9iMJYuQiMWNd9lDyBUStIq/8PuOW33aOqmvFpqI="
crossorigin="anonymous"></script>

<div id="debug" style="position: fixed;left: 0	top:0;background: red;
padding: 20px; z-index: 999999999999"></div>
<script>
  console.log = function(message) {$('#debug').append('<p>' + message + '</p>');};
  console.error = console.debug = console.info =  console.log
</script>


