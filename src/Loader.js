'use strict';

const toString = Object.prototype.toString;
const isArray = Array.isArray;
const OrigPromise = global.Promise;

const Promise = require('bluebird');
const deepmerge = require('deepmerge');


const callbackReturn = (callback, binder, args) => {
	if (typeof callback === 'function') {
		// 过滤binder
		if (typeof binder !== 'object') binder = null;
		// 过滤args
		if (typeof args === 'undefined') args = [];
		else if (!isArray(args)) args = [args];
		
		try {
			return callbackReturn(callback.apply(binder, args), binder, args);
		} catch (err) {
			return Promise.reject(err);
		}
	} else if (callback instanceof Error) {
		return Promise.reject(callback);
	}
	// else if (callback instanceof OrigPromise) {
	// 	return new Promise(callback); // 原生的 Promise 对象，要强制转换一下
	// }
	else if (callback instanceof Promise) {
		return callback;
	} else {
		return Promise.resolve(callback);
	}
};

// lodash.isString
function isString(value) {
	const type = typeof value;
	return type === 'string' ||
	       (type === 'object' && value != null && !isArray(value) && toString.call(value) === '[object String]');
}

const ProcessSetup = 'setup';
const ProcessBefore = 'before';
const ProcessDoing = 'doing';
const ProcessAfter = 'after';

const TypeOther = 0;
const TypeError = 1;
const TypeString = 2;

/**
 * @type Loader
 * @property {array} errors
 * @property {{}} args
 */
class Loader {
	
	/**
	 * 构建函数
	 *
	 * @param {{}} args 调用 loader 的初始化参数
	 */
	constructor(args) {
		this.result = {};
		
		if (!isArray(this.errors))
			this.errors = [];
		
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
	 * 用于过滤传入的args，生成初始化的 args，用于构造函数
	 *
	 * @param {*} args
	 * @returns {{}}
	 */
	initArgs(args) {
		let type = typeof args;
		if (type === 'function') {
			args = args();
			type = typeof args;
		}
		if (type !== 'object' || args === null || isArray(args) || args instanceof Promise || args instanceof
		    OrigPromise) {
			return {};
		} else {
			return args;
		}
	}
	
	/**
	 * 合并请求参数，如果 args 为空，则只是复制 this.args
	 *
	 * @param {{}} args
	 * @returns {{}}
	 */
	mergeArgs(args) {
		if (typeof args === 'object' && args !== null && !(args instanceof Promise)) {
			return deepmerge({}, this.args, args);
		}
		return Object.assign({}, this.args);
	}
	
	/**
	 *
	 * @param {Error|string} error
	 * @param {string} process
	 * @param {function|null|undefined} reject
	 * @returns {Loader}
	 */
	handleError(error, process, reject) {
		if (!(error instanceof Error))
			error = new Error(error + '');
		
		this.addError(error, process);
		if (typeof reject === 'function' && process !== ProcessSetup)
			reject(error);
		return this;
	}
	
	/**
	 * 添加错误信息
	 *
	 * @param {Error|string} error
	 * @param {string} process
	 * @returns {Loader}
	 */
	addError(error, process) {
		let type = TypeOther;
		if (error instanceof Error)
			type = TypeError;
		else if (isString(error))
			type = TypeString;
		
		const row = {
			type, process, error,
			args: Object.assign({}, this.args) // 将 args 复制下来，用于调试
		};
		
		this.errors.push(row);
		return this;
	}
	
	/**
	 * 每次执行 load 方法前，必然会先执行 setup ，以重新初始化一些环境和变量
	 *
	 * setup 函数中，抛出错误，不会中断 load 的调用，但是会将异常信息添加进 Errors
	 *
	 * @param {{}} args
	 */
	setup(args) {
		this.result = {};
	}
	
	/**
	 * load 前置接口，为 load 前执行
	 *
	 * 执行一个 load 等于 (setup) beforeLoad -> doLoad -> afterLoad
	 *
	 * setup发生错误，不会中断调用
	 * beforeLoad / doLoad / afterLoad 任意一个过程抛出异常 （或 reject ）皆会中断后续的操作
	 *
	 * setup / beforeLoad / doLoad / afterLoad 都支持异步调用，也即等待异步结束方才往后调用
	 *
	 * @param args
	 */
	beforeLoad(args) {
	}
	
	/**
	 * 是 load 实际执行的实现接口， Loader 作为父类，默认会抛出异常，请在继承的子类中扩展。
	 *
	 * @param args
	 */
	doLoad(args) {
		throw new Error(`Loader.doLoad is an abstract method, please overload in ${this.constructor.name}!`);
	}
	
	/**
	 * load 的后置接口
	 *
	 * @param args
	 */
	afterLoad(args) {
	}
	
	load(args) {
		return new Promise((resolve, reject) => {
			try {
				const cloneArgs = this.mergeArgs(args);
				Promise.resolve(this.setup(cloneArgs)).catch(err => {
					this.handleError(err, ProcessSetup, null);
				}).finally(() => {
					callbackReturn(this.beforeLoad, this, [cloneArgs]).then((/* ignore here */) => {
						callbackReturn(this.doLoad, this, [cloneArgs]).then((/* ignore here */) => {
							callbackReturn(this.afterLoad, this, [cloneArgs]).then((/* ignore here */) => {
								resolve(this.result);
							}).catch(err => {
								this.handleError(err, ProcessAfter, reject);
							});
						}).catch(err => {
							this.handleError(err, ProcessDoing, reject);
						});
					}).catch(err => {
						this.handleError(err, ProcessBefore, reject);
					});
				});
			} catch (err) {
				this.handleError(err, ProcessSetup, reject);
			}
		});
	}
}

module.exports = Loader;