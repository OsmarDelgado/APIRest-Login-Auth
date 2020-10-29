"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

// Import Schema and model from mongoose for create in the db
var productSchema = new _mongoose.Schema({
  // Save the Schema in a const to call in other place in the code
  name: String,
  category: String,
  price: Number,
  imgURL: String
}, {
  timestamps: true,
  // Timestamp create two fields (created_at and updated_at)
  versionKey: false
});

var _default = (0, _mongoose.model)('Product', productSchema); // Export model for get two data to create a Product


exports["default"] = _default;