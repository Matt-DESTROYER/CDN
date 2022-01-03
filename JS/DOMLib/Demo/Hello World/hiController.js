const hiController = APP.Controller();
let usr = APP.Input("Enter your name:", ["submit"]);
hiController.Variables.user = "Welcome " + usr;
hiController.DOM["title text"].ChangeText("Hi " + usr);
