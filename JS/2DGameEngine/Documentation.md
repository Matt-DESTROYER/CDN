# Documentation
```js
FPS;
width;
height;
Input;
Time;
head;
body;
```
Global variables (which you are allowed* to use).
`FPS`: The number of frames per second the program is currently running at.
`width`: The `width` of the `canvas` being used for your game.
`height`: The `height` of the `canvas` being used for your game.
`head`: The `head` tag of the document.
`time`: The `body` tag of the document.
* as opposed to variables which are not *recommended* to be used (although obviously can still use)

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
Time.timeElapsed; // -> returns the time in milliseconds since the game was started (Date.now() - Time.startTime)
Time.now;         // -> returns the current time in milliseconds (Date.now())
```

`Randomiser` API:
The `Randomiser` API makes randomising things simpler!
You can view the documentation [here](https://github.com/Matt-DESTROYER/CDN/blob/main/JS/Randomiser/README.md).

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
`GameObject`s have the following events:
 - `start` (called when the `Scene` a `GameObject` is in first becomes active)
 - `update` (called each frame when the `Scene` a `GameObject` is in is active after that `GameObject` has been updated)
 - `render` (called each frame the the `Scene` a `GameObject` is in is active after that `GameObject` has been rendered)
 - `click` (called when the user clicks on a `GameObject`)
 - `collision` (called when a `GameObject` collides with another `GameObject`, the `GameObject` collided with is passed in as the second parameter)

`Scene`s and `Camera`s both have the following events:
 - `start` (called when a `Scene` first becomes active)
 - `update` (called each frame after a `Scene` has been updated if a `Scene` is active)

```js
GameEngine.Initialise(?canvas, ?fullScreen, ?width, ?height);
```
Sets up a canvas and 2D context. (Note: passing in no arguments will result in the `GameEngine` creating a `canvas` and making its dimensions fill the screen).
`canvas`: The `id` of the `HTML` `canvas` you want to use for your game or a `HTMLCanvasElement` or null (in which case a canvas will be dynamically generated).
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
add(point);                  // -> adds the x and y positions of the point to the current point
sub(point);                  // -> subtracts the x and y positions of the point from the current point
mult(point);                 // -> multiplies the x and y positions of the current point by the point
div(point);                  // -> divides the x and y positions of the current point by the point
dist(point);                 // -> returns the distance between the point and the current point
dot(point);                  // -> returns the dot product of the points
mag();                       // -> returns the magnitude of the point
normalize();                 // -> normalizes the current point
toString();                  // -> returns the current point in string form "x, y"
array();                     // -> returns the current point in array form [x, y]
clone();                     // -> clones the point
static dist(point1, point2); // -> returns the distance between two points
static dot(point1, point2);  // -> returns the dot product of the points
static array(point);         // -> returns the point in array form [x, y]
static Zero();               // -> returns a point with x, y = 0, 0
```

```js
new Line(point1, point2);
```
`point1`: The first `Vector2` passed into the constructor.
`point2`: The second `Vector2` passed into the constructor.
`point1` and `point2` form a line from `point1` to `point2`.

Extra properties:
`Line.prototype.x1`: `point1.x`
`Line.prototype.y1`: `point1.y`
`Line.prototype.x2`: `point2.x`
`Line.prototype.y2`: `point2.y`

```js
pointOnLine(point); // returns whether or not a point is on a line (based on said line's y = mx + c rule)
pointInLine(point); // returns whether or not a point is on a line
intersects(other);  // returns whether or not a line intersects with another line
clone();            // returns a clone of a line
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
new Camera(x, y);
```
Creates a camera object.
`x`: The `x` position for the `Camera`.
`y`: The `y` position for the `Camera`.
```js
clone(); // -> clones the Camera
```

```js
new GameObject(x, y, polymesh, colImgFun, collides);
```
Creates a `GameObject`.
`x`: The `x` position for the `GameObject`.
`y`: The `y` position for the `GameObject`.
`polymesh`: The mesh used to render the `GameObject`, and if `collides` is set to true, for collisions.
`colImgFun`: This argument can be either a CSS colour to render the `GameObject` in, an image, which will be rendered at the `GameObject`'s position or a function which you can use to render the `GameObject` yourself.
`collides`: Whether or not the `GameObject` collides with other objects.
```js
addEventListener(name, func);    // -> adds an event listener to a GameObject
addEventListener(eventListener); // -> adds an event listener to a GameObject
setX(position);                  // -> sets a GameObject's x coordinate to 'position' (WARNING: if a GameObject that collides has its position set to 'inside' another collidable GameObject, the game may crash)
setY(position);                  // -> sets a GameObject's y coordinate to 'position' (WARNING: if a GameObject that collides has its position set to 'inside' another collidable GameObject, the game may crash)
setPosition(x, y);               // -> sets a GameObject's x and y coordinates to the input x and y coordinates (WARNING: if a GameObject that collides has its position set to 'inside' another collidable GameObject, the game may crash)
addXForce(force);                // -> applies the input force to a GameObject's x axis
addYForce(force);                // -> applies the input force to a GameObject's y axis
addForce(x, y);                  // -> applies input force to a GameObject's x and y axis
setXForce(force);                // -> sets a GameObject's x force to the input force
setYForce(force);                // -> sets a GameObject's y force to the input force
setForce(x, y);                  // -> sets a GameObject's x and y force to input force
changeX(distance);               // -> moves a GameObject 'distance' pixels along the x-axis
changeY(distance);               // -> moves a GameObject 'distance' pixels along the y-axis (Note: y 1 is 'higher' on the screen than -1)
setRotation(degrees);            // -> sets the rotation of a GameObject to 'degrees'
rotate(degrees);                 // -> rotates a GameObject by 'degrees'
physics();                       // -> applies physics to a GameObject (automatically done by 2DGameEngineJS)
render();                        // -> renders a GameObject (automatically done by 2DGameEngineJS)
clone();                         // -> clones the GameObject
```

```js
new Scene(children, camera);
```
Creates a `Scene` based on an array of `GameObjects` and a `Camera`. (Note: no need to save to a variable.)
`children`: An array of `GameObjects`s.
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
floor; // -> Math.floor
ceil;  // -> Math.ceil
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
getHead();                    // -> returns the document's head element
getBody();                    // -> returns the document's body element
cursor(cursorName);           // -> changes the cursor in the canvas (use CSS cursor names)
frameRate(frames);            // -> changes the number of frames per second (defaults to 60)
dist(x1, y1, x2, y2);         // -> returns the distance between two 2D points (x1, y1 and x2, y2)
degreesToRadians(degrees);    // -> returns input degrees as radians
radiansToDegrees(radians);    // -> returns input radians as degrees
$(selector);                  // -> document.querySelector shortcut
constrain(num, min, max);     // -> returns input number restrained by input min and max
clamp(num, min, max);         // -> returns input number restrained by input min and max
lerp(value1, value2, amount); // -> linear interpolation, returns a value between value1 and value2 depending on linear interpolation amount
```
