/**
 * @param 无参数
 * @returns 无返回值
 */

 function Dep() {
    this.fns = []

    this.addListener = () => {
        if (Dep.target) {
            this.fns.push(Dep.target)
            Dep.target = null
         }         
    }

    this.notify = () => {
        this.fns.forEach(element => {
            element()
        })
    }
     
}

 Dep.target = null