ThreadJS
========

ThreadJS is a simple convinience wrapper on top of web workers. It allows you to launch a web worker without
creating a separate javascript file. You just write your thread method and (optionally) pass custom parameters.

Installation
===========
Import the library using:
	<script src="Thread.js"></script>

Usage
=====

	var thread = new Thread(function (customArgs) {
		//Code here will be executed in a web worker.
		//You can use postMessage to send data back to main thread, just like plain web workers.
	});

	//Optionally handle onmessage & onerror to receive data and error from thread.

	thread.onmessage = function(e) {
		console.log('Received message: ' + e.data);
	}

	thread.onerror = function(e) {
		console.log('Error: ' + e.message);
	}

	var custom_args = { test: [1,2,3] };

	//Start thread passing optional custom parameters
	thread.start(custom_args);
	
	//You can stop the thread at any time using the stop method
	thread.stop()

An example resides in Example.htm