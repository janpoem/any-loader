'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bluebird = _interopRequireDefault(require("bluebird"));

var _deepmerge = _interopRequireDefault(require("deepmerge"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var toString = Object.prototype.toString;
var isArray = Array.isArray;

var callbackAsPromise = function callbackAsPromise(callback, binder, args, resolve, reject) {
  if (typeof callback === 'function') {
    // 过滤binder
    if (_typeof(binder) !== 'object') binder = null; // 过滤args

    if (typeof args === 'undefined') args = [];else if (!isArray(args)) args = [args];

    try {
      return callbackAsPromise(callback.apply(binder, args), binder, args);
    } catch (err) {
      return _bluebird.default.reject(err);
    }
  } else if (callback instanceof Error) {
    return _bluebird.default.reject(callback);
  } else if (isArray(callback) && callback.length > 0 && typeof resolve === 'function' && typeof reject === 'function') {
    var item = callback.shift();
    return callbackAsPromise(item, binder, args).then(function () {
      if (callback.length > 0) {
        callbackAsPromise(callback, binder, args, resolve, reject);
      } else {
        resolve();
      }
    }).catch(reject);
  } // else if (callback instanceof Promise) {
  // 	// return new Promise((resolve, reject) => {
  // 	// 	callback.then(() => {
  // 	// 		resolve();
  // 	// 	}).catch(err => {
  // 	// 		reject(err);
  // 	// 	});
  // 	// });
  // 	// return new bbPromise(callback); // 这里必须强制转换为 bluebird 的 Promise
  // 	return bbPromise.resolve(callback);
  // }
  else if (callback instanceof _bluebird.default) {
      return callback;
    } else {
      return _bluebird.default.resolve(callback);
    }
}; // lodash.isString


var isString = function isString(value) {
  var type = _typeof(value);

  return type === 'string' || type === 'object' && value != null && !isArray(value) && toString.call(value) === '[object String]';
};

var LoadStreamError =
/*#__PURE__*/
function (_Error) {
  _inherits(LoadStreamError, _Error);

  function LoadStreamError(error, process, stream) {
    var _this;

    _classCallCheck(this, LoadStreamError);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(LoadStreamError).call(this));
    _this.error = null;
    _this.process = '';
    _this.stream = null; // oh my god....

    Object.defineProperties(_assertThisInitialized(_assertThisInitialized(_this)), {
      name: {
        value: 'LoadStreamError',
        writable: false,
        enumerable: true,
        configurable: false
      },
      error: {
        value: error,
        writable: false,
        enumerable: true,
        configurable: false
      },
      process: {
        value: process,
        writable: false,
        enumerable: true,
        configurable: false
      },
      stream: {
        value: stream,
        writable: false,
        enumerable: true,
        configurable: false
      },
      message: {
        get: function get() {
          return _this.getMessage();
        }
      }
    });
    return _this;
  }

  _createClass(LoadStreamError, [{
    key: "getMessage",
    value: function getMessage() {
      if (this.error instanceof Error || this.error.message && isString(this.error.message)) return this.error.message;else if (isString(this.error)) return this.error;else return this.error + '';
    }
  }]);

  return LoadStreamError;
}(_wrapNativeSuper(Error));

var ProcessSetup = 'setup';
var ProcessBefore = 'before';
var ProcessDoing = 'doing';
var ProcessAfter = 'after';
/**
 * 数据库加载器的抽象类
 *
 * - 考虑到精简核心类的代码，以及面向AOP、OOP编程特性的实现，不考虑实现面向事件的实现了。实际上这不是 `Loader` 这个层面要去解决的问题，完全可以在子类中自行实现。
 *
 * @type Loader
 * @property {{}} args
 */

var Loader =
/*#__PURE__*/
function () {
  /**
   * 构建函数
   *
   * @param {*} args 调用 loader 的初始化参数
   */
  function Loader() {
    var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;

    _classCallCheck(this, Loader);

    Object.defineProperties(this, {
      args: {
        value: this.initArgs(args),
        writable: false,
        enumerable: true,
        configurable: false
      }
    });
  }
  /**
   * 是否一个普通的 object 对象
   *
   * - 如果是 `function`（函数），则执行并取回其结果（这里忽略异步模式）
   * - 必须是 `object` 类型，且不能为 `null`
   * - 不能是数组
   * - 不允许是原生 `Promise` 或 `bluebird.Promise`
   *
   * @param {*} value
   * @return {boolean}
   */


  _createClass(Loader, [{
    key: "isPlainObject",
    value: function isPlainObject(value) {
      // return !(typeof value !== 'object' || value === null || isArray(value) ||
      // 	value instanceof Promise || value instanceof OrigPromise);
      return !(_typeof(value) !== 'object' || value === null || isArray(value) || value instanceof Promise || value instanceof _bluebird.default);
    }
    /**
     * 基于 value ，返回有效的普通 object 或 defaultObj
     *
     * @param {*} value
     * @param {{}} defaultObj
     * @return {{}}
     */

  }, {
    key: "getPlainObject",
    value: function getPlainObject(value) {
      var defaultObj = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      if (typeof value === 'function') value = value();
      return this.isPlainObject(value) ? value : this.isPlainObject(defaultObj) ? defaultObj : {};
    }
    /**
     * 检查一个参数是否为有效的 Loader 构造参数，默认使用的是 `isPlainObject` 的结果，用于提供给后继的类重载该方法
     *
     * @param {*} args
     * @return {boolean}
     */

  }, {
    key: "isValidArgs",
    value: function isValidArgs(args) {
      return this.isPlainObject(args);
    }
  }, {
    key: "getValidArgs",
    value: function getValidArgs(args) {
      var defaultArgs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.getDefaultArgs();
      if (typeof args === 'function') args = args();
      return this.isValidArgs(args) ? args : this.isValidArgs(defaultArgs) ? defaultArgs : {};
    }
  }, {
    key: "getDefaultArgs",
    value: function getDefaultArgs() {
      return {};
    }
    /**
     * 初始化传入的 args
     *
     * @param {*} args 传入的参数
     * @param {*|undefined|null} mergeArgs 需要合并的参数
     * @returns {{}}
     */

  }, {
    key: "initArgs",
    value: function initArgs(args) {
      var mergeArgs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      args = this.getValidArgs(args); // 被合并后的对象，是一个全新的对象

      if (typeof mergeArgs !== 'undefined' || mergeArgs !== null) {
        args = (0, _deepmerge.default)(args, this.getValidArgs(mergeArgs));
      }

      return args;
    }
  }, {
    key: "mergeArgs",
    value: function mergeArgs(args) {
      return (0, _deepmerge.default)(this.args, this.getValidArgs(args));
    }
    /**
     * 生成新的 LoadStream 输入（input）
     *
     * 应该确保该函数返回的，是一个纯粹的 `object`
     *
     * @param {*} input
     * @return {{}}
     */

  }, {
    key: "newInput",
    value: function newInput(input) {
      return this.mergeArgs(input);
    }
    /**
     * 生成新的 LoadStream 输出（output）
     *
     * @param {{}} input
     * @param {{}|undefined} output
     * @return {*}
     */

  }, {
    key: "newOutput",
    value: function newOutput(input) {
      var output = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      return this.getPlainObject(output);
    }
    /**
     * 判断是否抛出特定的异常（基于 process 和 error 的类型判断），`Loader` 默认的行为以 process 来进行判断
     *
     * @param error
     * @param process
     * @return {boolean}
     */

  }, {
    key: "isThrowError",
    value: function isThrowError(error, process) {
      switch (process) {
        case ProcessAfter:
        case ProcessDoing:
        case ProcessBefore:
          return true;
      }

      return false;
    }
    /**
     * 错误异常的处理方式
     *
     * 被 throw 或 reject 的异常，不需要再返回，只返回未被接管的异常，转交给下一个流程进行处理
     *
     * @param {*} error
     * @param {string} process
     * @param {{}} stream
     * @param {function|null|undefined} reject
     * @returns {this}
     */

  }, {
    key: "handleError",
    value: function handleError(error, process) {
      var stream = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var reject = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;
      // 过滤一下 error ，确使每个 error 都是 Error 实例
      if (!(error instanceof LoadStreamError)) error = new LoadStreamError(error, process, stream);
      if (!isArray(stream.errors)) stream.errors = [];
      stream.errors.push(error); // 不管三七二十一，错误都放入堆

      stream.error = error; // 绑定当前的错误

      if (this.isThrowError(error, process)) {
        if (typeof reject === 'function') {
          reject(error);
        } else {
          throw error;
        }
      }

      return this;
    }
    /**
     * 生成一个新的 LoadStream
     *
     * `LoadStream` —— 本质上是一个不可逆转的数据流向，所以必然具备明确的 `input` 和 `output`。
     *
     * 从实际编程角度出发，我们并不会真的构造一个 `LoadStream` 类，而是用一个 `Promise` 来表达数据加载流向。
     *
     * 另一方面，尽量使用面向 fn 编程，即 `LoadStream` 的实体只在数据流向的接口中有效，`Loader` 不应该是一个状态持有者（`Loader`无状态）
     *
     * 一般而言，这个方法除了在单元测试中使用，很少直接在实际业务层面去调用这个方法。
     *
     * 该方法包含了 `Promise` 的实现，所以尽量不应该在继承的子类中被重载（可惜JS没有保护或者final，也没有私有定义）
     *
     * @final
     * @param {{}|undefined} input
     * @param {{}|undefined} output
     */

  }, {
    key: "newLoadStream",
    value: function newLoadStream() {
      var _this2 = this;

      var input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
      var output = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      return new Promise(function (resolve, reject) {
        input = _this2.newInput(input);
        output = _this2.newOutput(input, output);
        var stream = {
          input: input,
          output: output,
          errors: [],
          error: null
        }; // 增加一个当前的错误

        callbackAsPromise(_this2.setup, _this2, [stream]).then(function () {
          resolve(stream);
        }).catch(function (error) {
          _this2.handleError(error, ProcessSetup, stream, reject);

          resolve(stream);
        });
      });
    }
    /**
     * `LoadStream` 的安装接口，每次执行 `load` 都会生成一个新的 `LoadStream`，然后执行一次 `setup` 接口
     *
     * `setup` 过程中抛出的任何错误，默认的 `Loader` 行为是不会将其抛出，或者 reject 的，而是会作为静默的模式往下一个数据流的接口前进。
     *
     * 在接口中使用异步（包括 beforeLoad/doLoad/afterLoad）说明：
     *
     * - `setup` 允许调用异步方法（比如异步打开文件，异步请求服务器令牌之类），使用异步，必须确保这个接口 `return new Promise()` ，
     *   以使得其能和后面的数据流接口对接（包括兼容 async/await）。
     * - 使用 `Promise` 时，必须明确执行 `resolve` 或 `reject` （特别是逻辑上，最低限度必须有其中一者被执行到，特别要注意，有些地方 if
     *   过去了，实际上未执行。），因为 `Promise` 设计上，就必须有明确的结果（`resolve` 或 `reject`），否则将会使 `Promise` 看似跳空
     *   未执行，实际上这个 `Promise` 一直被挂起了，等待结束。
     * - 如果 `Promise` 中，还存在另一个异步（比如setTimeout，他实际上并不是和 `Promise` 在一个层面的线程管理中 —— 某程度可以这么理解），
     *   这时候，尤其是在 node.js 环境下，就会出现写入对象属性丢失的问题，这实际上就是 C# Java 常说的线程安全问题，所以，在 `Promise`
     *   必须严格使用 `resolve` 和 `reject` ，仅且应该只使用这两个方式，来传递数据或者对象（这比上述一点的要求更进一步，更严格了）。
     * - 所以，总结而言，在 `Promise` 中，抛出异常应该尽量使用 `resolve` 或 `reject`，特别是在异步中再执行异步时，问题将变得更加复杂。
     *
     * @param {{input: {}, output: {}, errors: array}} loadStream
     */

  }, {
    key: "setup",
    value: function setup(loadStream) {}
    /**
     * ·load· 的前置接口
     *
     * load 方法被执行后，依次调用 `newLoadStream -> setup -> beforeLoad -> doLoad -> afterLoad` 几个接口。
     *
     * 其中 `newLoadStream` 和 `setup` 默认不会干涉异常，采用静默模式。后三者，任意一个环节存在异常错误，则会中断后续的接口执行。
     *
     * ```
     * `beforeLoad`  ->  `doLoad`  ->  `afterLoad`
     *       \              \               \
     *     Error          Error           Error
     * ```
     *
     * 在接口中未执行异步调用（异步中的异步），可直接使用 `throw new Error` 来抛出异常，简化代码，减少结构控制的代码量。
     *
     * @param {{input: {}, output: {}, errors: array}} loadStream
     */

  }, {
    key: "beforeLoad",
    value: function beforeLoad(loadStream) {}
    /**
     * `load` 实际执行的实现接口， Loader 作为父类，默认会抛出异常，请在继承的子类中扩展。
     *
     * 请参考 `setup` 和 `beforeLoad` 的注释说明
     *
     * @param {{input: {}, output: {}, errors: array}} loadStream
     */

  }, {
    key: "doLoad",
    value: function doLoad(loadStream) {
      throw new Error("Loader.doLoad is an abstract method, please overload in ".concat(this.constructor.name, "!"));
    }
    /**
     * `load` 的后置接口
     *
     * @param {{input: {}, output: {}, errors: array}} loadStream
     */

  }, {
    key: "afterLoad",
    value: function afterLoad(loadStream) {}
  }, {
    key: "load",
    value: function load() {
      var _this3 = this;

      var input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
      return new _bluebird.default(function (resolve, reject) {
        return _this3.newLoadStream(input).then(function (loadStream) {
          var process = ProcessBefore;

          var onCatch = function onCatch(err) {
            _this3.handleError(err, process, loadStream, reject);

            resolve(loadStream);
          };

          return callbackAsPromise(_this3.beforeLoad, _this3, [loadStream]).then(function ()
          /* ignore here */
          {
            process = ProcessDoing;
            return callbackAsPromise(_this3.doLoad, _this3, [loadStream]).then(function ()
            /* ignore here */
            {
              process = ProcessAfter;
              return callbackAsPromise(_this3.afterLoad, _this3, [loadStream]).then(function ()
              /* ignore here */
              {
                resolve(loadStream);
              }).catch(onCatch);
            }).catch(onCatch);
          }).catch(onCatch);
        }).catch(function (err) {
          reject(err);
        });
      });
    }
  }]);

  return Loader;
}();

var _default = Loader;
exports.default = _default;
