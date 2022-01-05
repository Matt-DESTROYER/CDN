# A simple Hello World DOMLib webpage
> A live demo is available [here](https://domlib-demo-hello-world.mattdestroyer.repl.co/)

The website starts with your average empty `index.html` file.
```html
<!DOCTYPE html>
<html>

<head>
</head>

<body>
</body>

</html>
```

First of all we need to load the `DOMLib` scripts using this tag in the document's head `<script src="https://Matt-DESTROYER.github.io/CDN/JS/DOMLib/lib.js"></script>`.
Then we will add a script tag in the document's body which will contain the code that runs the website.

All `DOMLib` websites start with a `DOMLibInstance`, we need to initialise the website in the script tag we created.
```js
const APP = DOMLib.Init("Hello World");
```

From there we have to create `Page`s. Each one must have a name, a HTML partial, and a JavaScript controller (you could in theory use the same HTML partial or JavaScript controller in multiple different pages, although circumstances requiring that are unlikely).
> Note: A HTML partial is essentially any HTML that would go into the _body_ of a HTML document.
For this website we are going to have two pages, a "Home" page, and a "Hi" page that greets a user once they input a name. Feel free to name the files differently, it won't impact the website.
```js
APP.CreatePage("Home", "home.html", "homeController.js");
APP.CreatePage("Hi", "hi.html", "hiController.js");
```

After that we need to set the start `Page`. You probably already guessed the start page is our "Home" page.
```js
APP.Page = "Home";
```

And after `DOMLib` loads the pages we want `DOMLib` to render the "Home" page.
```js
APP.onload = function() {
	APP.Render();
};
```

Your final `index.html` file should look something like this:
`index.html`
```html
<!DOCTYPE html>
<html>

<head>
	<script src="https://Matt-DESTROYER.github.io/CDN/JS/DOMLib/lib.js"></script>
</head>

<body>
	<script>
		const APP = DOMLib.Init("Hello World");
		APP.CreatePage("Home", "home.html", "homeController.js");
		APP.CreatePage("Hi", "hi.html", "hiController.js");
		APP.Page = "Home";
		APP.onload = function() {
			APP.Render();
		};
	</script>
</body>

</html>
```

Now we need to create the files we are using for our `Page`s. Let's start with the "Home" `Page`. Our home page will have three elements, a title, a short message, and a `DOMLibVariable`.
`home.html`
```html
<h1 name="title text">Hello World!</h1>
<p>This is a home page.</p>
<variable name="data"></variable>
```
The `name` property allows an easy method of access to the title, however for `DOMLibVariable`, the name tag is required as a means identification.

Next we need the JavaScript controller to run this page. First of all we need to initialise the controller.
```js
const homeController = APP.Controller("homeController");
```

Next let's hook up a `DOMLibVariable` to the variable tag in our `home.html` file.
```js
homeController.CreateVariable("data", "somedata", ["out"]);
```
Our variable is created with a name (which must match up with the name property of the variable it will be connected to), a value (which can be changed), and an array containing strings which determine how the variable is connected to the DOM. In this case the array only contains `"out"`, which means that whenever the variable is changed, it will also change the value of the element it is linked to. If the array contained `"in"`, if the element in the DOM was changed so would the `DOMLibVariable`.

Next we want a way to access our other `Page`, so when a user clicks on the title, lets send them to the "Hi" `Page`.

[UNFINISHED]

Your final `homeController.js` file should look something like this:
`homeController.js`
```js
const homeController = APP.Controller("homeController");
homeController.CreateVariable("data", "some data", ["out"]);
homeController.DOM("name", "title text").addEventListener("click", function() {
	APP.Page = "Hi";
	APP.Render();
});
```