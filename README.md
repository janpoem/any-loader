
# any-loader - 数据加载器中间件  

[![Npm version](https://img.shields.io/npm/v/any-loader.svg)](https://www.npmjs.com/package/any-loader)
[![Build Status](https://img.shields.io/travis/janpoem/any-loader/master.svg)](https://travis-ci.org/janpoem/any-loader)
[![Dependencies Status](https://img.shields.io/david/janpoem/any-loader.svg)](https://david-dm.org/janpoem/any-loader)


  
any-loader 旨在为 node.js 和其他的 javascript 提供一个可定制程度较高的数据加载器中间件类库。本身并不实现任何数据加载器的实现逻辑，只界定了数据流走向的标准接口 newLoadStrem -> setup -> beforeLoad -> doLoad -> afterLoad ，调用顺序（不可逆），以及此过程中的异常错误处理机制。  
  
any-loader 支持并实现了以下编程特性：  
  
- 基于AOP设计，支持异步（Promise）。  
- 中间件形态，不干涉业务逻辑和底层实现。  
- 使用OOP进行扩展，使用继承和方法重载，来进行子类的开发，并提供丰富的方法以控制的粒度。  
- 接口基于 Promise 封装，向后兼容 async/await 语法  
- 数据流（LoadStream）部分，使用 fp 编程，数据流持有的 input, output 等数据，只在接口中流转，结束后即作废。 Loader 本身无状态，不持有过程数据。  

本类库代码优先发布 [码云 - Gitee](https://gitee.com/)，github只用作ci，用中国人自己的代码仓库，专业私有云代码托管。

## 安装说明  
  
```shell
npm install any-loader
```

```shell
yarn add any-loader
```

## 使用说明

一般实现了自己的 Loader 后，使用时主要使用 `load` 方法：

```js
class UserLoader extends Loader {
	doLoad() {
		// do something...
	}
}

const loader = new UserLoader();
loader.load({/* 一些参数 */}).then().catch();
```

`load` 方法，主要按照以下流程执行：

```js
newLoadStream() => newInput() => newOutput() => setup(loadStream)
                                                      |
                                           beforeLoad(loadStream) => reject(err)?
                                                      |
                                               doLoad(loadStream) => reject(err)?
                                                      |
                                            afterLoad(loadStream) => reject(err)?
```

当 `load` 过程发生错误时，不管用户在实际代码层面抛出（和reject）任何数据或者异常，进入到 Loader 层面，会将其再次包裹成一个 `LoadStreamError` 的对象。

```ts
const err: LoadStreamError = {
	error: * // 错误异常的实例，可以是任何类型不一定非要是一个Error
	name: string, // 默认值 LoadStreamError
	process: string // 字符串类型，表示错误属于哪个过程中抛出的，[setup|before|doing|after]
	stream: { // 发生错误时的 LoadStream 实例
		input: {},   // 输入参数，最起码应该是一个 plainObject 
		output: {},  // 输出对象，最起码应该是一个 plainObject 
		errors: [],  // 错误堆
		error: LoadStreamError // 当前错误异常
	},
	message: [getter],
}
```

决定 Loader 在处理是否将异常抛出，由方法 `isThrowError` 决定。

## Loader 可重载的方法说明

```js
setup(loadStream)

// or 

setup({input, output, errors, error})
```

LoadStream 初始化时的接口，Loader的默认行为，该接口执行过程中的异常错误不会被抛出和reject，不管什么情况都会朝下一个接口去执行（可通过重载  `isThrowError` 方法来改变其是否抛出setup的异常）。

但在setup中使用 `throw` 可能会导致 setup 内的结构控制失效，所以请确定的确了解 `throw` 可能带来的影响。

```js
beforeLoad(loadStream)
```

load 前置接口，该接口中的抛出错误和reject会阻止下一个接口的执行。

```js
doLoad(loadStream)
```

load 的实际执行方法，继承的子类应该优先重载该方法以实现 Loader 具体的逻辑。

但目前来说，beforeLoader, doLoad, afterLoad 并没有明确区别，只是先后执行的顺序。

```js
afterLoad(loadStream)
```

load 的后置接口，参考 `beforeLoad` 和 `doLoad`

```js
newInput(input)
```

在 `newLoadStream` 时候，生成作为 `load` 的 `input` 输入参数实例，可重载这个方法，以返回实际开发场景中所需要的输入实例。

但最好返回类实例或者一个 plainObject，而不要是值类型（string，boolean, number），函数也不推荐。

```js
newOutput(input, output)
```

在 `newLoadStream` 时候，生成用于承载 `load` 的 `output` 输出实例，可重载这个方法，以返回实际开发场景中所需要的输出实例。

同 `newInput` ，最好返回一个类实例或者 plainObject。

并且该方法的参数中的 `input` 必然是基于用户重载 `newInput` 返回的结果。

```js
isThrowError(error, process)
```

用于判断是否将某个过程，或者某些特定的 Error 抛出（或reject），用户可重载该方法，使 Loader 彻底成为静默的模式，或者根据 Error 类来决定是否抛出。

```js
isPlainObject(obj)
getPlainObject(obj, defaultObj)
isValidArgs(args)
getValidArgs(args, defaultArgs)
```

这几个方法的重载，也会对 Loader 的形成产生比较大的影响，属于 Loader 比较基础的方法群， 但一般而言，直接重载 `newInput` 和 `newOutput` 能满足大多数场景使用需求。

__不推荐__ 对 `newLoadStream` 和 `load` 方法重载。

## 简单的例子  

  
```js  
class ImageLoader extends Loader {  
     
   // 默认形态下，input, output 是标准 {}  
   doLoad({input, output, errors}) {  
      return new Promise((resolve, reject) => {  
         const image = new Image();  
            image.onload = function(ev) {  
                output.image = this;  
                output.width = this.width;  
                output.height = this.height;  
                resolve();  
            };  
            image.onerror = (ev) => {  
                reject(new Error('图片加载失败！'));  
            };  
            image.src = input.url;  
      });
   }  
}  
  
const loader = new ImageLoader();  
loader.load({url: 'https://www.oschina.net/build/oschina/components/imgs/header/logo.svg'}).then(({output}) => {  
}).catch(error => {  
});
```  
 
```js
// 我们先定义了一个远程的URL类，或者你的项目本身就有类似的设定  
class RemoteURL {  
     
   constructor() {  
      // ....  
   }  
     
   toURL() {  
      return '...';  
   }  
}  
  
// 再顶一个远程的图片类  
class RemoteImage {  
     
   constructor(remoteUrl) {  
        this.url = remoteUrl; // 这是一个RemoteURL的实例  
        this.isLoad = false;  
        this.image = null;  
        this.error = null;  
    }  
      
    load(image) {  
      this.isLoad = true;  
      this.image = image;  
    }  
      
    error(error) {  
      this.error = error;  
    }  
}  
  
class ImageLoader extends Loader {  
     
   // 我们将 RemoteURL 的实例，作为 LoadStream 的 input  
   newInput(input) {  
        return new RemoteURL(this.mergeArgs(input));  
    }  
  
    newOutput(input, output) {  
      // 到这里时，input已经变为 RemoteURL 的实例  
        return new RemoteImage(input);  
    }  
      
    // input => RemoteURL, output => RemoteImage  
    doLoad({input, output, errors}) {  
        return new Promise((resolve, reject) => {  
            const image = new Image();  
            image.onload = function(ev) {  
                output.load(this);  
                resolve();  
            };  
            image.onerror = (ev) => {  
               output.error(new Error('图片加载失败！'));  
               reject(output.error);  
            };  
            image.src = input.toURL();  
        });  
    }  
}  
  
// 调用代码  
const loader = new ImageLoader();  
loader.load({url: 'https://www.oschina.net/build/oschina/components/imgs/header/logo.svg'}).then(({output}) => {  
}).catch(error => {  
});  
```
  
## 注意事项  
  
在 `setup` `beforeLoad` `doLoad` `afterLoad` 中，异常的处理，和异步的异常处理，需要特别注意：
  
```js  
class MyLoader extends Loader {  

	setup(stream) {
		if (true)
			throw new Error('就是任性抛出错误');
		// 因为上面已经抛出错误了，所以后面这里就不会再被执行到了，
		// setup 本身默认是不会抛出异常的，这就会导致 setup 的逻辑没有完全被执行
	}

   beforeLoad(stream) {  
      return new Promise((resolve, reject) => {
	      // 这里我偷个懒，以 timeout 模拟一个异步请求
	      setTimeout(() => {
		      // 这里如果出现异常，应该使用 reject(xxxx) 的方式
		      if (stream.input.anything === true) {
			      reject(new Error('就是出错了！'));
		      }
		      resolve(); // 最终这个 promise 必须有一个明确的 resolve ，否则这个 promise 就一直被挂起的状态（视乎不同的平台实现，还有ES的版本，但就Promise而言，不resolve是错误的。）
		      // 特别特别，不要在这样的回调中使用 throw new Error()
		      // 这表示这个回调函数抛出了一个异常，但并不直接和 Promise 有直接的关系，这在不同的JS平台，会有不同的处理方式，所以尽量在这里使用 throw
	      }, 3000);
      });
   }  
}  
```  
 
在将一个 `new Promise` 的实例提供给别人使用时，存在许多技术黑洞和坑（不同JS平台的实现和当前ES的Promise实现的版本的缺陷导致），所以本类库已经转用 bluebird 所提供的 Promise。

## mjs和commonjs的问题

mjs 和 commonjs 两个规范这是一个很头疼的问题。

`index.js` 目前以默认的 commonjs 作为基础输出（用rollup构建）。

也即，如下的代码，都是生效的：

```js
const Loader = require('any-loader'); // 仅在 nodejs 环境下

import Loader from 'any-loader'; // babel 或者 ES 环境下
```

如果项目使用了 babel-runtime 的，可以考虑引用 `any-loader/Loader` ，只针对 babel 环境。

```js
import Loader from 'any-loader/Loader'
```

相应的，在对应项目中的 babel 设置，要针对 exclude 进行如下的设置：

webpack.config.js

```js
const babel = {
	test   : /\.m?jsx?$/,
	exclude: function(modulePath) {
		// 针对 mjs ，不算在排除的范围内
		if (/.mjs$/.test(modulePath)) {
			return false;
		}
		return /node_modules/.test(modulePath);
	},
	use    : {
		loader : 'babel-loader',
		options: {
			presets: [ /* your presets */ ],
			plugins: [ /* your plugins */ ]
		}
	}
};
```

## TODO

- 要增加 dist/bundle.all.js
- 要增加 dist/bundle.without-bluebird.js
- 是否将 deepmerge 替换为 lodash/merge ，并打包集成。
