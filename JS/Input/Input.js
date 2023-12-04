const Input = (function () {
	const listeners = [];

	function indexOf(arr, func) {
		for (let i = 0; i < arr.length; i++) {
			if (func(arr[i])) {
				return i;
			}
		}
		return -1;
	}

	function keyDown(e) {
		e = e || window.event;
		for (let i = 0; i < e.path.length; i++) {
			const idx = indexOf(listeners, function (x) {
				return x.element === e.path[i];
			});
			if (idx !== -1) {
				listeners[idx].input[e.keyCode] = true;
				listeners[idx].input[e.key.toString().toUpperCase()] = true;
				listeners[idx].input.keyIsPressed = true;
				listeners[idx].input.keyCode = e.keyCode;
				listeners[idx].input.key = e.key.toString().toUpperCase();
			}
		}
	}

	function keyUp(e) {
		e = e || window.event;
		for (let i = 0; i < e.path.length; i++) {
			const idx = indexOf(listeners, function (x) {
				return x.element === e.path[i];
			});
			if (idx !== -1) {
				listeners[idx].input[e.keyCode] = false;
				listeners[idx].input[e.key.toString().toUpperCase()] = false;
				if (listeners[idx].input.keyCode === e.keyCode) {
					listeners[idx].input.keyIsPressed = false;
				}
			}
		}
	}

	function mouseDown(e) {
		e = e || window.event;
		for (let i = 0; i < e.path.length; i++) {
			const idx = indexOf(listeners, function (x) {
				return x.element === e.path[i];
			});
			if (idx !== -1) {
				listeners[idx].input.buttons = e.buttons;
				listeners[idx].input.mouseDown = true;
			}
		}
	}

	function mouseUp(e) {
		e = e || window.event;
		for (let i = 0; i < e.path.length; i++) {
			const idx = indexOf(listeners, function (x) {
				return x.element === e.path[i];
			});
			if (idx !== -1) {
				listeners[idx].input.buttons = e.buttons;
				listeners[idx].input.mouseDown = false;
			}
		}
	}

	function mouseMove(e) {
		e = e || window.event;
		for (let i = 0; i < e.path.length; i++) {
			const idx = indexOf(listeners, function (x) {
				return x.element === e.path[i];
			});
			if (idx !== -1) {
				listeners[idx].input.pmouseX = listeners[idx].input.mouseX;
				listeners[idx].input.pmouseY = listeners[idx].input.mouseY;
				if ("getBoundingClientRect" in e.currentTarget) {
					const rect = e.currentTarget.getBoundingClientRect();
					listeners[idx].input.mouseX = e.clientX - rect.left;
					listeners[idx].input.mouseY = e.clientY - rect.top;
				} else {
					listeners[idx].input.mouseX = e.clientX;
					listeners[idx].input.mouseY = e.clientY;
				}
			}
		}
	}
	return {
		"listenTo": function (htmlElement) {
			const _listener = {
				"element": htmlElement,
				"input": {}
			};
			listeners.push(_listener);
			htmlElement.addEventListener("keydown", keyDown);
			htmlElement.addEventListener("keyup", keyUp);
			htmlElement.addEventListener("mousedown", mouseDown);
			htmlElement.addEventListener("mouseup", mouseUp);
			htmlElement.addEventListener("mousemove", mouseMove);
			return _listener.input;
		},
		"stopListening": function (htmlElement) {
			htmlElement.removeEventListener("keydown", keyDown);
			htmlElement.removeEventListener("keyup", keyUp);
			htmlElement.removeEventListener("mousedown", mouseDown);
			htmlElement.removeEventListener("mouseup", mouseUp);
			htmlElement.removeEventListener("mousemove", mouseMove);
			return htmlElement;
		}
	};
})();
console.log("Loaded Input.js by Matthew James");