const hiController = APP.Controller("hiController");
hiController.CreateVariable("user", "Welcome.", ["out"]);
APP.Input("Enter your name:", ["Submit"]).then((result) => {
	hiController.SetVariable("user", "Welcome " + result + ".");
}).catch((error) => {
	console.warn("Could not get input: " + error);
});
