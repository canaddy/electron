// +----------------------------------------------------------------------
// | Code.Cap [ All samples in it! ]
// +----------------------------------------------------------------------
// | Copyright (c) 2015 http://ac.asia All rights reserved.
// +----------------------------------------------------------------------
// | Author: AC <63371896@qq.com> <http://do.org.cn>
// +----------------------------------------------------------------------
//-----------------------
// 载入模块
//-----------------------
// [模块]应用核心
const electron 			= require('electron')
// [模块]应用生命周期
const {app} 			= electron
// [模块]应用程序窗口
const {BrowserWindow} 	= electron
// [模块]应用程序主进程
const {ipcMain}         = electron
// [模块]对话框
const {dialog}          = electron
// [模块]响应事件
const server            = require('./sever.js').functions










//-----------------------
// 定义变量
//-----------------------
// [变量]应用程序窗口
var mainWindow = null










//-----------------------
// 声明事件
//-----------------------
/**
 * 绑定事件[应用程序载入]
 * @return 
 * @author AC <63371896@qq.com>
 */
function onReady() {
	// 创建应用程序窗口
    mainWindow = new BrowserWindow({
    	// 设置宽度
        width: 		400,
    	// 设置高度
        height: 	600,
        // 设置是否改变大小
        // resizable: 	false,        
    })

    // 加载入口页面
    mainWindow.loadURL('file://' + __dirname + '/client.html')
    // 打开调试模式
    mainWindow.webContents.openDevTools()

    // 绑定窗口事件
    if (true) {
    	// 绑定事件[关闭]
    	mainWindow.on('closed', onMainWindowClosed)
    	// 绑定事件[其他]
    	mainWindow.on('otherwise', onMainWindowOtherwise)
    }
    // 执行全局事件
    if (true) {
        // 执行事件[启动]
        server.onStartup()
    }
}

/**
 * 绑定事件[应用程序关闭]
 * @return 
 * @author AC <63371896@qq.com>
 */
function onTerminate() {
    // 执行全局事件
    if (true) {
        // 执行事件[关闭]
        server.onShutdown()
    }
    // 退出应用程序
    if (process.platform !== 'darwin') {
        app.quit()
    }
}

/**
 * 绑定事件[应用程序窗口 - 关闭]
 * @return 
 * @author AC <63371896@qq.com>
 */
function onMainWindowClosed() {
	mainWindow = null
}

/**
 * 绑定事件[应用程序窗口 - 其他]
 * @return 
 * @author AC <63371896@qq.com>
 */
function onMainWindowOtherwise() {
	console.log('调用事件: 应用程序窗口 - 其他')
}










//-----------------------
// 入口函数
//-----------------------
if (true) {
	// [绑定事件]应用程序载入
	app.on('ready', onReady)
	// [绑定事件]应用程序关闭
	app.on('window-all-closed', onTerminate)

    // [绑定事件]
    ipcMain.on('onButtonClick_btnClickMe', server.onButtonClick_btnClickMe)
}