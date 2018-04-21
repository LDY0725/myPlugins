// function sd(string) {
//     var zimu = []
//     var nums = []
//     var numsflag = {}
//     for (let i = 0; i < string.length; i++) {
//         if ((string[i] >= 'a' && string[i] <= 'z')|| (string[i] >= 'A' && string[i] <= 'Z')) {
//             zimu.push(string[i])
//         }else if(string[i] >= '0'&& string[i] <= '9') {
//             if (!numsflag['num'+ string[i]]) {
//                 nums.push(string[i])
//                 numsflag['num' + string[i]] = true
//             }
//         }
//     }
   
//     return nums.join('') + zimu.join('')
    
// }

// function groupList(data) {
    
//     var json = {}
//     for (let i = 0; i < data.length; i++) {
//         if (typeof(data[i]) == "object" && Object.prototype.toString.call(data[i]).toLowerCase() == "[object object]" && !data[i].length) {
//             if (!json[data[i].type]) {
//                 json[data[i].type] = []
//                 json[data[i].type].push(data[i].content)
//             }else {
//                 json[data[i].type].push(data[i].content)
//             }
//         }
//     }
    
//     var array = []
//     for (const type in json) {
//         if (json.hasOwnProperty(type)) {
//             var mycontent = 'content'
//             var myarray
//             if (json[type].length > 1) {
//                 mycontent = 'contents'
//                 myarray = json[type]
//             }else {
//                 myarray = json[type][0]
//             }
//             var myjson = {
//                 "type": type,
//             }
//             myjson[mycontent] = myarray
//             array.push(myjson)
//         }
//     }
//     console.log(array);
    
// }

function map(data, fn) {
    if (!data) return null
    if (!Object.prototype.toString.call(data)=='[object Array]') return null
    if (typeof(data)!=="object") return null
        if (!data) return null
    if (typeof(data)!=="object") return null

    if (Object.prototype.toString.call(data)=='[object Array]') {
        var array = []
        for (let i = 0; i < data.length; i++) {
            array.push(fn(i,data[i]))
        }
        return array
    } else if (typeof(data)=="object") {
        var json = {}
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
               json[data[key]] = fn(key, data[key])
            }
        }
        return json
    }
    
}

var result = map(data, function(value, key) {
    return {
      key: key,
      value: value,
    }
  });

var data = 2112
console.log(result);


var string = [null, 2, "test", undefined, {
    "type": "product",
    "content": "product1"
  },  {
    "type": "product",
    "content": "product2"
  },  {
    "type": "tag",
    "content": "tag1"
  }, {
    "type": "product",
    "content": "product3"
  }, {
    "type": "tag",
    "content": "tag2"
}]

groupList(string)