// +----------------------------------------------------------------------
// | Code.Cap [ All samples in it! ]
// +----------------------------------------------------------------------
// | Copyright (c) 2015 All rights reserved.
// +----------------------------------------------------------------------
// | Author: Lan <546945340@qq.com> <http://do.org.cn>
// +----------------------------------------------------------------------
//-----------------------
// 变量定义 - 全局
// ----------------------
// [变量]压缩文件根目录
var globalRootPath  = null












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
        var uiHandler = new UIHandler()
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
        // 目标路径
        this.pathBox = document.querySelector('#unzip-path');

        this.pathBox.ondrop = this.onDropEvent.bind(this);
         
        // 在元素正在拖动到放置目标时触发
        this.pathBox.ondragover = this.stopEvent.bind(this);
        // 事件在拖动的元素或选择的文本进入到有效的放置目标时触发
        this.pathBox.ondragenter = this.stopEvent.bind(this);  
        // 事件在拖动的元素或选择的文本离开有效的放置目标时触发
        this.pathBox.ondragleave = this.stopEvent.bind(this);       
    }

    // 拖拽选择目标路径
    onDropEvent(event) {        
        // 阻止元素发生默认的行为
        event.preventDefault();
        // 阻止 click 事件冒泡到父元素
        event.stopPropagation();
        // 拖曳过程中，可以用dataTransfer对象来传输数据，以便在拖曳结束时对数据进行其他的操作。
        var dt = event.dataTransfer;
         // 拖拽的路径 
        var filePath = dt.files[0].path;

        if (fs.statSync(filePath).isFile()) {
            event.target.value = "";
        }else{
            event.target.value = filePath;            
        };         
        
        return false;
    }

    // 不响应事件
    stopEvent(event) {
        event.preventDefault();
        event.stopPropagation();
        
        return false;
    }
}

/**
 * 绑定事件[按钮-点击-Unzip]
 * @return 
 * @author Lan <546945340@qq.com>
 */
function onButtonClick_btnUnzip(sender, e) {
    // return console.log(sep())
    
    var rootPath = document.querySelector('#unzip-path').value;

    if (!existsSync(rootPath) || statSync(rootPath).isFile()) {
        return alert("请检查输入!")
    }

     
    // 记录全局路径
    globalRootPath = rootPath

    if (confirm("开始压缩?", "提示")) {
        // 统计根目录下压缩文件数量
        var total = statisticsZipCount(rootPath)   

        // 已完成标签/ 按钮
        var elementcompleted = document.querySelector('#completed'),
            elementbtn       = document.querySelector('#btn-unzip')

        // 设置变量值
        setGlobalVariable(total, elementcompleted, elementbtn)

        // 关闭按钮点击
        elementbtn.disabled = true

        traverDirAndUnzipFile(rootPath, true)
    }    
}











//-----------------------
// 辅助函数
// ----------------------
/**
 * 遍历文件夹 - 解压zip文件
 * @param rootPath 根目录
 * @param depth    是否深度遍历
 * @return 
 * @author Lan <546945340@qq.com>
 */
function traverDirAndUnzipFile(rootPath, depth) {
	var pathList = readdirSync(rootPath)

	pathList.forEach(function (file) {	

		var filePath  = pathJoin(rootPath, file)

		if (statSync(filePath).isDirectory()) {
			traverDirAndUnzipFile(filePath, depth)
            
		}else if (extName(file) == ".zip") {
			var basename  = baseName(file,".zip")
			var storePath = rootPath

			if (depth) {
				storePath = pathJoin(rootPath, basename)
				if ( !existsSync(storePath) ) {
					mkdirSync(storePath)
				}                           
			} 			
		
			if (depth) {
				// 解压文件之后继续深度解压
				unzipFile(filePath, storePath, function(){
					traverDirAndUnzipFile(storePath, false)
				})
			} else {
				// 不进行深度解压 - 文件迁移
				unzipFile(filePath, storePath, function() {                    
                    migrateFileAndDeleteFolder(storePath)
                })
			}
		}	
	})
    
}

/**
 * 迁移ipa文件删除bin目录
 * @param rootPath 根目录
 * @param depth    是否深度遍历
 * @return 
 * @author Lan <546945340@qq.com>
 */
function migrateFileAndDeleteFolder(rootPath) {    
    var workPath = pathJoin(rootPath, "bin")
    var fileList = readdirSync(workPath)
    fileList.forEach(function(file) {        
        if (statSync(pathJoin(workPath, file)).isFile() && extName(file) == ".ipa") {     
            copyFile(pathJoin(workPath, file), pathJoin(rootPath, file), function(){
                // 复制完成后删除bin文件夹
                deleteFolder(workPath)

                // 删除 bin 文件夹后,拷贝项目到根目录下                
                if (true) {

                    var pathArray = workPath.split(sep())                
                    var index = pathArray.indexOf("zip")               
                    var zipFilePath     = pathJoin(globalRootPath, pathArray[index - 1])
                    var projectRootPath = pathJoin(zipFilePath, "zip")

                    copyFolder(projectRootPath, globalRootPath, zipFilePath)
                }
                
            })
        }
    })
}

/**
 * 统计根目录下压缩文件
 * @param rootPath 根目录
 * @return 
 * @author Lan <546945340@qq.com>
 */
function statisticsZipCount(rootPath) {
    var files = readdirSync(rootPath)
    var total = 0

    files.forEach(function(file){
        if (extName(file) == ".zip") {
            total++
        }
    })

    // 统计总数量    
    document.querySelector('#total').textContent = total
    return total
}









//-----------------------
// 入口函数
// ----------------------
if (true) {
	main()
};