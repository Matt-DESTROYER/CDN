class ClientRequest {
	constructor(name, data) {
		this.name = name;
		this.data = data;
		this.timeStamp = Date.now();
	}
	toString() {
		return JSON.stringify(this);
	}
}

class Socket {
	#closed;
	#callbacks;
	#pings;
	#socket;
	#heartbeating;

	constructor(url) {
		if (!url) {
			this.url = "wss://" + window.location.host;
		} else if (url.startsWith("https")) {
			this.url = "wss" + url.substring(5);
		} else if (url.startsWith("http")) {
			this.url = "ws" + url.substring(4);
		} else if (!url.startsWith("ws")) {
			this.url = "wss://" + url;
		} else {
			this.url = url;
		}
		this.#closed = false;
		this.#callbacks = [];
		this.#initSocket();
	}
	async #initSocket() {
		this.#pings = [];
		this.connected = false;
		this.#socket = new WebSocket(this.url);
		let heartbeat;
		this.#socket.addEventListener("open", () => {
			if (this.#socket.readyState === 1) {
				this.connected = true;
				this.#heartbeating = true;
				heartbeat = setInterval(() => {
					if (!this.#heartbeating) {
						clearInterval(heartbeat);
						console.info("[Socket.js] Disconnected from " + this.url + ".");
						this.#initSocket();
					}
					this.#heartbeat();
				}, 2000);
			}
			for (let i = 0; i < this.#callbacks.length; i++) {
				if (this.#callbacks[i].name === "connect") {
					this.#callbacks[i].callback();
					if (this.#callbacks[i].once) {
						this.#callbacks.splice(i, 1);
						i--;
					}
				}
			}
		});
		this.#socket.addEventListener("message", (response) => {
			if (response.data === "pong") {
				const ping = Date.now() - this.#pings.shift();
				for (let i = 0; i < this.#callbacks.length; i++) {
					if (this.#callbacks[i].name === "pong") {
						this.#callbacks[i].callback(ping);
						if (this.#callbacks[i].once) {
							this.#callbacks.splice(i, 1);
							i--;
						}
					}
				}
				return;
			} else if (response.data === "heartbeat") {
				this.#heartbeating = true;
				return;
			}
			const { name, data: _data } = JSON.parse(response.data);
			for (let i = 0; i < this.#callbacks.length; i++) {
				if (this.#callbacks[i].name === name) {
					this.#callbacks[i].callback(_data);
					if (this.#callbacks[i].once) {
						this.#callbacks.splice(i, 1);
						i--;
					}
				}
			}
		});
		this.#socket.addEventListener("error", (err) => {
			for (let i = 0; i < this.#callbacks.length; i++) {
				if (this.#callbacks[i].name === "error") {
					const { once } = this.#callbacks[i];
					this.#callbacks[i].callback(err);
					if (this.#callbacks[i].once) {
						this.#callbacks.splice(i, 1);
						i--;
					}
				}
			}
		});
		this.#socket.addEventListener("close", () => {
			this.connected = false;
			if (!this.#closed) {
				clearInterval(heartbeat);
				console.log("[Socket.js] Disconnected from " + this.url + ".");
				this.#initSocket();
			}
			for (let i = 0; i < this.#callbacks.length; i++) {
				if (this.#callbacks[i].name === "disconnect") {
					this.#callbacks[i].callback();
					if (this.#callbacks[i].once) {
						this.#callbacks.splice(i, 1);
						i--;
					}
				}
			}
		});
	}
	async #heartbeat() {
		if (this.connected) {
			if (this.#socket.readyState === 1) {
				this.connected = true;
				this.#socket.send("heartbeat");
				this.#heartbeating = false;
			} else {
				this.connected = false;
				this.#heartbeating = false;
			}
		}
	}
	async once(name, callback) {
		this.#callbacks.push({ name, callback: callback.bind(this), once: true });
	}
	async on(name, callback) {
		this.#callbacks.push({ name, callback: callback.bind(this), once: false });
	}
	async ping() {
		if (this.connected) {
			this.#pings.push(Date.now());
			this.#socket.send("ping");
		}
	}
	async emit(name, data) {
		if (this.connected) {
			this.#socket.send(new ClientRequest(name, data).toString());
		}
	}
	async close(reason) {
		this.#socket.close(1000, reason);
		this.#closed = true;
	}
}

export { Socket as default };
