/**
 * 对象构造函数
 * @param obj {JSON} 监听的对象    
 * @param callback {function} 监听对象所对应的函数，ps：现在还没用想到好的添加的位置
 * @Observed()
 */

function Observed(obj) {
  this.data = obj.data
  this.computed = obj.computed
  this.arrayAugmentations = {}
  this._init_();
}

/**
 * 普通数据的监听
 * @param obj {JSON} 监听的对象    
 * @param key {string} 监听元素的 key
 * @param value {element} 监听元素的 value
 * @returns 无返回值
 * @Observed.normalObserved
 */
Observed.prototype.normalObserved = function (obj, key, value) {
  var dep = new Dep()
  Object.defineProperty(obj, key, {
    get() {
      console.log('访问了' + key);
      dep.addListener()
      return value
    },
    set(val) {
      console.log('修改了' + key + '为' + val);      
      dep.notify()
      value = val
    }
  })
}

/**
 * 获得对象属性
 * @param obj {JSON} 检测的对象    
 * @param return {string} 对象属性所对应的字符串值
 * @Observed.getType
 */
Observed.prototype.getType = function (obj) {
  var map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object',
  }

  if (obj instanceof Element) {
    return 'element'
  }

  return map[Object.prototype.toString.call(obj)]
}

/**
 * 深度遍历数据，并绑定监听
 * @param data {JSON} 遍历的数据，和检测的对象    
 * @param 无返回值
 * @Observed.deepObserved
 */
Observed.prototype.deepObserved = function (data) {
  var type = this.getType(data)
  var self = this
  if (type == 'array') {
    data._proto_ = this.arrayAugmentations;
    data.forEach((elem) => {
      self.deepObserved(elem)
    });
  } else if (type == 'object') {
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        var value = data[key]
        self.normalObserved(data, key, value)
        self.deepObserved(value)
      }
    }
  }
}

/**
 * 获得监听数组的特性
 * @param 无输入中  
 * @param 无返回值
 * @Observed.arrayObserved
 */
Observed.prototype.arrayObserved = function () {
  var ObservedMethods = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse']

  ObservedMethods.forEach((elem) => {
    var original = Array.prototype[elem]

    this.arrayAugmentations[elem] = () => {
      console.log('我被改变');
      return original.call(this, arguments)
    }
  })

}

/**
 * 初始化 computed
 * @param 无传参
 * @returns 无返回值
 */
Observed.prototype._computedInit = function () {
  if (!this.computed) return
  
  for (const key in this.computed) {
    if (this.computed.hasOwnProperty(key)) {
         
      this.data[key] = this.computed[key].call(this.data)
    }
  }
}

/**
 * 初始化对象
 * @param 无输入中  
 * @param 无返回值
 * @Observed._init_
 */
Observed.prototype._init_ = function () {
  this.deepObserved(this.data)
  this._computedInit()
}