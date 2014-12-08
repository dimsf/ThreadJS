ThreadJS
========

ThreadJS is a simple convinience wrapper on top of web workers. It allows you to launch a web worker without
creating a separate javascript file. You just write your thread method and (optionally) pass custom parameters.

Usage
=====

	var thread = new Thread(function (customArgs) {
		//Code here will be executed in a web worker.
	});

	//Optionally handle onmessage & onerror to receive data and error from thread.

	thread.onmessage = function(e) {
		console.log('Received message: ' + e.data);
	}

	thread.onerror = function(e) {
		console.log('Error: ' + e.message);
	}

	var custom_args = { test: [1,2,3] };

	//Start thread passing custom parameters
	thread.start(custom_args);
