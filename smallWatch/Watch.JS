/**
 * @param key 监听的 key 
 * @param callback 执行的回调函数
 */

 function Watch(observed, key, callback) {
    this.key = key
    this.callback = callback
    this.Observed = Observed
    Dep.target = this.callback
    console.log(observed.data[key]);
    
 }
