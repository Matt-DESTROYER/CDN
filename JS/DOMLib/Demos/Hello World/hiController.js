const hiController = APP.Controller("hiController");

hiController.CreateVariable("user", "Welcome.", ["out"]);

APP.Input("Enter your name:", ["Submit", "Cancel"]).then(function(result) {
	if (result.trim()) {
		hiController.SetVariable("user", "Welcome " + result + ".");
		hiController.DOM("title").textContent = "Hello " + result + "!";
	}
}).catch(function(error) {
	console.warn("Could not get input: " + error);
});
