## Installation

```bash
$ npm install logging-service
```

## How It Works

  * Listens for HTTP GET/POST messages to http://localhost:3000/log
  * GET messages --> send properties 'type' and 'message' as query parameters
  * POST messages --> send properties 'type' and 'message' as JSON object
  * Supported values for type: log, error, warn, info (each gives different colour message, defaults to log if none provided or invalid type)

## Running The Service

In the command line cd to the logging-service directory and execute

```bash
$ node index.js
```

Any messages sent to the service should now be output to the console

## Examples

**Making GET request with AngularJS**
```js
var type = "error";
var message = "Error loading file!";
$http.get("http://localhost:3000/log?type=" + type + "&message=" + message);
```

**Making POST request with AngularJS**
```js
$http.post("http://localhost:3000/log", {
    type: "log",
    message: escape("Loading http://test.com/a=b&c=d"));
}
```