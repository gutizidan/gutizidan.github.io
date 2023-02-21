"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DEFAULT_HEIGHT = 500;
var DEFAULT_WIDTH = 1600;
var isCongrats;

var MakeItRain = function (_Component) {
  _inherits(MakeItRain, _Component);

  function MakeItRain(props, context) {
    _classCallCheck(this, MakeItRain);

    var _this = _possibleConstructorReturn(this, (MakeItRain.__proto__ || Object.getPrototypeOf(MakeItRain)).call(this, props, context));

    _this.state = {
      intervalTracker: null,
      canvasCtx: null,
      height: props.height || window.innerHeight || DEFAULT_HEIGHT,
      width: props.width || window.innerWidth || DEFAULT_WIDTH,
      isCongrats: props.isCongrats
    };
    return _this;
  }

  _createClass(MakeItRain, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      //canvas init
      var canvas = document.getElementsByClassName("react-snow-effect-canvas");
      var ctx = canvas[0].getContext("2d");

      this.setState({ canvasCtx: ctx });

      //canvas dimensions
      var W = this.state.width;
      var H = this.state.height;

      isCongrats = this.state.isCongrats;

      //snowflake particles
      var mp = this.state.isCongrats ? 200 : 100; //max particles
      var particles = [];
      for (var i = 0; i < mp; i++) {
        var rand = Math.random();

        particles.push({
          x: Math.random() * W, //x-coordinate
          y: this.state.isCongrats ? 0 : H - 2, //y-coordinate
          r: Math.random() * 4 + 1, //radius
          d: Math.random() * mp, //density,
          emoji: !this.state.isCongrats ? (rand < 0.375 ? "🤞" : (rand < 0.75 ? "🙏" : "🍀")) : (Math.random() < 0.7 ? "💵" : "🤑")
        });
      }

      //Lets draw the flakes
      function draw() {
        ctx.clearRect(0, 0, W, H);
        ctx.font = "30px Arial";
        ctx.fillStyle = "rgba(255, 255, 255, 1.0)";

        for (var _i = 0; _i < mp; _i++) {
          var p = particles[_i];
          ctx.fillText(p.emoji, p.x, p.y);
        }

        update();
      }

      //Function to move the snowflakes
      //angle will be an ongoing incremental flag. Sin and Cos functions will be applied to it to create vertical and horizontal movements of the flakes
      var angle = 0;
      function update() {
        angle += 0.01;
        for (var _i2 = 0; _i2 < mp; _i2++) {
          var p = particles[_i2];

          if (isCongrats)
            p.y += ((isCongrats ? 1.1 : 1) * (Math.cos(angle + p.d) + 1 + p.r / 2));
          else
            p.y -= (Math.cos(angle + p.d) + 1 + p.r / 2);

          p.x += Math.sin(angle + p.d);
        }
      }

      this.setState({ intervalTracker: setInterval(draw, 6) });

      //animation loop
      this.state.intervalTracker;
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.state.canvasCtx.clearRect(0, 0, this.state.width, this.state.height);
      clearInterval(this.state.intervalTracker);
    }
  }, {
    key: "render",
    value: function render() {
      var snowStyles = {
        margin: 0,
        padding: 0,
        pointerEvents: 'none',
        position: 'fixed',
        top: 0,
        zIndex: 1
      };

      return _react2.default.createElement("canvas", {
        className: "react-snow-effect-canvas",
        style: snowStyles,
        width: this.state.width,
        height: this.state.height
      });
    }
  }]);

  return MakeItRain;
}(_react.Component);

exports.default = MakeItRain;
;
module.exports = exports['default'];
