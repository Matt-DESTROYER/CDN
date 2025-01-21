# WebSockets

A simple library for making real-time client-server communication easy with WebSockets.
This library builds on `ws` from NPM to add basic, simple features, similar to Socket.IO, while lightweight with little overhead.

## Usage
`index.js`
```js
const server = require("http").createServer();

// DEPENDS ON "ws"
const wss = require("./WebSockets")(server);

// setup websockets on the server
(function websockets() {
	// an array to store each socket
	const sockets = [];

	// when a user connects to the server
	wss.on("connect", function(socket) {
		// add the socket to the array of sockets
		sockets.push(socket);

		// when the user is ready to start playing
		socket.on("init", function(data) {
			// get their id (we cannot store this in a higher scope as the id may change)
			const id = socket.id;

			// add the id to the data
			data.id = id;

			// tell the user what their id is and the ids of the other users
			socket.emit("init", {
				id: id,
				users: sockets.map((socket) => socket.id)
			});
			// tell the rest of the users a new user has connected
			socket.broadcast("user connected", id);
		});

		// handle a custom event sent by a user
		socket.on("custom event", function(data) { });

		// if the user asks for their id
		socket.on("id", function() {
			// give them their id
			socket.emit("id", socket.id);
		});

		// when the user disconnects
		socket.on("disconnect", function() {
			// get their id (we cannot store this in a higher scope as the id may change)
			const id = socket.id;

			// remove the socket from the array of sockets
			sockets.splice(id, 1);

			// tell all the players that a user left and give them the id of the player that left
			wss.emit("user disconnected", id);
		});
	});
})();

server.listen(3000);
```

`index.html`
```html
<!doctype HTML>
<html>
<head>
	<!-- ... -->
</head>
<body>
	<span id="display"></span>
	<script type="module">
		import Socket from "https://github.com/Matt-DESTROYER/CDN/JS/WebSockets/client.js";

		const socket = new Socket(window.location.href);

		const user = { id: null };

		let users = [];

		const updateDisplay = (function () {
			const display = document.getElementById("display");

			return function() {
				display.textContent = `Your ID: ${user.id}, User count: ${users.length}; ` + users.join(" ");
			};
		})();

		socket.on("init", function(data) {
			user.id = data.id;
			users = data.users;
			updateDisplay();
			window.alert("Connected!");
		});

		socket.on("user connected", function(id) {
			users.push(id);
			updateDisplay();
		});

		socket.on("user disconnected", function(id) {
			const idx = users.indexOf(id);
			if (idx !== -1) {
				users.splice(idx, 1);
				updateDisplay();
			}
		});

		socket.on("disconnect", function() {
			window.alert("Disconnected!");
		});
	</script>
</body>
</html>
```
