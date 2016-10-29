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
// [模块]生命周期
const {remote} 			= electron
// [模块]应用程序渲染进程
const {ipcRenderer} 	= electron
// [模块]文件系统
const fs     		 	= require('fs')
// [模块]路径处理
const path			 	= require('path')











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
 * 隐藏元素
 * @param sender 元素
 * @return 
 * @author AC <63371896@qq.com>
 */
function hidden(sender) {
	$("#" + sender).removeClass("show").addClass("hidden")
}

/**
 * 显示元素
 * @param sender 元素
 * @return 
 * @author AC <63371896@qq.com>
 */
function show(sender) {
	$("#" + sender).removeClass("hidden").addClass("show")
}