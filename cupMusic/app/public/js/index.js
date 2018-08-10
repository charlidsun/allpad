$(function(){
	//首先加载图片的封面
	var val = [
		{song_author:'张三丰1',song_img:'http://p4.music.126.net/CQDGeibcfkSHbbyjapNBmw==/109951163430714435.jpg?param=200y200',song_name:'头功1'},
		{song_author:'张三丰2',song_img:'http://p4.music.126.net/CQDGeibcfkSHbbyjapNBmw==/109951163430714435.jpg?param=200y200',song_name:'头功2'},
		{song_author:'张三丰3',song_img:'http://p4.music.126.net/CQDGeibcfkSHbbyjapNBmw==/109951163430714435.jpg?param=200y200',song_name:'头功3'},
		{song_author:'张三丰4',song_img:'http://p4.music.126.net/CQDGeibcfkSHbbyjapNBmw==/109951163430714435.jpg?param=200y200',song_name:'头功4'},
		{song_author:'张三丰5',song_img:'http://p4.music.126.net/CQDGeibcfkSHbbyjapNBmw==/109951163430714435.jpg?param=200y200',song_name:'头功5'},
		{song_author:'张三丰6',song_img:'http://p4.music.126.net/CQDGeibcfkSHbbyjapNBmw==/109951163430714435.jpg?param=200y200',song_name:'头功6'},
		{song_author:'张三丰7',song_img:'http://p4.music.126.net/CQDGeibcfkSHbbyjapNBmw==/109951163430714435.jpg?param=200y200',song_name:'头功7'},
		{song_author:'张三丰8',song_img:'http://p4.music.126.net/CQDGeibcfkSHbbyjapNBmw==/109951163430714435.jpg?param=200y200',song_name:'头功8'}
	]
	//顶部的轮播
	for (var i=0;i<val.length;i++){
		$('.items').append('<div class="item"><div class="image" style="background-image:url('+val[i].song_img+')"></div> <p class="artist">'+val[i].song_name+'</p><p class="track">'+val[i].song_author+'</p></div>')
		//底部的列表
		var playClazz = "speakers invisible";
		if (i==0) playClazz= "speakers"
		$('.tracks').append('<div class="track '+i+1+'">'+
							'	<div class="number">'+i+1+'</div>'+
							'	<div class="name"><p>'+val[i].song_author+'</p><p class="song">'+val[i].song_name+'</p></div>'+
							'	<div class="'+playClazz+'"></div>'+
							'</div>')
	}
	
	var Carousel = function ( $target ){
		this.$ = {};
		this.$.container  	    = $target;
		this.$.carousel 		= this.$.container.find('.carousel');
		this.$.prev 	 		= this.$.container.find('.prev');
		this.$.next 		    = this.$.container.find('.next');
		this.$.play 		    = this.$.container.find('.play');
		this.$.slides_container = this.$.container.find('.slides .items');
		this.$.slides 			= this.$.slides_container.find('.item');
		this.$.seek_bar			= this.$.container.find('.seek-bar');
		this.$.progress_bar		= this.$.container.find('.progress-bar');
		this.$.choice			= this.$.container.find('.choice');
		this.$.tracks 			= this.$.choice.find('.tracks');
		this.$.track 			= this.$.tracks.find('.track');
		this.$.speakers			= this.$.track.find('.speakers');
		this.$.music			= this.$.container.find('.music');
		this.count = this.$.slides.length;
		this.init_events();
	};

	Carousel.prototype.index = 0;
	Carousel.prototype.count = 0;
	Carousel.prototype.progress_ratio = 0;
	Carousel.prototype.swipe = 0;

	Carousel.prototype.init_events = function (){
		var that = this;
		this.$.next.on('click', function(){
			that.next();
			return false;
		});
		this.$.prev.on('click', function(){
			that.prev();
			return false;
		});
		this.$.track.each(function (data) {
	       	$(this).on('click', function (){
	       		that.go_to( data, $carousel.index);
	       	});
	    });

		this.changeMusic();

		//接收键盘的时间
		$(window).keydown(function(evt) {
			if (evt.which == 39) {
				//Right
				that.next();
				return false;
		  	}
		  	if (evt.which == 37) {
		  		//Left
				that.prev();
				return false;
		  	}
		  	if (evt.which == 32) {
		  		//空格
		  		play = !play;
				that.changeMusic();
				return false;
		  	}
		});

		this.$.play.on('click', function(){
			play = !play;
			that.changeMusic();
			return false;
		});


		this.$.speakers.on('click', function(){
			if (that.$.music[0].volume == 1) {
				that.$.music[0].volume = 0;
				that.$.speakers.css({
					"background-image": "url(../images/mute.png)"
				});
			}
			else {
				that.$.music[0].volume = 1;
				that.$.speakers.css({
					"background-image": "url(../images/speaker.png)"
				});
			}
		});

		this.$.music.bind('ended', function(){
			that.next();
		});


		this.$.carousel.on('touchstart',function(e){
			that.swipe = e.originalEvent.touches[0].clientX;
		});

		this.$.carousel.on('touchend',function(e){
			if (e.originalEvent.changedTouches[0].clientX > that.swipe + 10)
				that.prev();
			else if (e.originalEvent.changedTouches[0].clientX < that.swipe - 10)
				that.next();
		});


		window.setInterval(function () {
			this.progress_ratio = that.$.music[0].currentTime / that.$.music[0].duration;
		    that.$.progress_bar.css({
			  transform: "scaleX(" + progress_ratio + ")"
			});
		}, 50);

		this.$.seek_bar.on('click', function (e) {
		    var x = e.clientX - that.$.seek_bar.offset().left,
		    ratio = x / that.$.seek_bar.width(),
		    time = ratio * that.$.music[0].duration;
		    that.$.music[0].currentTime = time;
		});

	};


	//轮播+1
	Carousel.prototype.next = function(){
		this.go_to( this.index + 1, this.index);
	};

	//轮播-1
	Carousel.prototype.prev = function(){
		this.go_to( this.index - 1, this.index);
	};

	//切换专辑事件
	//index是点击下一个或者上一个的序号，currentIndex是当前序号
	Carousel.prototype.go_to = function( index, currentIndex ){
		if (currentIndex != index) { 
			index = index%this.count;
			if (index < 0)
				index = index + this.count;
			this.$.carousel.css({
				"background-image": "url(images/background4.png)"
			});
			this.$.speakers[currentIndex].classList.add('invisible');
			this.$.speakers[index].classList.remove('invisible');

			this.$.music[0].setAttribute('src',val[index].song_name);
			this.changeMusic();

			$carousel.$.tracks.animate({scrollTop:50*index - 50},300);

			this.$.slides_container.css({
			  transform: "translateX(" + (-225)*index + "px)"
			});
			this.index = index;
		}
	};

	Carousel.prototype.changeMusic = function(){	
		if (play == true) {
			this.$.play[0].classList.add('invisible');
			this.$.music[0].play();
		}
		else {
			this.$.play[0].classList.remove('invisible');
			this.$.music[0].pause();
		}
	};

	var $carousel = new Carousel( $('.container ') );
	var play = false
	
})