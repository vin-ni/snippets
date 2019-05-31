# Snippets
- [Snippets](#snippets)
  * [Scroll Checker](#scroll-checker)
  * [Debounce Function](#debounce-function)
  * [Execute function by name with params](#execute-function-by-name-with-params)
  * [Log with color](#log-with-color)
  * [Simplest Password](#simplest-password)
  * [Normalize / Map Value Range to different Range](#normalize---map-value-range-to-different-range)
  * [GSAP timeline base](#gsap-timeline-base)
  * [Get inner width for canvas resizing](#get-inner-width-for-canvas-resizing)
  * [Script to log console to dom (for debugging webview for example)](#script-to-log-console-to-dom--for-debugging-webview-for-example-)
  * [Remove css hover states on touch devices](#remove-css-hover-states-on-touch-devices)
  * [Run local node server on mobile](#run-local-node-server-on-mobile)
  * [Bind global error event listener](#bind-global-error-event-listener)
  * [Random Number min, max](#random-number-min--max)
  * [Pm2 Stuff](#pm2-stuff)

<!-- TOC generated with https://ecotrust-canada.github.io/markdown-toc/ -->

## Scroll Checker

``` javascript
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
```

## Debounce Function

```javascript
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
```


## Execute function by name with params
```javascript
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
```

## Log with color
```javascript
function (text, color){
	let x = "blue";
	if (color) { x = color }
	console.log(`%c ${text} `, 'background: #fff; color: ' + x + '');
}
```


## Simplest Password
```html
<!-- HTML -->
<div id="pwWrapper" style="position: fixed; left: 0; top: 0; width: 100%; height: 100%; z-index: 99999999; background: #fff;"> <form>
	<label for="pswd">Enter your password: </label>
		<input type="password" id="pswd">
	<input class="inputButton" type="button" value="Submit" onclick="checkPswd();" />
	</form>
</div>
```
```javascript
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
```

## Normalize / Map Value Range to different Range
```javascript
/* (currentValue, currentMin, currentMax, mapMin, mapMax) */
function normalize(v,vmin,vmax,tmin, tmax){
	var nv = Math.max(Math.min(v,vmax), vmin);
	var dv = vmax-vmin;
	var pc = (nv-vmin)/dv;
	var dt = tmax-tmin;
	var tv = tmin + (pc*dt);
	return tv;
}
```

## GSAP timeline base
```javascript
var tl = new TimelineLite();
tl.set(element.rotation, { x: 0);
tl.to(element.rotation, 2, { x: rotation, ease: Power2.easeInOut }, "firstRotation");

new TimelineLite({
  onComplete: function () {
    if (self.params.runAnimation) {
      // this.restart();
      this.seek("finalLoop");
    }
   }
});

// pause
tl.to({}, 2, {});

// run function
tl.add(function () {
  // this.function();
}, "tag");

```

## Get inner width for canvas resizing

```javascript
let windowWidth = window.innerWidth
|| document.documentElement.clientWidth
|| document.body.clientWidth;
```


## Script to log console to dom (for debugging webview for example)
```html
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
```

## Remove css hover states on touch devices

```javascript
var touch = 'ontouchstart' in document.documentElement
            || (navigator.MaxTouchPoints > 0)
            || (navigator.msMaxTouchPoints > 0);

if (touch) { // remove all :hover stylesheets
    try { // prevent exception on browsers not supporting DOM styleSheets properly
        for (var si in document.styleSheets) {
            var styleSheet = document.styleSheets[si];
            if (!styleSheet.rules) continue;

            for (var ri = styleSheet.rules.length - 1; ri >= 0; ri--) {
                if (!styleSheet.rules[ri].selectorText) continue;

                if (styleSheet.rules[ri].selectorText.match(':hover')) {
                    styleSheet.deleteRule(ri);
                }
            }
        }
    } catch (ex) {}
}
```

## Run local node server on mobile

1. check pc ip with terminal: ifconfig / ipconfig getifaddr en2
2. change in node app.js line 101:  server.listen(port, "192.168.178.32",
3. open on phone 192.168.178.32:1337


## Bind global error event listener

```javascript
window.addEventListener('error', function (event) {
    console.log("ERROR: " + event.message + " at " + event.filename + " : " + event.lineno + " : " + event.colno);
});
```

## Random Number min, max

```javascript
function rrand(min, max) {
	return Math.random() * (max - min) + min;
};
```

## Pm2 Stuff

| code | description |
|------|-------------|
| `pm2 list` | to see all active processes |
| `pm2 start ecosystem.config.js` | to start with ecosystem in mind |
| `pm2 monit` | Monitor all processes |
| `pm2 ecosystem` | generate a sample process file |


## Make Id
```javascript
function makeid(length) {
	var result           = '';
	var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	var charactersLength = characters.length;
	for ( var i = 0; i < length; i++ ) {
		 result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
}
```

## Arrays
```javascript
const fruits = ['banana', 'pear', 'apple']
const allfruits = fruits.concat('mango')
```

Notice that concat() does not actually add an item to the array, but creates a new array, which you can assign to another variable, or reassign to the original array (declaring it as let, as you cannot reassign a const):
