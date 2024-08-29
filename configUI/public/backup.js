let initialColors = {};

addEventListener("load", () => {
	setTabs();
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

var id = 0;

// Function to add new color fields dynamically

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
		addColorInputFields(colorCont, "ml-10");
	});
	container.appendChild(btn);

	colorHeading.addEventListener("input", function () {
		btn.innerHTML = "Add " + this.value + " variation";
		btn.id = "Add" + this.value + "variation";
	});
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
	colorField.className = `color-field ${customClass} `;
	colorField.setAttribute("data-category", category);
	colorField.setAttribute("data-mainColor", mainColor);
	colorField.innerHTML = `
                <label for="value-color-${id}" id="text-color-${id} name="${colorName}">${colorName}:</label>
                <input type="text" class="appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white border-blue-500" id="value-color-${id}" name="value-color-${id}" value="${colorValue}">								
            `;
	var btn = document.createElement("button");
	btn.type = "button";
	btn.innerHTML = "Delete";

	btn.addEventListener("click", function () {
		colorField.remove();
	});
	colorField.appendChild(btn);

	container.appendChild(colorField);
	id++;
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
// Function to add new color input fields
function addColorInputFields(container, category, mainColor, customClass) {
	const colorField = document.createElement("div");
	colorField.className = `color-field ${customClass} `;
	colorField.setAttribute("data-category", category);
	colorField.setAttribute("data-mainColor", mainColor);
	colorField.innerHTML = `
                <input type="text" id="text-color-${id}" name="text-color-${id}" placeholder="Color Name">
                <input type="text" class="appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white border-blue-500" id="value-color-${id}" name="value-color-${id}" value="#000000">
            `;
	var btn = document.createElement("button");
	btn.type = "button";
	btn.innerHTML = "Delete";

	btn.addEventListener("click", function () {
		colorField.remove();
	});
	colorField.appendChild(btn);
	container.appendChild(colorField);
	id++;
}

function init() {
	// Event listeners for adding new colors to respective categories
	document
		.getElementById("addBrandColor")
		.addEventListener("click", function () {
			addColorInputFields(document.getElementById("brandColors"));
		});

	document
		.getElementById("addExtendedColor")
		.addEventListener("click", function () {
			addExtendedColor(document.getElementById("extendedColors"));
		});

	document
		.getElementById("addNeutralColor")
		.addEventListener("click", function () {
			addColorInputFields(document.getElementById("neutralColors"));
		});

	document
		.getElementById("addSemanticColor")
		.addEventListener("click", function () {
			addColorInputFields(document.getElementById("semanticColors"));
		});
	document.getElementById("addSpacing").addEventListener("click", function () {
		addSpacingInputFields(document.getElementById("SpacingContent"));
	});

	//Populate Customer Fields
	const customerName = document.getElementById("customerName");
	customerName.value = initialColors.customer.name;
	const themeModule = document.getElementById("themeModule");
	themeModule.value = initialColors.customer.themeModule;
	// Populate initial spacing fields
	const spacingContainer = document.getElementById("SpacingContent");
	for (const space in initialColors.spacing) {
		addSpacingField(spacingContainer, space, initialColors.spacing[space]);
	}
	// Populate initial color fields
	for (const category in initialColors.colors) {
		var currColor = "";
		const container = document.getElementById(`${category}Colors`);
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

	// Submission handling for generating JSON with all colors
	document.getElementById("jsonForm").addEventListener("submit", function (e) {
		e.preventDefault();

		initialColors.customer.name = document.getElementById("customerName").value;
		initialColors.customer.themeModule =
			document.getElementById("themeModule").value;
		initialColors.font.name = document.getElementById("fontName").value;
		initialColors.font.headingsName =
			document.getElementById("headingsName").value;
		initialColors.iconFont.name = document.getElementById("iconFontName").value;
		initialColors.iconFont.classPrefix =
			document.getElementById("classPrefix").value;

		//Retreive dynamic spacing values and names
		let spacingContainer = document.querySelectorAll(".spacing-field");
		spacingContainer.forEach(function (spaceCont) {
			var spacingObj = getSpacingNameAndValue(spaceCont);

			initialColors.spacing[spacingObj.fieldName] = spacingObj.spacingValue;
		});

		// Retrieve dynamic color values and names
		var categories = getAttributeUniqueValues("data-category");
		for (const i in categories) {
			var category = categories[i];
			initialColors.colors[category] = {};
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
				colors.forEach(function (elem) {
					var colorObj = getColorNameAndValue(elem);
					initialColors.colors[category][colorObj.fieldName] =
						colorObj.colorValue;
				});
			}
		}

		console.log(JSON.stringify(initialColors, null, 2));
		fetch("/write", {
			method: "POST",
			body: JSON.stringify(initialColors, null, 2),
		});
	});
}

function setJson(category, mainColor) {
	if (!initialColors.colors[category]) {
		initialColors.colors[category] = {};
	}
	if (!initialColors.colors[category][mainColor]) {
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
