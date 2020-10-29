"use strict";

var _app = _interopRequireDefault(require("./app"));

require("./db");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Import app from the app.js
_app["default"].set('port', process.env.PORT || 3000); // Set port number to the server, if exist a defined port take that if not put port in 3000


_app["default"].set('json spaces', 2); // Starting server


_app["default"].listen(_app["default"].get('port'), function () {
  console.log("Server on port ".concat(_app["default"].get('port')));
});