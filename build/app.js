"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _package = _interopRequireDefault(require("../package.json"));

var _initialSetup = require("./libs/initialSetup");

var _users = _interopRequireDefault(require("./routes/users.routes"));

var _products = _interopRequireDefault(require("./routes/products.routes"));

var _auth = _interopRequireDefault(require("./routes/auth.routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Import express module
// Import morgan module
// Import as pkg the package.json
// Import createRoles from initialSetup
// Import users routes from users.routes
// Import product routes from product.routes
// Import auth routes from auth.routes
var app = (0, _express["default"])();
(0, _initialSetup.createRoles)(); // Create all default roles from initialSetup

app.set('pkg', _package["default"]); // Import data from package.json for get its information

app.use((0, _morgan["default"])('dev')); // This line show in console all requiest from the server

app.use(_express["default"].json()); // Allow the app understand recive json from client

/**
 * Routes
 */
// GET home

app.get('/', function (req, res) {
  res.json({
    // Show in client the name, author, description and version from package.json (pkg)
    application: app.get('pkg').name,
    author: app.get('pkg').author,
    description: app.get('pkg').description,
    version: app.get('pkg').version
  });
});
app.use('/api/products', _products["default"]); // Routes for products

app.use('/api/auth', _auth["default"]); // Routes for auth

app.use('/api/users', _users["default"]); // Routes for users

var _default = app;
exports["default"] = _default;