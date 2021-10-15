# PlatformerJS Template
### A simple Unity-like JavaScript platformer template/engine.

## Documentation/Features:
```js
FPS;
width;
height;
Input;
Camera;
Time;
Statistics;
```
Global variables (which you are allowed to use and may help).
`FPS`: The number of frames per in a second the program is currently running at.
`width`: The `width` of the `canvas` being used for your platformer.
`height`: The `height` of the `canvas` being used for your platformer.
`Input`: Provides you with access to user input, usage:
```js
// Input.KEY e.g:
Input.W;       // returns true or false depending on whether the 'W' key is held down on the user's keyboard
// Input[keyCode] e.g:
Input[32];     // returns true or false depending on whether the 'Space' key (spacebar) is held down on the user's keyboard
Input.mouseX;  // returns the x position of the user's cursor
Input.mouseY;  // returns the y position of the user's cursor
Input.pmouseX; // returns the previous x position of the user's cursor
Input.pmouseY; // returns the previous y position of the user's cursor
```
`Camera`: The position of the `Camera` in the current level;
```js
Camera.x; // you are able to get and set the camera's x position
Camera.y; // you are able to get and set the camera's y position
```
`Time`: Time based object.
```js
Time.startTime;   // returns the time in milliseconds when the platformer was started
Time.timeElapsed; // returns the time in milliseconds since the platformer was started
Time.deltaTime;   // returns the number of milliseconds since the last frame
Time.now;         // returns the current time in milliseconds
```
`Statistics`: Statistics based object.
```js
Statistics.deaths;               // the number of times the player has died
Statistics.millisecondsElapsed;  // the number of milliseconds since the platformer was started
Statistics.secondsElapsed;       // the number of seconds since the platformer was started
Statistics.minutesElapsed;       // the number of minutes since the platformer was started
Statistics.millisecondsToFinish; // the number of milliseconds it took to complete the platformer
Statistics.secondsToFinish;      // the number of seconds it took to complete the platformer
Statistics.minutesToFinish;      // the number of minutes it took to complete the platformer
```

#### Dealing with events:
Mouse and keyboard events call functions named similarly to the event:
- `keyDown`
- `keyUp`
- `keyPress`
- `mouseDown`
- `mouseUp`
- `mouseClick`
- `mouseMove`
You can change these functions to create your own actions when these events occur, e.g:
```js
keyDown = function () {
	// action/s that occur when a key is pressed
}
```

```js
Platformer.initCanvas(id, ?fullScreen);
```
Sets up a canvas (based on ID).

`ID`: The `ID` of the `HTML` `canvas` you want to use for your platformer.
`fullScreen`: Whether or not your canvas should be scaled to fit the screen. (Defaults to true.)

```js
Platformer.Start(?lastLevel);
```
`lastLevel`: Indicates which level is the last level (defaults to the last level you input). When the last level is finished, the time taken for the player to finish the game is recorded in `Statistics`. This is useful, if, for example you wish to display statistics about how long it took the player to complete the game, how many times they died etc on a last level that has no finish.
Starts your platformer game.

```js
Platformer.End();
```
This is automatically called on the last level of your platformer. This **does not stop** the platformer, it is only used to record how long it took to complete the platformer.

```js
Platformer.Stop();
```
This **ends** the platformer. After this nothing will be rendered to the canvas by PlatformerJS (nor will the canvas be cleared). This could be useful to create a win screen at the end of the platformer rather than an impossible to complete level.

```js
new Vector2(x, y);
new Point(x, y);   // Point is the same as Vector2
```
A 2D point.

`x`: The `x` position of the 2D coordinate.
`y`: The `y` position of the 2D coordinate.
```js
getX();                      // returns the x position of the point
getY();                      // returns the y position of the point
setX(x);                     // sets the x position of the point
setY(y);                     // sets the y position of the point
add(point);                  // adds the x and y positions of the point to the current point
sub(point);                  // subtracts the x and y positions of the point from the current point
mult(point);                 // multiplies the x and y positions of the current point by the point
div(point);                  // divides the x and y positions of the current point by the point
dist(point);                 // returns the distance between the point and the current point
dot(point);                  // returns the dot product of the points
mag();                       // returns the magnitude of the point
normalize();                 // normalizes the current point
array();                     // returns the current point in array form [x, y]
static dist(point1, point2); // returns the distance between two points
static dot(point1, point2);  // returns the dot product of the points
static array(point);         // returns the point in array form [x, y]
static Zero();               // returns a point with x, y = 0, 0
```

```js
new PolygonMesh(points);
```
Creates a polygon out of an array of points. (Used in objects.)
`points`: An array of `Vector2`s or `Point`s.
```js
changeX(distance);     // moves the polygon input distance on the x axis
changeY(distance);     // moves the polygon input distance on the y axis
move(xDist, yDist);    // moves the polygon input distance on the x and y axis
getMidpoint();         // returns the center point of the polygon
rotate(degree);        // rotates the polygon input degrees
pointInPolygon(point); // returns whether or not input point is inside the polygon
collision(other);      // returns whether or not the polygon collides with another polygon
render(colour);        // renders the polygon the input colour
```

```js
new RectangleMesh(width, height);
```
Creates a rectangle mesh out of input width and height (`RectangleMesh` is an extension of polygon and keeps all properties polygons have). (Used in objects.)
`width`: The `width` of the rectangle.
`height`: The `height` of the rectangle.

```js
new PObject(x, y, mesh, colour, type, ?update);
```
Create a platform object. (Should be stored in a level.)

`x`: The `x` position for the `PObject`.
`y`: The `y` position for the `PObject`.
`width`: The width of the `PObject`.
`height`: The height of the `PObject`.
`colour`: The colour of the `PObject`.
`type`: The type of `PObject` (defines how the object interacts with the player).
`update`: A special function called every frame.

```js
new PText(message, font, size, x, y, colour, type, update);
```
Create a text object. (Should be stored in a level.)

`message`: The `message` to be displayed.
`font`: The `font` style to for the message.
`size`: The `size` of the message.
`x`: The `x` position for the `PText`.
`y`: The `y` position for the `PText`.
`colour`: The colour of the `PText`.
`type`: How the `PText` interacts with the player.
`update`: A special function called every frame.

```js
new CustomPObject(x, y, ?update, ?render);
```
`x`: The `x` position for the `CustomPObject`.
`y`: The `y` position for the `CustomPObject`.
`update`: An (optional) function to be run each frame.
`render`: An (optional) function to render the `CustomPObject`.

```js
new PersistentPObject(x, y, ?update, ?render);
```
`x`: The `x` position for the `PersistentPObject`.
`y`: The `y` position for the `PersistentPObject`.
`update`: An (optional) function to be run each frame.
`render`: An (optional) function to render the `PersistentPObject`.
The difference between a `PersistentPObject` and a `CustomPObject` is that a `PersistentPObject` is active throughout **all** levels. You can simply create a `PersistentPObject` with the `new` keyword and `PlatformerJS` will automatically do the rest (no need to store it in a variable or add it into a level/s).

```js
new Level(objects, ?start, ?end);
```
Create a level based on an array of objects. (Note: no need to save to variable.)
`objects`: An array of `PObject`s, `PText` objects and `CustomPObject`s.
`start`: A function called when the level is first entered.
`end`: A function called just before the level is exited.

```js
new Player(x, y, mesh, colour, ?canWallJump, ?update);
```
Create a player object. (Note: no need to save to variable)

`x`: The starting `x` position for the player. (Will respawn at this `x` coordinate.)
`y`: The starting `y` position for the player. (Will respawn at this `y` coordinate.)
`mesh`: The mesh used for collisions with platforms.
`colour`: The colour of the player.
`canWallJump`: Whether or not the player can 'wall jump' (bounce up walls).
`update`: A special function called every frame.

#### Math shortcuts:
```js
pi;    // Math.PI
pow;   // Math.pow
log;   // Math.log
sqrt;  // Math.sqrt
round; // Math.round
min;   // Math.min
max;   // Math.max
abs;   // Math.abs
sin;   // Math.sin
cos;   // Math.cos
tan;   // Math.tan
asin;  // Math.asin
acos;  // Math.acos
atan;  // Math.atan
```

#### Built-in functions:
```js
frameRate(frames);            // changes the number of frames per second (defaults to 60)
dist(x1, y1, x2, y2);         // returns the distance between two 2D points (x1, y1 and x2, y2)
degreesToRadians(degrees);    // returns input degrees as radians
radiansToDegrees(radians);    // returns input radians as degrees
random(min, max);             // returns a random number between min and max
randomInt(min, max);          // returns a random whole number between min and  max
isPrime(num);                 // returns whether or not a number is prime
constrain(num, min, max);     // returns input number restrained by input min and max
clamp(num, min, max);         // returns input number restrained by input min and max
lerp(value1, value2, amount); // linear interpolation, returns a value between value1 and value2 depending on linear interpolation amount
```

## How to use:
First thing's first, you will need to get the `PlatformerJS` scripts, and you can do so using this GitHub CDN repository. Add this `script` tag to your HTML page: `<script type="text/javascript" src="https://Matt-DESTROYER.github.io/CDN/JS/Platformer/Platformer.js"></script>`.

Next you will need to set up three things;
- A `HTML` `canvas`
- A player for you platformer
- Levels for your platformer

(The order doesn't matter)

To set up a `canvas`:
The easiest way is to just add a canvas into the body of your `HTML` file:
`<canvas id="canvas-id"></canvas>` (Note: `canvas-id` can be replaced with any name, for example I sometimes use `game-screen`.)

Then to setup the `canvas` to work with `PlatformerJS` simply call:
```js
Platformer.initCanvas(canvasID, fullScreen?);
```
For the first parameter pass in a string storing the id that you gave to your canvas, for the second parameter specify whether or not you want `PlatformerJS` to automatically scale the `canvas` to fill the screen (if you don't pass a value into the second paramter, it will default to true).

Next you will need a player for your platformer. You can create a player by calling:
```js
new Player(x, y, mesh, colour, ?canWallJump, ?update);
```
To create the player you will need to specify its x and y position, width and height, colour, (optionally) whether or not it can walljump, and (optionally) an update function (this is good for things like having a smooth camera follow and also allows you to move your player based on input).

Note: it can be useful to store the player in a variable to allow access to the player through the variable. This allows things like teleportation through setting the player's position.
```js
new PolygonMesh(points);
new RectangleMesh(width, height);
```
A mesh or a collider is an object used for collisions with the player.

To create a `PolygonMesh` you need to input an array of `Point`s or `Vector2`s (they are identical).

To create a `RectangleMesh` you need to input the width and height for the rectangle. The `RectangleMesh` is really a `PolygonMesh` that when given a width and height, generates four points in a rectangle shape.
```js
// create a player at x: 0, y: 50, with a square shaped PolygonMesh, that is blue, and can move when the player presses certain keys and has a smooth camera follow and resets/dies when the player's y position gets lower than twice the height of the canvas.
// note that the player is stored in a variable to allow platforms access to the player object later
let player = new Player(0, 50, new PolygonMesh([
	// vertices of a rectangle
	new Vector2(-12, -12),
	new Vector2(12, -12),
	new Vector2(12, 12),
	new Vector2(-12, 12)
]), "blue", true, function () {
	// update function, called every frame
	Camera.x = lerp(Camera.x, this.x - width / 2 + 12.5, 0.1);
	Camera.y = lerp(Camera.y, this.y - height / 2 + 12.5, 0.1);
	// jump
	if (Input.W || Input[38] || Input[32]) {
		this.jump();
	}
	// move left
	if (Input.A || Input[37]) {
		this.addForce(-2, 0);
	}
	// move right
	if (Input.D || Input[39]) {
		this.addForce(2, 0);
	}
	// if the player's y position is
	// greater than 2 times the screen
	// height, reset the player
	if (this.y > height * 2) {
		this.reset();
	}
});
```

Lastly you will need some levels for your platformer! You can add levels to the platformer by calling:
```js
new Level(objects);
```
(Note: levels are automatically stored by `PlatformerJS`) The only parameter in the level should be an array of `PText`s and/or `PObject`s.
```js
new PObject(x, y, mesh, colour, type, ?update);
new PText(message, font, size, x, y, colour, type, ?update);
```
To create a `PObject`: you must specify the x and y position of the `PObject`, the mesh the `PObject` should use (either `PolygonMesh` or `RectangleMesh`), the colour the `PObject` should be rendered in, the type that the `PObject` is, and optionally an function to be called every frame (this is good for moving platforms).

To create a `PText`: you must specify the message to be displayed, the font to be used, the size for the font, the x and y position for the text to be displayed at, the colour to be used to render the text, the text type, and optionally an function to be called every frame (this is good for signs that only show text when the player is close enough).
### Types:
- 0 - Air (player doesn not collide)
- 1 - Solid (player collides)
- 2 - Danger (resets/kills player)
- 3 - Trampoline (bounces player)
- 4 - Water (slows the player but allows them to 'swim' upwards)
- 9 - Finish (sends player to next level)

```js
new Vector2(x, y);
new Point(x, y);
```
A 2D point defined by an x and y coordinate. To create a `Vector2` or `Point`, you need to input a number for the x coordinate and y coordinate.

Now to put it all together:
```js
new Level([
	// a solid, black, rectangular, platform
	new PObject(0, 100, new RectangleMesh(150, 25), "black", 1),
	// a deadly, red, triangular, platform
	new PObject(52, 73.5, new PolygonMesh([
		new Vector2(-20, 0),
		new Vector2(0, -40),
		new Vector2(20, 0)
	]), "red", 2),
	new PText("Text", "Arial", 20, 0, -200, "black", 0, function () {
		if (dist(this.x, this.y, player.x, player.y) <= 50) {
			this.message = "Text";
		} else {
			this.message = "";
		}
	}),
	// a level finish at the end (you might not want to add this on the last level)
	new PObject(125, 0, new RectangleMesh(50, 50), "green", 9)
]);
```

Now you can create as many levels as you want!

All that's left to do is start your platformer which you can do by calling:
```js
Platformer.Start();
```
Note: that any lines of code after the platformer is started will likely not run (this should be the very last thing you do).

## Coming soon:
- `PersistentObject`: an object that is active during **all** levels.
