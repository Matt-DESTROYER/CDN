# A simple Hello World DOMLib webpage
> A live demo of the website built with this code is available [here](https://domlib-demo-hello-world.mattdestroyer.repl.co/).

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

First, let's get the title text, we can do this using the `DOM` method in the `DOMLibController` we created (`homeController`).
```js
const titleText = homeController.DOM("name", "title text");
```
Let's look at the `DOM` method quickly. The `DOM` method takes in two or three arguments (forth and fifth parameters are used in recursion, so do not input any more than three arguments to prevent errors). The `DOM` method searches the body of the document for any node that matches the input parameter conditions. The first parameter specifies the property that will be checked, and the second specifies what value this property should have, the _optional_ third parameter specifies what the name of the tag of the `HTMLElement` should be. The `DOM` method returns either `null`, if no elements matching the criteria are found, a single element, if only one element matching the criteria was found, or an array of elements if more than one element match the criteria.

Now we've got our `titleText` we can add an event listener to ensure when it is clicked, the `Page` is switched to "Hi" and rendered.
```js
titleText.addEventListener("click", () => {
	APP.Page = "Hi";
	APP.Render();
});
```

Additionally, to it a little more obvious the `titleText` is like a button, we can _optionally_, make it so our cursor becomes a pointer when hovering over it.
```js
titleText.style.cursor = "pointer";
```

Your final `homeController.js` file should look something like this:

`homeController.js`
```js
const homeController = APP.Controller("homeController");
homeController.CreateVariable("data", "some data", ["out"]);
const titleText = homeController.DOM("name", "title text");
titleText.style.cursor = "pointer";
titleText.addEventListener("click", () => {
	APP.Page = "Hi";
	APP.Render();
});
```

Next we need to make our "Hi" `Page`.

The HTML partial will be very simple, just a title named `title text`, and a variable nameed `user`.
Your final `hi.html` file should look something like this:

`hi.html`
```html
<h1 name="title text">Hi!</h1>
<variable name="user"></variable>
```

Lastly we need to make our `hiController`. First of all we want to make a controller.
```js
const hiController = APP.Controller("hiController");
```

Next we want to create a variable right away and link it up to our user variable.
```js
hiController.CreateVariable("user", "Welcome.", ["out"]);
```

Lastly we want to let the user tell us who they are, so we are going to use the `Input` method of the `DOMLibInstance`. Then we are going to use that input to display a personalised welcome message to the user.
```js
APP.Input("Enter your name:", ["Submit"]).then((result) => {
	hiController.SetVariable("user", "Welcome " + result + ".");
}).catch((error) => {
	console.warn("Could not get input: " + error);
});
```

Your final `hiController.js` file should look something like this:

`hiController.js`
```js
const hiController = APP.Controller("hiController");
hiController.CreateVariable("user", "Welcome.", ["out"]);
APP.Input("Enter your name:", ["Submit"]).then((result) => {
	hiController.SetVariable("user", "Welcome " + result + ".");
}).catch((error) => {
	console.warn("Could not get input: " + error);
});
```

And we're done! Hopefully this tutorial has introduced you to `DOMLib`. If you feel like you haven't completely understood something or want to know more about the library you can check the [documentation](https://github.com/Matt-DESTROYER/CDN/blob/main/JS/DOMLib/README.md) or contact me by leaving a comment [here](https://replit.com/@MattDESTROYER/DOMLib-Demo-Hello-World?v=1). Feel free to contact me with feedback about either the tutorial or library, I'd love to know if there is a feature or tool you'd like to see added to/integrated in the library.

> A live demo of the website built with this code is available [here](https://domlib-demo-hello-world.mattdestroyer.repl.co/).
