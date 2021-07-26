// initialise the canvas by id
// fits canvas to screen if
// input boolean is equal to true
// fullscreen defaults to true
Platformer.initCanvas("game-screen", true);

// set background colour of Platformer
Platformer.background("gray");

// create a player with x, y, width, height, ?canWallJump, ?update
// (only one player at a time)
new Player(0, 50, new PolygonMesh([
	// vertices of a rectangle
	new Vector2(-12.5, -12.5),
	new Vector2(12.5, -12.5),
	new Vector2(12.5, 12.5),
	new Vector2(-12.5, 12.5)
]), "blue", true, function () {
	// update function, called every frame
	Camera.x = lerp(Camera.x, this.x - width / 2 + 12.5, 0.1);
	Camera.y = lerp(Camera.y, this.y - height / 2 + 12.5, 0.1);
	// jump
	if (Input.W || Input[38] || Input[32]) {
		this.jump();
	}
	// move left
	if (Input.A || Input[37]) {
		this.addForce(-2, 0);
	}
	// move right
	if (Input.D || Input[39]) {
		this.addForce(2, 0);
	}
	// if the player's y position is
	// greater than 2 times the screen
	// height, reset the player
	if (this.y > height * 2) {
		this.reset();
	}
});

// create levels
// create a level with an array of PObjects
// create a PObject with x, y, width, height, colour, type
/*
 * PObject types:
 * 0 - Air (not solid)
 * 1 - Solid (player collides)
 * 2 - Danger (resets player)
 * 3 - Trampoline (bounces player)
 * 4 - Water (slows the player but allows them
 *     to move continuously upwards)
 * 9 - Finish (sends player to next level)
 */
new Level([
	new PText("W, A, S, D, arrow keys and/or space to move.", "Times New Roman", 14, -150, 0, "black", 0),
	new PObject(0, 200, new RectangleMesh(150, 25), "black", 1),
	new PObject(62.5, 125.5, new RectangleMesh(25, 125), "black", 1),
	new PObject(200, 250, new RectangleMesh(200, 25), "red", 2),
	new PObject(425, 250, new RectangleMesh(100, 25), "green", 9)
]);
new Level([
	new PObject(0, 200, new RectangleMesh(150, 25), "black", 1),
	new PText("This is just a demo...", "Arial", 14, 0, 100, "black", 0),
	new PObject(25, 175, new RectangleMesh(50, 25), "orange", 3),
	new PObject(125, -100, new RectangleMesh(50, 25), "orange", 3),
	new PObject(225, -375, new RectangleMesh(50, 25), "orange", 3),
	new PObject(225, -650, new RectangleMesh(50, 25), "green", 9)
]);
new Level([
	new PObject(-12.5, -200, new RectangleMesh(150, 400, false), "lightblue", 4),
	new PObject(-12.5, 200, new RectangleMesh(150, 25, false), "black", 1),
	new PObject(12.5, 100, new RectangleMesh(125, 25, false), "black", 1),
	new PObject(-12.5, 0, new RectangleMesh(125, 25, false), "black", 1),
	new PObject(12.5, -100, new RectangleMesh(125, 25, false), "black", 1),
	new PObject(-12.5, -200, new RectangleMesh(125, 25, false), "black", 1),
	new PObject(-12.5, -225, new RectangleMesh(150, 25, false), "green", 9)
]);
new Level([
	new PObject(0, 200, new RectangleMesh(150, 25), "black", 1)
]);

// increase FPS slightly
frameRate(60);

// start the Platformer
Platformer.Start();