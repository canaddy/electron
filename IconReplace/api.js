// +----------------------------------------------------------------------
// | Code.Cap [ All samples in it! ]
// +----------------------------------------------------------------------
// | Copyright (c) 2015 http://ac.asia All rights reserved.
// +----------------------------------------------------------------------
// | Author: AC <63371896@qq.com> <http://do.org.cn>
// +----------------------------------------------------------------------
//-----------------------
// 生命周期 - Electron
// ----------------------
// [模块]应用核心
const electron 			= require('electron')
// [模块]应用程序渲染进程
const {ipcRenderer} 	= electron
// [模块]远程通讯模块
const {remote}          = electron
// [模块]文件系统
const fs			 	= require('fs')
// [模块]路径处理
const path 				= require('path')











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
 * @author AC <63371896@qq.com>
 */
function postNotification(event, arg1, arg2, arg3) {
	ipcRenderer.send(event, arg1, arg2, arg3)
}










//-----------------------
// 全局方法 - 公共
// ----------------------
/**
 * 获取系统的路径分割符
 * @param  
 * @return  
 * @author Lan <546945340@qq.com>
 */
function getSep() {
    return path.sep
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
 * 文件选择 - 选择文件路径
 * @param 	
 * @return  
 * @author Lan <546945340@qq.com>
 */
function openChooseDialog() {
	// properties: ['openFile', 'openDirectory', 'multiSelections']}
	return remote.dialog.showOpenDialog({properties: ['openDirectory']})
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


 