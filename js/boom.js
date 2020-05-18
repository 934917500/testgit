function boom(opt){
	this.opt = opt;
	this.index = 99999;
	this.imgLeg = 0;

	//生成元素的模块
	this.createNode();

	//爆炸模块
	this.chartBoom();

};
boom.prototype = {
	'createNode':function(){
		this.imgLeg == this.opt.imgUrl.length && (this.imgLeg = 0);

		this.newDiv = document.createElement('div');

		this.newDiv.style.cssText ='width:100%;height:100%;position:absolute;';
		this.newDiv.style.zIndex=this.index;
		this.index--;
		for(var i = 0;i < this.opt.y;i++){
			for(var j = 0;j < this.opt.x;j++){
				this.smallDiv = document.createElement('div');

				this.smallDiv.style.width = this.opt.obj.clientWidth / this.opt.x + 'px';
				this.smallDiv.style.height = this.opt.obj.clientHeight / this.opt.y + 'px';
				this.smallDiv.style.float = 'left';
				this.smallDiv.style.background = 'url('+this.opt.imgUrl[this.imgLeg]+')';
				this.smallDiv.style.backgroundPositionX = this.opt.obj.clientWidth / this.opt.x * -j+'px';
				this.smallDiv.style.backgroundPositionY = this.opt.obj.clientHeight / this.opt.y * -i+'px';
				this.smallDiv.style.transition = this.random(Number(this.opt.timer.split('-')[0]),Number(this.opt.timer.split('-')[1]))+'s all ease';
				this.newDiv.appendChild(this.smallDiv);
			};
		};
		this.imgLeg++;

		this.opt.obj.appendChild(this.newDiv);
	},
	'returnArr':function(){
		this.str='';
		for(var i =0;i <this.opt.style.length;i++ ){
			//this.str='';
			this.str+= ' '+this.opt.style[i].split(':')[0]+'(';
			this.str+= this.random(Number(this.opt.style[i].split(':')[1].split('*')[0]),Number(this.opt.style[i].split(':')[1].split('*')[1]));
			this.str+= this.opt.style[i].split(':')[2] +')';
			//this.arr.push(this.str);
		};
		this.str = this.str.replace('undefined','');
		return this.str;
		//this.arr.push(this.str);
	},
	'chartBoom':function(){
		var _this = this;
		

		setTimeout(function(){
			for(var i = 0;i<_this.newDiv.children.length;i++){
				_this.newDiv.children[i].style.transform = _this.returnArr();
				_this.newDiv.children[i].style.opacity = 0;
			};


			_this.createNode();
			_this.chartBoom();
		},1500);

		setTimeout(function(){
			boomNode.children[0].remove();

		},Number((this.opt.timer.split('-')[1])*1000)+1000)

	},
	'random':function(min,max){
		return Number(Math.random()*((max-min))+min);
	}
}

new boom({
	'obj':boomNode,
	'x':10,
	'y':8,
	'timer':'0.8-1.7',
	'imgUrl':['img/1.jfif','img/2.jfif','img/3.jpg','img/2.jpg'],
	'style':['perspective:800*800:px','translateX:-500*500:px','translateY:-500*500:px','rotate:-180*180:deg','rotateX:-180*180:deg','rotateY:-180*180:deg','scale:1*3:']

})