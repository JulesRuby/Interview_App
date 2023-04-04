const express = require('express');
const path = require('path');
const { createServer } = require('http');
const { Server } = require('socket.io');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

app.use(express.static(path.join(__dirname + '/client')));

/**
 * These rooms will populate the Room join dropdpown
 */
const rooms = ['Room 1', 'Room 2', 'Room 3'];

/** TASK 1 **/
/******************************************************
 * Decide how to store global users variable
 * attach username and room passed in from `roomJoined` to socket.id key
 **************************************************/
// define users structure here
// users;

io.on('connection', socket => {
	console.log(`User id ${socket.id} connected!`);
	socket.emit('resetChat'); // resets room on connect/reconnect

	// populates chat rooms dropdown on client
	socket.emit('listRooms', rooms);

	// listener for roomJoined event
	socket.on('roomJoined', (username, room) => {
		// join room
		socket.join(room);

		// send welcome message
		socket.emit('message', {
			username: 'Nerman',
			message: `Hello there, ${username}. Welcome to ${room}!`,
		});
	});

	// Listen for client messages
	socket.on('message', message => {
		console.log(message);
		// get user info => (username and room) from stored user
		const username = ''; // get username from user
		const room = ''; // get room from user

		// Add !duck command logic here

		// send user message to the current room
		io.to(room).emit('message', { username, message });
	});

	/** TASK 2 */
	/**
	 *
	 * Create a chat command !duck
	 *
	 * 	=> server recognizes prefix and command name within the socket.on('message')
	 *
	 * 	=> server makes a call to the API
	 * 	(URL = https://random-d.uk/api/v2/random)
	 *
	 * 	=> upon succesful response, emits the `duck` event with arguments
	 * 	`username` and `src` (username must be 'Nerman' and src is the
	 * 	response URL
	 *
	 */

	// listen for user disconnect
	socket.on('disconnect', () => {
		console.log(`User id ${socket.id} disconnected!`);

		/**
		 * OPTIONAL: empty the users variable on disconnect
		 */

		/**
		 * 	=> (OPTIONAL) program command to accept one
		 * 	space delimited argument
		 *		that is a number id, and emit `duck` with returned src,
		 *	   upon successful
		 *	   response (URL = https://random-d.uk/api/v2/<num>.jpg)
		 */
	});
});

const PORT = process.env.PORT || 5000;

httpServer.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}...`);
});
