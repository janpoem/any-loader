'use strict';

// const Loader = require('../src/Loader');
// import Loader from '../index';
import Loader from '../Loader.mjs';

// jest.useFakeTimers();

class TestLoader extends Loader {
	
	setup(args) {
		// throw new Error('抛出第一个错误');
	}
	
	doLoad(args) {
		// console.log(args);
	}
}

class TestURL {
	
	constructor(data) {
		Object.assign(this, data);
	}
}

class TestResponse {
	
	constructor(url) {
		this.url = url;
		this.responseText = '';
		this.statusCode = 0;
	}
}

class TestOverloadInputOutputLoader extends Loader {
	
	newInput(input) {
		return new TestURL(this.mergeArgs(input));
	}
	
	newOutput(input, output) {
		return new TestResponse(input);
	}
}

class TestDoAnythingInSetupLoader extends TestOverloadInputOutputLoader {
	
	setup({input, output}) {
		const {query} = input;
		if (typeof query.key === 'undefined' || query.key === null) {
			query.key = 'ok';
		}
		
		output.statusCode = 100;
	}
}

class TestThrowErrorInSetupLoader extends TestOverloadInputOutputLoader {
	
	setup({input, output}) {
		const {query} = input;
		if (typeof query.id === 'undefined' || query.id === null) {
			throw new Error(`just throw error`);
		}
	}
}

class TestAsyncSetupLoader extends TestOverloadInputOutputLoader {
	
	setup({input, output}) {
		const {query} = input;
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				if (typeof query.id === 'undefined' || query.id === null) {
					reject(new Error(`just throw error async`));
				} else {
					query.name = 'async';
					resolve();
				}
			}, 2000);
		});
	}
}

class TestBreakInSetupLoader extends TestAsyncSetupLoader {
	
	setup({input, output}) {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				reject(new Error('promise timeout error'));
			}, 1000);
		});
	}
	
	isThrowError(error, process) {
		if (process === 'setup') return true;
		return super.isThrowError(error, process);
	}
	
	doLoad(stream) {
		throw new Error('doLoad');
	}
}

class TestSyncLoadProcessLoader extends TestOverloadInputOutputLoader {
	
	beforeLoad({input}) {
		if (typeof input.sync === 'undefined' || input.sync === null) {
			throw new Error('error in beforeLoad');
		}
	}
	
	doLoad({input}) {
		input.sync += 1;
		
		if (input.sync % 3 === 0) {
			throw new Error('error in doLoad');
		}
	}
	
	afterLoad({input}) {
		if (input.sync >= 7) {
			throw new Error('error in afterLoad');
		}
	}
}

class TestAsyncLoadProcessLoader extends TestOverloadInputOutputLoader {
	
	beforeLoad({input}) {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				if (typeof input.sync === 'undefined' || input.sync === null) {
					reject(new Error('error in beforeLoad'));
				}
				
				resolve();
			}, 1000);
		});
	}
	
	doLoad({input}) {
		input.sync += 1;
		
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				if (input.sync % 3 === 0) {
					reject(new Error('error in doLoad'));
				}
				
				resolve();
			}, 1000);
		});
	}
	
	afterLoad({input}) {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				if (input.sync > 8) {
					reject(new Error('error in afterLoad'));
				}
				resolve();
			}, 1000);
		});
	}
}

class TestSilentLoader extends TestOverloadInputOutputLoader {
	
	isThrowError(err, process) {
		return false;
	}
	
	beforeLoad() {
		throw new Error('will not catch this error!');
	}
}

describe('any-loader 测试', () => {
	
	it('test basic setup', () => {
		const l1 = new TestLoader({a: 'a', b: 'b'});
		expect(l1.args).toEqual({a: 'a', b: 'b'});
		
		const l2 = new TestLoader(() => {
			return {o: 'oo', k: 'kk'};
		});
		
		expect(l2.args).toEqual({o: 'oo', k: 'kk'});
		
		// 禁止在 init 时，使用 Promise，所以会设定一个空 {}
		const l3 = new TestLoader(() => {
			return new Promise((resolve) => {
			
			});
		});
		expect(l3.args).toEqual({});
		
	});
	
	it('test newLoadStream', async () => {
		const l1 = new TestLoader({
			key: 'value'
		});
		const stream = await l1.newLoadStream();
		expect(stream.input).toEqual({key: 'value'});
		expect(stream.output).toEqual({});
	});
	
	it('test mergeArgs is change this.args', async () => {
		const l1 = new TestLoader({
			key: 'value'
		});
		const a2 = l1.mergeArgs({key: 'replace'});
		
		expect(a2).toEqual({key: 'replace'});
		expect(l1.args).toEqual({key: 'value'});
		expect(l1.args).not.toEqual(a2);
	});
	
	it('test newInput/newOutput', async () => {
		const l2 = new TestOverloadInputOutputLoader({
			// 默认构造参数
			url  : 'https://www.oschina.net',
			query: {key: 1}
		});
		
		// 确保标准的 args 的准确性
		expect(l2.args).toStrictEqual({
			// 默认构造参数
			url  : 'https://www.oschina.net',
			query: {key: 1}
		});
		
		// 继而生成一个新的 LoadStream
		const stream = await l2.newLoadStream({
			query: {key: 2, id: 1333}
		});
		
		expect(stream.input).toEqual({
			// 默认构造参数
			url  : 'https://www.oschina.net',
			query: {key: 2, id: 1333}
		});
		
		expect(stream.output).toEqual({
			url         : {
				// 默认构造参数
				url  : 'https://www.oschina.net',
				query: {key: 2, id: 1333}
			},
			responseText: '',
			statusCode  : 0
		});
	});
	
	it('test basic setup', async () => {
		const l33 = new TestDoAnythingInSetupLoader({
			// 默认构造参数
			url  : 'https://www.oschina.net',
			query: {name: 'Janpoem'}
		});
		
		const stream = await l33.newLoadStream({query: {id: 1}});
		
		// changed in setup
		expect(stream.input).toEqual({
			// 默认构造参数
			url  : 'https://www.oschina.net',
			query: {name: 'Janpoem', id: 1, key: 'ok'}
		});
		
		// changed in setup
		expect(stream.output.statusCode).toBe(100);
	});
	
	it('test sync setup throw error', async () => {
		const loaderThrowError = new TestThrowErrorInSetupLoader({
			// 默认构造参数
			url  : 'https://www.oschina.net',
			query: {name: 'Janpoem'}
		});
		
		const s1 = await loaderThrowError.newLoadStream();
		expect(s1.errors.length).toBeGreaterThanOrEqual(1);
		expect(s1.errors[0].message).toBe('just throw error');
		
		const s2 = await loaderThrowError.newLoadStream({query: {id: 1}});
		expect(s2.errors.length).toBe(0);
	});
	
	// jest 设置了 promise 的 timeout 所以，为了省事，异步要单独进行测试
	it('test async setup throw error #1', async () => {
		const loaderThrowError = new TestAsyncSetupLoader({
			// 默认构造参数
			url  : 'https://www.oschina.net',
			query: {name: 'Janpoem'}
		});
		
		const s1 = await loaderThrowError.newLoadStream();
		expect(s1.errors.length).toBeGreaterThanOrEqual(1);
		expect(s1.errors[0].message).toBe('just throw error async');
	});
	
	it('test async setup throw error #2', async () => {
		const loaderThrowError = new TestAsyncSetupLoader({
			// 默认构造参数
			url  : 'https://www.oschina.net',
			query: {name: 'Janpoem'}
		});
		
		const s2 = await loaderThrowError.newLoadStream({query: {id: 1}});
		expect(s2.errors.length).toBe(0);
	});
	
	it('test async setup throw error #3 - test stream.error', async () => {
		// TestBreakInSetupLoader 被重载为 ProcessSetup 也抛出异常
		// 这里测试 newLoadStream 是否能正确 捕获到 setup 中的异常
		const loader = new TestBreakInSetupLoader({
			// 默认构造参数
			url  : 'https://www.oschina.net',
			query: {name: 'Janpoem'}
		});
		
		try {
			const st = await loader.newLoadStream();
		} catch (error) {
			expect(error.message).toBe('promise timeout error');
		}
	});
	
	it('test async setup throw error #4 - test load break in setup', async () => {
		const loaderThrowError = new TestBreakInSetupLoader({
			// 默认构造参数
			url  : 'https://www.oschina.net',
			query: {name: 'Janpoem'}
		});
		
		// TestBreakInSetupLoader 被重载为 ProcessSetup 也抛出异常，所以调用 load 的时候，不应该看到 doLoad 的异常，而应该捕获到 setup 的异常
		try {
			const s1 = await loaderThrowError.load();
		} catch (error) {
			expect(error.message).toBe('promise timeout error');
		}
	});
	
	it('test sync loadProcess - error in beforeLoad', async () => {
		const loader = new TestSyncLoadProcessLoader({
			// 默认构造参数
			url  : 'https://www.oschina.net',
			query: {name: 'Janpoem'}
		});
		
		try {
			await loader.load();
		} catch (err) {
			expect(err.message).toEqual('error in beforeLoad');
		}
	});
	
	it('test sync loadProcess - error in doLoad', async () => {
		const loader = new TestSyncLoadProcessLoader({
			// 默认构造参数
			url  : 'https://www.oschina.net',
			query: {name: 'Janpoem'}
		});
		
		try {
			await loader.load({sync: 5});
		} catch (err) {
			expect(err.message).toEqual('error in doLoad');
		}
	});
	
	it('test sync loadProcess - error in afterLoad', async () => {
		const loader = new TestSyncLoadProcessLoader({
			// 默认构造参数
			url  : 'https://www.oschina.net',
			query: {name: 'Janpoem'}
		});
		
		try {
			await loader.load({sync: 7});
		} catch (err) {
			expect(err.message).not.toEqual('error in doLoad');
			expect(err.message).toEqual('error in afterLoad');
		}
	});
	
	it('test async loadProcess - error in beforeLoad', async () => {
		const loader = new TestAsyncLoadProcessLoader({
			// 默认构造参数
			url  : 'https://www.oschina.net',
			query: {name: 'Janpoem'}
		});
		
		try {
			await loader.load();
		} catch (err) {
			expect(err.message).toEqual('error in beforeLoad');
		}
	});
	
	it('test async loadProcess - error in doLoad', async () => {
		const loader = new TestAsyncLoadProcessLoader({
			// 默认构造参数
			url  : 'https://www.oschina.net',
			query: {name: 'Janpoem'}
		});
		
		try {
			await loader.load({sync: 5});
		} catch (err) {
			expect(err.message).toEqual('error in doLoad');
		}
	});
	
	it('test async loadProcess - error in afterLoad', async () => {
		const loader = new TestAsyncLoadProcessLoader({
			// 默认构造参数
			url  : 'https://www.oschina.net',
			query: {name: 'Janpoem'}
		});
		
		try {
			await loader.load({sync: 7});
		} catch (err) {
			expect(err.message).not.toEqual('error in doLoad');
			expect(err.message).toEqual('error in afterLoad');
		}
	});
	
	it('test silent loader', async () => {
		const loader = new TestSilentLoader({
			// 默认构造参数
			url  : 'https://www.oschina.net',
			query: {name: 'Janpoem'}
		});
		
		const {error} = await loader.load();
		
		if (error) {
			expect(error.message).toBe('will not catch this error!');
		}
	});
	
});