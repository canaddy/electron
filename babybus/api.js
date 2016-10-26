// +----------------------------------------------------------------------
// | Code.Cap [ All samples in it! ]
// +----------------------------------------------------------------------
// | Copyright (c) 2015 All rights reserved.
// +----------------------------------------------------------------------
// | Author: Lan <546945340@qq.com> <http://do.org.cn>
// +----------------------------------------------------------------------
//-----------------------
// 生命周期 - Electron
// ----------------------
// [模块]应用核心
const electron 			= require('electron')
// [模块]应用程序渲染进程
const {ipcRenderer} 	= electron
// [模块]文件系统
const fs			 	= require('fs')
// [模块]路径处理
const path 				= require('path')
// [模块]解压模块
const unzip 			= require('unzip')










//-----------------------
// 变量定义 - 全局
// ----------------------
// [变量]完成数量
var completed 		  = 0
// [变量]压缩文件总数量
var total     		  = 0
// [变量]已完成标签
var elementCompleted  = null
// [变量]已完成标签
var elementButton     = null











//-----------------------
// 全局方法 - 消息发送
// ----------------------
/**
 * 发送事件通知
 * @param event 事件
 * @param arg1  参数1
 * @param arg2  参数2
 * @param arg3  参数3
 * @return 
 * @author Lan <546945340@qq.com>
 */
function postNotification(event, arg1, arg2, arg3) {
	ipcRenderer.send(event, arg1, arg2, arg3)
}











//-----------------------
// 全局方法 - 公共
// ----------------------
/**
 * 设置变量值
 * @param 	value    			压缩文件数量
 * @param 	elementcompleted    元素 - 完成数量
 * @param 	elementbtn          元素 - 按钮
 * @return  boolean
 * @author Lan <546945340@qq.com>
 */
function setGlobalVariable(value, elementcompleted, elementbtn) {
	// [变量]压缩文件总数量
	total 			  = value
	// [变量]已完成标签
	elementCompleted  = elementcompleted
	// [变量]已完成标签
	elementButton     = elementbtn
}

/**
 * 文件系统 - 文件是否存在 - 同步
 * @param 	url 对象路径
 * @return  boolean
 * @author Lan <546945340@qq.com>
 */
function existsSync(url) {
	return fs.existsSync(url)
}

/**
 * 文件系统 - 创建文件夹 - 同步
 * @param 	url 路径
 * @return   
 * @author Lan <546945340@qq.com>
 */
function mkdirSync(url) {
	fs.mkdirSync(url)
}

/**
 * 文件系统 - 获取文件属性 - 同步
 * @param 	url   路径
 * @return  stat  属性集合
 * @author Lan <546945340@qq.com>
 */
function statSync(url) {
	var stat = fs.statSync(url)
	return stat
}

/**
 * 文件系统 - 获取目录下文件的路径列表 - 同步
 * @param 	url    路径
 * @return  paths  路径集合
 * @author Lan <546945340@qq.com>
 */
function readdirSync(url) {
	var paths = fs.readdirSync(url)
	return paths
}

/**
 * 路径处理 - 路径拼接
 * @param 	path1    路径1
 * @param   path2    路径2
 * @return  newPath  新路径
 * @author Lan <546945340@qq.com>
 */
function pathJoin(path1, path2) {
	var newPath = path.join(path1, path2)
	return newPath
}

/**
 * 路径处理 - 路径名称
 * @param 	url       文件全路径
 * @return  dirname   文件父目录路径
 * @author Lan <546945340@qq.com>
 */
function dirName(url) {
	var dirname = path.dirname(url)
	return dirname
}

/**
 * 路径处理 - 文件名
 * @param 	url        全路径
 * @param 	ext        后缀[可选]
 * @return  basename   最后一级路径
 * @author Lan <546945340@qq.com>
 */
function baseName(url, ext) {
	var basename = path.basename(url, ext)
	return basename
}

/**
 * 路径处理 - 文件拓展名
 * @param 	filename        文件名
 * @return  extname         文件拓展名
 * @author Lan <546945340@qq.com>
 */
function extName(filename) {
	var extname = path.extname(filename)
	return extname
}

/**
 * 文件解压
 * @param 	filepath        文件路径
 * @param   storepath       存储路径
 * @param   handle          回调函数
 * @return  extname         文件拓展名
 * @author Lan <546945340@qq.com>
 */
function unzipFile(filepath, storepath, handle) {
	var rs = fs.createReadStream(filepath)
	rs.pipe(unzip.Extract({ path: storepath})) 

	// 事件注册 - 读取完毕
	if (handle) {
		rs.on('end',handle)	
	}  	 	  
}

/**
 * 复制文件
 * @param 	src        源文件路径
 * @param   dst        存储路径
 * @param   handle     回调函数
 * @return  
 * @author Lan <546945340@qq.com>
 */
 function copyFile(src, dst, handle) {
 	// 是文件则直接写入
    var readable, writable
    // 创建读取流
    readable = fs.createReadStream(src)
    // 创建写入流
    writable = fs.createWriteStream(dst)
    // 通过管道来传输流
    readable.pipe(writable) 
    if (handle) {
    	readable.on('end',handle)
    } 
 }


 /**
 * 拷贝目录
 * @param 	src        源路径
 * @param 	dst        目标路径
 * @param 	zippath    压缩文件解压目录
 * @return  
 * @author Lan <546945340@qq.com>
 */
function copyFolder(src, dst, zippath){
	var exists = fs.existsSync(dst)     
    if( !exists ){            
        // 不存在需要先进行创建        
        fs.mkdirSync(dst)                
    }

    // 读取资源目录中的所有文件/目录
    var paths = fs.readdirSync(src) 
    
    paths.forEach(function(url){
        // 定义变量
        var _src = path.join(src, url),
            _dst = path.join(dst, url)             

        var stat = fs.statSync(_src)
                    
        if( stat.isDirectory()){
            // 如果是目录则递归调用自身
            copyFolder( _src, _dst, zippath)
        }else{      
            copyFile( _src, _dst, function() {
            	if (extName(baseName(_src)) == ".ipa") {
            		// 删除整个压缩文件目录
            		deleteFolder(zippath)

            		// 完成 +1
            		completed = completed + 1

            		elementCompleted.textContent = completed

            		if (completed == total) {
            			elementButton.disabled = false
            			alert("解压完成!")
            		}
            	}
            })
        }        
    })
}

 /**
 * 删除目录
 * @param 	rootpath        目录路径
 * @return  
 * @author Lan <546945340@qq.com>
 */
function deleteFolder(rootpath) {
 	var files = []
    files = fs.readdirSync(rootpath)
    files.forEach(function(file,index){
        var curPath = path.join(rootpath, file)
        if(fs.statSync(curPath).isDirectory()) { 
            // 递归遍历文件夹
            deleteFolder(curPath)
        } else { 
            // 删除文件
            fs.unlinkSync(curPath)
        }
    }) 
    
    
	if (fs.readdirSync(rootpath).length == 0) {
		fs.rmdirSync(rootpath)
	} else {
		var schedule = setInterval(function() {        
	        if (fs.readdirSync(rootpath).length == 0) {
	            clearInterval(schedule)            
	            fs.rmdirSync(rootpath)
	        }
	    }, 0.1) 
	}
       
}


function sep(argument) {
    return path.sep
}
 

