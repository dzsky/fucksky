function checkSearch(){
	var search = $("#searchText").val();
	if (search == '') {
		$("#searchModal").modal();
	}
	else{
		$("#search").submit();
	}
}

function forwardToZone(){
	window.location.href="zone.html";
}

function alertZoneHeadPic(){
    $("#zoneHeadPic").modal();
}

function alertCollectStatus(){
    $("#collectStatus").modal();
}



function movie() {
    var SPEED = 500;//图片切换速度
    var STEP = 10;//图片切换步长
    var NUMBER = 6;//图片数量
    var DURATION = 5000;//单张图片停留时间
    var INTERVAL = 50;//进度条变化时间间隔
    var PREV = 0;//上一张图片索引
    var CURRENT = 0;//当前图片索引
    var NEXT = CURRENT + 1;//下一张图片的索引
    var $ = function (id) {
        return document.getElementById(id);
    }
    var getNum = function (str) {
        if (!str) {
            return 0;
        } else {
            return parseInt(str.split('px')[0]);
        }
    }
    //进度条动画
    var process = (function(){
    	var intervalId;
    	return function (prcsswrap, drtn, intrvl, callback) {
	        var width = prcsswrap.clientWidth;
	        var prcss = prcsswrap.getElementsByClassName('prcss')[0];
	        var count = drtn/intrvl;
	        var offset = Math.floor(width/count);
	        var tmpCurrent = CURRENT;
	        var step = function () {
	            if (tmpCurrent !== CURRENT) {
	            	intervalId = clearInterval(intervalId);
	                prcss.style.width = '0px';
	                return;
	            }
	            var des = getNum(prcss.style.width) + offset;
	            if (des < width) {
	                prcss.style.width = getNum(prcss.style.width) + offset + 'px';
	            } else {
	                intervalId = clearInterval(intervalId);
	                prcss.style.width = '0px';
	                PREV = CURRENT;
	                CURRENT = NEXT;
	                NEXT++;
	                NEXT = NEXT%NUMBER;
	                if (callback)
	                    callback();
	            }
	        }
	        if (!!intervalId){
	        	intervalId = clearInterval(intervalId);
	        }
	        intervalId = setInterval(step, intrvl);
	    };
    })();
    //位移动画
    var animation = (function(){
    	var intervalId;
    	return function (ele, from, to, callback) {
	        var distance = Math.abs(to - from);
	        var cover = 0;
	        var symbol = (to - from)/distance;
	        var stepLength = Math.floor((distance*STEP)/SPEED);
	        var step = function () {
	            var des = cover + stepLength;
	            if (des < distance) {
	                cover += stepLength;
	                ele.style.left = getNum(ele.style.left) + stepLength*symbol + 'px';
	            } else {
	                intervalId = clearInterval(intervalId);
	                ele.style.left = to + 'px';
	                if (callback)
	                    callback();
	            }
	        }
	        if (!!intervalId){
	        	intervalId = clearInterval(intervalId);
	        }
        	intervalId = setInterval(step, STEP);
    	}
    })();
    //与DOM相关的操作要在页面加载完全之后执行
    window.onload = function () {
        var imgwrap = $('imgwrap');
        var imgs = imgwrap.children;
        var navswrap = $('navswrap');
        var navs = navswrap.children;
        //图片轮播动画
        var slide = function (drtn, intrvl, callback) {
            var from = -PREV*1224;
            var to = -CURRENT*1224;
            animation(imgwrap, from, to, callback);
        }
        //切换（进度条动画+位移动画）
        var goOn = function (drtn, intrvl) {
            var currentNav = navs[CURRENT];
            var prcsswrap = currentNav.getElementsByClassName('prcsswrap')[0];
            process(prcsswrap, drtn, intrvl, function () {
                slide(drtn, intrvl, function () {
                    goOn(drtn, intrvl);
                });
            });
        }
        //响应点击
        $('navswrap').addEventListener('click', (function () {
            var getElement = function (eve, filter) {
                var element = eve.target;
                while (element) {
                    if (filter(element))
                        return element;
                    element = element.parentNode;
                }
            }
            return function (event) {
                var des = getElement(event, function (ele) {
                    return (ele.className.indexOf('navwrap') !== -1);
                })
                var index = parseInt(des.dataset.index);
                PREV = CURRENT;
                CURRENT = index;
                NEXT = (CURRENT+1)%NUMBER;
                slide(DURATION, INTERVAL, function () {
                    goOn(DURATION, INTERVAL);
                });
            }
        })());
        //开始动画
        goOn(DURATION, INTERVAL);
    }
}