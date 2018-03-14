function lazyLoad() {
    var lazyLoadImg = document.getElementsByClassName('lazy-load');
    var imgElement = [];
    for (var i = 0; i < lazyLoadImg.length; i++) {
		imgElement.push(lazyLoadImg[i])
    }
    document.getElementsByTagName('body')[0].onscroll = function () {
        var scrollTop = document.documentElement.scrollTop;
        var borwer = document.documentElement.clientHeight;
        var result = [];
        for (var i = 0; i < imgElement.length; i++) {
            var imgHeight = imgElement[i].offsetTop;
            if (imgHeight <= scrollTop + borwer) {
				result[i] =  function (num) {
					if (imgElement[num].getAttribute('data-echo')) {
						imgElement[num].setAttribute('src',imgElement[num].getAttribute('data-echo'))
						imgElement[num].removeAttribute('data-echo');
					}	
				}(i)
			}
        }
    }
}