"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// For connect to db in mongodb
_mongoose["default"].connect("mongodb://127.0.0.1/apidb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
  useCreateIndex: true
}).then(function (db) {
  return console.log('DB is connected');
})["catch"](function (err) {
  return console.warn(err);
});