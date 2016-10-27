// +----------------------------------------------------------------------
// | Code.Cap [ All samples in it! ]
// +----------------------------------------------------------------------
// | Copyright (c) 2016 All rights reserved.
// +----------------------------------------------------------------------
// | Author: canaddy <canaddy_2007@126.com> <https://github.com/canaddy/electron>
// +----------------------------------------------------------------------
//-----------------------
// 变量定义 - 全局
// ----------------------












//-----------------------
// 主函数 - 程序入口
// ----------------------
/**
 * 入口函数
 * @return 
 * @author canaddy <canaddy_2007@126.com>
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
 * 绑定事件[按钮-生成]
 * @description
 * @param 	sender  事件对象
 * @return 
 * @author canaddy <canaddy_2007@126.com>
 */
function onButtonClick_generate(sender) {
	var self = sender

}







/**
 * 绑定事件[按钮-复制]
 * @description
 * @param 	sender  事件对象
 * @return 
 * @author canaddy <canaddy_2007@126.com>
 */
function onButtonClick_copy() {
   	var copy_textarea       = document.querySelector('#copy_textarea')
   	// var s = copy_textarea.value

}


/**
 * 绑定事件[文本框-输入完成]
 * @description
 * @param 	sender  事件对象
 * @return 
 * @author canaddy <canaddy_2007@126.com>
 */
// function OnInputonKeyUp_Check(sender) {
// 	var self = this
//     // 项目路径
//     var adopt_product_text     = document.querySelector('#adopt_product_text')
//    	var remaining_product_text = document.querySelector('#remaining_product_text')
//   	var all_product_text       = document.querySelector('#all_product_text')
//   	var percentage_span       = document.querySelector('#percentage_span')
// }


/**
 * 更新进度显示
 * @param 	complete   已完成
 * @return 
 * @author Lan <546945340@qq.com>
 */
function updateProgress(sender){
	var self = sender

	self.value= self.value.replace(/\D/g,'')
    var adopt_product_text       = document.querySelector('#adopt_product_text')
    var remaining_product_text   = document.querySelector('#remaining_product_text')
    var all_product_span         = document.querySelector('#all_product_span')
  	var percentage_span       	 = document.querySelector('#percentage_span')

  	all_product_span.textContent =  parseInt(adopt_product_text.value) + parseInt(remaining_product_text.value)
    // if(adopt_product_text.value < all_product_text.textContent){
	var complete                = parseInt(adopt_product_text.value)/parseInt(all_product_span.textContent)*100

	percentage_span.textContent = complete	
    // }
}




//-----------------------
// 入口函数
// ----------------------
if (true) {
	main()
};