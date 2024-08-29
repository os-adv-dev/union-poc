const express = require("express");
const path = require("path");
const { spawn } = require("child_process"); // Import the 'spawn' function
const fs = require("fs");
var exec = require("child_process").exec;

const app = express();
const port = 3000;

app.post("/run", (req, res) => {
	var os = new runCommand();
	var body = "";
	req.on("data", function (data) {
		body += data;
	});
	req.on("end", function () {
		os.execCommand(body, function (result) {
			if (result.error) {
				res.status(500).send(result.error);
			} else {
				res.send(result.output);
			}
		});
	});
});

app.use("/public", express.static(__dirname + "/public"));

app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "/public/configUI.html"));
});

app.post("/write", function (req, res) {
	var body = "";
	filePath = __dirname + "/..//src/globals.json";
	req.on("data", function (data) {
		body += data;
	});

	req.on("end", function () {
		fs.writeFile(filePath, body, function () {
			res.end("File saved");
		});
	});
});

var server = app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
	spawn("cmd", ["/c", "start", "http://localhost:" + port], {
		detached: true,
		stdio: "ignore",
	}).unref();
});

app.post("/shutdown", (req, res) => {
	console.log("Received shutdown req. Closing server...");

	// Gracefully close the server
	server.close();
	process.exit(0);
});

function runCommand() {
	this.execCommand = function (cmd, callback) {
		exec(cmd, function (err, stdout, stderr) {
			if (err) {
				console.log(err.message);
				callback({ error: err.message });
				return;
			} else {
				console.log("Command output:", stdout);
				callback({ output: "Ran successfully" });
			}
		});
	};
}
