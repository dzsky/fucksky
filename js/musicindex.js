// /*
//  * @author		DenGo
//  * @email		i@dengo.org
//  * @link		http://dengo.org
//  * @date		2014-05-24
//  * @project		HTML5_Player
//  * @description	基于html5和css3编写的音乐播发器
//  */

window.onload=function(){
	function $(ele){
		return document.querySelector(ele);
	}

	//=========================================保存初始化数据
	var audio = $('#audio');
	var musicMode = 'list';

	var musicIndex = 1;
	var bufferTimer = null;
	var volumeTimer = null;


	var myPlayIndex = $('#myPlayIndex');

	//============================================绑定事件
	//

	var movie_1 = $("#movie_1");
	var movie_2 = $("#movie_2");
	var movie_3 = $("#movie_3");
	var movie_4 = $("#movie_4");



	movie_1.onclick = function(){
		musicIndex = 1;
		initPlayer(musicIndex-1);
		toPlay('play1');	
	}

	movie_2.onclick = function(){
		musicIndex = 2;
		initPlayer(musicIndex-1);
		toPlay('play1');	
	}
	movie_3.onclick = function(){
		musicIndex = 3;
		initPlayer(musicIndex-1);
		toPlay('play1');	
	}
	movie_4.onclick = function(){
		musicIndex = 4;
		initPlayer(musicIndex-1);
		toPlay('play1');	
	}
		
	

	$('.play1').onclick=function(){
		toPlay('play1');
	}


	$('.pause').onclick=function(){
		toPlay('pause');
	}

	$('.prev1').onclick=function(){
		toPlay('prev1');
	};

	$('.next1').onclick=function(){
		toPlay('next1');
	};

	//调整播放时间
	$('.progress_bar').onclick=function(ev){
		adjustPorgress(this,ev);
	};

	//音量调节--延时隐藏调节面板
	$('.volume').onmouseover=$('.volume_wrap').onmouseover=function(){
		clearTimeout(volumeTimer);
		removeClass($('.volume_wrap'),'hidden')
	};

	$('.volume').onmouseout=$('.volume_wrap').onmouseout=function(){
		volumeTimer = setTimeout(function(){
			addClass($('.volume_wrap'),'hidden');
		},300);
	};

	$('.volume_bar').onclick=function(ev){
		adjustVolume(this,ev);
	};

	//是否静音
	$('.volume').onclick=function(){
		if (audio.muted == false) {
			this.style.color = '#A1A1A1';
			audio.muted = true;
		}
		else if (audio.muted == true) {
			this.style.color = '#E74D3C';
			audio.muted = false;
		};
	};

	//播放模式
	$('.repeat').onclick=function(){
		changeMusicMode(this,'repeat');
	};

	$('.shuffle').onclick=function(){
		changeMusicMode(this,'shuffle');
	};

	$('.list').onclick=function(){
		changeMusicMode(this,'list');
	};

	//===============================================初始化播放器
	
	
	// initPlayer(musicIndex-1);
	// initPlayer(parseInt(myPlayIndex.value) - 1);
	// alert(myPlayIndex.value)
	// initPlayer($("#playIndex").val());
	
	if (musicIndex == 1) {
		initPlayer(0);
	};
	audio.volume = 0.8;
	audio.addEventListener('canplay',bufferBar,false);

	function initPlayer(index){
		//音乐路径
		audio.setAttribute('src',playList[index].musicURL);
		//歌手
		//$('.artist_name').innerHTML = playList[index].artist;
		//头像
		//$('.artist_avatar img').setAttribute('src',playList[index].avatarURL);
		//歌名
		$('.music_name').innerHTML = playList[index].musicName;
		
		//进度条
		$('.progress').style.width =   0 +'px';
		//缓冲进度条
		audio.removeEventListener('canplay',bufferBar,false);
		clearInterval(bufferTimer);
		$('.buffer').style.width = 0 +'px';
	}

	//=================================================播放
	function toPlay(action){
		if (action == 'play1') {
			audio.play();
			removeClass($('.pause'),'hidden');
			addClass($('.play1'),'hidden');
		}
		else if (action == 'pause') {
			audio.pause();
			removeClass($('.play1'),'hidden');
			addClass($('.pause'),'hidden');
		}
		else if (action == 'prev1') {
			playMusicMode(action);
		}
		else if (action == 'next1') {
			playMusicMode(action);
		};
	}

	//==============================================播放结束后播放下一曲
	audio.addEventListener('ended',function(){
		playMusicMode('ended');
	},false);

	//==============================================根据播放模式计算歌曲索引
	function playMusicMode(action){
		var musicNum = playList.length;
		var index = musicIndex;

		//列表循环
		if (musicMode == 'list' ) {
			if (action == 'prev1') {
				if (index == 1) { //如果是第一首歌，跳到最后一首
					index = musicNum;
				}
				else{
					index -= 1;
				}
			}
			else if (action == 'next1' || action == 'ended') {
				if (index == musicNum) {//如果是最后一首歌，跳到第一首
					index = 1;
				}
				else{
					index += 1;
				}
			};
		};

		//随机播放
		if (musicMode == 'shuffle') {
			var randomIndex = parseInt(musicNum * Math.random());
			index = randomIndex + 1;
			if (index == musicIndex) {//下一首和当前相同，跳到下一首
				index += 1;
			};
		};

		//单曲循环
		if (musicMode == 'repeat') {
			if (action == 'prev1') {
				if (index == 1) { //如果是第一首歌，跳到最后一首
					index = musicNum;
				}
				else{
					index -= 1;
				}
			}
			else if (action == 'next1') {
				if (index == musicNum) {//如果是最后一首歌，跳到第一首
					index = 1;
				}
				else{
					index += 1;
				}
			}else{
				//if ended 如果是播放结束自动跳转，不做操作
			}
		};

		musicIndex = index;
		playIndex(index-1);
	}

	//================================================更新歌曲播放索引，重新加载歌曲，并播放
	function playIndex(index){
		initPlayer(index);
		audio.load();
		audio.addEventListener('canplay',bufferBar,false);
		toPlay('play1');
	}

	//===============================================更改播放模式
	function changeMusicMode(dom,mode){
		musicMode = mode;
		var option = $('#option_list').getElementsByTagName('li');
		for (var i = 0; i < option.length; i++) {
			option[i].style.color = '#A1A1A1';
		};
		dom.style.color = '#E74D3C';
	}

	//=============================================显示剩余时间 和 播放进度条
	audio.addEventListener('timeupdate',function(){
		if (!isNaN(audio.duration)) {
			//剩余时间
			var surplus = audio.duration-audio.currentTime;
			var surplusMin = parseInt(surplus/60);
			var surplusSecond = parseInt(surplus%60);
			if (surplusSecond < 10 ) {
				surplusSecond = '0'+surplusSecond;
			};
			$('.time').innerHTML = "-" + surplusMin + ":" +surplusSecond;

			//播放进度条
			var progressValue = audio.currentTime/audio.duration*324;
			$('.progress').style.width = parseInt(progressValue) + 'px';
		};
	},false);

	//===============================================显示缓冲进度条
	function bufferBar(){
		bufferTimer = setInterval(function(){
			var bufferIndex = audio.buffered.length;
			if (bufferIndex > 0 && audio.buffered != undefined) {
				var bufferValue = audio.buffered.end(bufferIndex-1)/audio.duration*324;
				$('.buffer').style.width = parseInt(bufferValue)+'px';

				if (Math.abs(audio.duration - audio.buffered.end(bufferIndex-1)) <1) {
					$('.buffer').style.width = 324+'px';
					clearInterval(bufferTimer);
				};
			};
		},1000);
	}

	//=============================================调整播放进度条
	function adjustPorgress(dom,ev){
		var event = window.event || ev;
		var progressX = event.clientX - dom.getBoundingClientRect().left;
		audio.currentTime = parseInt(progressX/324*audio.duration);
		audio.removeEventListener('canplay',bufferBar,false);
	}

	//===============================================调整音量条
	function adjustVolume(dom,ev){
		var event = window.event || ev;
		var volumeY = dom.getBoundingClientRect().bottom - event.clientY;
		audio.volume = (volumeY/80).toFixed(2);
		$('.volume_now').style.height = volumeY + 'px';
 	};


	//=============================================对class操作的工具函数
	function hasClass(dom,className){
		var classNum = dom.className.split(" "),
			hasClass;

		for (var i = 0; i < classNum.length; i++) {
			if (classNum[i] == className) {
				hasClass = true;
				break;
			}
			else{
				hasClass = false;
			};
		};

		return hasClass;
	}

	function addClass(dom,className){
		if (!hasClass(dom,className)) {
			dom.className += " " + className;
		};
	}

	function removeClass(dom,className){
		if (hasClass(dom,className)) {
			var classNum = dom.className.split(" ");
			for (var i = 0; i < classNum.length; i++) {
				if (classNum[i] == className) {
					classNum.splice(i,1);
					dom.className = classNum.join(" ");
					break;
				};
			};
		};
	}

	function replaceClass(dom,className,replaceClass){
		if (hasClass(dom,className)) {
			var classNum = dom.className.split(" ");
			for (var i = 0; i < classNum.length; i++) {
				if (classNum[i] == className) {
					classNum.splice(i,1,replaceClass);
					dom.className = className.join(" ");
					break;
				};
			};
		};
	}
}
