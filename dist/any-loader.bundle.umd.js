(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.AnyLoader = factory());
}(this, (function () { 'use strict';

  function _typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _construct(Parent, args, Class) {
    if (isNativeReflectConstruct()) {
      _construct = Reflect.construct;
    } else {
      _construct = function _construct(Parent, args, Class) {
        var a = [null];
        a.push.apply(a, args);
        var Constructor = Function.bind.apply(Parent, a);
        var instance = new Constructor();
        if (Class) _setPrototypeOf(instance, Class.prototype);
        return instance;
      };
    }

    return _construct.apply(null, arguments);
  }

  function _isNativeFunction(fn) {
    return Function.toString.call(fn).indexOf("[native code]") !== -1;
  }

  function _wrapNativeSuper(Class) {
    var _cache = typeof Map === "function" ? new Map() : undefined;

    _wrapNativeSuper = function _wrapNativeSuper(Class) {
      if (Class === null || !_isNativeFunction(Class)) return Class;

      if (typeof Class !== "function") {
        throw new TypeError("Super expression must either be null or a function");
      }

      if (typeof _cache !== "undefined") {
        if (_cache.has(Class)) return _cache.get(Class);

        _cache.set(Class, Wrapper);
      }

      function Wrapper() {
        return _construct(Class, arguments, _getPrototypeOf(this).constructor);
      }

      Wrapper.prototype = Object.create(Class.prototype, {
        constructor: {
          value: Wrapper,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
      return _setPrototypeOf(Wrapper, Class);
    };

    return _wrapNativeSuper(Class);
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var es5 = createCommonjsModule(function (module) {
  var isES5 = (function(){
      return this === undefined;
  })();

  if (isES5) {
      module.exports = {
          freeze: Object.freeze,
          defineProperty: Object.defineProperty,
          getDescriptor: Object.getOwnPropertyDescriptor,
          keys: Object.keys,
          names: Object.getOwnPropertyNames,
          getPrototypeOf: Object.getPrototypeOf,
          isArray: Array.isArray,
          isES5: isES5,
          propertyIsWritable: function(obj, prop) {
              var descriptor = Object.getOwnPropertyDescriptor(obj, prop);
              return !!(!descriptor || descriptor.writable || descriptor.set);
          }
      };
  } else {
      var has = {}.hasOwnProperty;
      var str = {}.toString;
      var proto = {}.constructor.prototype;

      var ObjectKeys = function (o) {
          var ret = [];
          for (var key in o) {
              if (has.call(o, key)) {
                  ret.push(key);
              }
          }
          return ret;
      };

      var ObjectGetDescriptor = function(o, key) {
          return {value: o[key]};
      };

      var ObjectDefineProperty = function (o, key, desc) {
          o[key] = desc.value;
          return o;
      };

      var ObjectFreeze = function (obj) {
          return obj;
      };

      var ObjectGetPrototypeOf = function (obj) {
          try {
              return Object(obj).constructor.prototype;
          }
          catch (e) {
              return proto;
          }
      };

      var ArrayIsArray = function (obj) {
          try {
              return str.call(obj) === "[object Array]";
          }
          catch(e) {
              return false;
          }
      };

      module.exports = {
          isArray: ArrayIsArray,
          keys: ObjectKeys,
          names: ObjectKeys,
          defineProperty: ObjectDefineProperty,
          getDescriptor: ObjectGetDescriptor,
          freeze: ObjectFreeze,
          getPrototypeOf: ObjectGetPrototypeOf,
          isES5: isES5,
          propertyIsWritable: function() {
              return true;
          }
      };
  }
  });
  var es5_1 = es5.freeze;
  var es5_2 = es5.defineProperty;
  var es5_3 = es5.getDescriptor;
  var es5_4 = es5.keys;
  var es5_5 = es5.names;
  var es5_6 = es5.getPrototypeOf;
  var es5_7 = es5.isArray;
  var es5_8 = es5.isES5;
  var es5_9 = es5.propertyIsWritable;

  var canEvaluate = typeof navigator == "undefined";

  var errorObj = {e: {}};
  var tryCatchTarget;
  var globalObject = typeof self !== "undefined" ? self :
      typeof window !== "undefined" ? window :
      typeof commonjsGlobal !== "undefined" ? commonjsGlobal :
      commonjsGlobal !== undefined ? commonjsGlobal : null;

  function tryCatcher() {
      try {
          var target = tryCatchTarget;
          tryCatchTarget = null;
          return target.apply(this, arguments);
      } catch (e) {
          errorObj.e = e;
          return errorObj;
      }
  }
  function tryCatch(fn) {
      tryCatchTarget = fn;
      return tryCatcher;
  }

  var inherits = function(Child, Parent) {
      var hasProp = {}.hasOwnProperty;

      function T() {
          this.constructor = Child;
          this.constructor$ = Parent;
          for (var propertyName in Parent.prototype) {
              if (hasProp.call(Parent.prototype, propertyName) &&
                  propertyName.charAt(propertyName.length-1) !== "$"
             ) {
                  this[propertyName + "$"] = Parent.prototype[propertyName];
              }
          }
      }
      T.prototype = Parent.prototype;
      Child.prototype = new T();
      return Child.prototype;
  };


  function isPrimitive(val) {
      return val == null || val === true || val === false ||
          typeof val === "string" || typeof val === "number";

  }

  function isObject(value) {
      return typeof value === "function" ||
             typeof value === "object" && value !== null;
  }

  function maybeWrapAsError(maybeError) {
      if (!isPrimitive(maybeError)) return maybeError;

      return new Error(safeToString(maybeError));
  }

  function withAppended(target, appendee) {
      var len = target.length;
      var ret = new Array(len + 1);
      var i;
      for (i = 0; i < len; ++i) {
          ret[i] = target[i];
      }
      ret[i] = appendee;
      return ret;
  }

  function getDataPropertyOrDefault(obj, key, defaultValue) {
      if (es5.isES5) {
          var desc = Object.getOwnPropertyDescriptor(obj, key);

          if (desc != null) {
              return desc.get == null && desc.set == null
                      ? desc.value
                      : defaultValue;
          }
      } else {
          return {}.hasOwnProperty.call(obj, key) ? obj[key] : undefined;
      }
  }

  function notEnumerableProp(obj, name, value) {
      if (isPrimitive(obj)) return obj;
      var descriptor = {
          value: value,
          configurable: true,
          enumerable: false,
          writable: true
      };
      es5.defineProperty(obj, name, descriptor);
      return obj;
  }

  function thrower(r) {
      throw r;
  }

  var inheritedDataKeys = (function() {
      var excludedPrototypes = [
          Array.prototype,
          Object.prototype,
          Function.prototype
      ];

      var isExcludedProto = function(val) {
          for (var i = 0; i < excludedPrototypes.length; ++i) {
              if (excludedPrototypes[i] === val) {
                  return true;
              }
          }
          return false;
      };

      if (es5.isES5) {
          var getKeys = Object.getOwnPropertyNames;
          return function(obj) {
              var ret = [];
              var visitedKeys = Object.create(null);
              while (obj != null && !isExcludedProto(obj)) {
                  var keys;
                  try {
                      keys = getKeys(obj);
                  } catch (e) {
                      return ret;
                  }
                  for (var i = 0; i < keys.length; ++i) {
                      var key = keys[i];
                      if (visitedKeys[key]) continue;
                      visitedKeys[key] = true;
                      var desc = Object.getOwnPropertyDescriptor(obj, key);
                      if (desc != null && desc.get == null && desc.set == null) {
                          ret.push(key);
                      }
                  }
                  obj = es5.getPrototypeOf(obj);
              }
              return ret;
          };
      } else {
          var hasProp = {}.hasOwnProperty;
          return function(obj) {
              if (isExcludedProto(obj)) return [];
              var ret = [];

              /*jshint forin:false */
              enumeration: for (var key in obj) {
                  if (hasProp.call(obj, key)) {
                      ret.push(key);
                  } else {
                      for (var i = 0; i < excludedPrototypes.length; ++i) {
                          if (hasProp.call(excludedPrototypes[i], key)) {
                              continue enumeration;
                          }
                      }
                      ret.push(key);
                  }
              }
              return ret;
          };
      }

  })();

  var thisAssignmentPattern = /this\s*\.\s*\S+\s*=/;
  function isClass(fn) {
      try {
          if (typeof fn === "function") {
              var keys = es5.names(fn.prototype);

              var hasMethods = es5.isES5 && keys.length > 1;
              var hasMethodsOtherThanConstructor = keys.length > 0 &&
                  !(keys.length === 1 && keys[0] === "constructor");
              var hasThisAssignmentAndStaticMethods =
                  thisAssignmentPattern.test(fn + "") && es5.names(fn).length > 0;

              if (hasMethods || hasMethodsOtherThanConstructor ||
                  hasThisAssignmentAndStaticMethods) {
                  return true;
              }
          }
          return false;
      } catch (e) {
          return false;
      }
  }

  function toFastProperties(obj) {
      return obj;
      eval(obj);
  }

  var rident = /^[a-z$_][a-z$_0-9]*$/i;
  function isIdentifier(str) {
      return rident.test(str);
  }

  function filledRange(count, prefix, suffix) {
      var ret = new Array(count);
      for(var i = 0; i < count; ++i) {
          ret[i] = prefix + i + suffix;
      }
      return ret;
  }

  function safeToString(obj) {
      try {
          return obj + "";
      } catch (e) {
          return "[no string representation]";
      }
  }

  function isError(obj) {
      return obj instanceof Error ||
          (obj !== null &&
             typeof obj === "object" &&
             typeof obj.message === "string" &&
             typeof obj.name === "string");
  }

  function markAsOriginatingFromRejection(e) {
      try {
          notEnumerableProp(e, "isOperational", true);
      }
      catch(ignore) {}
  }

  function originatesFromRejection(e) {
      if (e == null) return false;
      return ((e instanceof Error["__BluebirdErrorTypes__"].OperationalError) ||
          e["isOperational"] === true);
  }

  function canAttachTrace(obj) {
      return isError(obj) && es5.propertyIsWritable(obj, "stack");
  }

  var ensureErrorObject = (function() {
      if (!("stack" in new Error())) {
          return function(value) {
              if (canAttachTrace(value)) return value;
              try {throw new Error(safeToString(value));}
              catch(err) {return err;}
          };
      } else {
          return function(value) {
              if (canAttachTrace(value)) return value;
              return new Error(safeToString(value));
          };
      }
  })();

  function classString(obj) {
      return {}.toString.call(obj);
  }

  function copyDescriptors(from, to, filter) {
      var keys = es5.names(from);
      for (var i = 0; i < keys.length; ++i) {
          var key = keys[i];
          if (filter(key)) {
              try {
                  es5.defineProperty(to, key, es5.getDescriptor(from, key));
              } catch (ignore) {}
          }
      }
  }

  var asArray = function(v) {
      if (es5.isArray(v)) {
          return v;
      }
      return null;
  };

  if (typeof Symbol !== "undefined" && Symbol.iterator) {
      var ArrayFrom = typeof Array.from === "function" ? function(v) {
          return Array.from(v);
      } : function(v) {
          var ret = [];
          var it = v[Symbol.iterator]();
          var itResult;
          while (!((itResult = it.next()).done)) {
              ret.push(itResult.value);
          }
          return ret;
      };

      asArray = function(v) {
          if (es5.isArray(v)) {
              return v;
          } else if (v != null && typeof v[Symbol.iterator] === "function") {
              return ArrayFrom(v);
          }
          return null;
      };
  }

  var isNode = typeof process !== "undefined" &&
          classString(process).toLowerCase() === "[object process]";

  var hasEnvVariables = typeof process !== "undefined" &&
      typeof process.env !== "undefined";

  function env(key) {
      return hasEnvVariables ? process.env[key] : undefined;
  }

  function getNativePromise() {
      if (typeof Promise === "function") {
          try {
              var promise = new Promise(function(){});
              if ({}.toString.call(promise) === "[object Promise]") {
                  return Promise;
              }
          } catch (e) {}
      }
  }

  function domainBind(self, cb) {
      return self.bind(cb);
  }

  var ret = {
      isClass: isClass,
      isIdentifier: isIdentifier,
      inheritedDataKeys: inheritedDataKeys,
      getDataPropertyOrDefault: getDataPropertyOrDefault,
      thrower: thrower,
      isArray: es5.isArray,
      asArray: asArray,
      notEnumerableProp: notEnumerableProp,
      isPrimitive: isPrimitive,
      isObject: isObject,
      isError: isError,
      canEvaluate: canEvaluate,
      errorObj: errorObj,
      tryCatch: tryCatch,
      inherits: inherits,
      withAppended: withAppended,
      maybeWrapAsError: maybeWrapAsError,
      toFastProperties: toFastProperties,
      filledRange: filledRange,
      toString: safeToString,
      canAttachTrace: canAttachTrace,
      ensureErrorObject: ensureErrorObject,
      originatesFromRejection: originatesFromRejection,
      markAsOriginatingFromRejection: markAsOriginatingFromRejection,
      classString: classString,
      copyDescriptors: copyDescriptors,
      hasDevTools: typeof chrome !== "undefined" && chrome &&
                   typeof chrome.loadTimes === "function",
      isNode: isNode,
      hasEnvVariables: hasEnvVariables,
      env: env,
      global: globalObject,
      getNativePromise: getNativePromise,
      domainBind: domainBind
  };
  ret.isRecentNode = ret.isNode && (function() {
      var version = process.versions.node.split(".").map(Number);
      return (version[0] === 0 && version[1] > 10) || (version[0] > 0);
  })();

  if (ret.isNode) ret.toFastProperties(process);

  try {throw new Error(); } catch (e) {ret.lastLineError = e;}
  var util = ret;

  var schedule;
  var noAsyncScheduler = function() {
      throw new Error("No async scheduler available\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
  };
  var NativePromise = util.getNativePromise();
  if (util.isNode && typeof MutationObserver === "undefined") {
      var GlobalSetImmediate = commonjsGlobal.setImmediate;
      var ProcessNextTick = process.nextTick;
      schedule = util.isRecentNode
                  ? function(fn) { GlobalSetImmediate.call(commonjsGlobal, fn); }
                  : function(fn) { ProcessNextTick.call(process, fn); };
  } else if (typeof NativePromise === "function" &&
             typeof NativePromise.resolve === "function") {
      var nativePromise = NativePromise.resolve();
      schedule = function(fn) {
          nativePromise.then(fn);
      };
  } else if ((typeof MutationObserver !== "undefined") &&
            !(typeof window !== "undefined" &&
              window.navigator &&
              (window.navigator.standalone || window.cordova))) {
      schedule = (function() {
          var div = document.createElement("div");
          var opts = {attributes: true};
          var toggleScheduled = false;
          var div2 = document.createElement("div");
          var o2 = new MutationObserver(function() {
              div.classList.toggle("foo");
              toggleScheduled = false;
          });
          o2.observe(div2, opts);

          var scheduleToggle = function() {
              if (toggleScheduled) return;
              toggleScheduled = true;
              div2.classList.toggle("foo");
          };

          return function schedule(fn) {
              var o = new MutationObserver(function() {
                  o.disconnect();
                  fn();
              });
              o.observe(div, opts);
              scheduleToggle();
          };
      })();
  } else if (typeof setImmediate !== "undefined") {
      schedule = function (fn) {
          setImmediate(fn);
      };
  } else if (typeof setTimeout !== "undefined") {
      schedule = function (fn) {
          setTimeout(fn, 0);
      };
  } else {
      schedule = noAsyncScheduler;
  }
  var schedule_1 = schedule;

  function arrayMove(src, srcIndex, dst, dstIndex, len) {
      for (var j = 0; j < len; ++j) {
          dst[j + dstIndex] = src[j + srcIndex];
          src[j + srcIndex] = void 0;
      }
  }

  function Queue(capacity) {
      this._capacity = capacity;
      this._length = 0;
      this._front = 0;
  }

  Queue.prototype._willBeOverCapacity = function (size) {
      return this._capacity < size;
  };

  Queue.prototype._pushOne = function (arg) {
      var length = this.length();
      this._checkCapacity(length + 1);
      var i = (this._front + length) & (this._capacity - 1);
      this[i] = arg;
      this._length = length + 1;
  };

  Queue.prototype.push = function (fn, receiver, arg) {
      var length = this.length() + 3;
      if (this._willBeOverCapacity(length)) {
          this._pushOne(fn);
          this._pushOne(receiver);
          this._pushOne(arg);
          return;
      }
      var j = this._front + length - 3;
      this._checkCapacity(length);
      var wrapMask = this._capacity - 1;
      this[(j + 0) & wrapMask] = fn;
      this[(j + 1) & wrapMask] = receiver;
      this[(j + 2) & wrapMask] = arg;
      this._length = length;
  };

  Queue.prototype.shift = function () {
      var front = this._front,
          ret = this[front];

      this[front] = undefined;
      this._front = (front + 1) & (this._capacity - 1);
      this._length--;
      return ret;
  };

  Queue.prototype.length = function () {
      return this._length;
  };

  Queue.prototype._checkCapacity = function (size) {
      if (this._capacity < size) {
          this._resizeTo(this._capacity << 1);
      }
  };

  Queue.prototype._resizeTo = function (capacity) {
      var oldCapacity = this._capacity;
      this._capacity = capacity;
      var front = this._front;
      var length = this._length;
      var moveItemsCount = (front + length) & (oldCapacity - 1);
      arrayMove(this, 0, this, oldCapacity, moveItemsCount);
  };

  var queue = Queue;

  var firstLineError;
  try {throw new Error(); } catch (e) {firstLineError = e;}




  function Async() {
      this._customScheduler = false;
      this._isTickUsed = false;
      this._lateQueue = new queue(16);
      this._normalQueue = new queue(16);
      this._haveDrainedQueues = false;
      this._trampolineEnabled = true;
      var self = this;
      this.drainQueues = function () {
          self._drainQueues();
      };
      this._schedule = schedule_1;
  }

  Async.prototype.setScheduler = function(fn) {
      var prev = this._schedule;
      this._schedule = fn;
      this._customScheduler = true;
      return prev;
  };

  Async.prototype.hasCustomScheduler = function() {
      return this._customScheduler;
  };

  Async.prototype.enableTrampoline = function() {
      this._trampolineEnabled = true;
  };

  Async.prototype.disableTrampolineIfNecessary = function() {
      if (util.hasDevTools) {
          this._trampolineEnabled = false;
      }
  };

  Async.prototype.haveItemsQueued = function () {
      return this._isTickUsed || this._haveDrainedQueues;
  };


  Async.prototype.fatalError = function(e, isNode) {
      if (isNode) {
          process.stderr.write("Fatal " + (e instanceof Error ? e.stack : e) +
              "\n");
          process.exit(2);
      } else {
          this.throwLater(e);
      }
  };

  Async.prototype.throwLater = function(fn, arg) {
      if (arguments.length === 1) {
          arg = fn;
          fn = function () { throw arg; };
      }
      if (typeof setTimeout !== "undefined") {
          setTimeout(function() {
              fn(arg);
          }, 0);
      } else try {
          this._schedule(function() {
              fn(arg);
          });
      } catch (e) {
          throw new Error("No async scheduler available\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
      }
  };

  function AsyncInvokeLater(fn, receiver, arg) {
      this._lateQueue.push(fn, receiver, arg);
      this._queueTick();
  }

  function AsyncInvoke(fn, receiver, arg) {
      this._normalQueue.push(fn, receiver, arg);
      this._queueTick();
  }

  function AsyncSettlePromises(promise) {
      this._normalQueue._pushOne(promise);
      this._queueTick();
  }

  if (!util.hasDevTools) {
      Async.prototype.invokeLater = AsyncInvokeLater;
      Async.prototype.invoke = AsyncInvoke;
      Async.prototype.settlePromises = AsyncSettlePromises;
  } else {
      Async.prototype.invokeLater = function (fn, receiver, arg) {
          if (this._trampolineEnabled) {
              AsyncInvokeLater.call(this, fn, receiver, arg);
          } else {
              this._schedule(function() {
                  setTimeout(function() {
                      fn.call(receiver, arg);
                  }, 100);
              });
          }
      };

      Async.prototype.invoke = function (fn, receiver, arg) {
          if (this._trampolineEnabled) {
              AsyncInvoke.call(this, fn, receiver, arg);
          } else {
              this._schedule(function() {
                  fn.call(receiver, arg);
              });
          }
      };

      Async.prototype.settlePromises = function(promise) {
          if (this._trampolineEnabled) {
              AsyncSettlePromises.call(this, promise);
          } else {
              this._schedule(function() {
                  promise._settlePromises();
              });
          }
      };
  }

  function _drainQueue(queue$$1) {
      while (queue$$1.length() > 0) {
          _drainQueueStep(queue$$1);
      }
  }

  function _drainQueueStep(queue$$1) {
      var fn = queue$$1.shift();
      if (typeof fn !== "function") {
          fn._settlePromises();
      } else {
          var receiver = queue$$1.shift();
          var arg = queue$$1.shift();
          fn.call(receiver, arg);
      }
  }

  Async.prototype._drainQueues = function () {
      _drainQueue(this._normalQueue);
      this._reset();
      this._haveDrainedQueues = true;
      _drainQueue(this._lateQueue);
  };

  Async.prototype._queueTick = function () {
      if (!this._isTickUsed) {
          this._isTickUsed = true;
          this._schedule(this.drainQueues);
      }
  };

  Async.prototype._reset = function () {
      this._isTickUsed = false;
  };

  var async = Async;
  var firstLineError_1 = firstLineError;
  async.firstLineError = firstLineError_1;

  var Objectfreeze = es5.freeze;

  var inherits$1 = util.inherits;
  var notEnumerableProp$1 = util.notEnumerableProp;

  function subError(nameProperty, defaultMessage) {
      function SubError(message) {
          if (!(this instanceof SubError)) return new SubError(message);
          notEnumerableProp$1(this, "message",
              typeof message === "string" ? message : defaultMessage);
          notEnumerableProp$1(this, "name", nameProperty);
          if (Error.captureStackTrace) {
              Error.captureStackTrace(this, this.constructor);
          } else {
              Error.call(this);
          }
      }
      inherits$1(SubError, Error);
      return SubError;
  }

  var _TypeError, _RangeError;
  var Warning = subError("Warning", "warning");
  var CancellationError = subError("CancellationError", "cancellation error");
  var TimeoutError = subError("TimeoutError", "timeout error");
  var AggregateError = subError("AggregateError", "aggregate error");
  try {
      _TypeError = TypeError;
      _RangeError = RangeError;
  } catch(e) {
      _TypeError = subError("TypeError", "type error");
      _RangeError = subError("RangeError", "range error");
  }

  var methods = ("join pop push shift unshift slice filter forEach some " +
      "every map indexOf lastIndexOf reduce reduceRight sort reverse").split(" ");

  for (var i = 0; i < methods.length; ++i) {
      if (typeof Array.prototype[methods[i]] === "function") {
          AggregateError.prototype[methods[i]] = Array.prototype[methods[i]];
      }
  }

  es5.defineProperty(AggregateError.prototype, "length", {
      value: 0,
      configurable: false,
      writable: true,
      enumerable: true
  });
  AggregateError.prototype["isOperational"] = true;
  var level = 0;
  AggregateError.prototype.toString = function() {
      var indent = Array(level * 4 + 1).join(" ");
      var ret = "\n" + indent + "AggregateError of:" + "\n";
      level++;
      indent = Array(level * 4 + 1).join(" ");
      for (var i = 0; i < this.length; ++i) {
          var str = this[i] === this ? "[Circular AggregateError]" : this[i] + "";
          var lines = str.split("\n");
          for (var j = 0; j < lines.length; ++j) {
              lines[j] = indent + lines[j];
          }
          str = lines.join("\n");
          ret += str + "\n";
      }
      level--;
      return ret;
  };

  function OperationalError(message) {
      if (!(this instanceof OperationalError))
          return new OperationalError(message);
      notEnumerableProp$1(this, "name", "OperationalError");
      notEnumerableProp$1(this, "message", message);
      this.cause = message;
      this["isOperational"] = true;

      if (message instanceof Error) {
          notEnumerableProp$1(this, "message", message.message);
          notEnumerableProp$1(this, "stack", message.stack);
      } else if (Error.captureStackTrace) {
          Error.captureStackTrace(this, this.constructor);
      }

  }
  inherits$1(OperationalError, Error);

  var errorTypes = Error["__BluebirdErrorTypes__"];
  if (!errorTypes) {
      errorTypes = Objectfreeze({
          CancellationError: CancellationError,
          TimeoutError: TimeoutError,
          OperationalError: OperationalError,
          RejectionError: OperationalError,
          AggregateError: AggregateError
      });
      es5.defineProperty(Error, "__BluebirdErrorTypes__", {
          value: errorTypes,
          writable: false,
          enumerable: false,
          configurable: false
      });
  }

  var errors = {
      Error: Error,
      TypeError: _TypeError,
      RangeError: _RangeError,
      CancellationError: errorTypes.CancellationError,
      OperationalError: errorTypes.OperationalError,
      TimeoutError: errorTypes.TimeoutError,
      AggregateError: errorTypes.AggregateError,
      Warning: Warning
  };

  var thenables = function(Promise, INTERNAL) {
  var util$$1 = util;
  var errorObj = util$$1.errorObj;
  var isObject = util$$1.isObject;

  function tryConvertToPromise(obj, context) {
      if (isObject(obj)) {
          if (obj instanceof Promise) return obj;
          var then = getThen(obj);
          if (then === errorObj) {
              if (context) context._pushContext();
              var ret = Promise.reject(then.e);
              if (context) context._popContext();
              return ret;
          } else if (typeof then === "function") {
              if (isAnyBluebirdPromise(obj)) {
                  var ret = new Promise(INTERNAL);
                  obj._then(
                      ret._fulfill,
                      ret._reject,
                      undefined,
                      ret,
                      null
                  );
                  return ret;
              }
              return doThenable(obj, then, context);
          }
      }
      return obj;
  }

  function doGetThen(obj) {
      return obj.then;
  }

  function getThen(obj) {
      try {
          return doGetThen(obj);
      } catch (e) {
          errorObj.e = e;
          return errorObj;
      }
  }

  var hasProp = {}.hasOwnProperty;
  function isAnyBluebirdPromise(obj) {
      try {
          return hasProp.call(obj, "_promise0");
      } catch (e) {
          return false;
      }
  }

  function doThenable(x, then, context) {
      var promise = new Promise(INTERNAL);
      var ret = promise;
      if (context) context._pushContext();
      promise._captureStackTrace();
      if (context) context._popContext();
      var synchronous = true;
      var result = util$$1.tryCatch(then).call(x, resolve, reject);
      synchronous = false;

      if (promise && result === errorObj) {
          promise._rejectCallback(result.e, true, true);
          promise = null;
      }

      function resolve(value) {
          if (!promise) return;
          promise._resolveCallback(value);
          promise = null;
      }

      function reject(reason) {
          if (!promise) return;
          promise._rejectCallback(reason, synchronous, true);
          promise = null;
      }
      return ret;
  }

  return tryConvertToPromise;
  };

  var promise_array = function(Promise, INTERNAL, tryConvertToPromise,
      apiRejection, Proxyable) {
  var util$$1 = util;

  function toResolutionValue(val) {
      switch(val) {
      case -2: return [];
      case -3: return {};
      case -6: return new Map();
      }
  }

  function PromiseArray(values) {
      var promise = this._promise = new Promise(INTERNAL);
      if (values instanceof Promise) {
          promise._propagateFrom(values, 3);
      }
      promise._setOnCancel(this);
      this._values = values;
      this._length = 0;
      this._totalResolved = 0;
      this._init(undefined, -2);
  }
  util$$1.inherits(PromiseArray, Proxyable);

  PromiseArray.prototype.length = function () {
      return this._length;
  };

  PromiseArray.prototype.promise = function () {
      return this._promise;
  };

  PromiseArray.prototype._init = function init(_, resolveValueIfEmpty) {
      var values = tryConvertToPromise(this._values, this._promise);
      if (values instanceof Promise) {
          values = values._target();
          var bitField = values._bitField;
          this._values = values;

          if (((bitField & 50397184) === 0)) {
              this._promise._setAsyncGuaranteed();
              return values._then(
                  init,
                  this._reject,
                  undefined,
                  this,
                  resolveValueIfEmpty
             );
          } else if (((bitField & 33554432) !== 0)) {
              values = values._value();
          } else if (((bitField & 16777216) !== 0)) {
              return this._reject(values._reason());
          } else {
              return this._cancel();
          }
      }
      values = util$$1.asArray(values);
      if (values === null) {
          var err = apiRejection(
              "expecting an array or an iterable object but got " + util$$1.classString(values)).reason();
          this._promise._rejectCallback(err, false);
          return;
      }

      if (values.length === 0) {
          if (resolveValueIfEmpty === -5) {
              this._resolveEmptyArray();
          }
          else {
              this._resolve(toResolutionValue(resolveValueIfEmpty));
          }
          return;
      }
      this._iterate(values);
  };

  PromiseArray.prototype._iterate = function(values) {
      var len = this.getActualLength(values.length);
      this._length = len;
      this._values = this.shouldCopyValues() ? new Array(len) : this._values;
      var result = this._promise;
      var isResolved = false;
      var bitField = null;
      for (var i = 0; i < len; ++i) {
          var maybePromise = tryConvertToPromise(values[i], result);

          if (maybePromise instanceof Promise) {
              maybePromise = maybePromise._target();
              bitField = maybePromise._bitField;
          } else {
              bitField = null;
          }

          if (isResolved) {
              if (bitField !== null) {
                  maybePromise.suppressUnhandledRejections();
              }
          } else if (bitField !== null) {
              if (((bitField & 50397184) === 0)) {
                  maybePromise._proxy(this, i);
                  this._values[i] = maybePromise;
              } else if (((bitField & 33554432) !== 0)) {
                  isResolved = this._promiseFulfilled(maybePromise._value(), i);
              } else if (((bitField & 16777216) !== 0)) {
                  isResolved = this._promiseRejected(maybePromise._reason(), i);
              } else {
                  isResolved = this._promiseCancelled(i);
              }
          } else {
              isResolved = this._promiseFulfilled(maybePromise, i);
          }
      }
      if (!isResolved) result._setAsyncGuaranteed();
  };

  PromiseArray.prototype._isResolved = function () {
      return this._values === null;
  };

  PromiseArray.prototype._resolve = function (value) {
      this._values = null;
      this._promise._fulfill(value);
  };

  PromiseArray.prototype._cancel = function() {
      if (this._isResolved() || !this._promise._isCancellable()) return;
      this._values = null;
      this._promise._cancel();
  };

  PromiseArray.prototype._reject = function (reason) {
      this._values = null;
      this._promise._rejectCallback(reason, false);
  };

  PromiseArray.prototype._promiseFulfilled = function (value, index) {
      this._values[index] = value;
      var totalResolved = ++this._totalResolved;
      if (totalResolved >= this._length) {
          this._resolve(this._values);
          return true;
      }
      return false;
  };

  PromiseArray.prototype._promiseCancelled = function() {
      this._cancel();
      return true;
  };

  PromiseArray.prototype._promiseRejected = function (reason) {
      this._totalResolved++;
      this._reject(reason);
      return true;
  };

  PromiseArray.prototype._resultCancelled = function() {
      if (this._isResolved()) return;
      var values = this._values;
      this._cancel();
      if (values instanceof Promise) {
          values.cancel();
      } else {
          for (var i = 0; i < values.length; ++i) {
              if (values[i] instanceof Promise) {
                  values[i].cancel();
              }
          }
      }
  };

  PromiseArray.prototype.shouldCopyValues = function () {
      return true;
  };

  PromiseArray.prototype.getActualLength = function (len) {
      return len;
  };

  return PromiseArray;
  };

  var context = function(Promise) {
  var longStackTraces = false;
  var contextStack = [];

  Promise.prototype._promiseCreated = function() {};
  Promise.prototype._pushContext = function() {};
  Promise.prototype._popContext = function() {return null;};
  Promise._peekContext = Promise.prototype._peekContext = function() {};

  function Context() {
      this._trace = new Context.CapturedTrace(peekContext());
  }
  Context.prototype._pushContext = function () {
      if (this._trace !== undefined) {
          this._trace._promiseCreated = null;
          contextStack.push(this._trace);
      }
  };

  Context.prototype._popContext = function () {
      if (this._trace !== undefined) {
          var trace = contextStack.pop();
          var ret = trace._promiseCreated;
          trace._promiseCreated = null;
          return ret;
      }
      return null;
  };

  function createContext() {
      if (longStackTraces) return new Context();
  }

  function peekContext() {
      var lastIndex = contextStack.length - 1;
      if (lastIndex >= 0) {
          return contextStack[lastIndex];
      }
      return undefined;
  }
  Context.CapturedTrace = null;
  Context.create = createContext;
  Context.deactivateLongStackTraces = function() {};
  Context.activateLongStackTraces = function() {
      var Promise_pushContext = Promise.prototype._pushContext;
      var Promise_popContext = Promise.prototype._popContext;
      var Promise_PeekContext = Promise._peekContext;
      var Promise_peekContext = Promise.prototype._peekContext;
      var Promise_promiseCreated = Promise.prototype._promiseCreated;
      Context.deactivateLongStackTraces = function() {
          Promise.prototype._pushContext = Promise_pushContext;
          Promise.prototype._popContext = Promise_popContext;
          Promise._peekContext = Promise_PeekContext;
          Promise.prototype._peekContext = Promise_peekContext;
          Promise.prototype._promiseCreated = Promise_promiseCreated;
          longStackTraces = false;
      };
      longStackTraces = true;
      Promise.prototype._pushContext = Context.prototype._pushContext;
      Promise.prototype._popContext = Context.prototype._popContext;
      Promise._peekContext = Promise.prototype._peekContext = peekContext;
      Promise.prototype._promiseCreated = function() {
          var ctx = this._peekContext();
          if (ctx && ctx._promiseCreated == null) ctx._promiseCreated = this;
      };
  };
  return Context;
  };

  var debuggability = function(Promise, Context) {
  var getDomain = Promise._getDomain;
  var async = Promise._async;
  var Warning = errors.Warning;
  var util$$1 = util;
  var es5$$1 = es5;
  var canAttachTrace = util$$1.canAttachTrace;
  var unhandledRejectionHandled;
  var possiblyUnhandledRejection;
  var bluebirdFramePattern =
      /[\\\/]bluebird[\\\/]js[\\\/](release|debug|instrumented)/;
  var nodeFramePattern = /\((?:timers\.js):\d+:\d+\)/;
  var parseLinePattern = /[\/<\(](.+?):(\d+):(\d+)\)?\s*$/;
  var stackFramePattern = null;
  var formatStack = null;
  var indentStackFrames = false;
  var printWarning;
  var debugging = !!(util$$1.env("BLUEBIRD_DEBUG") != 0 &&
                          (util$$1.env("BLUEBIRD_DEBUG") ||
                           util$$1.env("NODE_ENV") === "development"));

  var warnings = !!(util$$1.env("BLUEBIRD_WARNINGS") != 0 &&
      (debugging || util$$1.env("BLUEBIRD_WARNINGS")));

  var longStackTraces = !!(util$$1.env("BLUEBIRD_LONG_STACK_TRACES") != 0 &&
      (debugging || util$$1.env("BLUEBIRD_LONG_STACK_TRACES")));

  var wForgottenReturn = util$$1.env("BLUEBIRD_W_FORGOTTEN_RETURN") != 0 &&
      (warnings || !!util$$1.env("BLUEBIRD_W_FORGOTTEN_RETURN"));

  Promise.prototype.suppressUnhandledRejections = function() {
      var target = this._target();
      target._bitField = ((target._bitField & (~1048576)) |
                        524288);
  };

  Promise.prototype._ensurePossibleRejectionHandled = function () {
      if ((this._bitField & 524288) !== 0) return;
      this._setRejectionIsUnhandled();
      var self = this;
      setTimeout(function() {
          self._notifyUnhandledRejection();
      }, 1);
  };

  Promise.prototype._notifyUnhandledRejectionIsHandled = function () {
      fireRejectionEvent("rejectionHandled",
                                    unhandledRejectionHandled, undefined, this);
  };

  Promise.prototype._setReturnedNonUndefined = function() {
      this._bitField = this._bitField | 268435456;
  };

  Promise.prototype._returnedNonUndefined = function() {
      return (this._bitField & 268435456) !== 0;
  };

  Promise.prototype._notifyUnhandledRejection = function () {
      if (this._isRejectionUnhandled()) {
          var reason = this._settledValue();
          this._setUnhandledRejectionIsNotified();
          fireRejectionEvent("unhandledRejection",
                                        possiblyUnhandledRejection, reason, this);
      }
  };

  Promise.prototype._setUnhandledRejectionIsNotified = function () {
      this._bitField = this._bitField | 262144;
  };

  Promise.prototype._unsetUnhandledRejectionIsNotified = function () {
      this._bitField = this._bitField & (~262144);
  };

  Promise.prototype._isUnhandledRejectionNotified = function () {
      return (this._bitField & 262144) > 0;
  };

  Promise.prototype._setRejectionIsUnhandled = function () {
      this._bitField = this._bitField | 1048576;
  };

  Promise.prototype._unsetRejectionIsUnhandled = function () {
      this._bitField = this._bitField & (~1048576);
      if (this._isUnhandledRejectionNotified()) {
          this._unsetUnhandledRejectionIsNotified();
          this._notifyUnhandledRejectionIsHandled();
      }
  };

  Promise.prototype._isRejectionUnhandled = function () {
      return (this._bitField & 1048576) > 0;
  };

  Promise.prototype._warn = function(message, shouldUseOwnTrace, promise) {
      return warn(message, shouldUseOwnTrace, promise || this);
  };

  Promise.onPossiblyUnhandledRejection = function (fn) {
      var domain = getDomain();
      possiblyUnhandledRejection =
          typeof fn === "function" ? (domain === null ?
                                              fn : util$$1.domainBind(domain, fn))
                                   : undefined;
  };

  Promise.onUnhandledRejectionHandled = function (fn) {
      var domain = getDomain();
      unhandledRejectionHandled =
          typeof fn === "function" ? (domain === null ?
                                              fn : util$$1.domainBind(domain, fn))
                                   : undefined;
  };

  var disableLongStackTraces = function() {};
  Promise.longStackTraces = function () {
      if (async.haveItemsQueued() && !config.longStackTraces) {
          throw new Error("cannot enable long stack traces after promises have been created\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
      }
      if (!config.longStackTraces && longStackTracesIsSupported()) {
          var Promise_captureStackTrace = Promise.prototype._captureStackTrace;
          var Promise_attachExtraTrace = Promise.prototype._attachExtraTrace;
          var Promise_dereferenceTrace = Promise.prototype._dereferenceTrace;
          config.longStackTraces = true;
          disableLongStackTraces = function() {
              if (async.haveItemsQueued() && !config.longStackTraces) {
                  throw new Error("cannot enable long stack traces after promises have been created\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
              }
              Promise.prototype._captureStackTrace = Promise_captureStackTrace;
              Promise.prototype._attachExtraTrace = Promise_attachExtraTrace;
              Promise.prototype._dereferenceTrace = Promise_dereferenceTrace;
              Context.deactivateLongStackTraces();
              async.enableTrampoline();
              config.longStackTraces = false;
          };
          Promise.prototype._captureStackTrace = longStackTracesCaptureStackTrace;
          Promise.prototype._attachExtraTrace = longStackTracesAttachExtraTrace;
          Promise.prototype._dereferenceTrace = longStackTracesDereferenceTrace;
          Context.activateLongStackTraces();
          async.disableTrampolineIfNecessary();
      }
  };

  Promise.hasLongStackTraces = function () {
      return config.longStackTraces && longStackTracesIsSupported();
  };

  var fireDomEvent = (function() {
      try {
          if (typeof CustomEvent === "function") {
              var event = new CustomEvent("CustomEvent");
              util$$1.global.dispatchEvent(event);
              return function(name, event) {
                  var eventData = {
                      detail: event,
                      cancelable: true
                  };
                  es5$$1.defineProperty(
                      eventData, "promise", {value: event.promise});
                  es5$$1.defineProperty(eventData, "reason", {value: event.reason});
                  var domEvent = new CustomEvent(name.toLowerCase(), eventData);
                  return !util$$1.global.dispatchEvent(domEvent);
              };
          } else if (typeof Event === "function") {
              var event = new Event("CustomEvent");
              util$$1.global.dispatchEvent(event);
              return function(name, event) {
                  var domEvent = new Event(name.toLowerCase(), {
                      cancelable: true
                  });
                  domEvent.detail = event;
                  es5$$1.defineProperty(domEvent, "promise", {value: event.promise});
                  es5$$1.defineProperty(domEvent, "reason", {value: event.reason});
                  return !util$$1.global.dispatchEvent(domEvent);
              };
          } else {
              var event = document.createEvent("CustomEvent");
              event.initCustomEvent("testingtheevent", false, true, {});
              util$$1.global.dispatchEvent(event);
              return function(name, event) {
                  var domEvent = document.createEvent("CustomEvent");
                  domEvent.initCustomEvent(name.toLowerCase(), false, true,
                      event);
                  return !util$$1.global.dispatchEvent(domEvent);
              };
          }
      } catch (e) {}
      return function() {
          return false;
      };
  })();

  var fireGlobalEvent = (function() {
      if (util$$1.isNode) {
          return function() {
              return process.emit.apply(process, arguments);
          };
      } else {
          if (!util$$1.global) {
              return function() {
                  return false;
              };
          }
          return function(name) {
              var methodName = "on" + name.toLowerCase();
              var method = util$$1.global[methodName];
              if (!method) return false;
              method.apply(util$$1.global, [].slice.call(arguments, 1));
              return true;
          };
      }
  })();

  function generatePromiseLifecycleEventObject(name, promise) {
      return {promise: promise};
  }

  var eventToObjectGenerator = {
      promiseCreated: generatePromiseLifecycleEventObject,
      promiseFulfilled: generatePromiseLifecycleEventObject,
      promiseRejected: generatePromiseLifecycleEventObject,
      promiseResolved: generatePromiseLifecycleEventObject,
      promiseCancelled: generatePromiseLifecycleEventObject,
      promiseChained: function(name, promise, child) {
          return {promise: promise, child: child};
      },
      warning: function(name, warning) {
          return {warning: warning};
      },
      unhandledRejection: function (name, reason, promise) {
          return {reason: reason, promise: promise};
      },
      rejectionHandled: generatePromiseLifecycleEventObject
  };

  var activeFireEvent = function (name) {
      var globalEventFired = false;
      try {
          globalEventFired = fireGlobalEvent.apply(null, arguments);
      } catch (e) {
          async.throwLater(e);
          globalEventFired = true;
      }

      var domEventFired = false;
      try {
          domEventFired = fireDomEvent(name,
                      eventToObjectGenerator[name].apply(null, arguments));
      } catch (e) {
          async.throwLater(e);
          domEventFired = true;
      }

      return domEventFired || globalEventFired;
  };

  Promise.config = function(opts) {
      opts = Object(opts);
      if ("longStackTraces" in opts) {
          if (opts.longStackTraces) {
              Promise.longStackTraces();
          } else if (!opts.longStackTraces && Promise.hasLongStackTraces()) {
              disableLongStackTraces();
          }
      }
      if ("warnings" in opts) {
          var warningsOption = opts.warnings;
          config.warnings = !!warningsOption;
          wForgottenReturn = config.warnings;

          if (util$$1.isObject(warningsOption)) {
              if ("wForgottenReturn" in warningsOption) {
                  wForgottenReturn = !!warningsOption.wForgottenReturn;
              }
          }
      }
      if ("cancellation" in opts && opts.cancellation && !config.cancellation) {
          if (async.haveItemsQueued()) {
              throw new Error(
                  "cannot enable cancellation after promises are in use");
          }
          Promise.prototype._clearCancellationData =
              cancellationClearCancellationData;
          Promise.prototype._propagateFrom = cancellationPropagateFrom;
          Promise.prototype._onCancel = cancellationOnCancel;
          Promise.prototype._setOnCancel = cancellationSetOnCancel;
          Promise.prototype._attachCancellationCallback =
              cancellationAttachCancellationCallback;
          Promise.prototype._execute = cancellationExecute;
          propagateFromFunction = cancellationPropagateFrom;
          config.cancellation = true;
      }
      if ("monitoring" in opts) {
          if (opts.monitoring && !config.monitoring) {
              config.monitoring = true;
              Promise.prototype._fireEvent = activeFireEvent;
          } else if (!opts.monitoring && config.monitoring) {
              config.monitoring = false;
              Promise.prototype._fireEvent = defaultFireEvent;
          }
      }
      return Promise;
  };

  function defaultFireEvent() { return false; }

  Promise.prototype._fireEvent = defaultFireEvent;
  Promise.prototype._execute = function(executor, resolve, reject) {
      try {
          executor(resolve, reject);
      } catch (e) {
          return e;
      }
  };
  Promise.prototype._onCancel = function () {};
  Promise.prototype._setOnCancel = function (handler) { };
  Promise.prototype._attachCancellationCallback = function(onCancel) {
  };
  Promise.prototype._captureStackTrace = function () {};
  Promise.prototype._attachExtraTrace = function () {};
  Promise.prototype._dereferenceTrace = function () {};
  Promise.prototype._clearCancellationData = function() {};
  Promise.prototype._propagateFrom = function (parent, flags) {
  };

  function cancellationExecute(executor, resolve, reject) {
      var promise = this;
      try {
          executor(resolve, reject, function(onCancel) {
              if (typeof onCancel !== "function") {
                  throw new TypeError("onCancel must be a function, got: " +
                                      util$$1.toString(onCancel));
              }
              promise._attachCancellationCallback(onCancel);
          });
      } catch (e) {
          return e;
      }
  }

  function cancellationAttachCancellationCallback(onCancel) {
      if (!this._isCancellable()) return this;

      var previousOnCancel = this._onCancel();
      if (previousOnCancel !== undefined) {
          if (util$$1.isArray(previousOnCancel)) {
              previousOnCancel.push(onCancel);
          } else {
              this._setOnCancel([previousOnCancel, onCancel]);
          }
      } else {
          this._setOnCancel(onCancel);
      }
  }

  function cancellationOnCancel() {
      return this._onCancelField;
  }

  function cancellationSetOnCancel(onCancel) {
      this._onCancelField = onCancel;
  }

  function cancellationClearCancellationData() {
      this._cancellationParent = undefined;
      this._onCancelField = undefined;
  }

  function cancellationPropagateFrom(parent, flags) {
      if ((flags & 1) !== 0) {
          this._cancellationParent = parent;
          var branchesRemainingToCancel = parent._branchesRemainingToCancel;
          if (branchesRemainingToCancel === undefined) {
              branchesRemainingToCancel = 0;
          }
          parent._branchesRemainingToCancel = branchesRemainingToCancel + 1;
      }
      if ((flags & 2) !== 0 && parent._isBound()) {
          this._setBoundTo(parent._boundTo);
      }
  }

  function bindingPropagateFrom(parent, flags) {
      if ((flags & 2) !== 0 && parent._isBound()) {
          this._setBoundTo(parent._boundTo);
      }
  }
  var propagateFromFunction = bindingPropagateFrom;

  function boundValueFunction() {
      var ret = this._boundTo;
      if (ret !== undefined) {
          if (ret instanceof Promise) {
              if (ret.isFulfilled()) {
                  return ret.value();
              } else {
                  return undefined;
              }
          }
      }
      return ret;
  }

  function longStackTracesCaptureStackTrace() {
      this._trace = new CapturedTrace(this._peekContext());
  }

  function longStackTracesAttachExtraTrace(error, ignoreSelf) {
      if (canAttachTrace(error)) {
          var trace = this._trace;
          if (trace !== undefined) {
              if (ignoreSelf) trace = trace._parent;
          }
          if (trace !== undefined) {
              trace.attachExtraTrace(error);
          } else if (!error.__stackCleaned__) {
              var parsed = parseStackAndMessage(error);
              util$$1.notEnumerableProp(error, "stack",
                  parsed.message + "\n" + parsed.stack.join("\n"));
              util$$1.notEnumerableProp(error, "__stackCleaned__", true);
          }
      }
  }

  function longStackTracesDereferenceTrace() {
      this._trace = undefined;
  }

  function checkForgottenReturns(returnValue, promiseCreated, name, promise,
                                 parent) {
      if (returnValue === undefined && promiseCreated !== null &&
          wForgottenReturn) {
          if (parent !== undefined && parent._returnedNonUndefined()) return;
          if ((promise._bitField & 65535) === 0) return;

          if (name) name = name + " ";
          var handlerLine = "";
          var creatorLine = "";
          if (promiseCreated._trace) {
              var traceLines = promiseCreated._trace.stack.split("\n");
              var stack = cleanStack(traceLines);
              for (var i = stack.length - 1; i >= 0; --i) {
                  var line = stack[i];
                  if (!nodeFramePattern.test(line)) {
                      var lineMatches = line.match(parseLinePattern);
                      if (lineMatches) {
                          handlerLine  = "at " + lineMatches[1] +
                              ":" + lineMatches[2] + ":" + lineMatches[3] + " ";
                      }
                      break;
                  }
              }

              if (stack.length > 0) {
                  var firstUserLine = stack[0];
                  for (var i = 0; i < traceLines.length; ++i) {

                      if (traceLines[i] === firstUserLine) {
                          if (i > 0) {
                              creatorLine = "\n" + traceLines[i - 1];
                          }
                          break;
                      }
                  }

              }
          }
          var msg = "a promise was created in a " + name +
              "handler " + handlerLine + "but was not returned from it, " +
              "see http://goo.gl/rRqMUw" +
              creatorLine;
          promise._warn(msg, true, promiseCreated);
      }
  }

  function deprecated(name, replacement) {
      var message = name +
          " is deprecated and will be removed in a future version.";
      if (replacement) message += " Use " + replacement + " instead.";
      return warn(message);
  }

  function warn(message, shouldUseOwnTrace, promise) {
      if (!config.warnings) return;
      var warning = new Warning(message);
      var ctx;
      if (shouldUseOwnTrace) {
          promise._attachExtraTrace(warning);
      } else if (config.longStackTraces && (ctx = Promise._peekContext())) {
          ctx.attachExtraTrace(warning);
      } else {
          var parsed = parseStackAndMessage(warning);
          warning.stack = parsed.message + "\n" + parsed.stack.join("\n");
      }

      if (!activeFireEvent("warning", warning)) {
          formatAndLogError(warning, "", true);
      }
  }

  function reconstructStack(message, stacks) {
      for (var i = 0; i < stacks.length - 1; ++i) {
          stacks[i].push("From previous event:");
          stacks[i] = stacks[i].join("\n");
      }
      if (i < stacks.length) {
          stacks[i] = stacks[i].join("\n");
      }
      return message + "\n" + stacks.join("\n");
  }

  function removeDuplicateOrEmptyJumps(stacks) {
      for (var i = 0; i < stacks.length; ++i) {
          if (stacks[i].length === 0 ||
              ((i + 1 < stacks.length) && stacks[i][0] === stacks[i+1][0])) {
              stacks.splice(i, 1);
              i--;
          }
      }
  }

  function removeCommonRoots(stacks) {
      var current = stacks[0];
      for (var i = 1; i < stacks.length; ++i) {
          var prev = stacks[i];
          var currentLastIndex = current.length - 1;
          var currentLastLine = current[currentLastIndex];
          var commonRootMeetPoint = -1;

          for (var j = prev.length - 1; j >= 0; --j) {
              if (prev[j] === currentLastLine) {
                  commonRootMeetPoint = j;
                  break;
              }
          }

          for (var j = commonRootMeetPoint; j >= 0; --j) {
              var line = prev[j];
              if (current[currentLastIndex] === line) {
                  current.pop();
                  currentLastIndex--;
              } else {
                  break;
              }
          }
          current = prev;
      }
  }

  function cleanStack(stack) {
      var ret = [];
      for (var i = 0; i < stack.length; ++i) {
          var line = stack[i];
          var isTraceLine = "    (No stack trace)" === line ||
              stackFramePattern.test(line);
          var isInternalFrame = isTraceLine && shouldIgnore(line);
          if (isTraceLine && !isInternalFrame) {
              if (indentStackFrames && line.charAt(0) !== " ") {
                  line = "    " + line;
              }
              ret.push(line);
          }
      }
      return ret;
  }

  function stackFramesAsArray(error) {
      var stack = error.stack.replace(/\s+$/g, "").split("\n");
      for (var i = 0; i < stack.length; ++i) {
          var line = stack[i];
          if ("    (No stack trace)" === line || stackFramePattern.test(line)) {
              break;
          }
      }
      if (i > 0 && error.name != "SyntaxError") {
          stack = stack.slice(i);
      }
      return stack;
  }

  function parseStackAndMessage(error) {
      var stack = error.stack;
      var message = error.toString();
      stack = typeof stack === "string" && stack.length > 0
                  ? stackFramesAsArray(error) : ["    (No stack trace)"];
      return {
          message: message,
          stack: error.name == "SyntaxError" ? stack : cleanStack(stack)
      };
  }

  function formatAndLogError(error, title, isSoft) {
      if (typeof console !== "undefined") {
          var message;
          if (util$$1.isObject(error)) {
              var stack = error.stack;
              message = title + formatStack(stack, error);
          } else {
              message = title + String(error);
          }
          if (typeof printWarning === "function") {
              printWarning(message, isSoft);
          } else if (typeof console.log === "function" ||
              typeof console.log === "object") {
              console.log(message);
          }
      }
  }

  function fireRejectionEvent(name, localHandler, reason, promise) {
      var localEventFired = false;
      try {
          if (typeof localHandler === "function") {
              localEventFired = true;
              if (name === "rejectionHandled") {
                  localHandler(promise);
              } else {
                  localHandler(reason, promise);
              }
          }
      } catch (e) {
          async.throwLater(e);
      }

      if (name === "unhandledRejection") {
          if (!activeFireEvent(name, reason, promise) && !localEventFired) {
              formatAndLogError(reason, "Unhandled rejection ");
          }
      } else {
          activeFireEvent(name, promise);
      }
  }

  function formatNonError(obj) {
      var str;
      if (typeof obj === "function") {
          str = "[function " +
              (obj.name || "anonymous") +
              "]";
      } else {
          str = obj && typeof obj.toString === "function"
              ? obj.toString() : util$$1.toString(obj);
          var ruselessToString = /\[object [a-zA-Z0-9$_]+\]/;
          if (ruselessToString.test(str)) {
              try {
                  var newStr = JSON.stringify(obj);
                  str = newStr;
              }
              catch(e) {

              }
          }
          if (str.length === 0) {
              str = "(empty array)";
          }
      }
      return ("(<" + snip(str) + ">, no stack trace)");
  }

  function snip(str) {
      var maxChars = 41;
      if (str.length < maxChars) {
          return str;
      }
      return str.substr(0, maxChars - 3) + "...";
  }

  function longStackTracesIsSupported() {
      return typeof captureStackTrace === "function";
  }

  var shouldIgnore = function() { return false; };
  var parseLineInfoRegex = /[\/<\(]([^:\/]+):(\d+):(?:\d+)\)?\s*$/;
  function parseLineInfo(line) {
      var matches = line.match(parseLineInfoRegex);
      if (matches) {
          return {
              fileName: matches[1],
              line: parseInt(matches[2], 10)
          };
      }
  }

  function setBounds(firstLineError, lastLineError) {
      if (!longStackTracesIsSupported()) return;
      var firstStackLines = firstLineError.stack.split("\n");
      var lastStackLines = lastLineError.stack.split("\n");
      var firstIndex = -1;
      var lastIndex = -1;
      var firstFileName;
      var lastFileName;
      for (var i = 0; i < firstStackLines.length; ++i) {
          var result = parseLineInfo(firstStackLines[i]);
          if (result) {
              firstFileName = result.fileName;
              firstIndex = result.line;
              break;
          }
      }
      for (var i = 0; i < lastStackLines.length; ++i) {
          var result = parseLineInfo(lastStackLines[i]);
          if (result) {
              lastFileName = result.fileName;
              lastIndex = result.line;
              break;
          }
      }
      if (firstIndex < 0 || lastIndex < 0 || !firstFileName || !lastFileName ||
          firstFileName !== lastFileName || firstIndex >= lastIndex) {
          return;
      }

      shouldIgnore = function(line) {
          if (bluebirdFramePattern.test(line)) return true;
          var info = parseLineInfo(line);
          if (info) {
              if (info.fileName === firstFileName &&
                  (firstIndex <= info.line && info.line <= lastIndex)) {
                  return true;
              }
          }
          return false;
      };
  }

  function CapturedTrace(parent) {
      this._parent = parent;
      this._promisesCreated = 0;
      var length = this._length = 1 + (parent === undefined ? 0 : parent._length);
      captureStackTrace(this, CapturedTrace);
      if (length > 32) this.uncycle();
  }
  util$$1.inherits(CapturedTrace, Error);
  Context.CapturedTrace = CapturedTrace;

  CapturedTrace.prototype.uncycle = function() {
      var length = this._length;
      if (length < 2) return;
      var nodes = [];
      var stackToIndex = {};

      for (var i = 0, node = this; node !== undefined; ++i) {
          nodes.push(node);
          node = node._parent;
      }
      length = this._length = i;
      for (var i = length - 1; i >= 0; --i) {
          var stack = nodes[i].stack;
          if (stackToIndex[stack] === undefined) {
              stackToIndex[stack] = i;
          }
      }
      for (var i = 0; i < length; ++i) {
          var currentStack = nodes[i].stack;
          var index = stackToIndex[currentStack];
          if (index !== undefined && index !== i) {
              if (index > 0) {
                  nodes[index - 1]._parent = undefined;
                  nodes[index - 1]._length = 1;
              }
              nodes[i]._parent = undefined;
              nodes[i]._length = 1;
              var cycleEdgeNode = i > 0 ? nodes[i - 1] : this;

              if (index < length - 1) {
                  cycleEdgeNode._parent = nodes[index + 1];
                  cycleEdgeNode._parent.uncycle();
                  cycleEdgeNode._length =
                      cycleEdgeNode._parent._length + 1;
              } else {
                  cycleEdgeNode._parent = undefined;
                  cycleEdgeNode._length = 1;
              }
              var currentChildLength = cycleEdgeNode._length + 1;
              for (var j = i - 2; j >= 0; --j) {
                  nodes[j]._length = currentChildLength;
                  currentChildLength++;
              }
              return;
          }
      }
  };

  CapturedTrace.prototype.attachExtraTrace = function(error) {
      if (error.__stackCleaned__) return;
      this.uncycle();
      var parsed = parseStackAndMessage(error);
      var message = parsed.message;
      var stacks = [parsed.stack];

      var trace = this;
      while (trace !== undefined) {
          stacks.push(cleanStack(trace.stack.split("\n")));
          trace = trace._parent;
      }
      removeCommonRoots(stacks);
      removeDuplicateOrEmptyJumps(stacks);
      util$$1.notEnumerableProp(error, "stack", reconstructStack(message, stacks));
      util$$1.notEnumerableProp(error, "__stackCleaned__", true);
  };

  var captureStackTrace = (function stackDetection() {
      var v8stackFramePattern = /^\s*at\s*/;
      var v8stackFormatter = function(stack, error) {
          if (typeof stack === "string") return stack;

          if (error.name !== undefined &&
              error.message !== undefined) {
              return error.toString();
          }
          return formatNonError(error);
      };

      if (typeof Error.stackTraceLimit === "number" &&
          typeof Error.captureStackTrace === "function") {
          Error.stackTraceLimit += 6;
          stackFramePattern = v8stackFramePattern;
          formatStack = v8stackFormatter;
          var captureStackTrace = Error.captureStackTrace;

          shouldIgnore = function(line) {
              return bluebirdFramePattern.test(line);
          };
          return function(receiver, ignoreUntil) {
              Error.stackTraceLimit += 6;
              captureStackTrace(receiver, ignoreUntil);
              Error.stackTraceLimit -= 6;
          };
      }
      var err = new Error();

      if (typeof err.stack === "string" &&
          err.stack.split("\n")[0].indexOf("stackDetection@") >= 0) {
          stackFramePattern = /@/;
          formatStack = v8stackFormatter;
          indentStackFrames = true;
          return function captureStackTrace(o) {
              o.stack = new Error().stack;
          };
      }

      var hasStackAfterThrow;
      try { throw new Error(); }
      catch(e) {
          hasStackAfterThrow = ("stack" in e);
      }
      if (!("stack" in err) && hasStackAfterThrow &&
          typeof Error.stackTraceLimit === "number") {
          stackFramePattern = v8stackFramePattern;
          formatStack = v8stackFormatter;
          return function captureStackTrace(o) {
              Error.stackTraceLimit += 6;
              try { throw new Error(); }
              catch(e) { o.stack = e.stack; }
              Error.stackTraceLimit -= 6;
          };
      }

      formatStack = function(stack, error) {
          if (typeof stack === "string") return stack;

          if ((typeof error === "object" ||
              typeof error === "function") &&
              error.name !== undefined &&
              error.message !== undefined) {
              return error.toString();
          }
          return formatNonError(error);
      };

      return null;

  })([]);

  if (typeof console !== "undefined" && typeof console.warn !== "undefined") {
      printWarning = function (message) {
          console.warn(message);
      };
      if (util$$1.isNode && process.stderr.isTTY) {
          printWarning = function(message, isSoft) {
              var color = isSoft ? "\u001b[33m" : "\u001b[31m";
              console.warn(color + message + "\u001b[0m\n");
          };
      } else if (!util$$1.isNode && typeof (new Error().stack) === "string") {
          printWarning = function(message, isSoft) {
              console.warn("%c" + message,
                          isSoft ? "color: darkorange" : "color: red");
          };
      }
  }

  var config = {
      warnings: warnings,
      longStackTraces: false,
      cancellation: false,
      monitoring: false
  };

  if (longStackTraces) Promise.longStackTraces();

  return {
      longStackTraces: function() {
          return config.longStackTraces;
      },
      warnings: function() {
          return config.warnings;
      },
      cancellation: function() {
          return config.cancellation;
      },
      monitoring: function() {
          return config.monitoring;
      },
      propagateFromFunction: function() {
          return propagateFromFunction;
      },
      boundValueFunction: function() {
          return boundValueFunction;
      },
      checkForgottenReturns: checkForgottenReturns,
      setBounds: setBounds,
      warn: warn,
      deprecated: deprecated,
      CapturedTrace: CapturedTrace,
      fireDomEvent: fireDomEvent,
      fireGlobalEvent: fireGlobalEvent
  };
  };

  var catch_filter = function(NEXT_FILTER) {
  var util$$1 = util;
  var getKeys = es5.keys;
  var tryCatch = util$$1.tryCatch;
  var errorObj = util$$1.errorObj;

  function catchFilter(instances, cb, promise) {
      return function(e) {
          var boundTo = promise._boundValue();
          predicateLoop: for (var i = 0; i < instances.length; ++i) {
              var item = instances[i];

              if (item === Error ||
                  (item != null && item.prototype instanceof Error)) {
                  if (e instanceof item) {
                      return tryCatch(cb).call(boundTo, e);
                  }
              } else if (typeof item === "function") {
                  var matchesPredicate = tryCatch(item).call(boundTo, e);
                  if (matchesPredicate === errorObj) {
                      return matchesPredicate;
                  } else if (matchesPredicate) {
                      return tryCatch(cb).call(boundTo, e);
                  }
              } else if (util$$1.isObject(e)) {
                  var keys = getKeys(item);
                  for (var j = 0; j < keys.length; ++j) {
                      var key = keys[j];
                      if (item[key] != e[key]) {
                          continue predicateLoop;
                      }
                  }
                  return tryCatch(cb).call(boundTo, e);
              }
          }
          return NEXT_FILTER;
      };
  }

  return catchFilter;
  };

  var _finally = function(Promise, tryConvertToPromise, NEXT_FILTER) {
  var util$$1 = util;
  var CancellationError = Promise.CancellationError;
  var errorObj = util$$1.errorObj;
  var catchFilter = catch_filter(NEXT_FILTER);

  function PassThroughHandlerContext(promise, type, handler) {
      this.promise = promise;
      this.type = type;
      this.handler = handler;
      this.called = false;
      this.cancelPromise = null;
  }

  PassThroughHandlerContext.prototype.isFinallyHandler = function() {
      return this.type === 0;
  };

  function FinallyHandlerCancelReaction(finallyHandler) {
      this.finallyHandler = finallyHandler;
  }

  FinallyHandlerCancelReaction.prototype._resultCancelled = function() {
      checkCancel(this.finallyHandler);
  };

  function checkCancel(ctx, reason) {
      if (ctx.cancelPromise != null) {
          if (arguments.length > 1) {
              ctx.cancelPromise._reject(reason);
          } else {
              ctx.cancelPromise._cancel();
          }
          ctx.cancelPromise = null;
          return true;
      }
      return false;
  }

  function succeed() {
      return finallyHandler.call(this, this.promise._target()._settledValue());
  }
  function fail(reason) {
      if (checkCancel(this, reason)) return;
      errorObj.e = reason;
      return errorObj;
  }
  function finallyHandler(reasonOrValue) {
      var promise = this.promise;
      var handler = this.handler;

      if (!this.called) {
          this.called = true;
          var ret = this.isFinallyHandler()
              ? handler.call(promise._boundValue())
              : handler.call(promise._boundValue(), reasonOrValue);
          if (ret === NEXT_FILTER) {
              return ret;
          } else if (ret !== undefined) {
              promise._setReturnedNonUndefined();
              var maybePromise = tryConvertToPromise(ret, promise);
              if (maybePromise instanceof Promise) {
                  if (this.cancelPromise != null) {
                      if (maybePromise._isCancelled()) {
                          var reason =
                              new CancellationError("late cancellation observer");
                          promise._attachExtraTrace(reason);
                          errorObj.e = reason;
                          return errorObj;
                      } else if (maybePromise.isPending()) {
                          maybePromise._attachCancellationCallback(
                              new FinallyHandlerCancelReaction(this));
                      }
                  }
                  return maybePromise._then(
                      succeed, fail, undefined, this, undefined);
              }
          }
      }

      if (promise.isRejected()) {
          checkCancel(this);
          errorObj.e = reasonOrValue;
          return errorObj;
      } else {
          checkCancel(this);
          return reasonOrValue;
      }
  }

  Promise.prototype._passThrough = function(handler, type, success, fail) {
      if (typeof handler !== "function") return this.then();
      return this._then(success,
                        fail,
                        undefined,
                        new PassThroughHandlerContext(this, type, handler),
                        undefined);
  };

  Promise.prototype.lastly =
  Promise.prototype["finally"] = function (handler) {
      return this._passThrough(handler,
                               0,
                               finallyHandler,
                               finallyHandler);
  };


  Promise.prototype.tap = function (handler) {
      return this._passThrough(handler, 1, finallyHandler);
  };

  Promise.prototype.tapCatch = function (handlerOrPredicate) {
      var len = arguments.length;
      if(len === 1) {
          return this._passThrough(handlerOrPredicate,
                                   1,
                                   undefined,
                                   finallyHandler);
      } else {
           var catchInstances = new Array(len - 1),
              j = 0, i;
          for (i = 0; i < len - 1; ++i) {
              var item = arguments[i];
              if (util$$1.isObject(item)) {
                  catchInstances[j++] = item;
              } else {
                  return Promise.reject(new TypeError(
                      "tapCatch statement predicate: "
                      + "expecting an object but got " + util$$1.classString(item)
                  ));
              }
          }
          catchInstances.length = j;
          var handler = arguments[i];
          return this._passThrough(catchFilter(catchInstances, handler, this),
                                   1,
                                   undefined,
                                   finallyHandler);
      }

  };

  return PassThroughHandlerContext;
  };

  var maybeWrapAsError$1 = util.maybeWrapAsError;

  var OperationalError$1 = errors.OperationalError;


  function isUntypedError(obj) {
      return obj instanceof Error &&
          es5.getPrototypeOf(obj) === Error.prototype;
  }

  var rErrorKey = /^(?:name|message|stack|cause)$/;
  function wrapAsOperationalError(obj) {
      var ret;
      if (isUntypedError(obj)) {
          ret = new OperationalError$1(obj);
          ret.name = obj.name;
          ret.message = obj.message;
          ret.stack = obj.stack;
          var keys = es5.keys(obj);
          for (var i = 0; i < keys.length; ++i) {
              var key = keys[i];
              if (!rErrorKey.test(key)) {
                  ret[key] = obj[key];
              }
          }
          return ret;
      }
      util.markAsOriginatingFromRejection(obj);
      return obj;
  }

  function nodebackForPromise(promise, multiArgs) {
      return function(err, value) {
          if (promise === null) return;
          if (err) {
              var wrapped = wrapAsOperationalError(maybeWrapAsError$1(err));
              promise._attachExtraTrace(wrapped);
              promise._reject(wrapped);
          } else if (!multiArgs) {
              promise._fulfill(value);
          } else {
              var $_len = arguments.length;var args = new Array(Math.max($_len - 1, 0)); for(var $_i = 1; $_i < $_len; ++$_i) {args[$_i - 1] = arguments[$_i];}            promise._fulfill(args);
          }
          promise = null;
      };
  }

  var nodeback = nodebackForPromise;

  var method =
  function(Promise, INTERNAL, tryConvertToPromise, apiRejection, debug) {
  var util$$1 = util;
  var tryCatch = util$$1.tryCatch;

  Promise.method = function (fn) {
      if (typeof fn !== "function") {
          throw new Promise.TypeError("expecting a function but got " + util$$1.classString(fn));
      }
      return function () {
          var ret = new Promise(INTERNAL);
          ret._captureStackTrace();
          ret._pushContext();
          var value = tryCatch(fn).apply(this, arguments);
          var promiseCreated = ret._popContext();
          debug.checkForgottenReturns(
              value, promiseCreated, "Promise.method", ret);
          ret._resolveFromSyncValue(value);
          return ret;
      };
  };

  Promise.attempt = Promise["try"] = function (fn) {
      if (typeof fn !== "function") {
          return apiRejection("expecting a function but got " + util$$1.classString(fn));
      }
      var ret = new Promise(INTERNAL);
      ret._captureStackTrace();
      ret._pushContext();
      var value;
      if (arguments.length > 1) {
          debug.deprecated("calling Promise.try with more than 1 argument");
          var arg = arguments[1];
          var ctx = arguments[2];
          value = util$$1.isArray(arg) ? tryCatch(fn).apply(ctx, arg)
                                    : tryCatch(fn).call(ctx, arg);
      } else {
          value = tryCatch(fn)();
      }
      var promiseCreated = ret._popContext();
      debug.checkForgottenReturns(
          value, promiseCreated, "Promise.try", ret);
      ret._resolveFromSyncValue(value);
      return ret;
  };

  Promise.prototype._resolveFromSyncValue = function (value) {
      if (value === util$$1.errorObj) {
          this._rejectCallback(value.e, false);
      } else {
          this._resolveCallback(value, true);
      }
  };
  };

  var bind = function(Promise, INTERNAL, tryConvertToPromise, debug) {
  var calledBind = false;
  var rejectThis = function(_, e) {
      this._reject(e);
  };

  var targetRejected = function(e, context) {
      context.promiseRejectionQueued = true;
      context.bindingPromise._then(rejectThis, rejectThis, null, this, e);
  };

  var bindingResolved = function(thisArg, context) {
      if (((this._bitField & 50397184) === 0)) {
          this._resolveCallback(context.target);
      }
  };

  var bindingRejected = function(e, context) {
      if (!context.promiseRejectionQueued) this._reject(e);
  };

  Promise.prototype.bind = function (thisArg) {
      if (!calledBind) {
          calledBind = true;
          Promise.prototype._propagateFrom = debug.propagateFromFunction();
          Promise.prototype._boundValue = debug.boundValueFunction();
      }
      var maybePromise = tryConvertToPromise(thisArg);
      var ret = new Promise(INTERNAL);
      ret._propagateFrom(this, 1);
      var target = this._target();
      ret._setBoundTo(maybePromise);
      if (maybePromise instanceof Promise) {
          var context = {
              promiseRejectionQueued: false,
              promise: ret,
              target: target,
              bindingPromise: maybePromise
          };
          target._then(INTERNAL, targetRejected, undefined, ret, context);
          maybePromise._then(
              bindingResolved, bindingRejected, undefined, ret, context);
          ret._setOnCancel(maybePromise);
      } else {
          ret._resolveCallback(target);
      }
      return ret;
  };

  Promise.prototype._setBoundTo = function (obj) {
      if (obj !== undefined) {
          this._bitField = this._bitField | 2097152;
          this._boundTo = obj;
      } else {
          this._bitField = this._bitField & (~2097152);
      }
  };

  Promise.prototype._isBound = function () {
      return (this._bitField & 2097152) === 2097152;
  };

  Promise.bind = function (thisArg, value) {
      return Promise.resolve(value).bind(thisArg);
  };
  };

  var cancel = function(Promise, PromiseArray, apiRejection, debug) {
  var util$$1 = util;
  var tryCatch = util$$1.tryCatch;
  var errorObj = util$$1.errorObj;
  var async = Promise._async;

  Promise.prototype["break"] = Promise.prototype.cancel = function() {
      if (!debug.cancellation()) return this._warn("cancellation is disabled");

      var promise = this;
      var child = promise;
      while (promise._isCancellable()) {
          if (!promise._cancelBy(child)) {
              if (child._isFollowing()) {
                  child._followee().cancel();
              } else {
                  child._cancelBranched();
              }
              break;
          }

          var parent = promise._cancellationParent;
          if (parent == null || !parent._isCancellable()) {
              if (promise._isFollowing()) {
                  promise._followee().cancel();
              } else {
                  promise._cancelBranched();
              }
              break;
          } else {
              if (promise._isFollowing()) promise._followee().cancel();
              promise._setWillBeCancelled();
              child = promise;
              promise = parent;
          }
      }
  };

  Promise.prototype._branchHasCancelled = function() {
      this._branchesRemainingToCancel--;
  };

  Promise.prototype._enoughBranchesHaveCancelled = function() {
      return this._branchesRemainingToCancel === undefined ||
             this._branchesRemainingToCancel <= 0;
  };

  Promise.prototype._cancelBy = function(canceller) {
      if (canceller === this) {
          this._branchesRemainingToCancel = 0;
          this._invokeOnCancel();
          return true;
      } else {
          this._branchHasCancelled();
          if (this._enoughBranchesHaveCancelled()) {
              this._invokeOnCancel();
              return true;
          }
      }
      return false;
  };

  Promise.prototype._cancelBranched = function() {
      if (this._enoughBranchesHaveCancelled()) {
          this._cancel();
      }
  };

  Promise.prototype._cancel = function() {
      if (!this._isCancellable()) return;
      this._setCancelled();
      async.invoke(this._cancelPromises, this, undefined);
  };

  Promise.prototype._cancelPromises = function() {
      if (this._length() > 0) this._settlePromises();
  };

  Promise.prototype._unsetOnCancel = function() {
      this._onCancelField = undefined;
  };

  Promise.prototype._isCancellable = function() {
      return this.isPending() && !this._isCancelled();
  };

  Promise.prototype.isCancellable = function() {
      return this.isPending() && !this.isCancelled();
  };

  Promise.prototype._doInvokeOnCancel = function(onCancelCallback, internalOnly) {
      if (util$$1.isArray(onCancelCallback)) {
          for (var i = 0; i < onCancelCallback.length; ++i) {
              this._doInvokeOnCancel(onCancelCallback[i], internalOnly);
          }
      } else if (onCancelCallback !== undefined) {
          if (typeof onCancelCallback === "function") {
              if (!internalOnly) {
                  var e = tryCatch(onCancelCallback).call(this._boundValue());
                  if (e === errorObj) {
                      this._attachExtraTrace(e.e);
                      async.throwLater(e.e);
                  }
              }
          } else {
              onCancelCallback._resultCancelled(this);
          }
      }
  };

  Promise.prototype._invokeOnCancel = function() {
      var onCancelCallback = this._onCancel();
      this._unsetOnCancel();
      async.invoke(this._doInvokeOnCancel, this, onCancelCallback);
  };

  Promise.prototype._invokeInternalOnCancel = function() {
      if (this._isCancellable()) {
          this._doInvokeOnCancel(this._onCancel(), true);
          this._unsetOnCancel();
      }
  };

  Promise.prototype._resultCancelled = function() {
      this.cancel();
  };

  };

  var direct_resolve = function(Promise) {
  function returner() {
      return this.value;
  }
  function thrower() {
      throw this.reason;
  }

  Promise.prototype["return"] =
  Promise.prototype.thenReturn = function (value) {
      if (value instanceof Promise) value.suppressUnhandledRejections();
      return this._then(
          returner, undefined, undefined, {value: value}, undefined);
  };

  Promise.prototype["throw"] =
  Promise.prototype.thenThrow = function (reason) {
      return this._then(
          thrower, undefined, undefined, {reason: reason}, undefined);
  };

  Promise.prototype.catchThrow = function (reason) {
      if (arguments.length <= 1) {
          return this._then(
              undefined, thrower, undefined, {reason: reason}, undefined);
      } else {
          var _reason = arguments[1];
          var handler = function() {throw _reason;};
          return this.caught(reason, handler);
      }
  };

  Promise.prototype.catchReturn = function (value) {
      if (arguments.length <= 1) {
          if (value instanceof Promise) value.suppressUnhandledRejections();
          return this._then(
              undefined, returner, undefined, {value: value}, undefined);
      } else {
          var _value = arguments[1];
          if (_value instanceof Promise) _value.suppressUnhandledRejections();
          var handler = function() {return _value;};
          return this.caught(value, handler);
      }
  };
  };

  var synchronous_inspection = function(Promise) {
  function PromiseInspection(promise) {
      if (promise !== undefined) {
          promise = promise._target();
          this._bitField = promise._bitField;
          this._settledValueField = promise._isFateSealed()
              ? promise._settledValue() : undefined;
      }
      else {
          this._bitField = 0;
          this._settledValueField = undefined;
      }
  }

  PromiseInspection.prototype._settledValue = function() {
      return this._settledValueField;
  };

  var value = PromiseInspection.prototype.value = function () {
      if (!this.isFulfilled()) {
          throw new TypeError("cannot get fulfillment value of a non-fulfilled promise\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
      }
      return this._settledValue();
  };

  var reason = PromiseInspection.prototype.error =
  PromiseInspection.prototype.reason = function () {
      if (!this.isRejected()) {
          throw new TypeError("cannot get rejection reason of a non-rejected promise\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
      }
      return this._settledValue();
  };

  var isFulfilled = PromiseInspection.prototype.isFulfilled = function() {
      return (this._bitField & 33554432) !== 0;
  };

  var isRejected = PromiseInspection.prototype.isRejected = function () {
      return (this._bitField & 16777216) !== 0;
  };

  var isPending = PromiseInspection.prototype.isPending = function () {
      return (this._bitField & 50397184) === 0;
  };

  var isResolved = PromiseInspection.prototype.isResolved = function () {
      return (this._bitField & 50331648) !== 0;
  };

  PromiseInspection.prototype.isCancelled = function() {
      return (this._bitField & 8454144) !== 0;
  };

  Promise.prototype.__isCancelled = function() {
      return (this._bitField & 65536) === 65536;
  };

  Promise.prototype._isCancelled = function() {
      return this._target().__isCancelled();
  };

  Promise.prototype.isCancelled = function() {
      return (this._target()._bitField & 8454144) !== 0;
  };

  Promise.prototype.isPending = function() {
      return isPending.call(this._target());
  };

  Promise.prototype.isRejected = function() {
      return isRejected.call(this._target());
  };

  Promise.prototype.isFulfilled = function() {
      return isFulfilled.call(this._target());
  };

  Promise.prototype.isResolved = function() {
      return isResolved.call(this._target());
  };

  Promise.prototype.value = function() {
      return value.call(this._target());
  };

  Promise.prototype.reason = function() {
      var target = this._target();
      target._unsetRejectionIsUnhandled();
      return reason.call(target);
  };

  Promise.prototype._value = function() {
      return this._settledValue();
  };

  Promise.prototype._reason = function() {
      this._unsetRejectionIsUnhandled();
      return this._settledValue();
  };

  Promise.PromiseInspection = PromiseInspection;
  };

  var join =
  function(Promise, PromiseArray, tryConvertToPromise, INTERNAL, async,
           getDomain) {
  var util$$1 = util;
  var canEvaluate = util$$1.canEvaluate;
  var tryCatch = util$$1.tryCatch;
  var errorObj = util$$1.errorObj;
  var reject;

  {
  if (canEvaluate) {
      var thenCallback = function(i) {
          return new Function("value", "holder", "                             \n\
            'use strict';                                                    \n\
            holder.pIndex = value;                                           \n\
            holder.checkFulfillment(this);                                   \n\
            ".replace(/Index/g, i));
      };

      var promiseSetter = function(i) {
          return new Function("promise", "holder", "                           \n\
            'use strict';                                                    \n\
            holder.pIndex = promise;                                         \n\
            ".replace(/Index/g, i));
      };

      var generateHolderClass = function(total) {
          var props = new Array(total);
          for (var i = 0; i < props.length; ++i) {
              props[i] = "this.p" + (i+1);
          }
          var assignment = props.join(" = ") + " = null;";
          var cancellationCode= "var promise;\n" + props.map(function(prop) {
              return "                                                         \n\
                promise = " + prop + ";                                      \n\
                if (promise instanceof Promise) {                            \n\
                    promise.cancel();                                        \n\
                }                                                            \n\
            ";
          }).join("\n");
          var passedArguments = props.join(", ");
          var name = "Holder$" + total;


          var code = "return function(tryCatch, errorObj, Promise, async) {    \n\
            'use strict';                                                    \n\
            function [TheName](fn) {                                         \n\
                [TheProperties]                                              \n\
                this.fn = fn;                                                \n\
                this.asyncNeeded = true;                                     \n\
                this.now = 0;                                                \n\
            }                                                                \n\
                                                                             \n\
            [TheName].prototype._callFunction = function(promise) {          \n\
                promise._pushContext();                                      \n\
                var ret = tryCatch(this.fn)([ThePassedArguments]);           \n\
                promise._popContext();                                       \n\
                if (ret === errorObj) {                                      \n\
                    promise._rejectCallback(ret.e, false);                   \n\
                } else {                                                     \n\
                    promise._resolveCallback(ret);                           \n\
                }                                                            \n\
            };                                                               \n\
                                                                             \n\
            [TheName].prototype.checkFulfillment = function(promise) {       \n\
                var now = ++this.now;                                        \n\
                if (now === [TheTotal]) {                                    \n\
                    if (this.asyncNeeded) {                                  \n\
                        async.invoke(this._callFunction, this, promise);     \n\
                    } else {                                                 \n\
                        this._callFunction(promise);                         \n\
                    }                                                        \n\
                                                                             \n\
                }                                                            \n\
            };                                                               \n\
                                                                             \n\
            [TheName].prototype._resultCancelled = function() {              \n\
                [CancellationCode]                                           \n\
            };                                                               \n\
                                                                             \n\
            return [TheName];                                                \n\
        }(tryCatch, errorObj, Promise, async);                               \n\
        ";

          code = code.replace(/\[TheName\]/g, name)
              .replace(/\[TheTotal\]/g, total)
              .replace(/\[ThePassedArguments\]/g, passedArguments)
              .replace(/\[TheProperties\]/g, assignment)
              .replace(/\[CancellationCode\]/g, cancellationCode);

          return new Function("tryCatch", "errorObj", "Promise", "async", code)
                             (tryCatch, errorObj, Promise, async);
      };

      var holderClasses = [];
      var thenCallbacks = [];
      var promiseSetters = [];

      for (var i = 0; i < 8; ++i) {
          holderClasses.push(generateHolderClass(i + 1));
          thenCallbacks.push(thenCallback(i + 1));
          promiseSetters.push(promiseSetter(i + 1));
      }

      reject = function (reason) {
          this._reject(reason);
      };
  }}

  Promise.join = function () {
      var last = arguments.length - 1;
      var fn;
      if (last > 0 && typeof arguments[last] === "function") {
          fn = arguments[last];
          {
              if (last <= 8 && canEvaluate) {
                  var ret = new Promise(INTERNAL);
                  ret._captureStackTrace();
                  var HolderClass = holderClasses[last - 1];
                  var holder = new HolderClass(fn);
                  var callbacks = thenCallbacks;

                  for (var i = 0; i < last; ++i) {
                      var maybePromise = tryConvertToPromise(arguments[i], ret);
                      if (maybePromise instanceof Promise) {
                          maybePromise = maybePromise._target();
                          var bitField = maybePromise._bitField;
                          if (((bitField & 50397184) === 0)) {
                              maybePromise._then(callbacks[i], reject,
                                                 undefined, ret, holder);
                              promiseSetters[i](maybePromise, holder);
                              holder.asyncNeeded = false;
                          } else if (((bitField & 33554432) !== 0)) {
                              callbacks[i].call(ret,
                                                maybePromise._value(), holder);
                          } else if (((bitField & 16777216) !== 0)) {
                              ret._reject(maybePromise._reason());
                          } else {
                              ret._cancel();
                          }
                      } else {
                          callbacks[i].call(ret, maybePromise, holder);
                      }
                  }

                  if (!ret._isFateSealed()) {
                      if (holder.asyncNeeded) {
                          var domain = getDomain();
                          if (domain !== null) {
                              holder.fn = util$$1.domainBind(domain, holder.fn);
                          }
                      }
                      ret._setAsyncGuaranteed();
                      ret._setOnCancel(holder);
                  }
                  return ret;
              }
          }
      }
      var $_len = arguments.length;var args = new Array($_len); for(var $_i = 0; $_i < $_len; ++$_i) {args[$_i] = arguments[$_i];}    if (fn) args.pop();
      var ret = new PromiseArray(args).promise();
      return fn !== undefined ? ret.spread(fn) : ret;
  };

  };

  var map = function(Promise,
                            PromiseArray,
                            apiRejection,
                            tryConvertToPromise,
                            INTERNAL,
                            debug) {
  var getDomain = Promise._getDomain;
  var util$$1 = util;
  var tryCatch = util$$1.tryCatch;
  var errorObj = util$$1.errorObj;
  var async = Promise._async;

  function MappingPromiseArray(promises, fn, limit, _filter) {
      this.constructor$(promises);
      this._promise._captureStackTrace();
      var domain = getDomain();
      this._callback = domain === null ? fn : util$$1.domainBind(domain, fn);
      this._preservedValues = _filter === INTERNAL
          ? new Array(this.length())
          : null;
      this._limit = limit;
      this._inFlight = 0;
      this._queue = [];
      async.invoke(this._asyncInit, this, undefined);
  }
  util$$1.inherits(MappingPromiseArray, PromiseArray);

  MappingPromiseArray.prototype._asyncInit = function() {
      this._init$(undefined, -2);
  };

  MappingPromiseArray.prototype._init = function () {};

  MappingPromiseArray.prototype._promiseFulfilled = function (value, index) {
      var values = this._values;
      var length = this.length();
      var preservedValues = this._preservedValues;
      var limit = this._limit;

      if (index < 0) {
          index = (index * -1) - 1;
          values[index] = value;
          if (limit >= 1) {
              this._inFlight--;
              this._drainQueue();
              if (this._isResolved()) return true;
          }
      } else {
          if (limit >= 1 && this._inFlight >= limit) {
              values[index] = value;
              this._queue.push(index);
              return false;
          }
          if (preservedValues !== null) preservedValues[index] = value;

          var promise = this._promise;
          var callback = this._callback;
          var receiver = promise._boundValue();
          promise._pushContext();
          var ret = tryCatch(callback).call(receiver, value, index, length);
          var promiseCreated = promise._popContext();
          debug.checkForgottenReturns(
              ret,
              promiseCreated,
              preservedValues !== null ? "Promise.filter" : "Promise.map",
              promise
          );
          if (ret === errorObj) {
              this._reject(ret.e);
              return true;
          }

          var maybePromise = tryConvertToPromise(ret, this._promise);
          if (maybePromise instanceof Promise) {
              maybePromise = maybePromise._target();
              var bitField = maybePromise._bitField;
              if (((bitField & 50397184) === 0)) {
                  if (limit >= 1) this._inFlight++;
                  values[index] = maybePromise;
                  maybePromise._proxy(this, (index + 1) * -1);
                  return false;
              } else if (((bitField & 33554432) !== 0)) {
                  ret = maybePromise._value();
              } else if (((bitField & 16777216) !== 0)) {
                  this._reject(maybePromise._reason());
                  return true;
              } else {
                  this._cancel();
                  return true;
              }
          }
          values[index] = ret;
      }
      var totalResolved = ++this._totalResolved;
      if (totalResolved >= length) {
          if (preservedValues !== null) {
              this._filter(values, preservedValues);
          } else {
              this._resolve(values);
          }
          return true;
      }
      return false;
  };

  MappingPromiseArray.prototype._drainQueue = function () {
      var queue = this._queue;
      var limit = this._limit;
      var values = this._values;
      while (queue.length > 0 && this._inFlight < limit) {
          if (this._isResolved()) return;
          var index = queue.pop();
          this._promiseFulfilled(values[index], index);
      }
  };

  MappingPromiseArray.prototype._filter = function (booleans, values) {
      var len = values.length;
      var ret = new Array(len);
      var j = 0;
      for (var i = 0; i < len; ++i) {
          if (booleans[i]) ret[j++] = values[i];
      }
      ret.length = j;
      this._resolve(ret);
  };

  MappingPromiseArray.prototype.preservedValues = function () {
      return this._preservedValues;
  };

  function map(promises, fn, options, _filter) {
      if (typeof fn !== "function") {
          return apiRejection("expecting a function but got " + util$$1.classString(fn));
      }

      var limit = 0;
      if (options !== undefined) {
          if (typeof options === "object" && options !== null) {
              if (typeof options.concurrency !== "number") {
                  return Promise.reject(
                      new TypeError("'concurrency' must be a number but it is " +
                                      util$$1.classString(options.concurrency)));
              }
              limit = options.concurrency;
          } else {
              return Promise.reject(new TypeError(
                              "options argument must be an object but it is " +
                               util$$1.classString(options)));
          }
      }
      limit = typeof limit === "number" &&
          isFinite(limit) && limit >= 1 ? limit : 0;
      return new MappingPromiseArray(promises, fn, limit, _filter).promise();
  }

  Promise.prototype.map = function (fn, options) {
      return map(this, fn, options, null);
  };

  Promise.map = function (promises, fn, options, _filter) {
      return map(promises, fn, options, _filter);
  };


  };

  var cr = Object.create;
  if (cr) {
      var callerCache = cr(null);
      var getterCache = cr(null);
      callerCache[" size"] = getterCache[" size"] = 0;
  }

  var call_get = function(Promise) {
  var util$$1 = util;
  var canEvaluate = util$$1.canEvaluate;
  var isIdentifier = util$$1.isIdentifier;

  var getMethodCaller;
  var getGetter;
  {
  var makeMethodCaller = function (methodName) {
      return new Function("ensureMethod", "                                    \n\
        return function(obj) {                                               \n\
            'use strict'                                                     \n\
            var len = this.length;                                           \n\
            ensureMethod(obj, 'methodName');                                 \n\
            switch(len) {                                                    \n\
                case 1: return obj.methodName(this[0]);                      \n\
                case 2: return obj.methodName(this[0], this[1]);             \n\
                case 3: return obj.methodName(this[0], this[1], this[2]);    \n\
                case 0: return obj.methodName();                             \n\
                default:                                                     \n\
                    return obj.methodName.apply(obj, this);                  \n\
            }                                                                \n\
        };                                                                   \n\
        ".replace(/methodName/g, methodName))(ensureMethod);
  };

  var makeGetter = function (propertyName) {
      return new Function("obj", "                                             \n\
        'use strict';                                                        \n\
        return obj.propertyName;                                             \n\
        ".replace("propertyName", propertyName));
  };

  var getCompiled = function(name, compiler, cache) {
      var ret = cache[name];
      if (typeof ret !== "function") {
          if (!isIdentifier(name)) {
              return null;
          }
          ret = compiler(name);
          cache[name] = ret;
          cache[" size"]++;
          if (cache[" size"] > 512) {
              var keys = Object.keys(cache);
              for (var i = 0; i < 256; ++i) delete cache[keys[i]];
              cache[" size"] = keys.length - 256;
          }
      }
      return ret;
  };

  getMethodCaller = function(name) {
      return getCompiled(name, makeMethodCaller, callerCache);
  };

  getGetter = function(name) {
      return getCompiled(name, makeGetter, getterCache);
  };
  }

  function ensureMethod(obj, methodName) {
      var fn;
      if (obj != null) fn = obj[methodName];
      if (typeof fn !== "function") {
          var message = "Object " + util$$1.classString(obj) + " has no method '" +
              util$$1.toString(methodName) + "'";
          throw new Promise.TypeError(message);
      }
      return fn;
  }

  function caller(obj) {
      var methodName = this.pop();
      var fn = ensureMethod(obj, methodName);
      return fn.apply(obj, this);
  }
  Promise.prototype.call = function (methodName) {
      var $_len = arguments.length;var args = new Array(Math.max($_len - 1, 0)); for(var $_i = 1; $_i < $_len; ++$_i) {args[$_i - 1] = arguments[$_i];}    {
          if (canEvaluate) {
              var maybeCaller = getMethodCaller(methodName);
              if (maybeCaller !== null) {
                  return this._then(
                      maybeCaller, undefined, undefined, args, undefined);
              }
          }
      }
      args.push(methodName);
      return this._then(caller, undefined, undefined, args, undefined);
  };

  function namedGetter(obj) {
      return obj[this];
  }
  function indexedGetter(obj) {
      var index = +this;
      if (index < 0) index = Math.max(0, index + obj.length);
      return obj[index];
  }
  Promise.prototype.get = function (propertyName) {
      var isIndex = (typeof propertyName === "number");
      var getter;
      if (!isIndex) {
          if (canEvaluate) {
              var maybeGetter = getGetter(propertyName);
              getter = maybeGetter !== null ? maybeGetter : namedGetter;
          } else {
              getter = namedGetter;
          }
      } else {
          getter = indexedGetter;
      }
      return this._then(getter, undefined, undefined, propertyName, undefined);
  };
  };

  var using = function (Promise, apiRejection, tryConvertToPromise,
      createContext, INTERNAL, debug) {
      var util$$1 = util;
      var TypeError = errors.TypeError;
      var inherits = util.inherits;
      var errorObj = util$$1.errorObj;
      var tryCatch = util$$1.tryCatch;
      var NULL = {};

      function thrower(e) {
          setTimeout(function(){throw e;}, 0);
      }

      function castPreservingDisposable(thenable) {
          var maybePromise = tryConvertToPromise(thenable);
          if (maybePromise !== thenable &&
              typeof thenable._isDisposable === "function" &&
              typeof thenable._getDisposer === "function" &&
              thenable._isDisposable()) {
              maybePromise._setDisposable(thenable._getDisposer());
          }
          return maybePromise;
      }
      function dispose(resources, inspection) {
          var i = 0;
          var len = resources.length;
          var ret = new Promise(INTERNAL);
          function iterator() {
              if (i >= len) return ret._fulfill();
              var maybePromise = castPreservingDisposable(resources[i++]);
              if (maybePromise instanceof Promise &&
                  maybePromise._isDisposable()) {
                  try {
                      maybePromise = tryConvertToPromise(
                          maybePromise._getDisposer().tryDispose(inspection),
                          resources.promise);
                  } catch (e) {
                      return thrower(e);
                  }
                  if (maybePromise instanceof Promise) {
                      return maybePromise._then(iterator, thrower,
                                                null, null, null);
                  }
              }
              iterator();
          }
          iterator();
          return ret;
      }

      function Disposer(data, promise, context) {
          this._data = data;
          this._promise = promise;
          this._context = context;
      }

      Disposer.prototype.data = function () {
          return this._data;
      };

      Disposer.prototype.promise = function () {
          return this._promise;
      };

      Disposer.prototype.resource = function () {
          if (this.promise().isFulfilled()) {
              return this.promise().value();
          }
          return NULL;
      };

      Disposer.prototype.tryDispose = function(inspection) {
          var resource = this.resource();
          var context = this._context;
          if (context !== undefined) context._pushContext();
          var ret = resource !== NULL
              ? this.doDispose(resource, inspection) : null;
          if (context !== undefined) context._popContext();
          this._promise._unsetDisposable();
          this._data = null;
          return ret;
      };

      Disposer.isDisposer = function (d) {
          return (d != null &&
                  typeof d.resource === "function" &&
                  typeof d.tryDispose === "function");
      };

      function FunctionDisposer(fn, promise, context) {
          this.constructor$(fn, promise, context);
      }
      inherits(FunctionDisposer, Disposer);

      FunctionDisposer.prototype.doDispose = function (resource, inspection) {
          var fn = this.data();
          return fn.call(resource, resource, inspection);
      };

      function maybeUnwrapDisposer(value) {
          if (Disposer.isDisposer(value)) {
              this.resources[this.index]._setDisposable(value);
              return value.promise();
          }
          return value;
      }

      function ResourceList(length) {
          this.length = length;
          this.promise = null;
          this[length-1] = null;
      }

      ResourceList.prototype._resultCancelled = function() {
          var len = this.length;
          for (var i = 0; i < len; ++i) {
              var item = this[i];
              if (item instanceof Promise) {
                  item.cancel();
              }
          }
      };

      Promise.using = function () {
          var len = arguments.length;
          if (len < 2) return apiRejection(
                          "you must pass at least 2 arguments to Promise.using");
          var fn = arguments[len - 1];
          if (typeof fn !== "function") {
              return apiRejection("expecting a function but got " + util$$1.classString(fn));
          }
          var input;
          var spreadArgs = true;
          if (len === 2 && Array.isArray(arguments[0])) {
              input = arguments[0];
              len = input.length;
              spreadArgs = false;
          } else {
              input = arguments;
              len--;
          }
          var resources = new ResourceList(len);
          for (var i = 0; i < len; ++i) {
              var resource = input[i];
              if (Disposer.isDisposer(resource)) {
                  var disposer = resource;
                  resource = resource.promise();
                  resource._setDisposable(disposer);
              } else {
                  var maybePromise = tryConvertToPromise(resource);
                  if (maybePromise instanceof Promise) {
                      resource =
                          maybePromise._then(maybeUnwrapDisposer, null, null, {
                              resources: resources,
                              index: i
                      }, undefined);
                  }
              }
              resources[i] = resource;
          }

          var reflectedResources = new Array(resources.length);
          for (var i = 0; i < reflectedResources.length; ++i) {
              reflectedResources[i] = Promise.resolve(resources[i]).reflect();
          }

          var resultPromise = Promise.all(reflectedResources)
              .then(function(inspections) {
                  for (var i = 0; i < inspections.length; ++i) {
                      var inspection = inspections[i];
                      if (inspection.isRejected()) {
                          errorObj.e = inspection.error();
                          return errorObj;
                      } else if (!inspection.isFulfilled()) {
                          resultPromise.cancel();
                          return;
                      }
                      inspections[i] = inspection.value();
                  }
                  promise._pushContext();

                  fn = tryCatch(fn);
                  var ret = spreadArgs
                      ? fn.apply(undefined, inspections) : fn(inspections);
                  var promiseCreated = promise._popContext();
                  debug.checkForgottenReturns(
                      ret, promiseCreated, "Promise.using", promise);
                  return ret;
              });

          var promise = resultPromise.lastly(function() {
              var inspection = new Promise.PromiseInspection(resultPromise);
              return dispose(resources, inspection);
          });
          resources.promise = promise;
          promise._setOnCancel(resources);
          return promise;
      };

      Promise.prototype._setDisposable = function (disposer) {
          this._bitField = this._bitField | 131072;
          this._disposer = disposer;
      };

      Promise.prototype._isDisposable = function () {
          return (this._bitField & 131072) > 0;
      };

      Promise.prototype._getDisposer = function () {
          return this._disposer;
      };

      Promise.prototype._unsetDisposable = function () {
          this._bitField = this._bitField & (~131072);
          this._disposer = undefined;
      };

      Promise.prototype.disposer = function (fn) {
          if (typeof fn === "function") {
              return new FunctionDisposer(fn, this, createContext());
          }
          throw new TypeError();
      };

  };

  var timers = function(Promise, INTERNAL, debug) {
  var util$$1 = util;
  var TimeoutError = Promise.TimeoutError;

  function HandleWrapper(handle)  {
      this.handle = handle;
  }

  HandleWrapper.prototype._resultCancelled = function() {
      clearTimeout(this.handle);
  };

  var afterValue = function(value) { return delay(+this).thenReturn(value); };
  var delay = Promise.delay = function (ms, value) {
      var ret;
      var handle;
      if (value !== undefined) {
          ret = Promise.resolve(value)
                  ._then(afterValue, null, null, ms, undefined);
          if (debug.cancellation() && value instanceof Promise) {
              ret._setOnCancel(value);
          }
      } else {
          ret = new Promise(INTERNAL);
          handle = setTimeout(function() { ret._fulfill(); }, +ms);
          if (debug.cancellation()) {
              ret._setOnCancel(new HandleWrapper(handle));
          }
          ret._captureStackTrace();
      }
      ret._setAsyncGuaranteed();
      return ret;
  };

  Promise.prototype.delay = function (ms) {
      return delay(ms, this);
  };

  var afterTimeout = function (promise, message, parent) {
      var err;
      if (typeof message !== "string") {
          if (message instanceof Error) {
              err = message;
          } else {
              err = new TimeoutError("operation timed out");
          }
      } else {
          err = new TimeoutError(message);
      }
      util$$1.markAsOriginatingFromRejection(err);
      promise._attachExtraTrace(err);
      promise._reject(err);

      if (parent != null) {
          parent.cancel();
      }
  };

  function successClear(value) {
      clearTimeout(this.handle);
      return value;
  }

  function failureClear(reason) {
      clearTimeout(this.handle);
      throw reason;
  }

  Promise.prototype.timeout = function (ms, message) {
      ms = +ms;
      var ret, parent;

      var handleWrapper = new HandleWrapper(setTimeout(function timeoutTimeout() {
          if (ret.isPending()) {
              afterTimeout(ret, message, parent);
          }
      }, ms));

      if (debug.cancellation()) {
          parent = this.then();
          ret = parent._then(successClear, failureClear,
                              undefined, handleWrapper, undefined);
          ret._setOnCancel(handleWrapper);
      } else {
          ret = this._then(successClear, failureClear,
                              undefined, handleWrapper, undefined);
      }

      return ret;
  };

  };

  var generators = function(Promise,
                            apiRejection,
                            INTERNAL,
                            tryConvertToPromise,
                            Proxyable,
                            debug) {
  var errors$$1 = errors;
  var TypeError = errors$$1.TypeError;
  var util$$1 = util;
  var errorObj = util$$1.errorObj;
  var tryCatch = util$$1.tryCatch;
  var yieldHandlers = [];

  function promiseFromYieldHandler(value, yieldHandlers, traceParent) {
      for (var i = 0; i < yieldHandlers.length; ++i) {
          traceParent._pushContext();
          var result = tryCatch(yieldHandlers[i])(value);
          traceParent._popContext();
          if (result === errorObj) {
              traceParent._pushContext();
              var ret = Promise.reject(errorObj.e);
              traceParent._popContext();
              return ret;
          }
          var maybePromise = tryConvertToPromise(result, traceParent);
          if (maybePromise instanceof Promise) return maybePromise;
      }
      return null;
  }

  function PromiseSpawn(generatorFunction, receiver, yieldHandler, stack) {
      if (debug.cancellation()) {
          var internal = new Promise(INTERNAL);
          var _finallyPromise = this._finallyPromise = new Promise(INTERNAL);
          this._promise = internal.lastly(function() {
              return _finallyPromise;
          });
          internal._captureStackTrace();
          internal._setOnCancel(this);
      } else {
          var promise = this._promise = new Promise(INTERNAL);
          promise._captureStackTrace();
      }
      this._stack = stack;
      this._generatorFunction = generatorFunction;
      this._receiver = receiver;
      this._generator = undefined;
      this._yieldHandlers = typeof yieldHandler === "function"
          ? [yieldHandler].concat(yieldHandlers)
          : yieldHandlers;
      this._yieldedPromise = null;
      this._cancellationPhase = false;
  }
  util$$1.inherits(PromiseSpawn, Proxyable);

  PromiseSpawn.prototype._isResolved = function() {
      return this._promise === null;
  };

  PromiseSpawn.prototype._cleanup = function() {
      this._promise = this._generator = null;
      if (debug.cancellation() && this._finallyPromise !== null) {
          this._finallyPromise._fulfill();
          this._finallyPromise = null;
      }
  };

  PromiseSpawn.prototype._promiseCancelled = function() {
      if (this._isResolved()) return;
      var implementsReturn = typeof this._generator["return"] !== "undefined";

      var result;
      if (!implementsReturn) {
          var reason = new Promise.CancellationError(
              "generator .return() sentinel");
          Promise.coroutine.returnSentinel = reason;
          this._promise._attachExtraTrace(reason);
          this._promise._pushContext();
          result = tryCatch(this._generator["throw"]).call(this._generator,
                                                           reason);
          this._promise._popContext();
      } else {
          this._promise._pushContext();
          result = tryCatch(this._generator["return"]).call(this._generator,
                                                            undefined);
          this._promise._popContext();
      }
      this._cancellationPhase = true;
      this._yieldedPromise = null;
      this._continue(result);
  };

  PromiseSpawn.prototype._promiseFulfilled = function(value) {
      this._yieldedPromise = null;
      this._promise._pushContext();
      var result = tryCatch(this._generator.next).call(this._generator, value);
      this._promise._popContext();
      this._continue(result);
  };

  PromiseSpawn.prototype._promiseRejected = function(reason) {
      this._yieldedPromise = null;
      this._promise._attachExtraTrace(reason);
      this._promise._pushContext();
      var result = tryCatch(this._generator["throw"])
          .call(this._generator, reason);
      this._promise._popContext();
      this._continue(result);
  };

  PromiseSpawn.prototype._resultCancelled = function() {
      if (this._yieldedPromise instanceof Promise) {
          var promise = this._yieldedPromise;
          this._yieldedPromise = null;
          promise.cancel();
      }
  };

  PromiseSpawn.prototype.promise = function () {
      return this._promise;
  };

  PromiseSpawn.prototype._run = function () {
      this._generator = this._generatorFunction.call(this._receiver);
      this._receiver =
          this._generatorFunction = undefined;
      this._promiseFulfilled(undefined);
  };

  PromiseSpawn.prototype._continue = function (result) {
      var promise = this._promise;
      if (result === errorObj) {
          this._cleanup();
          if (this._cancellationPhase) {
              return promise.cancel();
          } else {
              return promise._rejectCallback(result.e, false);
          }
      }

      var value = result.value;
      if (result.done === true) {
          this._cleanup();
          if (this._cancellationPhase) {
              return promise.cancel();
          } else {
              return promise._resolveCallback(value);
          }
      } else {
          var maybePromise = tryConvertToPromise(value, this._promise);
          if (!(maybePromise instanceof Promise)) {
              maybePromise =
                  promiseFromYieldHandler(maybePromise,
                                          this._yieldHandlers,
                                          this._promise);
              if (maybePromise === null) {
                  this._promiseRejected(
                      new TypeError(
                          "A value %s was yielded that could not be treated as a promise\u000a\u000a    See http://goo.gl/MqrFmX\u000a\u000a".replace("%s", String(value)) +
                          "From coroutine:\u000a" +
                          this._stack.split("\n").slice(1, -7).join("\n")
                      )
                  );
                  return;
              }
          }
          maybePromise = maybePromise._target();
          var bitField = maybePromise._bitField;
          if (((bitField & 50397184) === 0)) {
              this._yieldedPromise = maybePromise;
              maybePromise._proxy(this, null);
          } else if (((bitField & 33554432) !== 0)) {
              Promise._async.invoke(
                  this._promiseFulfilled, this, maybePromise._value()
              );
          } else if (((bitField & 16777216) !== 0)) {
              Promise._async.invoke(
                  this._promiseRejected, this, maybePromise._reason()
              );
          } else {
              this._promiseCancelled();
          }
      }
  };

  Promise.coroutine = function (generatorFunction, options) {
      if (typeof generatorFunction !== "function") {
          throw new TypeError("generatorFunction must be a function\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
      }
      var yieldHandler = Object(options).yieldHandler;
      var PromiseSpawn$ = PromiseSpawn;
      var stack = new Error().stack;
      return function () {
          var generator = generatorFunction.apply(this, arguments);
          var spawn = new PromiseSpawn$(undefined, undefined, yieldHandler,
                                        stack);
          var ret = spawn.promise();
          spawn._generator = generator;
          spawn._promiseFulfilled(undefined);
          return ret;
      };
  };

  Promise.coroutine.addYieldHandler = function(fn) {
      if (typeof fn !== "function") {
          throw new TypeError("expecting a function but got " + util$$1.classString(fn));
      }
      yieldHandlers.push(fn);
  };

  Promise.spawn = function (generatorFunction) {
      debug.deprecated("Promise.spawn()", "Promise.coroutine()");
      if (typeof generatorFunction !== "function") {
          return apiRejection("generatorFunction must be a function\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
      }
      var spawn = new PromiseSpawn(generatorFunction, this);
      var ret = spawn.promise();
      spawn._run(Promise.spawn);
      return ret;
  };
  };

  var nodeify = function(Promise) {
  var util$$1 = util;
  var async = Promise._async;
  var tryCatch = util$$1.tryCatch;
  var errorObj = util$$1.errorObj;

  function spreadAdapter(val, nodeback) {
      var promise = this;
      if (!util$$1.isArray(val)) return successAdapter.call(promise, val, nodeback);
      var ret =
          tryCatch(nodeback).apply(promise._boundValue(), [null].concat(val));
      if (ret === errorObj) {
          async.throwLater(ret.e);
      }
  }

  function successAdapter(val, nodeback) {
      var promise = this;
      var receiver = promise._boundValue();
      var ret = val === undefined
          ? tryCatch(nodeback).call(receiver, null)
          : tryCatch(nodeback).call(receiver, null, val);
      if (ret === errorObj) {
          async.throwLater(ret.e);
      }
  }
  function errorAdapter(reason, nodeback) {
      var promise = this;
      if (!reason) {
          var newReason = new Error(reason + "");
          newReason.cause = reason;
          reason = newReason;
      }
      var ret = tryCatch(nodeback).call(promise._boundValue(), reason);
      if (ret === errorObj) {
          async.throwLater(ret.e);
      }
  }

  Promise.prototype.asCallback = Promise.prototype.nodeify = function (nodeback,
                                                                       options) {
      if (typeof nodeback == "function") {
          var adapter = successAdapter;
          if (options !== undefined && Object(options).spread) {
              adapter = spreadAdapter;
          }
          this._then(
              adapter,
              errorAdapter,
              undefined,
              this,
              nodeback
          );
      }
      return this;
  };
  };

  var promisify = function(Promise, INTERNAL) {
  var THIS = {};
  var util$$1 = util;
  var nodebackForPromise = nodeback;
  var withAppended = util$$1.withAppended;
  var maybeWrapAsError = util$$1.maybeWrapAsError;
  var canEvaluate = util$$1.canEvaluate;
  var TypeError = errors.TypeError;
  var defaultSuffix = "Async";
  var defaultPromisified = {__isPromisified__: true};
  var noCopyProps = [
      "arity",    "length",
      "name",
      "arguments",
      "caller",
      "callee",
      "prototype",
      "__isPromisified__"
  ];
  var noCopyPropsPattern = new RegExp("^(?:" + noCopyProps.join("|") + ")$");

  var defaultFilter = function(name) {
      return util$$1.isIdentifier(name) &&
          name.charAt(0) !== "_" &&
          name !== "constructor";
  };

  function propsFilter(key) {
      return !noCopyPropsPattern.test(key);
  }

  function isPromisified(fn) {
      try {
          return fn.__isPromisified__ === true;
      }
      catch (e) {
          return false;
      }
  }

  function hasPromisified(obj, key, suffix) {
      var val = util$$1.getDataPropertyOrDefault(obj, key + suffix,
                                              defaultPromisified);
      return val ? isPromisified(val) : false;
  }
  function checkValid(ret, suffix, suffixRegexp) {
      for (var i = 0; i < ret.length; i += 2) {
          var key = ret[i];
          if (suffixRegexp.test(key)) {
              var keyWithoutAsyncSuffix = key.replace(suffixRegexp, "");
              for (var j = 0; j < ret.length; j += 2) {
                  if (ret[j] === keyWithoutAsyncSuffix) {
                      throw new TypeError("Cannot promisify an API that has normal methods with '%s'-suffix\u000a\u000a    See http://goo.gl/MqrFmX\u000a"
                          .replace("%s", suffix));
                  }
              }
          }
      }
  }

  function promisifiableMethods(obj, suffix, suffixRegexp, filter) {
      var keys = util$$1.inheritedDataKeys(obj);
      var ret = [];
      for (var i = 0; i < keys.length; ++i) {
          var key = keys[i];
          var value = obj[key];
          var passesDefaultFilter = filter === defaultFilter
              ? true : defaultFilter(key, value, obj);
          if (typeof value === "function" &&
              !isPromisified(value) &&
              !hasPromisified(obj, key, suffix) &&
              filter(key, value, obj, passesDefaultFilter)) {
              ret.push(key, value);
          }
      }
      checkValid(ret, suffix, suffixRegexp);
      return ret;
  }

  var escapeIdentRegex = function(str) {
      return str.replace(/([$])/, "\\$");
  };

  var makeNodePromisifiedEval;
  {
  var switchCaseArgumentOrder = function(likelyArgumentCount) {
      var ret = [likelyArgumentCount];
      var min = Math.max(0, likelyArgumentCount - 1 - 3);
      for(var i = likelyArgumentCount - 1; i >= min; --i) {
          ret.push(i);
      }
      for(var i = likelyArgumentCount + 1; i <= 3; ++i) {
          ret.push(i);
      }
      return ret;
  };

  var argumentSequence = function(argumentCount) {
      return util$$1.filledRange(argumentCount, "_arg", "");
  };

  var parameterDeclaration = function(parameterCount) {
      return util$$1.filledRange(
          Math.max(parameterCount, 3), "_arg", "");
  };

  var parameterCount = function(fn) {
      if (typeof fn.length === "number") {
          return Math.max(Math.min(fn.length, 1023 + 1), 0);
      }
      return 0;
  };

  makeNodePromisifiedEval =
  function(callback, receiver, originalName, fn, _, multiArgs) {
      var newParameterCount = Math.max(0, parameterCount(fn) - 1);
      var argumentOrder = switchCaseArgumentOrder(newParameterCount);
      var shouldProxyThis = typeof callback === "string" || receiver === THIS;

      function generateCallForArgumentCount(count) {
          var args = argumentSequence(count).join(", ");
          var comma = count > 0 ? ", " : "";
          var ret;
          if (shouldProxyThis) {
              ret = "ret = callback.call(this, {{args}}, nodeback); break;\n";
          } else {
              ret = receiver === undefined
                  ? "ret = callback({{args}}, nodeback); break;\n"
                  : "ret = callback.call(receiver, {{args}}, nodeback); break;\n";
          }
          return ret.replace("{{args}}", args).replace(", ", comma);
      }

      function generateArgumentSwitchCase() {
          var ret = "";
          for (var i = 0; i < argumentOrder.length; ++i) {
              ret += "case " + argumentOrder[i] +":" +
                  generateCallForArgumentCount(argumentOrder[i]);
          }

          ret += "                                                             \n\
        default:                                                             \n\
            var args = new Array(len + 1);                                   \n\
            var i = 0;                                                       \n\
            for (var i = 0; i < len; ++i) {                                  \n\
               args[i] = arguments[i];                                       \n\
            }                                                                \n\
            args[i] = nodeback;                                              \n\
            [CodeForCall]                                                    \n\
            break;                                                           \n\
        ".replace("[CodeForCall]", (shouldProxyThis
                                  ? "ret = callback.apply(this, args);\n"
                                  : "ret = callback.apply(receiver, args);\n"));
          return ret;
      }

      var getFunctionCode = typeof callback === "string"
                                  ? ("this != null ? this['"+callback+"'] : fn")
                                  : "fn";
      var body = "'use strict';                                                \n\
        var ret = function (Parameters) {                                    \n\
            'use strict';                                                    \n\
            var len = arguments.length;                                      \n\
            var promise = new Promise(INTERNAL);                             \n\
            promise._captureStackTrace();                                    \n\
            var nodeback = nodebackForPromise(promise, " + multiArgs + ");   \n\
            var ret;                                                         \n\
            var callback = tryCatch([GetFunctionCode]);                      \n\
            switch(len) {                                                    \n\
                [CodeForSwitchCase]                                          \n\
            }                                                                \n\
            if (ret === errorObj) {                                          \n\
                promise._rejectCallback(maybeWrapAsError(ret.e), true, true);\n\
            }                                                                \n\
            if (!promise._isFateSealed()) promise._setAsyncGuaranteed();     \n\
            return promise;                                                  \n\
        };                                                                   \n\
        notEnumerableProp(ret, '__isPromisified__', true);                   \n\
        return ret;                                                          \n\
    ".replace("[CodeForSwitchCase]", generateArgumentSwitchCase())
          .replace("[GetFunctionCode]", getFunctionCode);
      body = body.replace("Parameters", parameterDeclaration(newParameterCount));
      return new Function("Promise",
                          "fn",
                          "receiver",
                          "withAppended",
                          "maybeWrapAsError",
                          "nodebackForPromise",
                          "tryCatch",
                          "errorObj",
                          "notEnumerableProp",
                          "INTERNAL",
                          body)(
                      Promise,
                      fn,
                      receiver,
                      withAppended,
                      maybeWrapAsError,
                      nodebackForPromise,
                      util$$1.tryCatch,
                      util$$1.errorObj,
                      util$$1.notEnumerableProp,
                      INTERNAL);
  };
  }

  function makeNodePromisifiedClosure(callback, receiver, _, fn, __, multiArgs) {
      var defaultThis = (function() {return this;})();
      var method = callback;
      if (typeof method === "string") {
          callback = fn;
      }
      function promisified() {
          var _receiver = receiver;
          if (receiver === THIS) _receiver = this;
          var promise = new Promise(INTERNAL);
          promise._captureStackTrace();
          var cb = typeof method === "string" && this !== defaultThis
              ? this[method] : callback;
          var fn = nodebackForPromise(promise, multiArgs);
          try {
              cb.apply(_receiver, withAppended(arguments, fn));
          } catch(e) {
              promise._rejectCallback(maybeWrapAsError(e), true, true);
          }
          if (!promise._isFateSealed()) promise._setAsyncGuaranteed();
          return promise;
      }
      util$$1.notEnumerableProp(promisified, "__isPromisified__", true);
      return promisified;
  }

  var makeNodePromisified = canEvaluate
      ? makeNodePromisifiedEval
      : makeNodePromisifiedClosure;

  function promisifyAll(obj, suffix, filter, promisifier, multiArgs) {
      var suffixRegexp = new RegExp(escapeIdentRegex(suffix) + "$");
      var methods =
          promisifiableMethods(obj, suffix, suffixRegexp, filter);

      for (var i = 0, len = methods.length; i < len; i+= 2) {
          var key = methods[i];
          var fn = methods[i+1];
          var promisifiedKey = key + suffix;
          if (promisifier === makeNodePromisified) {
              obj[promisifiedKey] =
                  makeNodePromisified(key, THIS, key, fn, suffix, multiArgs);
          } else {
              var promisified = promisifier(fn, function() {
                  return makeNodePromisified(key, THIS, key,
                                             fn, suffix, multiArgs);
              });
              util$$1.notEnumerableProp(promisified, "__isPromisified__", true);
              obj[promisifiedKey] = promisified;
          }
      }
      util$$1.toFastProperties(obj);
      return obj;
  }

  function promisify(callback, receiver, multiArgs) {
      return makeNodePromisified(callback, receiver, undefined,
                                  callback, null, multiArgs);
  }

  Promise.promisify = function (fn, options) {
      if (typeof fn !== "function") {
          throw new TypeError("expecting a function but got " + util$$1.classString(fn));
      }
      if (isPromisified(fn)) {
          return fn;
      }
      options = Object(options);
      var receiver = options.context === undefined ? THIS : options.context;
      var multiArgs = !!options.multiArgs;
      var ret = promisify(fn, receiver, multiArgs);
      util$$1.copyDescriptors(fn, ret, propsFilter);
      return ret;
  };

  Promise.promisifyAll = function (target, options) {
      if (typeof target !== "function" && typeof target !== "object") {
          throw new TypeError("the target of promisifyAll must be an object or a function\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
      }
      options = Object(options);
      var multiArgs = !!options.multiArgs;
      var suffix = options.suffix;
      if (typeof suffix !== "string") suffix = defaultSuffix;
      var filter = options.filter;
      if (typeof filter !== "function") filter = defaultFilter;
      var promisifier = options.promisifier;
      if (typeof promisifier !== "function") promisifier = makeNodePromisified;

      if (!util$$1.isIdentifier(suffix)) {
          throw new RangeError("suffix must be a valid identifier\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
      }

      var keys = util$$1.inheritedDataKeys(target);
      for (var i = 0; i < keys.length; ++i) {
          var value = target[keys[i]];
          if (keys[i] !== "constructor" &&
              util$$1.isClass(value)) {
              promisifyAll(value.prototype, suffix, filter, promisifier,
                  multiArgs);
              promisifyAll(value, suffix, filter, promisifier, multiArgs);
          }
      }

      return promisifyAll(target, suffix, filter, promisifier, multiArgs);
  };
  };

  var props = function(
      Promise, PromiseArray, tryConvertToPromise, apiRejection) {
  var util$$1 = util;
  var isObject = util$$1.isObject;
  var es5$$1 = es5;
  var Es6Map;
  if (typeof Map === "function") Es6Map = Map;

  var mapToEntries = (function() {
      var index = 0;
      var size = 0;

      function extractEntry(value, key) {
          this[index] = value;
          this[index + size] = key;
          index++;
      }

      return function mapToEntries(map) {
          size = map.size;
          index = 0;
          var ret = new Array(map.size * 2);
          map.forEach(extractEntry, ret);
          return ret;
      };
  })();

  var entriesToMap = function(entries) {
      var ret = new Es6Map();
      var length = entries.length / 2 | 0;
      for (var i = 0; i < length; ++i) {
          var key = entries[length + i];
          var value = entries[i];
          ret.set(key, value);
      }
      return ret;
  };

  function PropertiesPromiseArray(obj) {
      var isMap = false;
      var entries;
      if (Es6Map !== undefined && obj instanceof Es6Map) {
          entries = mapToEntries(obj);
          isMap = true;
      } else {
          var keys = es5$$1.keys(obj);
          var len = keys.length;
          entries = new Array(len * 2);
          for (var i = 0; i < len; ++i) {
              var key = keys[i];
              entries[i] = obj[key];
              entries[i + len] = key;
          }
      }
      this.constructor$(entries);
      this._isMap = isMap;
      this._init$(undefined, isMap ? -6 : -3);
  }
  util$$1.inherits(PropertiesPromiseArray, PromiseArray);

  PropertiesPromiseArray.prototype._init = function () {};

  PropertiesPromiseArray.prototype._promiseFulfilled = function (value, index) {
      this._values[index] = value;
      var totalResolved = ++this._totalResolved;
      if (totalResolved >= this._length) {
          var val;
          if (this._isMap) {
              val = entriesToMap(this._values);
          } else {
              val = {};
              var keyOffset = this.length();
              for (var i = 0, len = this.length(); i < len; ++i) {
                  val[this._values[i + keyOffset]] = this._values[i];
              }
          }
          this._resolve(val);
          return true;
      }
      return false;
  };

  PropertiesPromiseArray.prototype.shouldCopyValues = function () {
      return false;
  };

  PropertiesPromiseArray.prototype.getActualLength = function (len) {
      return len >> 1;
  };

  function props(promises) {
      var ret;
      var castValue = tryConvertToPromise(promises);

      if (!isObject(castValue)) {
          return apiRejection("cannot await properties of a non-object\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
      } else if (castValue instanceof Promise) {
          ret = castValue._then(
              Promise.props, undefined, undefined, undefined, undefined);
      } else {
          ret = new PropertiesPromiseArray(castValue).promise();
      }

      if (castValue instanceof Promise) {
          ret._propagateFrom(castValue, 2);
      }
      return ret;
  }

  Promise.prototype.props = function () {
      return props(this);
  };

  Promise.props = function (promises) {
      return props(promises);
  };
  };

  var race = function(
      Promise, INTERNAL, tryConvertToPromise, apiRejection) {
  var util$$1 = util;

  var raceLater = function (promise) {
      return promise.then(function(array) {
          return race(array, promise);
      });
  };

  function race(promises, parent) {
      var maybePromise = tryConvertToPromise(promises);

      if (maybePromise instanceof Promise) {
          return raceLater(maybePromise);
      } else {
          promises = util$$1.asArray(promises);
          if (promises === null)
              return apiRejection("expecting an array or an iterable object but got " + util$$1.classString(promises));
      }

      var ret = new Promise(INTERNAL);
      if (parent !== undefined) {
          ret._propagateFrom(parent, 3);
      }
      var fulfill = ret._fulfill;
      var reject = ret._reject;
      for (var i = 0, len = promises.length; i < len; ++i) {
          var val = promises[i];

          if (val === undefined && !(i in promises)) {
              continue;
          }

          Promise.cast(val)._then(fulfill, reject, undefined, ret, null);
      }
      return ret;
  }

  Promise.race = function (promises) {
      return race(promises, undefined);
  };

  Promise.prototype.race = function () {
      return race(this, undefined);
  };

  };

  var reduce = function(Promise,
                            PromiseArray,
                            apiRejection,
                            tryConvertToPromise,
                            INTERNAL,
                            debug) {
  var getDomain = Promise._getDomain;
  var util$$1 = util;
  var tryCatch = util$$1.tryCatch;

  function ReductionPromiseArray(promises, fn, initialValue, _each) {
      this.constructor$(promises);
      var domain = getDomain();
      this._fn = domain === null ? fn : util$$1.domainBind(domain, fn);
      if (initialValue !== undefined) {
          initialValue = Promise.resolve(initialValue);
          initialValue._attachCancellationCallback(this);
      }
      this._initialValue = initialValue;
      this._currentCancellable = null;
      if(_each === INTERNAL) {
          this._eachValues = Array(this._length);
      } else if (_each === 0) {
          this._eachValues = null;
      } else {
          this._eachValues = undefined;
      }
      this._promise._captureStackTrace();
      this._init$(undefined, -5);
  }
  util$$1.inherits(ReductionPromiseArray, PromiseArray);

  ReductionPromiseArray.prototype._gotAccum = function(accum) {
      if (this._eachValues !== undefined && 
          this._eachValues !== null && 
          accum !== INTERNAL) {
          this._eachValues.push(accum);
      }
  };

  ReductionPromiseArray.prototype._eachComplete = function(value) {
      if (this._eachValues !== null) {
          this._eachValues.push(value);
      }
      return this._eachValues;
  };

  ReductionPromiseArray.prototype._init = function() {};

  ReductionPromiseArray.prototype._resolveEmptyArray = function() {
      this._resolve(this._eachValues !== undefined ? this._eachValues
                                                   : this._initialValue);
  };

  ReductionPromiseArray.prototype.shouldCopyValues = function () {
      return false;
  };

  ReductionPromiseArray.prototype._resolve = function(value) {
      this._promise._resolveCallback(value);
      this._values = null;
  };

  ReductionPromiseArray.prototype._resultCancelled = function(sender) {
      if (sender === this._initialValue) return this._cancel();
      if (this._isResolved()) return;
      this._resultCancelled$();
      if (this._currentCancellable instanceof Promise) {
          this._currentCancellable.cancel();
      }
      if (this._initialValue instanceof Promise) {
          this._initialValue.cancel();
      }
  };

  ReductionPromiseArray.prototype._iterate = function (values) {
      this._values = values;
      var value;
      var i;
      var length = values.length;
      if (this._initialValue !== undefined) {
          value = this._initialValue;
          i = 0;
      } else {
          value = Promise.resolve(values[0]);
          i = 1;
      }

      this._currentCancellable = value;

      if (!value.isRejected()) {
          for (; i < length; ++i) {
              var ctx = {
                  accum: null,
                  value: values[i],
                  index: i,
                  length: length,
                  array: this
              };
              value = value._then(gotAccum, undefined, undefined, ctx, undefined);
          }
      }

      if (this._eachValues !== undefined) {
          value = value
              ._then(this._eachComplete, undefined, undefined, this, undefined);
      }
      value._then(completed, completed, undefined, value, this);
  };

  Promise.prototype.reduce = function (fn, initialValue) {
      return reduce(this, fn, initialValue, null);
  };

  Promise.reduce = function (promises, fn, initialValue, _each) {
      return reduce(promises, fn, initialValue, _each);
  };

  function completed(valueOrReason, array) {
      if (this.isFulfilled()) {
          array._resolve(valueOrReason);
      } else {
          array._reject(valueOrReason);
      }
  }

  function reduce(promises, fn, initialValue, _each) {
      if (typeof fn !== "function") {
          return apiRejection("expecting a function but got " + util$$1.classString(fn));
      }
      var array = new ReductionPromiseArray(promises, fn, initialValue, _each);
      return array.promise();
  }

  function gotAccum(accum) {
      this.accum = accum;
      this.array._gotAccum(accum);
      var value = tryConvertToPromise(this.value, this.array._promise);
      if (value instanceof Promise) {
          this.array._currentCancellable = value;
          return value._then(gotValue, undefined, undefined, this, undefined);
      } else {
          return gotValue.call(this, value);
      }
  }

  function gotValue(value) {
      var array = this.array;
      var promise = array._promise;
      var fn = tryCatch(array._fn);
      promise._pushContext();
      var ret;
      if (array._eachValues !== undefined) {
          ret = fn.call(promise._boundValue(), value, this.index, this.length);
      } else {
          ret = fn.call(promise._boundValue(),
                                this.accum, value, this.index, this.length);
      }
      if (ret instanceof Promise) {
          array._currentCancellable = ret;
      }
      var promiseCreated = promise._popContext();
      debug.checkForgottenReturns(
          ret,
          promiseCreated,
          array._eachValues !== undefined ? "Promise.each" : "Promise.reduce",
          promise
      );
      return ret;
  }
  };

  var settle =
      function(Promise, PromiseArray, debug) {
  var PromiseInspection = Promise.PromiseInspection;
  var util$$1 = util;

  function SettledPromiseArray(values) {
      this.constructor$(values);
  }
  util$$1.inherits(SettledPromiseArray, PromiseArray);

  SettledPromiseArray.prototype._promiseResolved = function (index, inspection) {
      this._values[index] = inspection;
      var totalResolved = ++this._totalResolved;
      if (totalResolved >= this._length) {
          this._resolve(this._values);
          return true;
      }
      return false;
  };

  SettledPromiseArray.prototype._promiseFulfilled = function (value, index) {
      var ret = new PromiseInspection();
      ret._bitField = 33554432;
      ret._settledValueField = value;
      return this._promiseResolved(index, ret);
  };
  SettledPromiseArray.prototype._promiseRejected = function (reason, index) {
      var ret = new PromiseInspection();
      ret._bitField = 16777216;
      ret._settledValueField = reason;
      return this._promiseResolved(index, ret);
  };

  Promise.settle = function (promises) {
      debug.deprecated(".settle()", ".reflect()");
      return new SettledPromiseArray(promises).promise();
  };

  Promise.prototype.settle = function () {
      return Promise.settle(this);
  };
  };

  var some =
  function(Promise, PromiseArray, apiRejection) {
  var util$$1 = util;
  var RangeError = errors.RangeError;
  var AggregateError = errors.AggregateError;
  var isArray = util$$1.isArray;
  var CANCELLATION = {};


  function SomePromiseArray(values) {
      this.constructor$(values);
      this._howMany = 0;
      this._unwrap = false;
      this._initialized = false;
  }
  util$$1.inherits(SomePromiseArray, PromiseArray);

  SomePromiseArray.prototype._init = function () {
      if (!this._initialized) {
          return;
      }
      if (this._howMany === 0) {
          this._resolve([]);
          return;
      }
      this._init$(undefined, -5);
      var isArrayResolved = isArray(this._values);
      if (!this._isResolved() &&
          isArrayResolved &&
          this._howMany > this._canPossiblyFulfill()) {
          this._reject(this._getRangeError(this.length()));
      }
  };

  SomePromiseArray.prototype.init = function () {
      this._initialized = true;
      this._init();
  };

  SomePromiseArray.prototype.setUnwrap = function () {
      this._unwrap = true;
  };

  SomePromiseArray.prototype.howMany = function () {
      return this._howMany;
  };

  SomePromiseArray.prototype.setHowMany = function (count) {
      this._howMany = count;
  };

  SomePromiseArray.prototype._promiseFulfilled = function (value) {
      this._addFulfilled(value);
      if (this._fulfilled() === this.howMany()) {
          this._values.length = this.howMany();
          if (this.howMany() === 1 && this._unwrap) {
              this._resolve(this._values[0]);
          } else {
              this._resolve(this._values);
          }
          return true;
      }
      return false;

  };
  SomePromiseArray.prototype._promiseRejected = function (reason) {
      this._addRejected(reason);
      return this._checkOutcome();
  };

  SomePromiseArray.prototype._promiseCancelled = function () {
      if (this._values instanceof Promise || this._values == null) {
          return this._cancel();
      }
      this._addRejected(CANCELLATION);
      return this._checkOutcome();
  };

  SomePromiseArray.prototype._checkOutcome = function() {
      if (this.howMany() > this._canPossiblyFulfill()) {
          var e = new AggregateError();
          for (var i = this.length(); i < this._values.length; ++i) {
              if (this._values[i] !== CANCELLATION) {
                  e.push(this._values[i]);
              }
          }
          if (e.length > 0) {
              this._reject(e);
          } else {
              this._cancel();
          }
          return true;
      }
      return false;
  };

  SomePromiseArray.prototype._fulfilled = function () {
      return this._totalResolved;
  };

  SomePromiseArray.prototype._rejected = function () {
      return this._values.length - this.length();
  };

  SomePromiseArray.prototype._addRejected = function (reason) {
      this._values.push(reason);
  };

  SomePromiseArray.prototype._addFulfilled = function (value) {
      this._values[this._totalResolved++] = value;
  };

  SomePromiseArray.prototype._canPossiblyFulfill = function () {
      return this.length() - this._rejected();
  };

  SomePromiseArray.prototype._getRangeError = function (count) {
      var message = "Input array must contain at least " +
              this._howMany + " items but contains only " + count + " items";
      return new RangeError(message);
  };

  SomePromiseArray.prototype._resolveEmptyArray = function () {
      this._reject(this._getRangeError(0));
  };

  function some(promises, howMany) {
      if ((howMany | 0) !== howMany || howMany < 0) {
          return apiRejection("expecting a positive integer\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
      }
      var ret = new SomePromiseArray(promises);
      var promise = ret.promise();
      ret.setHowMany(howMany);
      ret.init();
      return promise;
  }

  Promise.some = function (promises, howMany) {
      return some(promises, howMany);
  };

  Promise.prototype.some = function (howMany) {
      return some(this, howMany);
  };

  Promise._SomePromiseArray = SomePromiseArray;
  };

  var filter = function(Promise, INTERNAL) {
  var PromiseMap = Promise.map;

  Promise.prototype.filter = function (fn, options) {
      return PromiseMap(this, fn, options, INTERNAL);
  };

  Promise.filter = function (promises, fn, options) {
      return PromiseMap(promises, fn, options, INTERNAL);
  };
  };

  var each = function(Promise, INTERNAL) {
  var PromiseReduce = Promise.reduce;
  var PromiseAll = Promise.all;

  function promiseAllThis() {
      return PromiseAll(this);
  }

  function PromiseMapSeries(promises, fn) {
      return PromiseReduce(promises, fn, INTERNAL, INTERNAL);
  }

  Promise.prototype.each = function (fn) {
      return PromiseReduce(this, fn, INTERNAL, 0)
                ._then(promiseAllThis, undefined, undefined, this, undefined);
  };

  Promise.prototype.mapSeries = function (fn) {
      return PromiseReduce(this, fn, INTERNAL, INTERNAL);
  };

  Promise.each = function (promises, fn) {
      return PromiseReduce(promises, fn, INTERNAL, 0)
                ._then(promiseAllThis, undefined, undefined, promises, undefined);
  };

  Promise.mapSeries = PromiseMapSeries;
  };

  var any = function(Promise) {
  var SomePromiseArray = Promise._SomePromiseArray;
  function any(promises) {
      var ret = new SomePromiseArray(promises);
      var promise = ret.promise();
      ret.setHowMany(1);
      ret.setUnwrap();
      ret.init();
      return promise;
  }

  Promise.any = function (promises) {
      return any(promises);
  };

  Promise.prototype.any = function () {
      return any(this);
  };

  };

  var promise = createCommonjsModule(function (module) {
  module.exports = function() {
  var makeSelfResolutionError = function () {
      return new TypeError("circular promise resolution chain\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
  };
  var reflectHandler = function() {
      return new Promise.PromiseInspection(this._target());
  };
  var apiRejection = function(msg) {
      return Promise.reject(new TypeError(msg));
  };
  function Proxyable() {}
  var UNDEFINED_BINDING = {};
  var util$$1 = util;

  var getDomain;
  if (util$$1.isNode) {
      getDomain = function() {
          var ret = process.domain;
          if (ret === undefined) ret = null;
          return ret;
      };
  } else {
      getDomain = function() {
          return null;
      };
  }
  util$$1.notEnumerableProp(Promise, "_getDomain", getDomain);

  var es5$$1 = es5;
  var Async = async;
  var async$$1 = new Async();
  es5$$1.defineProperty(Promise, "_async", {value: async$$1});
  var errors$$1 = errors;
  var TypeError = Promise.TypeError = errors$$1.TypeError;
  Promise.RangeError = errors$$1.RangeError;
  var CancellationError = Promise.CancellationError = errors$$1.CancellationError;
  Promise.TimeoutError = errors$$1.TimeoutError;
  Promise.OperationalError = errors$$1.OperationalError;
  Promise.RejectionError = errors$$1.OperationalError;
  Promise.AggregateError = errors$$1.AggregateError;
  var INTERNAL = function(){};
  var APPLY = {};
  var NEXT_FILTER = {};
  var tryConvertToPromise = thenables(Promise, INTERNAL);
  var PromiseArray =
      promise_array(Promise, INTERNAL,
                                 tryConvertToPromise, apiRejection, Proxyable);
  var Context = context(Promise);
   /*jshint unused:false*/
  var createContext = Context.create;
  var debug = debuggability(Promise, Context);
  var CapturedTrace = debug.CapturedTrace;
  var PassThroughHandlerContext =
      _finally(Promise, tryConvertToPromise, NEXT_FILTER);
  var catchFilter = catch_filter(NEXT_FILTER);
  var nodebackForPromise = nodeback;
  var errorObj = util$$1.errorObj;
  var tryCatch = util$$1.tryCatch;
  function check(self, executor) {
      if (self == null || self.constructor !== Promise) {
          throw new TypeError("the promise constructor cannot be invoked directly\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
      }
      if (typeof executor !== "function") {
          throw new TypeError("expecting a function but got " + util$$1.classString(executor));
      }

  }

  function Promise(executor) {
      if (executor !== INTERNAL) {
          check(this, executor);
      }
      this._bitField = 0;
      this._fulfillmentHandler0 = undefined;
      this._rejectionHandler0 = undefined;
      this._promise0 = undefined;
      this._receiver0 = undefined;
      this._resolveFromExecutor(executor);
      this._promiseCreated();
      this._fireEvent("promiseCreated", this);
  }

  Promise.prototype.toString = function () {
      return "[object Promise]";
  };

  Promise.prototype.caught = Promise.prototype["catch"] = function (fn) {
      var len = arguments.length;
      if (len > 1) {
          var catchInstances = new Array(len - 1),
              j = 0, i;
          for (i = 0; i < len - 1; ++i) {
              var item = arguments[i];
              if (util$$1.isObject(item)) {
                  catchInstances[j++] = item;
              } else {
                  return apiRejection("Catch statement predicate: " +
                      "expecting an object but got " + util$$1.classString(item));
              }
          }
          catchInstances.length = j;
          fn = arguments[i];
          return this.then(undefined, catchFilter(catchInstances, fn, this));
      }
      return this.then(undefined, fn);
  };

  Promise.prototype.reflect = function () {
      return this._then(reflectHandler,
          reflectHandler, undefined, this, undefined);
  };

  Promise.prototype.then = function (didFulfill, didReject) {
      if (debug.warnings() && arguments.length > 0 &&
          typeof didFulfill !== "function" &&
          typeof didReject !== "function") {
          var msg = ".then() only accepts functions but was passed: " +
                  util$$1.classString(didFulfill);
          if (arguments.length > 1) {
              msg += ", " + util$$1.classString(didReject);
          }
          this._warn(msg);
      }
      return this._then(didFulfill, didReject, undefined, undefined, undefined);
  };

  Promise.prototype.done = function (didFulfill, didReject) {
      var promise =
          this._then(didFulfill, didReject, undefined, undefined, undefined);
      promise._setIsFinal();
  };

  Promise.prototype.spread = function (fn) {
      if (typeof fn !== "function") {
          return apiRejection("expecting a function but got " + util$$1.classString(fn));
      }
      return this.all()._then(fn, undefined, undefined, APPLY, undefined);
  };

  Promise.prototype.toJSON = function () {
      var ret = {
          isFulfilled: false,
          isRejected: false,
          fulfillmentValue: undefined,
          rejectionReason: undefined
      };
      if (this.isFulfilled()) {
          ret.fulfillmentValue = this.value();
          ret.isFulfilled = true;
      } else if (this.isRejected()) {
          ret.rejectionReason = this.reason();
          ret.isRejected = true;
      }
      return ret;
  };

  Promise.prototype.all = function () {
      if (arguments.length > 0) {
          this._warn(".all() was passed arguments but it does not take any");
      }
      return new PromiseArray(this).promise();
  };

  Promise.prototype.error = function (fn) {
      return this.caught(util$$1.originatesFromRejection, fn);
  };

  Promise.getNewLibraryCopy = module.exports;

  Promise.is = function (val) {
      return val instanceof Promise;
  };

  Promise.fromNode = Promise.fromCallback = function(fn) {
      var ret = new Promise(INTERNAL);
      ret._captureStackTrace();
      var multiArgs = arguments.length > 1 ? !!Object(arguments[1]).multiArgs
                                           : false;
      var result = tryCatch(fn)(nodebackForPromise(ret, multiArgs));
      if (result === errorObj) {
          ret._rejectCallback(result.e, true);
      }
      if (!ret._isFateSealed()) ret._setAsyncGuaranteed();
      return ret;
  };

  Promise.all = function (promises) {
      return new PromiseArray(promises).promise();
  };

  Promise.cast = function (obj) {
      var ret = tryConvertToPromise(obj);
      if (!(ret instanceof Promise)) {
          ret = new Promise(INTERNAL);
          ret._captureStackTrace();
          ret._setFulfilled();
          ret._rejectionHandler0 = obj;
      }
      return ret;
  };

  Promise.resolve = Promise.fulfilled = Promise.cast;

  Promise.reject = Promise.rejected = function (reason) {
      var ret = new Promise(INTERNAL);
      ret._captureStackTrace();
      ret._rejectCallback(reason, true);
      return ret;
  };

  Promise.setScheduler = function(fn) {
      if (typeof fn !== "function") {
          throw new TypeError("expecting a function but got " + util$$1.classString(fn));
      }
      return async$$1.setScheduler(fn);
  };

  Promise.prototype._then = function (
      didFulfill,
      didReject,
      _,    receiver,
      internalData
  ) {
      var haveInternalData = internalData !== undefined;
      var promise = haveInternalData ? internalData : new Promise(INTERNAL);
      var target = this._target();
      var bitField = target._bitField;

      if (!haveInternalData) {
          promise._propagateFrom(this, 3);
          promise._captureStackTrace();
          if (receiver === undefined &&
              ((this._bitField & 2097152) !== 0)) {
              if (!((bitField & 50397184) === 0)) {
                  receiver = this._boundValue();
              } else {
                  receiver = target === this ? undefined : this._boundTo;
              }
          }
          this._fireEvent("promiseChained", this, promise);
      }

      var domain = getDomain();
      if (!((bitField & 50397184) === 0)) {
          var handler, value, settler = target._settlePromiseCtx;
          if (((bitField & 33554432) !== 0)) {
              value = target._rejectionHandler0;
              handler = didFulfill;
          } else if (((bitField & 16777216) !== 0)) {
              value = target._fulfillmentHandler0;
              handler = didReject;
              target._unsetRejectionIsUnhandled();
          } else {
              settler = target._settlePromiseLateCancellationObserver;
              value = new CancellationError("late cancellation observer");
              target._attachExtraTrace(value);
              handler = didReject;
          }

          async$$1.invoke(settler, target, {
              handler: domain === null ? handler
                  : (typeof handler === "function" &&
                      util$$1.domainBind(domain, handler)),
              promise: promise,
              receiver: receiver,
              value: value
          });
      } else {
          target._addCallbacks(didFulfill, didReject, promise, receiver, domain);
      }

      return promise;
  };

  Promise.prototype._length = function () {
      return this._bitField & 65535;
  };

  Promise.prototype._isFateSealed = function () {
      return (this._bitField & 117506048) !== 0;
  };

  Promise.prototype._isFollowing = function () {
      return (this._bitField & 67108864) === 67108864;
  };

  Promise.prototype._setLength = function (len) {
      this._bitField = (this._bitField & -65536) |
          (len & 65535);
  };

  Promise.prototype._setFulfilled = function () {
      this._bitField = this._bitField | 33554432;
      this._fireEvent("promiseFulfilled", this);
  };

  Promise.prototype._setRejected = function () {
      this._bitField = this._bitField | 16777216;
      this._fireEvent("promiseRejected", this);
  };

  Promise.prototype._setFollowing = function () {
      this._bitField = this._bitField | 67108864;
      this._fireEvent("promiseResolved", this);
  };

  Promise.prototype._setIsFinal = function () {
      this._bitField = this._bitField | 4194304;
  };

  Promise.prototype._isFinal = function () {
      return (this._bitField & 4194304) > 0;
  };

  Promise.prototype._unsetCancelled = function() {
      this._bitField = this._bitField & (~65536);
  };

  Promise.prototype._setCancelled = function() {
      this._bitField = this._bitField | 65536;
      this._fireEvent("promiseCancelled", this);
  };

  Promise.prototype._setWillBeCancelled = function() {
      this._bitField = this._bitField | 8388608;
  };

  Promise.prototype._setAsyncGuaranteed = function() {
      if (async$$1.hasCustomScheduler()) return;
      this._bitField = this._bitField | 134217728;
  };

  Promise.prototype._receiverAt = function (index) {
      var ret = index === 0 ? this._receiver0 : this[
              index * 4 - 4 + 3];
      if (ret === UNDEFINED_BINDING) {
          return undefined;
      } else if (ret === undefined && this._isBound()) {
          return this._boundValue();
      }
      return ret;
  };

  Promise.prototype._promiseAt = function (index) {
      return this[
              index * 4 - 4 + 2];
  };

  Promise.prototype._fulfillmentHandlerAt = function (index) {
      return this[
              index * 4 - 4 + 0];
  };

  Promise.prototype._rejectionHandlerAt = function (index) {
      return this[
              index * 4 - 4 + 1];
  };

  Promise.prototype._boundValue = function() {};

  Promise.prototype._migrateCallback0 = function (follower) {
      var bitField = follower._bitField;
      var fulfill = follower._fulfillmentHandler0;
      var reject = follower._rejectionHandler0;
      var promise = follower._promise0;
      var receiver = follower._receiverAt(0);
      if (receiver === undefined) receiver = UNDEFINED_BINDING;
      this._addCallbacks(fulfill, reject, promise, receiver, null);
  };

  Promise.prototype._migrateCallbackAt = function (follower, index) {
      var fulfill = follower._fulfillmentHandlerAt(index);
      var reject = follower._rejectionHandlerAt(index);
      var promise = follower._promiseAt(index);
      var receiver = follower._receiverAt(index);
      if (receiver === undefined) receiver = UNDEFINED_BINDING;
      this._addCallbacks(fulfill, reject, promise, receiver, null);
  };

  Promise.prototype._addCallbacks = function (
      fulfill,
      reject,
      promise,
      receiver,
      domain
  ) {
      var index = this._length();

      if (index >= 65535 - 4) {
          index = 0;
          this._setLength(0);
      }

      if (index === 0) {
          this._promise0 = promise;
          this._receiver0 = receiver;
          if (typeof fulfill === "function") {
              this._fulfillmentHandler0 =
                  domain === null ? fulfill : util$$1.domainBind(domain, fulfill);
          }
          if (typeof reject === "function") {
              this._rejectionHandler0 =
                  domain === null ? reject : util$$1.domainBind(domain, reject);
          }
      } else {
          var base = index * 4 - 4;
          this[base + 2] = promise;
          this[base + 3] = receiver;
          if (typeof fulfill === "function") {
              this[base + 0] =
                  domain === null ? fulfill : util$$1.domainBind(domain, fulfill);
          }
          if (typeof reject === "function") {
              this[base + 1] =
                  domain === null ? reject : util$$1.domainBind(domain, reject);
          }
      }
      this._setLength(index + 1);
      return index;
  };

  Promise.prototype._proxy = function (proxyable, arg) {
      this._addCallbacks(undefined, undefined, arg, proxyable, null);
  };

  Promise.prototype._resolveCallback = function(value, shouldBind) {
      if (((this._bitField & 117506048) !== 0)) return;
      if (value === this)
          return this._rejectCallback(makeSelfResolutionError(), false);
      var maybePromise = tryConvertToPromise(value, this);
      if (!(maybePromise instanceof Promise)) return this._fulfill(value);

      if (shouldBind) this._propagateFrom(maybePromise, 2);

      var promise = maybePromise._target();

      if (promise === this) {
          this._reject(makeSelfResolutionError());
          return;
      }

      var bitField = promise._bitField;
      if (((bitField & 50397184) === 0)) {
          var len = this._length();
          if (len > 0) promise._migrateCallback0(this);
          for (var i = 1; i < len; ++i) {
              promise._migrateCallbackAt(this, i);
          }
          this._setFollowing();
          this._setLength(0);
          this._setFollowee(promise);
      } else if (((bitField & 33554432) !== 0)) {
          this._fulfill(promise._value());
      } else if (((bitField & 16777216) !== 0)) {
          this._reject(promise._reason());
      } else {
          var reason = new CancellationError("late cancellation observer");
          promise._attachExtraTrace(reason);
          this._reject(reason);
      }
  };

  Promise.prototype._rejectCallback =
  function(reason, synchronous, ignoreNonErrorWarnings) {
      var trace = util$$1.ensureErrorObject(reason);
      var hasStack = trace === reason;
      if (!hasStack && !ignoreNonErrorWarnings && debug.warnings()) {
          var message = "a promise was rejected with a non-error: " +
              util$$1.classString(reason);
          this._warn(message, true);
      }
      this._attachExtraTrace(trace, synchronous ? hasStack : false);
      this._reject(reason);
  };

  Promise.prototype._resolveFromExecutor = function (executor) {
      if (executor === INTERNAL) return;
      var promise = this;
      this._captureStackTrace();
      this._pushContext();
      var synchronous = true;
      var r = this._execute(executor, function(value) {
          promise._resolveCallback(value);
      }, function (reason) {
          promise._rejectCallback(reason, synchronous);
      });
      synchronous = false;
      this._popContext();

      if (r !== undefined) {
          promise._rejectCallback(r, true);
      }
  };

  Promise.prototype._settlePromiseFromHandler = function (
      handler, receiver, value, promise
  ) {
      var bitField = promise._bitField;
      if (((bitField & 65536) !== 0)) return;
      promise._pushContext();
      var x;
      if (receiver === APPLY) {
          if (!value || typeof value.length !== "number") {
              x = errorObj;
              x.e = new TypeError("cannot .spread() a non-array: " +
                                      util$$1.classString(value));
          } else {
              x = tryCatch(handler).apply(this._boundValue(), value);
          }
      } else {
          x = tryCatch(handler).call(receiver, value);
      }
      var promiseCreated = promise._popContext();
      bitField = promise._bitField;
      if (((bitField & 65536) !== 0)) return;

      if (x === NEXT_FILTER) {
          promise._reject(value);
      } else if (x === errorObj) {
          promise._rejectCallback(x.e, false);
      } else {
          debug.checkForgottenReturns(x, promiseCreated, "",  promise, this);
          promise._resolveCallback(x);
      }
  };

  Promise.prototype._target = function() {
      var ret = this;
      while (ret._isFollowing()) ret = ret._followee();
      return ret;
  };

  Promise.prototype._followee = function() {
      return this._rejectionHandler0;
  };

  Promise.prototype._setFollowee = function(promise) {
      this._rejectionHandler0 = promise;
  };

  Promise.prototype._settlePromise = function(promise, handler, receiver, value) {
      var isPromise = promise instanceof Promise;
      var bitField = this._bitField;
      var asyncGuaranteed = ((bitField & 134217728) !== 0);
      if (((bitField & 65536) !== 0)) {
          if (isPromise) promise._invokeInternalOnCancel();

          if (receiver instanceof PassThroughHandlerContext &&
              receiver.isFinallyHandler()) {
              receiver.cancelPromise = promise;
              if (tryCatch(handler).call(receiver, value) === errorObj) {
                  promise._reject(errorObj.e);
              }
          } else if (handler === reflectHandler) {
              promise._fulfill(reflectHandler.call(receiver));
          } else if (receiver instanceof Proxyable) {
              receiver._promiseCancelled(promise);
          } else if (isPromise || promise instanceof PromiseArray) {
              promise._cancel();
          } else {
              receiver.cancel();
          }
      } else if (typeof handler === "function") {
          if (!isPromise) {
              handler.call(receiver, value, promise);
          } else {
              if (asyncGuaranteed) promise._setAsyncGuaranteed();
              this._settlePromiseFromHandler(handler, receiver, value, promise);
          }
      } else if (receiver instanceof Proxyable) {
          if (!receiver._isResolved()) {
              if (((bitField & 33554432) !== 0)) {
                  receiver._promiseFulfilled(value, promise);
              } else {
                  receiver._promiseRejected(value, promise);
              }
          }
      } else if (isPromise) {
          if (asyncGuaranteed) promise._setAsyncGuaranteed();
          if (((bitField & 33554432) !== 0)) {
              promise._fulfill(value);
          } else {
              promise._reject(value);
          }
      }
  };

  Promise.prototype._settlePromiseLateCancellationObserver = function(ctx) {
      var handler = ctx.handler;
      var promise = ctx.promise;
      var receiver = ctx.receiver;
      var value = ctx.value;
      if (typeof handler === "function") {
          if (!(promise instanceof Promise)) {
              handler.call(receiver, value, promise);
          } else {
              this._settlePromiseFromHandler(handler, receiver, value, promise);
          }
      } else if (promise instanceof Promise) {
          promise._reject(value);
      }
  };

  Promise.prototype._settlePromiseCtx = function(ctx) {
      this._settlePromise(ctx.promise, ctx.handler, ctx.receiver, ctx.value);
  };

  Promise.prototype._settlePromise0 = function(handler, value, bitField) {
      var promise = this._promise0;
      var receiver = this._receiverAt(0);
      this._promise0 = undefined;
      this._receiver0 = undefined;
      this._settlePromise(promise, handler, receiver, value);
  };

  Promise.prototype._clearCallbackDataAtIndex = function(index) {
      var base = index * 4 - 4;
      this[base + 2] =
      this[base + 3] =
      this[base + 0] =
      this[base + 1] = undefined;
  };

  Promise.prototype._fulfill = function (value) {
      var bitField = this._bitField;
      if (((bitField & 117506048) >>> 16)) return;
      if (value === this) {
          var err = makeSelfResolutionError();
          this._attachExtraTrace(err);
          return this._reject(err);
      }
      this._setFulfilled();
      this._rejectionHandler0 = value;

      if ((bitField & 65535) > 0) {
          if (((bitField & 134217728) !== 0)) {
              this._settlePromises();
          } else {
              async$$1.settlePromises(this);
          }
          this._dereferenceTrace();
      }
  };

  Promise.prototype._reject = function (reason) {
      var bitField = this._bitField;
      if (((bitField & 117506048) >>> 16)) return;
      this._setRejected();
      this._fulfillmentHandler0 = reason;

      if (this._isFinal()) {
          return async$$1.fatalError(reason, util$$1.isNode);
      }

      if ((bitField & 65535) > 0) {
          async$$1.settlePromises(this);
      } else {
          this._ensurePossibleRejectionHandled();
      }
  };

  Promise.prototype._fulfillPromises = function (len, value) {
      for (var i = 1; i < len; i++) {
          var handler = this._fulfillmentHandlerAt(i);
          var promise = this._promiseAt(i);
          var receiver = this._receiverAt(i);
          this._clearCallbackDataAtIndex(i);
          this._settlePromise(promise, handler, receiver, value);
      }
  };

  Promise.prototype._rejectPromises = function (len, reason) {
      for (var i = 1; i < len; i++) {
          var handler = this._rejectionHandlerAt(i);
          var promise = this._promiseAt(i);
          var receiver = this._receiverAt(i);
          this._clearCallbackDataAtIndex(i);
          this._settlePromise(promise, handler, receiver, reason);
      }
  };

  Promise.prototype._settlePromises = function () {
      var bitField = this._bitField;
      var len = (bitField & 65535);

      if (len > 0) {
          if (((bitField & 16842752) !== 0)) {
              var reason = this._fulfillmentHandler0;
              this._settlePromise0(this._rejectionHandler0, reason, bitField);
              this._rejectPromises(len, reason);
          } else {
              var value = this._rejectionHandler0;
              this._settlePromise0(this._fulfillmentHandler0, value, bitField);
              this._fulfillPromises(len, value);
          }
          this._setLength(0);
      }
      this._clearCancellationData();
  };

  Promise.prototype._settledValue = function() {
      var bitField = this._bitField;
      if (((bitField & 33554432) !== 0)) {
          return this._rejectionHandler0;
      } else if (((bitField & 16777216) !== 0)) {
          return this._fulfillmentHandler0;
      }
  };

  function deferResolve(v) {this.promise._resolveCallback(v);}
  function deferReject(v) {this.promise._rejectCallback(v, false);}

  Promise.defer = Promise.pending = function() {
      debug.deprecated("Promise.defer", "new Promise");
      var promise = new Promise(INTERNAL);
      return {
          promise: promise,
          resolve: deferResolve,
          reject: deferReject
      };
  };

  util$$1.notEnumerableProp(Promise,
                         "_makeSelfResolutionError",
                         makeSelfResolutionError);

  method(Promise, INTERNAL, tryConvertToPromise, apiRejection,
      debug);
  bind(Promise, INTERNAL, tryConvertToPromise, debug);
  cancel(Promise, PromiseArray, apiRejection, debug);
  direct_resolve(Promise);
  synchronous_inspection(Promise);
  join(
      Promise, PromiseArray, tryConvertToPromise, INTERNAL, async$$1, getDomain);
  Promise.Promise = Promise;
  Promise.version = "3.5.3";
  map(Promise, PromiseArray, apiRejection, tryConvertToPromise, INTERNAL, debug);
  call_get(Promise);
  using(Promise, apiRejection, tryConvertToPromise, createContext, INTERNAL, debug);
  timers(Promise, INTERNAL, debug);
  generators(Promise, apiRejection, INTERNAL, tryConvertToPromise, Proxyable, debug);
  nodeify(Promise);
  promisify(Promise, INTERNAL);
  props(Promise, PromiseArray, tryConvertToPromise, apiRejection);
  race(Promise, INTERNAL, tryConvertToPromise, apiRejection);
  reduce(Promise, PromiseArray, apiRejection, tryConvertToPromise, INTERNAL, debug);
  settle(Promise, PromiseArray, debug);
  some(Promise, PromiseArray, apiRejection);
  filter(Promise, INTERNAL);
  each(Promise, INTERNAL);
  any(Promise);
                                                           
      util$$1.toFastProperties(Promise);                                          
      util$$1.toFastProperties(Promise.prototype);                                
      function fillTypes(value) {                                              
          var p = new Promise(INTERNAL);                                       
          p._fulfillmentHandler0 = value;                                      
          p._rejectionHandler0 = value;                                        
          p._promise0 = value;                                                 
          p._receiver0 = value;                                                
      }                                                                        
      // Complete slack tracking, opt out of field-type tracking and           
      // stabilize map                                                         
      fillTypes({a: 1});                                                       
      fillTypes({b: 2});                                                       
      fillTypes({c: 3});                                                       
      fillTypes(1);                                                            
      fillTypes(function(){});                                                 
      fillTypes(undefined);                                                    
      fillTypes(false);                                                        
      fillTypes(new Promise(INTERNAL));                                        
      debug.setBounds(Async.firstLineError, util$$1.lastLineError);               
      return Promise;                                                          

  };
  });

  var old;
  if (typeof Promise !== "undefined") old = Promise;
  function noConflict() {
      try { if (Promise === bluebird) Promise = old; }
      catch (e) {}
      return bluebird;
  }
  var bluebird = promise();
  bluebird.noConflict = noConflict;
  var bluebird_1 = bluebird;

  var isMergeableObject = function isMergeableObject(value) {
  	return isNonNullObject(value)
  		&& !isSpecial(value)
  };

  function isNonNullObject(value) {
  	return !!value && typeof value === 'object'
  }

  function isSpecial(value) {
  	var stringValue = Object.prototype.toString.call(value);

  	return stringValue === '[object RegExp]'
  		|| stringValue === '[object Date]'
  		|| isReactElement(value)
  }

  // see https://github.com/facebook/react/blob/b5ac963fb791d1298e7f396236383bc955f916c1/src/isomorphic/classic/element/ReactElement.js#L21-L25
  var canUseSymbol = typeof Symbol === 'function' && Symbol.for;
  var REACT_ELEMENT_TYPE$1 = canUseSymbol ? Symbol.for('react.element') : 0xeac7;

  function isReactElement(value) {
  	return value.$$typeof === REACT_ELEMENT_TYPE$1
  }

  function emptyTarget(val) {
  	return Array.isArray(val) ? [] : {}
  }

  function cloneUnlessOtherwiseSpecified(value, options) {
  	return (options.clone !== false && options.isMergeableObject(value))
  		? deepmerge(emptyTarget(value), value, options)
  		: value
  }

  function defaultArrayMerge(target, source, options) {
  	return target.concat(source).map(function(element) {
  		return cloneUnlessOtherwiseSpecified(element, options)
  	})
  }

  function mergeObject(target, source, options) {
  	var destination = {};
  	if (options.isMergeableObject(target)) {
  		Object.keys(target).forEach(function(key) {
  			destination[key] = cloneUnlessOtherwiseSpecified(target[key], options);
  		});
  	}
  	Object.keys(source).forEach(function(key) {
  		if (!options.isMergeableObject(source[key]) || !target[key]) {
  			destination[key] = cloneUnlessOtherwiseSpecified(source[key], options);
  		} else {
  			destination[key] = deepmerge(target[key], source[key], options);
  		}
  	});
  	return destination
  }

  function deepmerge(target, source, options) {
  	options = options || {};
  	options.arrayMerge = options.arrayMerge || defaultArrayMerge;
  	options.isMergeableObject = options.isMergeableObject || isMergeableObject;

  	var sourceIsArray = Array.isArray(source);
  	var targetIsArray = Array.isArray(target);
  	var sourceAndTargetTypesMatch = sourceIsArray === targetIsArray;

  	if (!sourceAndTargetTypesMatch) {
  		return cloneUnlessOtherwiseSpecified(source, options)
  	} else if (sourceIsArray) {
  		return options.arrayMerge(target, source, options)
  	} else {
  		return mergeObject(target, source, options)
  	}
  }

  deepmerge.all = function deepmergeAll(array, options) {
  	if (!Array.isArray(array)) {
  		throw new Error('first argument should be an array')
  	}

  	return array.reduce(function(prev, next) {
  		return deepmerge(prev, next, options)
  	}, {})
  };

  var deepmerge_1 = deepmerge;

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
        return bluebird_1.reject(err);
      }
    } else if (callback instanceof Error) {
      return bluebird_1.reject(callback);
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
    else if (callback instanceof bluebird_1) {
        return callback;
      } else {
        return bluebird_1.resolve(callback);
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
        return !(_typeof(value) !== 'object' || value === null || isArray(value) || value instanceof Promise || value instanceof bluebird_1);
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
          args = deepmerge_1(args, this.getValidArgs(mergeArgs));
        }

        return args;
      }
    }, {
      key: "mergeArgs",
      value: function mergeArgs(args) {
        return deepmerge_1(this.args, this.getValidArgs(args));
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
        return new bluebird_1(function (resolve, reject) {
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

  return Loader;

})));
//# sourceMappingURL=any-loader.bundle.umd.js.map
