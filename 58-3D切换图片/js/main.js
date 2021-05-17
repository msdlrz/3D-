// 获取容器元素
let container = document.querySelector('.container')
// 声明变量 宽高
let width = 160
let height = 90
let rows = container.offsetHeight / height
let cols = container.offsetWidth / width
// 拖拽元素的旋转角度
let rx = 0, ry = 0, rz = 0, resY = 0, resX = 0
// 元素的缩放比例
let scale = 1
// 旋转角度下标
let index = 1

// 循环创建元素
for(let i = 0; i < rows - 1; i++){
	for(let j = 0; j < cols - 1; j++){
		// 创建item元素
		let item = document.createElement('div')
		// 设置css
		item.className = 'item'
		// 修改高和宽
		item.style.width = width + 'px'
		item.style.height = height + 'px'
		// 控制item元素的位置
		item.style.left = j * width + 'px'
		item.style.top = i * height + 'px'
		// 给item元素添加过渡和延迟时长
		item.style.transition = `all 0.5s cubic-bezier(.14, .84, .48, 1.58) ${(i + j) * .1}s`
		
		// 创建正元素
		let zheng = document.createElement('div')
		zheng.className = 'zheng'
		// 设置位置
		zheng.style.transform = `translateZ(${height / 2}px)`
		zheng.style.backgroundPosition = `${-width * j}px ${-height * i}px`
		// 插入到item中
		item.appendChild(zheng)
		
		// 创建fan
		let fan = document.createElement('div')
		fan.className = 'fan'
		// 修改item元素的背景图片的位置
		fan.style.backgroundPosition = `${-width * j}px ${-height * i}px`
		// 修改fan元素的位置与角度
		fan.style.transform = `rotateX(180deg) translateZ(${height / 2}px)`
		item.appendChild(fan)
		
		// 创建top元素
		let t = document.createElement('div')
		t.className = 'top'
		t.style.backgroundPosition = `${-width * j}px ${-height * i}px`
		t.style.transform = `rotateX(90deg) translateZ(${height / 2}px)`
		item.appendChild(t)
		
		// 创建bottom元素
		let bottom = document.createElement('div')
		bottom.className = 'bottom'
		bottom.style.backgroundPosition = `${-width * j}px ${-height * i}px`
		bottom.style.transform = `rotateX(-90deg) translateZ(${height / 2}px)`
		item.appendChild(bottom)
		
		// 创建left元素
		let left = document.createElement('div')
		left.className = 'left'
		left.style.width = height + 'px'
		left.style.height = height + 'px'
		left.style.transform = `rotateY(-90deg) translateZ(${height / 2}px)`
		item.appendChild(left)
		
		// 创建right元素
		let right = document.createElement('div')
		right.className = 'right'
		right.style.width = height + 'px'
		right.style.height = height + 'px'
		right.style.transform = `rotateY(90deg) translateZ(${width - height / 2}px)`
		item.appendChild(right)
		
		// 将item添加到container中
		container.appendChild(item)
	}
}

// 定时器
setInterval(() => {
	// 获取所有的item元素
	document.querySelectorAll('.item').forEach(item => {
		item.style.transform = `rotateX(${index * -90}deg)`
	})
	index++
}, 2500)

// 元素可以旋转
container.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) rotateZ(${rz}deg) scale(${scale})`
let isDown = false

// 鼠标按下事件
container.onmousedown = function(e){
	// 获取当前位移
	this.x = e.clientX
	this.y = e.clientY
	isDown = true
}

// 鼠标移动事件
window.onmousemove = function(e){
	if(!isDown) return
	container.style.cursor = 'move'
	container._x = e.clientX
	container._y = e.clientY
	resY = ry + (container._x - container.x) * 0.8
	resX = rx + (container.y - container._y) * 0.8
	container.style.transform = `rotateX(${resX}deg) rotateY(${resY}deg) rotateZ(${rz}deg) scale(${scale})`
}

// 鼠标抬起事件
window.onmouseup = function(e){
	ry = resY
	rx = resX
	container.style.cursor = 'default'
	isDown = false
}

// 元素缩放
window.onwheel = function(e){
	scale = scale - e.deltaY / 1000
	container.style.transform = `rotateX(${resX}deg) rotateY(${resY}deg) rotateZ(${rz}deg) scale(${scale})`
}