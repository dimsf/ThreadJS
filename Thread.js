function Thread(threadMethod) {
    var methodStr = threadMethod.toString().replace(/((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg, '') //Clear comments
    var paramsArray = methodStr.slice(methodStr.indexOf('(') + 1, methodStr.indexOf(')')).match(/([^\s,]+)/g)

    var methodBody = methodStr.substring(methodStr.indexOf('{') + 1, methodStr.lastIndexOf('}'));

    var args, worker;

    if (paramsArray !== null) {
        if (paramsArray.length >= 1) {
            args = paramsArray[0];
        }
    }

    this.start = function (arguments) {

        //Inject custom arguments field
        if (arguments != undefined) {
            if (paramsArray.length >= 1) {
                methodBody = paramsArray[0] + "=" + JSON.stringify(arguments) + ";" + methodBody;
            }
        }

        var objURL = URL.createObjectURL(new Blob([methodBody], { type: 'text/javascript' }));
        worker = new Worker(objURL);

        worker.onmessage = this.onmessage;
        worker.onerror = this.onerror;
    }

    //Posts a message to the underlying WebWorker
    this.postMessage = function (data) {
        worker.postMessage(data);
    };

    //Stops the underlying webworker
    this.stop = function () {
        if (worker) {
            worker.terminate();
        }
    };
}