# ExtraJS
A library providing shortcuts to many functions as well as adding extra useful functions.

## Documentation/Features:
### Math shortcuts:
```js
add(number1, number2);                                              // adds two input numbers and returns the result
subtract(number1, number2);                                         // subtracts two input numbers and returns the result
multiply(number1, number2);                                         // multiplies two input numbers and returns the result
divide(number1, number2);                                           // divides two input numbers and returns the result
dist(x1, y1, x2, y2);                                               // returns the distance between two input points defined by an x and y position
dist3D(x1, y1, z1, x2, y2, z2);                                     // returns the distance between two input points defined by an x, y and z position
degreesToRadians(degrees);                                          // returns the input degrees as an equivalent value in radians
radiansToDegrees(radians);                                          // returns the input radians as an equivalent value in degrees
pi;                                                                 // returns pi (approximately 3.141592653589793)
pow(base, exponent);                                                // returns base raised to the power of exponent
sqrt(number);                                                       // returns the square root of a number
round(number);                                                      // rounds a decimal number to the nearest whole number
floor(number);                                                      // rounds down a decimal number
ceil(number);                                                       // rounds up a decimal number
abs(number);                                                        // returns the input number as a positive value
sin(number);                                                        // returns the sine of the input number
cos(number);                                                        // returns the cosine of the input number
tan(number);                                                        // returns the tangent of the input number
asin(number);                                                       // returns the inverse sine of the input number
acos(number);                                                       // returns the inverse cosine of the input number
atan(number);                                                       // returns the inverse tangent of the input number
min(number, number) /* or */ min(array) /* or */ min(array, array); // an improved version of Math.min that returns the lowest number in the input (if the input is an array searches all levels of the array (if multidimensional) to find the lowest number)
max(number, number) /* or */ max(array) /* or */ max(array, array); // an improved version of Math.max that returns the highest number in the input (if the input is an array searches all levels of the array (if multidimensional) to find the highest number)
random(min, max);                                                   // returns a pseudorandom number between min and max
randomInt(min, max);                                                // returns a pseudorandom whole number between min and max
isPrime(number);                                                    // returns whether or not the input number is a prime number
lerp(number1, number2, amount);                                     // returns a value between number1 and number2 based on the amount (decimal between 0 and 1)
constrain(number, min, max);                                        // returns the number if it is between min and max, otherwise returns the restraining boundary the was crossed
```

### Data Types:
```js
Color(red, green, blue, alpha?); // a colour (alpha defaults to 1)
Color.prototype.toString();      // returns a string version of the colour in the format rgba(r, g, b, a)
Color.prototype.getRed();        // returns the red value of the colour
Color.prototype.getGreen();      // returns the green value of the colour
Color.prototype.getBlue();       // returns the blue value of the colour
Color.prototype.getAlpha();      // returns the alpha or transparency of the colour
Color.prototype.setRed(red);     // sets the red of the colour to the input value
Color.prototype.setGreen(green); // sets the green of the colour to the input value
Color.prototype.setBlue(blue);   // sets the blue of the colour to the input value
Color.prototype.setAlpha(alpha); // sets the alpha or transparency of the colour to the input value
```

```js
Vector2(x, y);                 // a 2D point
Vector2.prototype.getX();      // returns the x value of the Vector2
Vector2.prototype.getY();      // returns the y value of the Vector2
Vector2.prototype.setX(x);     // sets the x value of the Vector2 to the input number
Vector2.prototype.setY(y);     // sets the y value of the Vector2 to the input number
Vector2.prototype.add(point);  // adds the x and y values of the input point to the current point
Vector2.prototype.sub(point);  // subtracts the x and y values of the input point to the current point
Vector2.prototype.mult(point); // multiplies the x and y values of the input point to the current point
Vector2.prototype.div(point);  // divides the x and y values of the input point to the current point
Vector2.prototype.dist(point); // returns the distance between the input point and the current point
Vector2.prototype.dot(point);  // returns the dot product of the input point and the current point
Vector2.prototype.mag();       // returns the magnitude of the current point
Vector2.prototype.normalize(); // normalizes the current point
Vector2.prototype.array();     // returns the current point in array format [x, y]
Vector2.dist(point1, point2);  // returns the distance between two input points
Vector2.dot(point1, point2);   // returns the dot product of two input points
Vector2.array(point);          // returns the input point in array format [x, y]
Vector2.Zero();                // returns a new point with an x and y value of 0
```

```js
Vector3(x, y, z);              // a 3D point
Vector3.prototype.getX();      // returns the x value of the current point
Vector3.prototype.getY();      // returns the y value of the current point
Vector3.prototype.getZ();      // returns the z value of the current point
Vector3.prototype.setX(x);     // sets the x value of the current point to the input number
Vector3.prototype.setY(y);     // sets the y value of the current point to the input number
Vector3.prototype.setY(z);     // sets the z value of the current point to the input number
Vector3.prototype.add(point);  // adds the x, y and z values of the input point to the current point
Vector3.prototype.sub(point);  // subtracts the x, y and z values of the input point to the current point
Vector3.prototype.mult(point); // multiplies the x, y and z values of the input point to the current point
Vector3.prototype.div(point);  // divides the x, y and z values of the input point to the current point
Vector3.prototype.dist(point); // returns the distance between the input point and the current point
Vector3.prototype.dot(point);  // returns the dot product of the input point and the current point
Vector3.prototype.mag();       // returns the magnitude of the current point
Vector3.prototype.normalize(); // normalizes the current point
Vector3.prototype.array();     // returns the current point in array format [x, y, z]
Vector3.dist(point1, point2);  // returns the distance between two input points
Vector3.dot(point1, point2);   // returns the dot product of two input points
Vector3.array(point);          // returns the input point in array format [x, y, z]
Vector3.Zero();                // returns a new point with an x, y, and z value of 0
```

```js
Line(point1, point2);              // a line
Line.prototype.pointOnLine(point); // returns whether or not a point lies on a line (based on the equation of the line)
Line.prototype.pointInLine(point); // returns whether or not a point lies in a line (restricted to being between the two points)
Line.prototype.intersects(other);  // returns whether or not a line intersects with the current line
```

```js
Rectangle(x, y, width, height, color, render); // a rectanlge
Rectangle.prototype.getX();                    // returns the x value of the current rectangle
Rectangle.prototype.getY();                    // returns the y value of the current rectangle
Rectangle.prototype.getWidth();                // returns the width value of the current rectangle
Rectangle.prototype.getHeight();               // returns the height value of the current rectangle
Rectangle.prototype.setX(value);               // sets the x value of the current rectangle to the input value
Rectangle.prototype.setY(value);               // sets the y value of the current rectangle to the input value
Rectangle.prototype.setWidth(value);           // sets the width value of the current rectangle to the input value
Rectangle.prototype.setHeight(amount);         // sets the height value of the current rectangle to the input value
Rectangle.prototype.changeX(amount);           // changes the x value of the current rectanlge by the input value
Rectangle.prototype.changeY(amount);           // changes the y value of the current rectanlge by the input value
Rectangle.prototype.changeWidth(amount);       // changes the width value of the current rectanlge by the input value
Rectangle.prototype.changeHeight(amount);      // changes the height value of the current rectanlge by the input value
```
