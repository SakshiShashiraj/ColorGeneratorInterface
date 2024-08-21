function getUserInput() {
	const userInput = [];
	for (i = 0; i < 5; i++) {
		let colorElement = document.getElementById(`color${i}`);

		if (colorElement === null) {
			console.error(`Element with ID 'color${i}' not found`);
			continue;
		}

		color = colorElement.value.trim();

		if (color.toLowerCase() === 'n'){
			userInput.push("N");
		} else {
			try {
				let rgbArray = JSON.parse(color);
				if (Array.isArray(rgbArray) && rgbArray.length === 3) {
					userInput.push(rgbArray);
				} else {
					throw new Error("Incorrect format for an rgbArray detected. Throwing error.");
				} 
			}
			catch {
				console.error("Invaid input format. Using 'N' instead.")
				userInput.push("N");
			}
		}
	}
	return userInput;
}

// example result - note that the input colors may change as well, by a small amount.
// [[42, 41, 48], [90, 83, 84], [191, 157, 175], [188, 138, 125], [215, 170, 66]]
function generatePalette() {
	var url = "http://colormind.io/api/";
	var data = {
		model : "default",
		input : getUserInput()
	}

	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = () => {
		const status = xhr.status;
		if ((status >= 200 && status < 400)) {
			var palette = JSON.parse(xhr.responseText).result;
			displayPalette(palette);
		} else{
			console.error("There was an error with the request!");
		}
	}

	xhr.open("POST", url, true);
	xhr.send(JSON.stringify(data));
}

function displayPalette(palette) {
	const container = document.getElementById("palette-container");
	container.innerHTML = ""; //clear content

	palette.forEach(color => {
		const colorDiv = document.createElement("div");
		colorDiv.style.backgroundColor = 'rgb(${color[0]}, ${color[1]}, ${color[2]})';
		colorDiv.style.width = "100px";
		colorDiv.style.height = "100px";
		colorDiv.style.display = "inline-block";
		colorDiv.style.margin = "10px";
		container.appendChild(colorDiv);
	});
} 
