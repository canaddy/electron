// +----------------------------------------------------------------------
// | Code.Cap [ All samples in it! ]
// +----------------------------------------------------------------------
// | Copyright (c) 2015 http://ac.asia All rights reserved.
// +----------------------------------------------------------------------
// | Author: AC <63371896@qq.com> <http://do.org.cn>
// +----------------------------------------------------------------------
//-----------------------
// 事件定义 - 生命周期
// ----------------------
/**
 * 绑定事件[应用程序启动]
 * @return 
 * @author AC <63371896@qq.com>
 */
function onStartup() {

}

/**
 * 绑定事件[应用程序关闭]
 * @return 
 * @author AC <63371896@qq.com>
 */
function onShutdown() {

}










//-----------------------
// 事件定义 - 控件事件
// ----------------------
/**
 * 绑定事件[按钮-点击-btnClickMe]
 * @return 
 * @author AC <63371896@qq.com>
 */
function onButtonClick_btnClickMe(sender, e) {
    console.log('Triggle onButtonClick_btnClickMe - by server!')
    console.log('client e: ' + e)
}










//-----------------------
// 事件注册
// ----------------------
exports.functions = {
	onStartup: onStartup,
	onShutdown: onShutdown,
	onButtonClick_btnClickMe: onButtonClick_btnClickMe,
}