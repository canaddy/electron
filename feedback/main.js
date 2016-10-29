// +----------------------------------------------------------------------
// | Code.Cap [ All samples in it! ]
// +----------------------------------------------------------------------
// | Copyright (c) 2016 All rights reserved.
// +----------------------------------------------------------------------
// | Author: canaddy <canaddy_2007@126.com> <https://github.com/canaddy/electron>
// +----------------------------------------------------------------------
//-----------------------
// 载入模块
//-----------------------
// [模块]应用核心
const electron          = require('electron')
// [模块]应用生命周期
const {app}             = electron
// [模块]应用程序窗口
const {BrowserWindow}   = electron
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
 * @params
 * @return 
 * @author canaddy <canaddy_2007@126.com>
 */
function onReady() {
    // 创建应用程序窗口
    mainWindow = new BrowserWindow({
        // 设置宽度
        width:      350,
        // 设置高度
        height:     540,
        // 设置是否改变大小
        // resizable:   false,        
    })

    // 加载入口页面
    mainWindow.loadURL('file://' + __dirname + '/client.html')
    // 打开调试模式
    // mainWindow.webContents.openDevTools()

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
 * @params
 * @return 
 * @author canaddy <canaddy_2007@126.com>
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
 * 绑定事件[窗口打开]
 * @description 对于OS X系统，当dock图标被点击后会重新创建一个app窗口，并且不会有其他
 * @params
 * @return 
 * @author canaddy <canaddy_2007@126.com>
 */
function onActivate() {
    if(mainWindow === null){
        onReady()
    }
}

/**
 * 绑定事件[应用程序窗口 - 关闭]
 * @params
 * @return 
 * @author canaddy <canaddy_2007@126.com>
 */
function onMainWindowClosed() {
    mainWindow = null
}

/**
 * 绑定事件[应用程序窗口 - 其他]
 * @params
 * @return 
 * @author canaddy <canaddy_2007@126.com>
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
    //绑定事件[窗口打开]
    app.on('activate', onActivate)

    // [绑定事件]
    // ipcMain.on('onButtonClick_btnUnzip', server.onButtonClick_btnUnzip)
}