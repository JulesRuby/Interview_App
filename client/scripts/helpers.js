const resetOptions = roomSelect => {
	const blankOption = document.createElement('option');
	blankOption.value = '';
	blankOption.textContent = 'Select a room...';

	while (roomSelect.length) {
		console.log(roomSelect.options[0]);
		roomSelect.remove(0);
	}

	roomSelect.appendChild(blankOption);
};

const createRoomOptions = async (rooms, roomSelect) => {
	console.log({ rooms, roomSelect });
	// create document fragment
	const optionsFragment = new DocumentFragment();
	let len = rooms.length;

	for (let i = 0; i < len; i++) {
		const roomOption = document.createElement('option');
		roomOption.value = rooms[i];
		roomOption.textContent = rooms[i];
		optionsFragment.appendChild(roomOption);
	}

	roomSelect.appendChild(optionsFragment);
};

const createMessage = async (data, messageDisplay) => {
	console.log(data);
	const { username, message } = data;
	const messageEl = document.createElement('p');
	messageEl.className = 'message';
	const usernameEl = document.createElement('span');
	usernameEl.className = 'username';
	const usernameText = document.createTextNode(username);
	const contentText = document.createTextNode(message);

	usernameEl.appendChild(usernameText);
	messageEl.appendChild(usernameEl);
	messageEl.appendChild(contentText);

	messageDisplay.appendChild(messageEl);
	messageEl.scrollIntoView(true);
};

const chatScreenshot = async (username, src, messageDisplay) => {
	const screenshotEl = document.createElement('div');
	screenshotEl.className = 'screenshot-container';
	const usernameEl = document.createElement('span');
	usernameEl.className = 'username';
	const usernameText = document.createTextNode(username);
	const screenshot = new Image(500, 312);
	screenshot.src = src;

	console.log({ username, src, messageDisplay });

	usernameEl.appendChild(usernameText);
	screenshotEl.appendChild(usernameEl);
	screenshotEl.appendChild(screenshot);

	messageDisplay.appendChild(screenshotEl);

	screenshotEl.scrollIntoView(true);
};

export { resetOptions, createRoomOptions, chatScreenshot, createMessage };
