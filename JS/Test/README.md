# Test.js
## Documentation/Features
```js
Test.equals(a, b, ?caseSensitive);
```
Checks if `a === b`. If arrays are input as parameters it compares each item in the arrays to check if they are the same. Performs deep comparison on objects to check if they are equal.
- `a`: The first item to be compared.
- `b`: The second item to be compared.
- `caseSensitive`: If a string is input this allows the specification of whether the comparison should be case sensitive. (Defaults to true)
```js
Test.similar(a, b, threshold, ?caseSensitive);
```
Checks the similarity of `a` and `b` based on the threshold. First the percentage of similarity of `a` and `b` is found, then whether or not that satisfies the threshold is returned (`true` if `a` and `b` are more similar than the threshold).
- `a`: One of the items being compared
- `b`: The other item being compared
- `threshold`: Percentage used to determine if `a` and `b` are satisfactorily similar
- `caseSensitive`: If a string is input this allows the specification of whether the comparison should be case sensitive. (Defaults to true)
```js
Test.functionSpeed(func, tests);
```
Returns an array of speeds (in milliseconds) take to run the input function with the input test cases. (Test cases should be input in a two dimensional array format, each sub-array should contain the arguments to be used).
`func`: The function to be tested.
`tests`: A two dimensional array of arguments to be used when testing. For example:
```js
Test.functionSpeed(function (a, b) {
	return a + b;
}, [
	[ 1, 1 ],
	[ -1, -1 ],
	[ 10, 10 ],
	[ -10, -10 ],
	[ 100, 100 ],
	[ -100, -100 ],
	[ Infinity, -Infinity ]
]);
```
In the above example a function is tested that simple adds/concatenates two numbers/strings. We test the function 7 times with the following parameters: `(1, 1)`, `(-1, -1)`, `(10, 10)`, `(-10, -10)`, `(100, 100)`, `(-100, -100)`, `(Infinity, -Infinity)`

Available through NPM!
(https://www.npmjs.com/package/deep-comparisons)
