import {
	resetOptions,
	createRoomOptions,
	chatScreenshot,
	createMessage,
} from './helpers.js';
const socket = io();

// Select DOM elements
const signInContainer = document.querySelector('#sign-in');
const usernameInput = document.querySelector('#username');
const roomSelect = document.querySelector('#chatroom');
const joinButton = document.querySelector('#join-button');
const chatWindow = document.querySelector('#chat');
const messageDisplay = document.querySelector('#message-output');
const messageForm = document.querySelector('#message-form');
const messageInput = document.querySelector('#message-input');
const messageSubmit = document.querySelector('#message-submit');

// Handle join button click
joinButton.addEventListener('click', e => {
	try {
		e.preventDefault();

		const username = usernameInput.value.trim();
		const room = roomSelect.value.trim();

		if (!username || !room) {
			return alert('Please enter a username and select a room.');
		}

		socket.emit('roomJoined', username, room);

		// Hide join form and display chat UI
		signInContainer.style.display = 'none';
		chatWindow.style.display = 'flex';
	} catch (error) {
		console.error(error);
	}
});

messageForm.addEventListener('submit', e => {
	try {
		e.preventDefault();

		const message = messageInput.value;

		socket.emit('message', message);
	} catch (error) {
		console.error(error);
	}
});

// Handle chat room list received from server
socket.on('listRooms', rooms => {
	try {
		console.log('LIST ROOOOOMS');

		// Clear existing options from room select
		console.log(rooms);

		resetOptions(roomSelect);

		createRoomOptions(rooms, roomSelect);
	} catch (error) {
		console.error(error);
	}
});

socket.on('duck', data => {
	try {
		const { username, src } = data;
		console.log({ username, src });
		chatScreenshot(username, src, messageDisplay);
		messageInput.value = '';
	} catch (error) {
		console.log(error);
	}
});

socket.on('message', data => {
	console.log('Message');
	try {
		createMessage(data, messageDisplay);
		messageInput.value = '';
	} catch (error) {
		console.error(error);
	}
});

socket.on('resetChat', () => {
	console.log('RESET');
	signInContainer.style.display = 'block';
	chatWindow.style.display = 'none';
	console.log(messageDisplay);
	while (messageDisplay.firstChild) {
		console.log(messageDisplay.childNodes);
		console.log(messageDisplay.firstChild);
		messageDisplay.removeChild(messageDisplay.firstChild);
	}
});

socket.on('connect', () => {
	console.log(`Connected`);
	console.log(socket.id);
});
// socket.on('reconnect', () => {
// 	console.log(`Disconnected`);
// 	console.log(socket.id);
// });
