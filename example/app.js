/**
 * This example shows how an angular client can extend the $log service to send a message to this
 * node logging service
 *
 * To test this, open a command window in this project's root directory and execute
 * 		npm install
 * 		node index.js
 *
 * Then open example/index.html in a browser and click the button
 *
 * Log messages should show in your command window
 *
 */
angular.module("app", [])

	.config(function($provide) {

		// extend Angular's $log to send messages to node logging service as well as console
		$provide.decorator("$log", function ($delegate, $injector) {

			var logFn = $delegate.log;
			$delegate.log = function(message) {
				var NodeLogger = $injector.get("NodeLogger");
				NodeLogger.log(message, "log");
				logFn.apply(null, arguments);
			};
			var errorFn = $delegate.error;
			$delegate.error = function(message) {
				var NodeLogger = $injector.get("NodeLogger");
				NodeLogger.log(message, "error");
				errorFn.apply(null, arguments);
			};
			var warnFn = $delegate.warn;
			$delegate.warn = function(message) {
				var NodeLogger = $injector.get("NodeLogger");
				NodeLogger.log(message, "warn");
				warnFn.apply(null, arguments);
			};
			var infoFn = $delegate.info;
			$delegate.info = function(message) {
				var NodeLogger = $injector.get("NodeLogger");
				NodeLogger.log(message, "info");
				infoFn.apply(null, arguments);
			};

			return $delegate;
		});
	});

angular.module("app")

	.factory("NodeLogger", function($http) {

		function log(message, type) {
			type = type || "";
			$http.post("http://localhost:3000/log", { type: type, message: message });
		}

		return {
			log: log
		}
	})

	.controller("AppCtrl", function($scope, $log) {

		$scope.sendLog = function() {
			$log.log("My log message");
			$log.info("My info message");
			$log.warn("My warning");
			$log.error("My error");
		};
	});