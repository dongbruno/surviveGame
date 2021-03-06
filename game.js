//德丽莎是玩家，吼姆是坏人
//创建canvas元素
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 400;
document.body.appendChild(canvas);

// 添加背景声音
var audio = document.createElement('audio');
audio.src = 'mp3/MoonlightinHarbin.mp3';
audio.autoplay = 'autoplay';
document.body.appendChild(audio);

// 停止播放背景声音
var stopBDS = function() {
	audio.pause();
}
// 播放成功声音
var playSucceedS = function() {
	var audioS = document.createElement('audio');
	audioS.src = 'mp3/成功.mp3';
	audioS.autoplay = 'autoplay';
	document.body.appendChild(audioS);
}
// 播放失败声音
var playFailS = function() {
	var audioF = document.createElement('audio');
	audioF.src = 'mp3/失败.mp3';
	audioF.autoplay = 'autoplay';
	document.body.appendChild(audioF);
}

// 背景图片
var BGReady = false;
var BGImage = new Image();
BGImage.src = "image/背景.png";
BGImage.onload = function() {
	BGReady = true;
}
// 雪花图片
var snowReady = false;
var snowAlready = false;
var snowImage = new Image();
snowImage.src = "image/雪花1.png";
snowImage.onload = function() {
	snowReady = true;
}
var snowImage2 = new Image();
snowImage2.src = "image/雪花2.png";
snowImage2.onload = function() {
	snowReady2 = true;
}
// 德丽莎图片
var DLSReady = false;
var DLSImage = new Image();
DLSImage.src = "image/德丽莎.png";
DLSImage.onload = function() {
	DLSReady = true;
}

// 吼姆图片
var HMReady = false;
var HMImage = new Image();
HMImage.src = "image/吼姆.png";
HMImage.onload = function() {
	HMReady = true;
}

// 德丽莎初始位置
var DLS = {
	speed : 3,
	x : canvas.width / 2,
	y : canvas.height / 2
}
// 雪花初始位置
var snow = {
	x : canvas.width / 2,
	y : canvas.height / 2
}
function HM() {
	this.x = Math.random() * canvas.width;// 取一个0-1之间的随机数与画布的长度相乘
	this.y = Math.random() * canvas.height;// 取一个0-1之间的随机数与画布的宽度相乘

	// 如果生成位置离德丽莎一个直径范围内，则移到两个直径范围外。
	var lineX = Math.floor(this.x - DLS.x);
	var lineY = Math.floor(this.y - DLS.y);
	if ((lineX * lineX + lineY * lineY) < 4 * 25 * 25) {
		this.x = this.x + 25 * 4;
		this.y = this.y + 25 * 4;
	}
	this.speed = 1;
	this.xDirection = 1;
	this.yDirection = 1;
	this.move = function(modifier) {
		// 得到在画布之内的吼姆的坐标及正确的运动方向
		this.x += this.xDirection * this.speed * modifier;
		this.y += this.yDirection * this.speed * modifier;
		if (this.x >= canvas.width - 25) {
			this.x = canvas.width - 25;
			this.xDirection = -1;
		} else if (this.x <= 0) {
			this.x = 0;
			this.xDirection = 1;
		} else if (this.y >= canvas.height - 25) {
			this.y = canvas.height - 25;
			this.yDirection = -1;
		} else if (this.y <= 0) {
			this.y = 0;
			this.yDirection = 1;
		}
	};
}

// 为吼姆创建一个数组
var HMSum = 0;
var HMList = new Array();
HMList[HMSum] = new HM();
var keysDown = {};

// 监测按键情况，按键按下则返回真值。
addEventListener("keydown", function(e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function(e) {
	delete keysDown[e.keyCode];
});

var Move = function(modifier) {

	// 按方向键移动德丽莎
	if (38 in keysDown) {
		DLS.y -= DLS.speed * modifier;
	}
	if (40 in keysDown) {
		DLS.y += DLS.speed * modifier;
	}
	if (37 in keysDown) {
		DLS.x -= DLS.speed * modifier;
	}
	if (39 in keysDown) {
		DLS.x += DLS.speed * modifier;
	}

	// 超出屏幕则从另一边出现
	if (DLS.x >= canvas.width - 25) {
		DLS.x = 0;
	} else if (DLS.x <= 0) {
		DLS.x = canvas.width - 25;
	}
	if (DLS.y >= canvas.height - 25) {
		DLS.y = 0;
	} else if (DLS.y <= 0) {
		DLS.y = canvas.height - 25;
	}

	for (var i = 0; i <= HMSum; i++) {
		// 调用HM（）中的move循环获得吼姆1-n的坐标
		HMList[i].move(modifier);
	}

}
var then = Date.now();
var start = then;
var timer;
var Draw = function() {
	// 画背景
	if (BGReady) {
		ctx.drawImage(BGImage, 0, 0);
	}

	// 画德丽莎
	if (DLSReady) {
		ctx.drawImage(DLSImage, DLS.x, DLS.y, 25, 25);
	}

	// 画吼姆1-n
	if (HMReady) {
		for (var i = 0; i <= HMSum; i++)
			ctx.drawImage(HMImage, HMList[i].x, HMList[i].y, 25, 25);
	}

	ctx.fillStyle = "rgb(255, 0, 0)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	last = Date.now() - start;
	ctx.fillText(last / 1000, 30, canvas.height - 60);
}
var drawSnowFlower = function(){
	// 画雪花
	var timenow = Math.floor(Date.now()/500);
	
	if (snowReady) {
		if(snowAlready)
		{
			if(timenow%2==0){
              ctx.drawImage(snowImage, snow.x, snow.y, 25, 25);
			}else{
               ctx.drawImage(snowImage2, snow.x, snow.y, 25, 25);
			}
       
		} else{
        snow.x = DLS.x + 150;
		snow.y = DLS.y + 100;
		if(snow.x >= 572){
			snow.x = snow.x - 572;
		}
		if(snow.y >= 372){
			snow.y = snow.y - 372;
		}
		if(timenow%2==0){
              ctx.drawImage(snowImage, snow.x, snow.y, 25, 25);
			}else{
               ctx.drawImage(snowImage2, snow.x, snow.y, 25, 25);
			}
		snowAlready = true;
		}
	}
}
var Check = function() {
	// 大约3秒出一个吼姆
	if (HMSum != Math.floor(last / 3000)) {
		HMSum++;
		HMList[HMSum] = new HM();
	}
	end = Date.now();
	//30秒后出现雪花图片
	if (((end - start) / 1000) > 30) {
         drawSnowFlower(snowAlready);
		// 根据两球心的距离与两者半径和比较判断是否相撞
		var lineX2 = Math.floor(snow.x - DLS.x);
		var lineY2 = Math.floor(snow.y - DLS.y);
		if ((lineX2 * lineX2 + lineY2 * lineY2) < 25 * 25) {
			end = Date.now();
			End();
			stopBDS();
			playSucceedS();
			setTimeout(function() {
				alert("恭喜你进入下一关！");
			}, 300);

		}
		
	}
	for (var i = 0; i <= HMSum; i++) {
		// 根据两球心的距离与两者半径和比较判断是否相撞
		var lineX = Math.floor(HMList[i].x - DLS.x);
		var lineY = Math.floor(HMList[i].y - DLS.y);
		if ((lineX * lineX + lineY * lineY) < 25 * 25) {
			end = Date.now();
			End();
			playFailS();
			stopBDS();
			setTimeout(function() {
				var r = confirm("你坚持了" + (end - start) / 1000 + "秒"
						+ "，是否重新游戏?");
				if (r == true) {
					location.reload();
				}
			}, 300);

		}
	}
}

var End = function() {
	window.clearInterval(timer);
	return;
}

var main = function() {
	Move(0.3);
	Draw();
	Check();
}
timer = setInterval(main, 0.01);