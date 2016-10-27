// +----------------------------------------------------------------------
// | Code.Cap [ All samples in it! ]
// +----------------------------------------------------------------------
// | Copyright (c) 2015 http://ac.asia All rights reserved.
// +----------------------------------------------------------------------
// | Author: AC <63371896@qq.com> <http://do.org.cn>
// +----------------------------------------------------------------------
//-----------------------
// 变量定义
// ----------------------
// [变量] 已经替换文件数量
var hasReplacedCount        = 0
// [变量] 已完成数量标签
var elementComplete         = null
// // [变量] 将要替换的文件数量
var willReplaceCount        = 0
// [变量] 将要替换的文件路径数组
var willReplacePaths        = []









//-----------------------
// 主函数 - 程序入口
// ----------------------
/**
 * 入口函数
 * @return 
 * @author Lan <546945340@qq.com>
 */
function main() {
	// 添加文档树加载事件监听完成之后执行fucntion 
    document.addEventListener("DOMContentLoaded", function (event) {
        var uiHandler   = new UIHandler()
        // 保存完成数量标签元素
        elementComplete = document.querySelector('#replaced-count')
    })
}











//-----------------------
// 事件定义 - 控件事件
// ----------------------
/**
 * 绑定事件[输入框-拖拽事件]
 * @return 
 * @author Lan <546945340@qq.com>
 */
class UIHandler {
    constructor() {
        // 项目路径
        this.projectPath 			 = document.querySelector('#project-path')

        // 在元素正在拖动到放置目标并放开时触发
        this.projectPath.ondrop      = this.onDropEvent.bind(this)          
        // 在元素正在拖动到放置目标时触发
        this.projectPath.ondragover  = this.stopEvent.bind(this) 
        // 事件在拖动的元素或选择的文本进入到有效的放置目标时触发
        this.projectPath.ondragenter = this.stopEvent.bind(this)   
        // 事件在拖动的元素或选择的文本离开有效的放置目标时触发
        this.projectPath.ondragleave = this.stopEvent.bind(this) 

        // 图标路径
        this.iconPath 				 = document.querySelector('#icon-path')        
        // 在元素正在拖动到放置目标并放开时触发
        this.iconPath.ondrop 		 = this.onDropEvent.bind(this)          
        // 在元素正在拖动到放置目标时触发
        this.iconPath.ondragover 	 = this.stopEvent.bind(this) 
        // 事件在拖动的元素或选择的文本进入到有效的放置目标时触发
        this.iconPath.ondragenter 	 = this.stopEvent.bind(this)   
        // 事件在拖动的元素或选择的文本离开有效的放置目标时触发
        this.iconPath.ondragleave 	 = this.stopEvent.bind(this)       

        // 选择按钮
        this.btnChooseProgects 		 = document.querySelector('#choose-projects')  
        this.btnChooseIcons   		 = document.querySelector('#choose-icons')  
        // 绑定点击事件
        this.btnChooseProgects.onclick 	= this.onButtonClick_chooseProject.bind(this)
        this.btnChooseIcons.onclick 	= this.onButtonClick_chooseIcon.bind(this)

    }

    // 拖拽选择目标路径
    onDropEvent(event) {        
        // 阻止元素发生默认的行为
        event.preventDefault() 
        // 阻止 click 事件冒泡到父元素
        event.stopPropagation() 
        // 拖曳过程中，可以用dataTransfer对象来传输数据，以便在拖曳结束时对数据进行其他的操作。
        var dt = event.dataTransfer 
         // 拖拽的路径 
        var filePath = dt.files[0].path 

        if (fs.statSync(filePath).isFile()) {
            event.target.value = "" 
        }else{
            event.target.value = filePath             
        }          
        
        return false 
    }

    // 不响应事件
    stopEvent(event) {
        event.preventDefault() 
        event.stopPropagation() 
        
        return false 
    }

    // 选择项目按钮点击事件
    onButtonClick_chooseProject(event) {
    	var filesList = openChooseDialog() || []
    	
    	if (filesList[0]) {
    		this.projectPath.value = filesList[0]
    	}
    }

    // 选择图标按钮点击事件
    onButtonClick_chooseIcon(event) {
    	var filesList = openChooseDialog() || []
    	
    	if (filesList[0]) {
    		this.iconPath.value = filesList[0]
    	}
    }    
  
}

/**
 * 绑定事件[按钮-点击-Unzip]
 * @param 	sender  事件对象
 * @return 
 * @author Lan <546945340@qq.com>
 */
function onButtonClick_btnExcute(sender) {
    // 输入框内容
    var projectPath = document.querySelector('#project-path').value 
    var iconPath 	= document.querySelector('#icon-path').value 

    if (projectPath == "" || iconPath == "" || !existsSync(projectPath) || !existsSync(iconPath)) {
        return alert("请检查输入!")
    }    
    
    if (true) {
    	// 重置数量
    	document.querySelector('#replaced-count').textContent = 0
    	document.querySelector('#all-count').textContent = 0
    }

    if (confirm("开始替换?", "提示")) {

    	// 重新计数
    	updateProgress(0)
    	// 寻找项目res文件夹获取替换资源列表
        findResFolder(projectPath)

        // 统计需要替换的资源路径并开始替换
        statistical(iconPath)    
    }    
}











//-----------------------
// 辅助函数
// ----------------------
/**
 * 寻找 res 文件夹
 * @param 	rootpath  根目录
 * @return 
 * @author Lan <546945340@qq.com>
 */
function findResFolder(rootpath) {
	var paths = readdirSync(rootpath)

	paths.forEach(function(url){
		var fullPath = pathJoin(rootpath, url)
		if (statSync(fullPath).isDirectory()) {
			if (url == "res") {
				var newPath = pathJoin(fullPath, "img")

				if (existsSync(newPath)) {
					findRecommendFolder(newPath)
				}		

			}else{
				findResFolder(fullPath)
			}
		}
	})
}

/**
 * 寻找 recommend 文件夹
 * @param 	rootpath  根目录
 * @return 
 * @author Lan <546945340@qq.com>
 */
function findRecommendFolder(rootpath) {	
	var paths = readdirSync(rootpath)
	paths.forEach(function(url){		
		url = pathJoin(url, "recommend")

		var workPath = pathJoin(rootpath, url)

		if (existsSync(workPath)) {			
			getIconPaths(workPath)			
		}
	})		
}


/**
 * 读取 recommend 文件夹图片
 * @param 	rootpath  根目录
 * @return 
 * @author Lan <546945340@qq.com>
 */
function getIconPaths(rootpath) {
	var paths = readdirSync(rootpath)

	paths.forEach(function(url) {		
		// 需要替换的图片路径
		var picPath = pathJoin(rootpath, url)
		
		willReplacePaths.push(picPath)		
	})
}

/**
 * 获取图标资源列表
 * @param 	rootpath  根目录
 * @return 
 * @author Lan <546945340@qq.com>
 */
function getIconFileList(rootpath) {
	// 获取文件列表
	var fileList  = readdirSync(rootpath)
	// 文件路径列表
	var filePaths = []

	fileList.forEach(function(url) {
		var filePath = pathJoin(rootpath, url)

		filePaths.push(filePath)
	})

	return filePaths
}

/**
 * 开始替换文件列表内容
 * @param 	willreplace   将要替换的资源目录
 * @param 	srclist   	  图标资源目录
 * @return 
 * @author Lan <546945340@qq.com>
 */
function replaceIcons(willreplace, srclist) {
	// 遍历要替换的资源
	willreplace.forEach(function(url) {		
		// 遍历资源列表
		srclist.forEach(function(file) {
			if (baseName(url) == baseName(file)) {
				// 找到则替换
				copyFile(file, url, function() {					
					hasReplacedCount++
					updateProgress(hasReplacedCount)	
					if (willReplaceCount == hasReplacedCount) {
						alert("替换完成!")
					}
				})			
			}
		})
	})
}

/**
 * 更新进度显示
 * @param 	complete   已完成
 * @return 
 * @author Lan <546945340@qq.com>
 */
function updateProgress(complete) {
	elementComplete.textContent = complete	
}

/**
 * 对比列表计算所有要替换的资源
 * @param 	iconPath   资源路径
 * @return 
 * @author Lan <546945340@qq.com>
 */
function statistical(iconPath) {
	var list 		 = []
	// 获取图标资源列表
    var iconList 	 = getIconFileList(iconPath)

    iconList.forEach(function(src) {
    	willReplacePaths.forEach(function(iconpath) {
    		if (baseName(src) == baseName(iconpath)) {
    			
    			list.push(iconpath)
    		}
    	})
    })

    // 设置所有替换数值
    willReplaceCount = list.length
    document.querySelector('#all-count').textContent = willReplaceCount

    willReplacePaths = []

    return replaceIcons(list, iconList)    
}





//-----------------------
// 入口函数
// ----------------------
if (true) {
	main()
}