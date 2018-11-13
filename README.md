# any-loader - 数据加载器中间件

any-loader 旨在为 node.js 和前端的 javascript 提供一个自由度较高的数据加载器中间件类库。本身并不实现任何数据加载器的实现逻辑，只界定了数据
流走向的标准接口 `newLoadStrem -> setup -> beforeLoad -> doLoad -> afterLoad` ，调用顺序（不可逆），以及此过程中的异常错误处理机制。

any-loader 支持并实现了以下编程特性：

- 基于AOP设计，支持异步（Promise）。
- 中间件形态，不干涉业务逻辑和底层。
- 使用OOP进行扩展，基于继承和方法重载，进行具体的业务和数据加载，提供丰富的方法以满足各种需求。
- 兼容 async/await 语法
- 数据流部分，使用 fp 编程，数据流持有的 `input`, `output` 等数据，只在当前接口中流转，结束后即作废。 Loader 本身无状态，不持有过程数据。

__设计初衷__

在将 any-loader 独立为一个项目之前，其实我正在做一个基于 React.js Web 的后台文件管理系统。因为需求和服务器架构的关系，需要在文件管理器中集成
较多的数据加载。管理各种数据加载接口，成为一个比较头疼的问题，有一些是标准的 XHR 请求，但也有不少非标准的数据请求。

起初在文件管理器的项目中，我是将 Loader 设计为多个接口的组合，然后就会发现问题，一方面是，这种组合越来越多，有时候一个接口是一个组合，有时候多个
接口是一个组合（粒度不对）。其次是，接口组没办法具体到每个接口的定制，缺乏统一调度管理，以及具有明确代表性的标识，代码写着写着就越来越混乱。

这时候就萌生了一个想法，即能否通过面向对象编程的思想，将一个数据接口变为可细化、可管理、可扩展的类进行管理和维护，特别当组件需要异步加载数据时，可
以直接使用具体的 Loader 实例，使用标准划一的方法，统一调用数据。

采用面向切面编程，取代老掉牙的事件驱动（React.js在这方面真的很超前），我实在是受够了，随处编写，缺乏统一管理的事件注册函数。

同时，面向未来编程，朝未来标准兼容，应该大胆的、进一步的采用更彻底的、实质性的面向对象编程，即通过明确的 `extends`、方法重载、`instanceof`等
，明确当前编程的操作范围和干涉范围。

想法拟定了，但实际上手实现，提交上码云的版本，其实是第二个版本，虽然 Loader.js 实现的代码并不多，但要能充分利用 OOP 的特性，确保类的每一个细节
都可以通过子类的重载实现完全的改写，这方面着实花了我不少精力，同时，ES标准的Promise在某些层面也存在一些关键的缺陷，导致不得不改用 `bluebird` 。

目前这个版本，到完成 Loader.load 的方法单元测试，就算告一段落。

实际上，在我心目中，还有一个接口分组的功能，通过分组的并发策略，决定同组内的 Loader 在并发时的处理逻辑，比如是等待、放弃、还是延迟执行。但这个特
性实际上通过自己实现的子类 Loader 也能轻松实现，所以现阶段不会急于完成这个特性。

## 安装说明

暂缺，目前还未完成第一个版本的单元测试，暂时不会发布到npm。

## 使用说明

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

嗯，这么看，似乎没什么，但，同样的例子，我们可以进行一个更具体的扩展：

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

是的，调用代码不变（应用层不变），可是中间可控制的粒度和维度，就拓宽了很多。程序员的价值，不在于围绕业务写了多少业务逻辑的实现代码，而在于拥有多
少手段去针对业务需求，设计类，设计接口，乃至到设计系统，设计架构。

这个也只是初级的拓展而已，实际上还有更进一步的拓宽，但暂时先不说了，等完成第一版本在更新了。

## 注意事项

在加载流初始化的阶段，也即 `newLoadStrem -> setup` 里，setup 接口发生的错误异常，不会被 reject 或者 throw。也即，这个过程，属于静默模式
，在这个过程中所发生的错误，将会传递到下一个接口 `beforeLoad` 的参数 `stream.errors` 中呈现。

而 `beforeLoad -> doLoad -> afterLoad` 这个流程中，任意环节中发生的错误异常，将中断当前流程，不再往下执行，并及时的 reject 异常。

在接口中的编程中，如果不使用异步，可直接通过 throw 的方式，来中断执行当前流程，显然，这里终于可以摆脱结构控制和花括号密集恐惧症的束缚了。

如：

```js
class MyLoader extends Loader {
	
	beforeLoad(stream) {
		throw new Error('就是不让你执行下去！');
	}
}
```

如果在接口中，使用了异步，乃至异步中还嵌套着异步，在未使用 async/await （这个只要依旧 throw 就完事了）的条件下，需要严格遵守以下的约定（以下约
定通用于`setup / beforeLoad / doLoad / afterLoad`）：

- 接口允许调用异步方法（比如异步打开文件，异步请求服务器令牌之类），使用异步，必须确保这个接口 `return new Promise()` ，以使得其能和后面的数
据流接口对接（包括兼容 async/await）。
- 使用 `Promise` 时，必须明确执行 `resolve` 或 `reject` （特别是逻辑上，最低限度必须有其中一者被执行到，特别要注意，必须检查你的结构控制代
码，避免实际上未执行情况。），因为 `Promise` 设计上，就必须有明确的结果（`resolve` 或 `reject`），否则将会使 `Promise` 看似跳空未执行，
实际上这个 `Promise` 一直被挂起了，等待结束（jest中，Promise指定了默认的超时时间，所以会强制抛出一个错误）。
- 如果 `Promise` 中，还存在另一个异步（比如setTimeout，他实际上并不是和 `Promise` 在一个层面的线程管理中 —— 某程度可以这么理解），这时候，
尤其是在 node.js 环境下，就会出现写入对象属性丢失的问题，这实际上就是 C# Java 常说的线程安全问题，所以，在 `Promise` 必须严格使用 
`resolve` 和 `reject` ，仅且应该只使用这两个方式（不要使用throw），来传递数据或者对象。

__未完待续__






