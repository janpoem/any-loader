const Loader = require('../src/Loader');

class TestLoader extends Loader {
	
	setup(args) {
		
		return new Promise((resolve, reject) => {
			args.kk = 'kk';
			this.result = {ok: 'ok'};
			
			setTimeout(() => {
				args.kk = 'kk';
				this.result = {ok: 'ok'};
				resolve();
			}, 2000);
		});
	}
	
	doLoad(args) {
		console.log(args);
	}
}


describe('defineProps 测试', () => {
	
	it('test setup', () => {
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
		console.log(l3.args);
		
		// expect(l3.args).toEqual({});
	});
	
	it('test load', async () => {
		const l1 = new TestLoader({
			key: 'value'
		});
		const a = await l1.load().then(() => {
		
		});
		
	});
});