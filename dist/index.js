"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _handler = require("official_joke_api/handler");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _default =
/*#__PURE__*/
function () {
  function _default(options) {
    _classCallCheck(this, _default);

    this.name = options.name || 'Helio Jokes';
    this.publicPaths = [options.path, new RegExp("^".concat(options.path, "/.*"))];
    var self = this;

    var router = this.router = _express["default"].Router();

    router.get('/', this.getJoke);
    router.use(function (err, req, res, next) {
      console.error("[MOD ERROR] (".concat(self.name, ")"), err.stack);
      return res.status(500).json({
        error: err.toString()
      });
    });
  }

  _createClass(_default, [{
    key: "getJoke",
    value: function getJoke(req, res, next) {
      var type = req.query.type || 'general';
      var amount = isNaN(req.query.amount) ? 1 : parseInt(req.query.amount);
      var jokes = (0, _handler.jokeByType)(type, amount);
      res.json(jokes);
    }
  }]);

  return _default;
}();

exports["default"] = _default;