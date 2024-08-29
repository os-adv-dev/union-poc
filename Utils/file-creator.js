const { create } = require("domain");
const fs = require("fs");
const process = require("process");
const filePathWidgets = "./src/styles/01-Customer/02-widgets";
const filePathPatterns = "./src/styles/01-Customer/04-patterns";
var patterns = {
	"01-adaptive": ["columns", "gallery", "master-detail"],
	"02-content": [
		"accordion",
		"accordion-item",
		"alert",
		"blank-slate",
		"card",
		"card-background",
		"card-item",
		"card-sectioned",
		"chat-message",
		"flip-content",
		"floating-content",
		"list-item-content",
		"section",
		"tag",
		"tooltip",
		"user-avatar",
	],
	"03-interaction": [
		"action-sheet",
		"animate",
		"animated-label",
		"balloon",
		"bottom-sheet",
		"carousel",
		"datepicker",
		"dropdown-search",
		"dropdown-tags",
		"floating-actions",
		"input-with-icon",
		"lightbox-image",
		"monthpicker",
		"notification",
		"rangeslider",
		"scrollable-area",
		"search",
		"sidebar",
		"stacked-cards",
		"timepicker",
		"video",
	],
	"04-navigation": [
		"bottom-bar-item",
		"breadcrumbs",
		"overflowmenu",
		"pagination",
		"section-index",
		"submenu",
		"tabs",
		"timeline",
		"wizard",
	],
	"05-numbers": [
		"badge",
		"counter",
		"icon-badge",
		"progress-bar",
		"progress-circle",
		"rating",
	],
	"06-utilities": [
		"align-center",
		"button-loading",
		"center-content",
		"margin-container",
		"separator",
		"pull-to-refresh",
		"list-updating",
	],
};

var widgets = [
	"inputs",
	"switch",
	"checkbox",
	"dropdown",
	"button",
	"list",
	"listitem",
	"table",
	"table-sortableicon",
	"table-bulkactions",
	"form",
	"upload",
	"buttongroup",
	"popover",
	"popup",
	"feedbackmessage",
	"radiobutton",
];

function createFiles() {
	widgets.forEach(function (elem) {
		fs.closeSync(fs.openSync(filePathWidgets + "/" + elem + ".scss", "a"));
	});

	for (let key in patterns) {
		patterns[key].forEach(function (elem) {
			fs.closeSync(
				fs.openSync(filePathPatterns + "/" + key + "/" + elem + ".scss", "a")
			);
		});
	}
}

function cleanFiles() {
	widgets.forEach(function (elem) {
		var currPath = filePathWidgets + "/" + elem + ".scss";
		if (fs.existsSync(currPath)) {
			if (fs.readFileSync(currPath).length === 0) {
				fs.unlinkSync(currPath);
			}
		}
	});

	for (let key in patterns) {
		patterns[key].forEach(function (elem) {
			var currPath = filePathPatterns + "/" + key + "/" + elem + ".scss";
			if (fs.existsSync(currPath)) {
				if (fs.readFileSync(currPath).length === 0) {
					fs.unlinkSync(currPath);
				}
			}
		});
	}
}

if (process.argv[2] == "createFiles") {
	createFiles();
} else if (process.argv[2] == "cleanFiles") {
	cleanFiles();
}
