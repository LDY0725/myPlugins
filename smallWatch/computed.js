/**
 * 初始化 computed
 * @param 无传参
 * @returns 无返回值
 */
Watch.prototype._computedInit = function () {
    if (!this.computed) return
    
    for (const key in this.computed) {
       if (typeof key !== 'function') throw 'error'
       
       this.data[key] = key().call(this.data)
    } 
}