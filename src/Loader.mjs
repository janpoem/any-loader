'use strict';

const toString = Object.prototype.toString;
const isArray = Array.isArray;

import BluebirdPromise from 'bluebird';
import merge from 'deepmerge';

const callbackAsPromise = (callback, binder, args, resolve, reject) => {
	if (typeof callback === 'function') {
		// 过滤binder
		if (typeof binder !== 'object') binder = null;
		// 过滤args
		if (typeof args === 'undefined') args = [];
		else if (!isArray(args)) args = [args];
		
		try {
			return callbackAsPromise(callback.apply(binder, args), binder, args);
		} catch (err) {
			return BluebirdPromise.reject(err);
		}
	}
	else if (callback instanceof Error) {
		return BluebirdPromise.reject(callback);
	}
	else if (isArray(callback) && callback.length > 0 && typeof resolve === 'function' && typeof reject ===
	         'function') {
		const item = callback.shift();
		return callbackAsPromise(item, binder, args).then(() => {
			if (callback.length > 0) {
				callbackAsPromise(callback, binder, args, resolve, reject);
			} else {
				resolve();
			}
		}).catch(reject);
	}
	// else if (callback instanceof Promise) {
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
	else if (callback instanceof BluebirdPromise) {
		return callback;
	} else {
		return BluebirdPromise.resolve(callback);
	}
};

// lodash.isString
const isString = (value) => {
	const type = typeof value;
	return type === 'string' ||
	       (type === 'object' && value != null && !isArray(value) && toString.call(value) === '[object String]');
};


class LoadStreamError extends Error {
	
	constructor(error, process, stream) {
		super();
		this.error = null;
		this.process = '';
		this.stream = null;
		// oh my god....
		Object.defineProperties(this, {
			name   : {
				value       : 'LoadStreamError',
				writable    : false,
				enumerable  : true,
				configurable: false
			},
			error  : {
				value       : error,
				writable    : false,
				enumerable  : true,
				configurable: false
			},
			process: {
				value       : process,
				writable    : false,
				enumerable  : true,
				configurable: false
			},
			stream : {
				value       : stream,
				writable    : false,
				enumerable  : true,
				configurable: false
			},
			message: {
				get: () => {
					return this.getMessage();
				}
			}
		});
		
	}
	
	getMessage() {
		if (this.error instanceof Error || (this.error.message && isString(this.error.message)))
			return this.error.message;
		else if (isString(this.error))
			return this.error;
		else
			return this.error + '';
	}
}

const ProcessSetup = 'setup';
const ProcessBefore = 'before';
const ProcessDoing = 'doing';
const ProcessAfter = 'after';

/**
 * 数据库加载器的抽象类
 *
 * - 考虑到精简核心类的代码，以及面向AOP、OOP编程特性的实现，不考虑实现面向事件的实现了。实际上这不是 `Loader` 这个层面要去解决的问题，完全可以在子类中自行实现。
 *
 * @type Loader
 * @property {{}} args
 */
class Loader {
	
	/**
	 * 构建函数
	 *
	 * @param {*} args 调用 loader 的初始化参数
	 */
	constructor(args = undefined) {
		Object.defineProperties(this, {
			args: {
				value       : this.initArgs(args),
				writable    : false,
				enumerable  : true,
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
	isPlainObject(value) {
		// return !(typeof value !== 'object' || value === null || isArray(value) ||
		// 	value instanceof Promise || value instanceof OrigPromise);
		return !(typeof value !== 'object' || value === null || isArray(value) ||
		         value instanceof Promise || value instanceof BluebirdPromise);
	}
	
	/**
	 * 基于 value ，返回有效的普通 object 或 defaultObj
	 *
	 * @param {*} value
	 * @param {{}} defaultObj
	 * @return {{}}
	 */
	getPlainObject(value, defaultObj = {}) {
		if (typeof value === 'function') value = value();
		return this.isPlainObject(value) ? value : (this.isPlainObject(defaultObj) ? defaultObj : {});
	}
	
	/**
	 * 检查一个参数是否为有效的 Loader 构造参数，默认使用的是 `isPlainObject` 的结果，用于提供给后继的类重载该方法
	 *
	 * @param {*} args
	 * @return {boolean}
	 */
	isValidArgs(args) {
		return this.isPlainObject(args);
	}
	
	getValidArgs(args, defaultArgs = this.getDefaultArgs()) {
		if (typeof args === 'function') args = args();
		return this.isValidArgs(args) ? args : (this.isValidArgs(defaultArgs) ? defaultArgs : {});
	}
	
	getDefaultArgs() {
		return {};
	}
	
	/**
	 * 初始化传入的 args
	 *
	 * @param {*} args 传入的参数
	 * @param {*|undefined|null} mergeArgs 需要合并的参数
	 * @returns {{}}
	 */
	initArgs(args, mergeArgs = undefined) {
		args = this.getValidArgs(args);
		// 被合并后的对象，是一个全新的对象
		if (typeof mergeArgs !== 'undefined' || mergeArgs !== null) {
			args = merge(args, this.getValidArgs(mergeArgs));
		}
		return args;
	}
	
	mergeArgs(args) {
		return merge(this.args, this.getValidArgs(args));
	}
	
	/**
	 * 生成新的 LoadStream 输入（input）
	 *
	 * 应该确保该函数返回的，是一个纯粹的 `object`
	 *
	 * @param {*} input
	 * @return {{}}
	 */
	newInput(input) {
		return this.mergeArgs(input);
	}
	
	/**
	 * 生成新的 LoadStream 输出（output）
	 *
	 * @param {{}} input
	 * @param {{}|undefined} output
	 * @return {*}
	 */
	newOutput(input, output = undefined) {
		return this.getPlainObject(output);
	}
	
	/**
	 * 判断是否抛出特定的异常（基于 process 和 error 的类型判断），`Loader` 默认的行为以 process 来进行判断
	 *
	 * @param error
	 * @param process
	 * @return {boolean}
	 */
	isThrowError(error, process) {
		switch (process) {
			case ProcessAfter :
			case ProcessDoing :
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
	handleError(error, process, stream = {}, reject = undefined) {
		
		// 过滤一下 error ，确使每个 error 都是 Error 实例
		if (!(error instanceof LoadStreamError))
			error = new LoadStreamError(error, process, stream);
		
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
	newLoadStream(input = undefined, output = undefined) {
		return new Promise((resolve, reject) => {
			input = this.newInput(input);
			output = this.newOutput(input, output);
			const stream = {input, output, errors: [], error: null}; // 增加一个当前的错误
			callbackAsPromise(this.setup, this, [stream])
				.then(() => {
					resolve(stream);
				})
				.catch(error => {
					this.handleError(error, ProcessSetup, stream, reject);
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
	setup(loadStream) {
	}
	
	
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
	beforeLoad(loadStream) {
	}
	
	/**
	 * `load` 实际执行的实现接口， Loader 作为父类，默认会抛出异常，请在继承的子类中扩展。
	 *
	 * 请参考 `setup` 和 `beforeLoad` 的注释说明
	 *
	 * @param {{input: {}, output: {}, errors: array}} loadStream
	 */
	doLoad(loadStream) {
		throw new Error(`Loader.doLoad is an abstract method, please overload in ${this.constructor.name}!`);
	}
	
	/**
	 * `load` 的后置接口
	 *
	 * @param {{input: {}, output: {}, errors: array}} loadStream
	 */
	afterLoad(loadStream) {
	}
	
	load(input = undefined) {
		return new BluebirdPromise((resolve, reject) => {
			return this.newLoadStream(input).then(loadStream => {
				let process = ProcessBefore;
				const onCatch = (err) => {
					this.handleError(err, process, loadStream, reject);
					resolve(loadStream);
				};
				
				return callbackAsPromise(this.beforeLoad, this, [loadStream]).then((/* ignore here */) => {
					process = ProcessDoing;
					return callbackAsPromise(this.doLoad, this, [loadStream]).then((/* ignore here */) => {
						process = ProcessAfter;
						return callbackAsPromise(this.afterLoad, this, [loadStream]).then((/* ignore here */) => {
							resolve(loadStream);
						}).catch(onCatch);
					}).catch(onCatch);
				}).catch(onCatch);
			}).catch(err => {
				reject(err);
			});
		});
	}
}

export default Loader;