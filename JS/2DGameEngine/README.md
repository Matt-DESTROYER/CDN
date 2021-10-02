# 2D Game Engine
A simple 2D JS Game Engine which you can use to make creating 2D games easy!

## Documentation/Features:
```js
FPS
width
height
Input
Time
```
Global variables (which you are allowed to use and may help).
`FPS`: The number of frames per second the program is currently running at.
`width`: The `width` of the `canvas` being used for your game.
`height`: The `height` of the `canvas` being used for your game.

`Input`: Provides you with access to user input, usage:
```js
// Input.KEY e.g:
Input.W // -> returns true or false depending on whether the 'W' key is held down on the user's keyboard
// Input[keyCode] e.g:
Input[32] // -> returns true or false depending on whether the 'Space' key (spacebar) is held down on the user's keyboard
Input.keyCode // -> returns the keycode of the last key pressed (set on keyDown)
Input.key // -> returns the last key pressed (set on keyDown)
Input.mouseX // -> returns the x position of the user's cursor
Input.mouseY // -> returns the y position of the user's cursor
Input.mouseToWorldCoordinates // -> returns a Vector2 containing the mouse coordinates relative to the camera in the current scene
Input.pmouseX // -> returns the previous x position of the user's cursor
Input.pmouseY // -> returns the previous y position of the user's cursor
```

`Time`: Time based object.
```js
Time.startTime // returns the time in milliseconds when the game was started
Time.timeElapsed // returns the time in milliseconds since the game was started
Time.deltaTime // returns the number of milliseconds since the last frame
Time.now // returns the current time in milliseconds
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
GameEngine.initCanvas(id, ?fullScreen);
```
Sets up a canvas (based on ID).

`ID`: The `ID` of the `HTML` `canvas` you want to use for your game.
`fullScreen`: Whether or not your canvas should be scaled to fit the screen. (Defaults to true.)

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
getX(); // returns the x position of the point
getY(); // returns the y position of the point
setX(x); // sets the x position of the point
setY(y); // sets the y position of the point
add(point); // adds the x and y positions of the point to the current point
sub(point); // subtracts the x and y positions of the point from the current point
mult(point); // multiplies the x and y positions of the current point by the point
div(point); // divides the x and y positions of the current point by the point
dist(point); // returns the distance between the point and the current point
dot(point); // returns the dot product of the points
mag(); // returns the magnitude of the point
normalize(); // normalizes the current point
array(); // returns the current point in array form [x, y]
static dist(point1, point2); // returns the distance between two points
static dot(point1, point2); // returns the dot product of the points
static array(point); // returns the point in array form [x, y]
static Zero(); // returns a point with x, y = 0, 0
```

```js
new PolygonMesh(points);
```
Creates a polygon out of an array of points. (Used in objects.)
`points`: An array of `Vector2`s or `Point`s.
```js
changeX(distance); // moves the polygon input distance on the x axis
changeY(distance); // moves the polygon input distance on the y axis
move(xDist, yDist); // moves the polygon input distance on the x and y axis
getMidpoint(); // returns the center point of the polygon
rotate(degree); // rotates the polygon input degrees
pointInPolygon(point); // returns whether or not input point is inside the polygon
collision(other); // returns whether or not the polygon collides with another polygon
render(colour); // renders the polygon the input colour
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
new GameObject(x, y, polymesh, colour, ?start, ?update, ?collides, ?oncollision, ?onclick);
```
Create a `GameObject`.

`x`: The `x` position for the `GameObject`.
`y`: The `y` position for the `GameObject`.
`polymesh`: The mesh used to render the `GameObject`, and if `collides` is set to true, for collisions.
`colour`: The colour the `GameObject` is rendered in.
`start`: A special function called when the scene first loads.
`update`: A special function called every frame.
`collides`: Whether or not the `GameObject` collides with other objects.
`oncollision`: A function called everytime the `GameObject` collides (if the `GameObject` collides).
`onclick`: A function called everytime the `GameObject` is clicked.

```js
new Scene(gameObjects, camera);
```
Create a `Scene` based on an array of `GameObjects` and a `Camera`. (Note: no need to save to variable.)
`gameObjects`: An array of `GameObjects`s.
`camera`: A camera used to determine which portion of the `Scene` is rendered.

#### Math shortcuts:
```js
pi; // Math.PI
pow; // Math.pow
log; // Math.log
sqrt; // Math.sqrt
round; // Math.round
min; // Math.min
max; // Math.max
abs; // Math.abs
sin; // Math.sin
cos; // Math.cos
tan; // Math.tan
asin; // Math.asin
acos; // Math.acos
atan; // Math.atan
```

#### Built-in functions:
```js
cursor(cursorName); // changes the cursor in the canvas (use CSS cursor names)
frameRate(frames); // changes the number of frames per second (defaults to 60)
dist(x1, y1, x2, y2); // returns the distance between two 2D points (x1, y1 and x2, y2)
degreesToRadians(degrees); // returns input degrees as radians
radiansToDegrees(radians); // returns input radians as degrees
random(min, max); // returns a random number between min and max
randomInt(min, max); // returns a random whole number between min and  max
isPrime(num); // returns whether or not a number is prime
constrain(num, min, max); // returns input number restrained by input min and max
clamp(num, min, max); // returns input number restrained by input min and max
lerp(value1, value2, amount); // linear interpolation, returns a value between value1 and value2 depending on linear interpolation amount
```
