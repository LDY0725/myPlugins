class carouselFigure{
  constructor({pictures,time}) {
    [this.pictures,this.time] = [pictures,time];
    this._init_();
  };
  _init_ () {
    let mypictures = this.pictures.getElementsByTagName('img');

    this.pictures.style.overflow = 'hidden';    // 设置隐藏
    this.pictures.style.position = 'relative';

    for (let i = 0; i < mypictures.length; i++) {
      mypictures[i].style.position = 'absolute'
      if (i !== 0) {
        mypictures[i].style.visibility = 'hidden';
      }
    }

    let points = document.createElement('div');   //添加 点
    points.setAttribute('class','points');

    let currentClass = 'bigPoint'
    for (let i = 0; i < mypictures.length; i++) {
      let point = document.createElement('div');
      point.setAttribute('class',currentClass);
      currentClass = 'point'
      points.appendChild(point);
    }
    this.pictures.appendChild(points);
    points.style.left = ((parseInt(this.pictures.clientWidth) - parseInt(points.clientWidth)) / 2 + 'px');

    points = points.getElementsByTagName('div');
    let i = 0 ;
    setInterval(function () {
      mypictures[i].setAttribute('class','slideOutLeft');
      points[i].setAttribute('class','point');
      i++;
      i = i == mypictures.length ? 0 : i;
      mypictures[i].style.visibility = 'visible';
      mypictures[i].setAttribute('class','slideInRight');
      points[i].setAttribute('class','bigPoint');
    },this.time)
  }
}
