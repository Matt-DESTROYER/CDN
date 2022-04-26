# Documentation
```js
FPS;
width;
height;
Input;
Time;
```
Global variables (which you are allowed* to use).
`FPS`: The number of frames per second the program is currently running at.
`width`: The `width` of the `canvas` being used for your game.
`height`: The `height` of the `canvas` being used for your game.
* as opposed to variables which are not *recommended* to be used (although can still be)

`Input`: Provides you with access to user input, usage:
```js
// Input.KEY e.g:
Input.W;                       // -> returns true or false depending on whether the 'W' key is held down on the user's keyboard
// Input[keyCode] e.g:
Input[32];                     // -> returns true or false depending on whether the 'Space' key (spacebar) is held down on the user's keyboard
Input.keyCode;                 // -> returns the keycode of the last key pressed (set on keyDown)
Input.key;                     // -> returns the last key pressed (set on keyDown)
Input.mouseX;                  // -> returns the x position of the user's cursor
Input.mouseY;                  // -> returns the y position of the user's cursor
Input.mouseToWorldCoordinates; // -> returns a Vector2 containing the mouse coordinates relative to the camera in the current scene
Input.pmouseX;                 // -> returns the previous x position of the user's cursor
Input.pmouseY;                 // -> returns the previous y position of the user's cursor
```

`Time`: Time based object.
```js
Time.startTime;   // -> returns the time in milliseconds when the game was started
Time.timeElapsed; // -> returns the time in milliseconds since the game was started
Time.deltaTime;   // -> returns the number of milliseconds since the last frame
Time.now;         // -> returns the current time in milliseconds
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

You can also add event listeners to `GameObject`s using the `EventListener` class:
```js
new GameObject(x, y, polymesh, colour, collides, [
	new EventListener("click", function () {
		console.log("This GameObject was clicked!");
	}),
	new EventListener("start", function () {
		console.log("This GameObject was started!");
	}),
	new EventListener("update", function () {
		console.log("This GameObject was updated!");
	})
]);
// OR
const gameObject = new GameObject(x, y, polymesh, colour, collides);
// addEventListener(name, function);
gameObject.addEventListener("click", function () {
	console.log("This GameObject was clicked!");
});
// addEventListener(EventListener);
gameObject.addEventListener(new EventListener("click", function () {
	console.log("This GameObject was clicked!");
}));
```

```js
GameEngine.Initialise(?canvas, ?fullScreen, ?width, ?height);
```
Sets up a canvas and 2D context. (Note: passing in no arguments will result in the `GameEngine` creating a `canvas` and making its dimensions fill the screen).
`canvas`: The `ID` of the `HTML` `canvas` you want to use for your game.
`fullScreen`: Whether or not your canvas should be scaled to fit the screen. (Defaults to `true`.)
`width`: The width of your canvas (if `fullScreen` is `false`). (If no value is passed in the `canvas`s width will not be changed.)
`height`: The height of your canvas (if `fullScreen` is `false`). (If no value is passed in the `canvas`s width will not be changed.)

```js
GameEngine.Start();
```
Starts your game game. (Note: this should be the last line of code your personal scripts run, code after this line will likely not run)

```js
new Vector2(x, y);
new Point(x, y); // Point is the same as Vector2
```
A 2D point.

`x`: The `x` position of the 2D coordinate.
`y`: The `y` position of the 2D coordinate.
```js
getX();                      // -> returns the x position of the point
getY();                      // -> returns the y position of the point
setX(x);                     // -> sets the x position of the point
setY(y);                     // -> sets the y position of the point
add(point);                  // -> adds the x and y positions of the point to the current point
sub(point);                  // -> subtracts the x and y positions of the point from the current point
mult(point);                 // -> multiplies the x and y positions of the current point by the point
div(point);                  // -> divides the x and y positions of the current point by the point
dist(point);                 // -> returns the distance between the point and the current point
dot(point);                  // -> returns the dot product of the points
mag();                       // -> returns the magnitude of the point
normalize();                 // -> normalizes the current point
array();                     // -> returns the current point in array form [x, y]
clone();                     // -> clones the point
static dist(point1, point2); // -> returns the distance between two points
static dot(point1, point2);  // -> returns the dot product of the points
static array(point);         // -> returns the point in array form [x, y]
static Zero();               // -> returns a point with x, y = 0, 0
```

```js
new PolygonMesh(points);
```
Creates a polygon out of an array of points. (Used in objects.)
`points`: An array of `Vector2`s or `Point`s.
```js
changeX(distance);     // -> moves the PolygonMesh input distance on the x axis
changeY(distance);     // -> moves the PolygonMesh input distance on the y axis
move(xDist, yDist);    // -> moves the PolygonMesh input distance on the x and y axis
getMidpoint();         // -> returns the center point of the PolygonMesh
rotate(degree);        // -> rotates the PolygonMesh input degrees
pointInPolygon(point); // -> returns whether or not input point is inside the PolygonMesh
collision(other);      // -> returns whether or not the PolygonMesh collides with another PolygonMesh
render(colour);        // -> renders the PolygonMesh the input colour
clone();               // -> clones the PolygonMesh
```

```js
new RectangleMesh(width, height);
```
Creates a rectangle mesh out of input width and height (`RectangleMesh` is an extension of polygon and keeps all properties polygons have). (Used in objects.)
`width`: The `width` of the rectangle.
`height`: The `height` of the rectangle.

```js
new Camera(x, y, ?start, ?update);
```
Create a camera object.

`x`: The `x` position for the `Camera`.
`y`: The `y` position for the `Camera`.
`colour`: The colour of the `Camera`.
`start`: A special function called when the scene first loads.
`update`: A special function called every frame.
```js
clone(); // -> clones the Camera
```

```js
new GameObject(x, y, polymesh, colour, collides, ?eventListeners);
```
Create a `GameObject`.

`x`: The `x` position for the `GameObject`.
`y`: The `y` position for the `GameObject`.
`polymesh`: The mesh used to render the `GameObject`, and if `collides` is set to true, for collisions.
`colour`: The colour the `GameObject` is rendered in.
`collides`: Whether or not the `GameObject` collides with other objects.
`eventListeners`: An array of event listeners to be used.
```js
addEventListener(name, func);    // -> adds an event listener to a GameObject
addEventListener(eventListener); // -> adds an event listener to a GameObject
setX(position);                  // -> sets a GameObject's x coordinate to 'position' (WARNING: if a GameObject that collides has its position set to 'inside' another collidable GameObject, the game may crash)
setY(position);                  // -> sets a GameObject's y coordinate to 'position' (WARNING: if a GameObject that collides has its position set to 'inside' another collidable GameObject, the game may crash)
changeX(distance);               // -> moves a GameObject 'distance' pixels along the x-axis
changeY(distance);               // -> moves a GameObject 'distance' pixels along the y-axis (note y axis is inverted, -1 is 'higher' on the screen than 1)
setRotation(degrees);            // -> sets the rotation of a GameObject to 'degrees'
rotate(degrees);                 // -> rotates a GameObject by 'degrees'
render();                        // -> renders a GameObject
clone();                         // -> clones the GameObject
```

```js
new Scene(gameObjects, camera);
```
Create a `Scene` based on an array of `GameObjects` and a `Camera`. (Note: no need to save to a variable.)
`gameObjects`: An array of `GameObjects`s.
`camera`: A camera used to determine which portion of the `Scene` is rendered.
```js
clone(); // -> clones the Scene
```

#### Math shortcuts:
```js
pi;    // -> Math.PI
pow;   // -> Math.pow
log;   // -> Math.log
sqrt;  // -> Math.sqrt
round; // -> Math.round
min;   // -> Math.min
max;   // -> Math.max
abs;   // -> Math.abs
sin;   // -> Math.sin
cos;   // -> Math.cos
tan;   // -> Math.tan
asin;  // -> Math.asin
acos;  // -> Math.acos
atan;  // -> Math.atan
```

#### Built-in functions:
```js
cursor(cursorName);           // -> changes the cursor in the canvas (use CSS cursor names)
frameRate(frames);            // -> changes the number of frames per second (defaults to 60)
dist(x1, y1, x2, y2);         // -> returns the distance between two 2D points (x1, y1 and x2, y2)
degreesToRadians(degrees);    // -> returns input degrees as radians
radiansToDegrees(radians);    // -> returns input radians as degrees
random(min, max);             // -> returns a random number between min and max
randomInt(min, max);          // -> returns a random whole number between min and  max
isPrime(num);                 // -> returns whether or not a number is prime
constrain(num, min, max);     // -> returns input number restrained by input min and max
clamp(num, min, max);         // -> returns input number restrained by input min and max
lerp(value1, value2, amount); // -> linear interpolation, returns a value between value1 and value2 depending on linear interpolation amount
```