"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createUser = void 0;

var _User = _interopRequireDefault(require("../models/User"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _config = _interopRequireDefault(require("../config"));

var _Role = _interopRequireDefault(require("../models/Role"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var createUser = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _req$body, username, email, password, roles, newUser, foundRoles, role, savedUser, token;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, username = _req$body.username, email = _req$body.email, password = _req$body.password, roles = _req$body.roles; // Get this data from req.body

            _context.t0 = _User["default"];
            _context.t1 = username;
            _context.t2 = email;
            _context.next = 6;
            return _User["default"].encryptPassword(password);

          case 6:
            _context.t3 = _context.sent;
            _context.t4 = {
              username: _context.t1,
              email: _context.t2,
              password: _context.t3
            };
            newUser = new _context.t0(_context.t4);

            if (!roles) {
              _context.next = 16;
              break;
            }

            _context.next = 12;
            return _Role["default"].find({
              name: {
                $in: roles
              }
            });

          case 12:
            foundRoles = _context.sent;
            // If user put a role then this role is searched in the db and return the role object 
            newUser.roles = foundRoles.map(function (role) {
              return role._id;
            }); // Search in the foundRoles the id role and save in newUser.roles

            _context.next = 20;
            break;

          case 16:
            _context.next = 18;
            return _Role["default"].findOne({
              name: "User"
            });

          case 18:
            role = _context.sent;
            // If the role is not exist assign the User role
            newUser.roles = [role._id]; // Assign the role id to this new User

          case 20:
            _context.next = 22;
            return newUser.save();

          case 22:
            savedUser = _context.sent;
            // Save User in db
            //console.log(savedUser);
            token = _jsonwebtoken["default"].sign({
              id: savedUser._id
            }, _config["default"].SECRET, {
              // Create a JWT for the new user with its ID, the SECRET Key from config.js and expires in 24 hours (86400 sec)
              expiresIn: 86400 // 24hrs in seconds

            });
            res.json({
              token: token
            }); // Return the generated token with JWT

          case 25:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function createUser(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.createUser = createUser;