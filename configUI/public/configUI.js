let initialColors = {};
var id = 0;
const AlertType = {
	Success: "success",
	Error: "error",
	Info: "info",
};
addEventListener("load", () => {
	setTabs();
	document
		.getElementById("dropdown-menu-button")
		.addEventListener("click", function () {
			var list = this.parentElement.querySelector(".dropdown-menu	");

			list.classList.toggle("block");
			list.classList.toggle("hidden");
		});

	document.getElementById("build").addEventListener("click", function (e) {
		e.preventDefault();
		askRunCommand("npm run build", this);
	});
	document
		.getElementById("build-globals")
		.addEventListener("click", function (e) {
			e.preventDefault();
			askRunCommand("npm run build-globals", this);
		});
	document.getElementById("addSpacing").addEventListener("click", function (e) {
		e.preventDefault();
		addSpacingInputFields(document.getElementById("SpacingContent"), "");
	});

	document
		.getElementById("addColorPallete")
		.addEventListener("click", function (e) {
			e.preventDefault();
			createNewColorPallete();
		});

	setJsonSave();
});
/*window.addEventListener("beforeunload", function () {
	// Send an HTTP request to a server endpoint to trigger server shutdown
	fetch("/shutdown", {
		method: "POST",
	});
});*/

function readFile() {
	const fileInput = document.getElementById("jsonFileInput");
	const file = fileInput.files[0];

	if (!file) {
		alert("Please select a JSON file to upload.");
		return;
	}

	const reader = new FileReader();

	reader.onload = function (event) {
		const jsonContent = JSON.parse(event.target.result);
		initialColors = jsonContent;
		init();
		sendAlert("File Loaded", AlertType.Success);
	};

	reader.readAsText(file);
}

function setTabs() {
	const tabLabels = document.querySelectorAll(".tab-label");
	const tabContents = document.querySelectorAll(".tab-content");

	tabLabels.forEach((label) => {
		label.addEventListener("click", () => {
			const tabId = label.getAttribute("data-tab");
			tabLabels.forEach((tabLabel) =>
				tabLabel.classList.remove(
					"border-l",
					"border-t",
					"border-r",
					"rounded-t"
				)
			);
			tabContents.forEach((tabContent) =>
				tabContent.classList.remove("active")
			);

			label.classList.add("border-l", "border-t", "border-r", "rounded-t");
			document.getElementById(tabId).classList.add("active");
		});
	});
}

// Function to add new color fields dynamically

function init() {
	//Populate Customer Fields
	if (initialColors.customer) {
		if (initialColors.customer.name) {
			const customerName = document.getElementById("customerName");
			customerName.value = initialColors.customer.name;
		}
		if (initialColors.customer.themeModule) {
			const themeModule = document.getElementById("themeModule");
			themeModule.value = initialColors.customer.themeModule;
		}
	}
	if (initialColors.font) {
		if (initialColors.font.name) {
			const fontName = document.getElementById("fontName");
			fontName.value = initialColors.font.name;
		}
		if (initialColors.font.headingsName) {
			const headingsName = document.getElementById("headingsName");
			headingsName.value = initialColors.font.headingsName;
		}
	}
	if (initialColors.iconFont) {
		if (initialColors.iconFont.name) {
			const iconFontName = document.getElementById("iconFontName");
			iconFontName.value = initialColors.iconFont.name;
			const classPrefix = document.getElementById("classPrefix");
		}
		if (initialColors.iconFont.classPrefix) {
			classPrefix.value = initialColors.iconFont.classPrefix;
		}
	}

	// Populate initial spacing fields
	const spacingContainer = document.getElementById("SpacingContent");
	for (const space in initialColors.spacing) {
		addSpacingField(spacingContainer, space, initialColors.spacing[space]);
	}
	// Populate initial color fields
	var colorsTabCont = document.getElementById("colors");
	for (const category in initialColors.colors) {
		var currColor = "";
		let container = document.getElementById(`${category}Colors`);
		if (!container) {
			var wrapper;
			var callbackfunc =
				category != "extended" ? addColorInputFields : addExtendedColor;
			wrapper = createColorCategoryContainer(category, callbackfunc);
			colorsTabCont.appendChild(wrapper);
			container = wrapper.querySelector(`#${category}Colors`);
		}
		for (const color in initialColors.colors[category]) {
			if (category === "extended") {
				let colorCont;
				if (currColor !== color) {
					colorCont = document.createElement("div");
					colorCont.className = "color-variation";
					colorCont.setAttribute("data-category", category);
					colorHeading = document.createElement("h2");
					colorHeading.className = "text-l font-bold";
					colorHeading.innerHTML = color;
					colorCont.appendChild(colorHeading);
					container.appendChild(colorCont);
				}
				for (const variation in initialColors.colors[category][color]) {
					addColorField(
						colorCont,
						category,
						color,
						variation,
						initialColors.colors[category][color][variation],
						"ml-10"
					);
					if (currColor !== color) {
						var btn = document.createElement("button");
						btn.type = "button";
						btn.id = "Add" + color + "variation";
						btn.className =
							"bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600";
						btn.innerHTML = "Add " + color + " variation";

						btn.addEventListener("click", function () {
							addColorInputFields(colorCont, category, color, "ml-10");
						});
						container.appendChild(btn);
						currColor = color;
					}
				}
			} else {
				const fieldName = `${category}_${color}`;
				addColorField(
					container,
					category,
					"",
					color,
					initialColors.colors[category][color]
				);
			}
		}
	}
}

function addSpacingField(container, spacingName, spacingValue) {
	const spacingField = document.createElement("div");

	spacingField.className = `spacing-field`;
	spacingField.innerHTML = `
                <label for="value-spacing-${id}" id="text-spacing-${id} name="${spacingName}">${spacingName}:</label>
                <input type="text" class="appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white border-blue-500" id="value-spacing-${id}" name="value-spacing-${id}" value="${spacingValue}">
            `;
	container.appendChild(spacingField);
	id++;
}

function addSpacingInputFields(container, customClass) {
	const spacingrField = document.createElement("div");
	spacingrField.className = `spacing-field ${customClass} `;
	spacingrField.setAttribute("isNew", true);
	spacingrField.innerHTML = `
                <input type="text" id="text-spacing-${id}" name="text-spacing-${id}" placeholder="Spacing Name">
                <input type="text" class="appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white border-blue-500" id="value-spacing-${id}" name="value-spacing-${id}" value="px">
            `;
	container.appendChild(spacingrField);
	id++;
}

function addColorField(
	container,
	category,
	mainColor,
	colorName,
	colorValue,
	customClass
) {
	const colorField = document.createElement("div");
	colorField.className = `color-field flex items-center ${customClass} `;
	colorField.setAttribute("data-category", category);
	colorField.setAttribute("data-mainColor", mainColor);
	colorField.innerHTML = `
                <label for="value-color-${id}" id="text-color-${id} name="${colorName}">${colorName}:</label>
                <input type="text" class="appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white border-blue-500" id="value-color-${id}" name="value-color-${id}" value="${colorValue}">								
            `;
	var icon = getIcon("delete");

	icon.addEventListener("click", function () {
		colorField.remove();
	});
	colorField.appendChild(icon);

	container.appendChild(colorField);
	id++;
}
// Function to add new color input fields
function addColorInputFields(container, category, mainColor, customClass) {
	const colorField = document.createElement("div");
	colorField.className = `color-field flex items-center ${customClass} `;
	colorField.setAttribute("data-category", category);
	colorField.setAttribute("data-mainColor", mainColor);
	colorField.innerHTML = `
                <input type="text" id="text-color-${id}" name="text-color-${id}" placeholder="Color Name">
                <input type="text" class="appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white border-blue-500" id="value-color-${id}" name="value-color-${id}" value="#000000">
            `;
	var icon = getIcon("delete");

	icon.addEventListener("click", function () {
		colorField.remove();
	});
	colorField.appendChild(icon);
	container.appendChild(colorField);
	id++;
}

function addExtendedColor(container) {
	let colorCont = document.createElement("div");
	colorCont.className = "color-variation";
	colorCont.setAttribute("data-category", "extended");
	colorHeading = document.createElement("input");
	colorHeading.className = "text-l font-bold";
	colorHeading.value = "New Color";

	colorCont.appendChild(colorHeading);
	container.appendChild(colorCont);
	let btn = document.createElement("button");
	btn.type = "button";
	btn.id = "Add" + colorHeading.value + "variation";
	btn.className =
		"bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600";
	btn.innerHTML = "Add " + colorHeading.value + " variation";

	btn.addEventListener("click", function () {
		e.preventDefault();
		addColorInputFields(colorCont, "extended", colorHeading.value, "ml-10");
	});
	container.appendChild(btn);

	colorHeading.addEventListener("input", function () {
		e.preventDefault();
		btn.innerHTML = "Add " + this.value + " variation";
		btn.id = "Add" + this.value + "variation";
	});
}

function setJson(category, mainColor) {
	if (!initialColors.colors[category]) {
		initialColors.colors[category] = {};
	}
	if (!initialColors.colors[category][mainColor] && mainColor != "") {
		initialColors.colors[category][mainColor] = {};
	}
}

function getColorNameAndValue(elem) {
	const colorNameInput = elem.querySelector('[id*="text-color"]');
	const colorValueInput = elem.querySelector('[id*="value-color"]');

	if (colorNameInput) {
		const fieldName =
			colorNameInput.nodeName === "INPUT"
				? `${colorNameInput.value}`
				: colorNameInput.innerHTML.replace(":", "");
		const colorValue = colorValueInput.value;
		return { fieldName: fieldName, colorValue: colorValue };
	}
}

function getSpacingNameAndValue(elem) {
	const spacingNameInput = elem.querySelector('[id*="text-spacing"]');
	const spacingValueInput = elem.querySelector('[id*="value-spacing"]');

	if (spacingNameInput) {
		const fieldName =
			spacingNameInput.nodeName === "INPUT"
				? `${spacingNameInput.value}`
				: spacingNameInput.innerHTML.replace(":", "");
		const spacingValue = spacingValueInput.value;
		return { fieldName: fieldName, spacingValue: spacingValue };
	}
}

function getAttributeUniqueValues(attribute) {
	// Select all elements with the data-color attribute
	var elementsWithDataColor = document.querySelectorAll(`[${attribute}]`);

	// Initialize an array to store the unique attribute values
	var uniqueAttributeValues = [];

	// Loop through the selected elements and extract the attribute values
	for (var i = 0; i < elementsWithDataColor.length; i++) {
		var value = elementsWithDataColor[i].getAttribute(`${attribute}`);

		// Check if the value is not already in the uniqueAttributeValues array
		if (!uniqueAttributeValues.includes(value)) {
			uniqueAttributeValues.push(value);
		}
	}

	// Now, uniqueAttributeValues contains all unique values of the data-color attribute
	return uniqueAttributeValues;
}

function getIcon(iconName) {
	var icon = document.createElement("i");
	icon.className = "material-symbols-outlined cursor-pointer text-red-600";
	icon.innerHTML = iconName;

	return icon;
}

function createColorCategoryContainer(category, addBtnFunction) {
	var fieldset = document.createElement("fieldset");
	fieldset.className = "mb-6";
	var wrapper = document.createElement("div");
	wrapper.innerHTML = `<legend class="text-xl font-bold text-blue-500">${category} Colors</legend>`;
	wrapper.className = "flex gap-2 items-center";
	var button = document.createElement("button");
	button.id = `add${category}Color`;
	button.appendChild(getIcon("add"));
	button.className = "flex items-center group";
	button.innerHTML += `<span class="opacity-0 group-hover:opacity-100">Add ${category} Color</span>`;

	wrapper.appendChild(button);
	var colorsWrapper = document.createElement("div");
	colorsWrapper.id = `${category}Colors`;
	button.addEventListener("click", function (e) {
		e.preventDefault();
		addBtnFunction(colorsWrapper, category);
	});
	fieldset.appendChild(colorsWrapper);
	fieldset.prepend(wrapper);

	return fieldset;
}
function createNewColorCategoryContainer(addBtnFunction) {
	var fieldset = document.createElement("fieldset");
	fieldset.className = "mb-6";
	var wrapper = document.createElement("div");
	wrapper.innerHTML = `<legend class="text-xl font-bold text-blue-500">${category} Colors</legend>`;
	wrapper.className = "flex gap-2 items-center";
	var button = document.createElement("button");
	button.id = `add${category}Color`;
	button.appendChild(getIcon("add"));
	button.className = "flex items-center group";
	button.innerHTML += `<span class="opacity-0 group-hover:opacity-100">Add ${category} Color</span>`;
	button.addEventListener("click", function (e) {
		e.preventDefault();
		addBtnFunction(fieldset, category);
	});
	wrapper.appendChild(button);
	fieldset.innerHTML = `<div id="${category}Colors">
                    </div>`;
	fieldset.prepend(wrapper);

	return fieldset;
}
function sendAlert(text, alertType) {
	var existingAlert = document.querySelector(".alert");
	existingAlert && existingAlert.remove();
	alert = document.createElement("div");
	alert.id = "top-alert";
	alert.className =
		"alert fixed top-0 w-full max-w-7xl text-white p-4 transform translate-y-full transition-transform display-block ";
	alertType === AlertType.Success
		? alert.classList.add("bg-green-500")
		: alertType === AlertType.Error
		? alert.classList.add("bg-red-500")
		: alertType === AlertType.Info
		? alert.classList.add("bg-blue-500")
		: "";
	alert.innerHTML = text;
	alert.addEventListener("click", alert.remove);
	document.querySelector(".main-content").prepend(alert);
	function hideAlert() {
		alert.style.animation = "slideOut 0.5s forwards";
		setTimeout(() => {
			alert.remove();
		}, 500); // Adjust the time to match the animation duration
	}

	// Show the alert initially and hide it after a few seconds

	setTimeout(hideAlert, 5000); // Hide the alert after 5 seconds (adjust the time as needed)
}

function askRunCommand(command, el) {
	el && el.classList.add("loading");
	fetch("/run", {
		method: "POST",
		body: command,
	})
		.then((res) => {
			if (!res.ok) {
				return res.text().then((text) => {
					throw new Error(text);
				});
			} else {
				return res.text().then((text) => {
					sendAlert(text, AlertType.Success);
					el && el.classList.remove("loading");
				});
			}
		})
		.catch((err) => {
			sendAlert(err.message, AlertType.Error);
			el && el.classList.remove("loading");
		});
}
function setJsonSave() {
	document.getElementById("jsonForm").addEventListener("submit", function (e) {
		console.log("saving the file");
		e.preventDefault();
		initialColors = {};
		if (!initialColors.customer) {
			initialColors.customer = {};
		}
		initialColors.customer.name = document.getElementById("customerName").value;
		initialColors.customer.themeModule =
			document.getElementById("themeModule").value;
		if (!initialColors.font) {
			initialColors.font = {};
		}
		initialColors.font.name = document.getElementById("fontName").value;
		initialColors.font.headingsName =
			document.getElementById("headingsName").value;
		if (!initialColors.iconFont) {
			initialColors.iconFont = {};
		}
		initialColors.iconFont.name = document.getElementById("iconFontName").value;
		initialColors.iconFont.classPrefix =
			document.getElementById("classPrefix").value;

		//Retreive dynamic spacing values and names
		let spacingContainer = document.querySelectorAll(".spacing-field");
		spacingContainer.forEach(function (spaceCont) {
			var spacingObj = getSpacingNameAndValue(spaceCont);
			if (!initialColors.spacing) {
				initialColors.spacing = {};
			}
			initialColors.spacing[spacingObj.fieldName] = spacingObj.spacingValue;
		});

		// Retrieve dynamic color values and names
		initialColors.colors = {};
		var categories = getAttributeUniqueValues("data-category");
		for (const i in categories) {
			var category = categories[i];
			if (category === "extended") {
				var mainColors = document.querySelectorAll(
					`.color-variation[data-category="${category}"]`
				);
				mainColors.forEach(function (mainColorCont) {
					var mainColorWrapper = mainColorCont.querySelector("h2, input");
					var mainColor =
						mainColorWrapper.nodeName === "INPUT"
							? `${mainColorWrapper.value}`
							: mainColorWrapper.innerHTML;

					const colors = document.querySelectorAll(
						`[data-category="${category}"][data-maincolor="${mainColor}"]`
					);
					colors.forEach(function (elem) {
						var colorObj = getColorNameAndValue(elem);
						setJson(category, mainColor);
						initialColors.colors[category][mainColor][colorObj.fieldName] =
							colorObj.colorValue;
					});
				});
			} else {
				const colors = document.querySelectorAll(`[data-category=${category}]`);
				if (!colors) {
					initialColors.colors[category] = {};
					break;
				}
				colors.forEach(function (elem) {
					var colorObj = getColorNameAndValue(elem);
					setJson(category, "");
					initialColors.colors[category][colorObj.fieldName] =
						colorObj.colorValue;
				});
			}
		}

		console.log(JSON.stringify(initialColors, null, 2));
		fetch("/write", {
			method: "POST",
			body: JSON.stringify(initialColors, null, 2),
		})
			.then((res) => res.text())
			.then((data) => {
				sendAlert(data, AlertType.Success);
			});
	});
}

function createNewColorPallete() {
	var colorsTabCont = document.getElementById("colors");
	var wrapper;
	var callbackfunc = addColorInputFields;
	var fieldset = document.createElement("fieldset");
	fieldset.className = "mb-6";
	var wrapper = document.createElement("div");
	var legend = document.createElement("legend");
	var palleteNameInput = document.createElement("input");
	palleteNameInput.type = "text";
	palleteNameInput.className = "text-xl font-bold text-blue-500";
	palleteNameInput.id = `colors-${id}`;
	palleteNameInput.name = `colors-${id}`;
	palleteNameInput.placeholder = "New Color Pallete Name";
	palleteNameInput.value = "New Color Pallete";

	legend.appendChild(palleteNameInput);
	wrapper.appendChild(legend);
	wrapper.className = "flex gap-2 items-center";
	var button = document.createElement("button");
	button.id = `addNewPaletteColor`;
	button.appendChild(getIcon("add"));
	button.className = "flex items-center group";
	button.innerHTML += `<span class="opacity-0 group-hover:opacity-100">Add ${palleteNameInput.value} Color</span>`;

	wrapper.appendChild(button);
	var colorsWrapper = document.createElement("div");
	colorsWrapper.id = "newPalletteColors";
	fieldset.appendChild(colorsWrapper);
	button.addEventListener("click", function (e) {
		e.preventDefault();
		callbackfunc(colorsWrapper, palleteNameInput.value);
	});
	palleteNameInput.addEventListener("input", function (e) {
		colorsWrapper.id = palleteNameInput.value + "Colors";
		button.id = `addNew${palleteNameInput.value}Color`;
		colorsWrapper.querySelectorAll(".color-field").forEach(function (elem) {
			elem.setAttribute("data-category", palleteNameInput.value);
		});
	});
	fieldset.prepend(wrapper);

	colorsTabCont.appendChild(fieldset);
}
