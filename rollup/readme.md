原生代码：

```js
let index = 'hello'
export default index
```

# 1.cjs

```js
console.log('hello')
```

# 2.es

```js
let index = 'hello'
export default index
```

# 3.iife

```js
var calculator = (function () {
  'use strict'
  let index = 'hello'
  return index
})()
```

# 4.umd

```js
;(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
    ? (module.exports = factory())
    : typeof define === 'function' && define.amd
    ? define(factory)
    : ((global =
        typeof globalThis !== 'undefined' ? globalThis : global || self),
      (global.calculator = factory()))
})(this, function () {
  'use strict'

  let index = 'hello'

  return index
})
```

# 5.amd

```js
define(function () {
  'use strict'
  let index = 'hello'
  return index
})
```

rollup 只处理函数和顶层的 import/export 变量
