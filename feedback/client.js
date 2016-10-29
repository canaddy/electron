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
    // document.addEventListener("DOMContentLoaded", function (event) {
    //     var uiHandler = new UIHandler()
    // })
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
  	let stringA = "通过产品个数:"
  	let stringB = "剩余产品个数:"
  	let stringC = "总共产品个数:"
  	let stringD = "打包进度:"
  	let stringE = "目前碰到问题:"
    var adopt_product_text       = document.querySelector('#adopt_product_text')
    var remaining_product_text   = document.querySelector('#remaining_product_text')
    var all_product_span         = document.querySelector('#all_product_span')
  	var percentage_span       	 = document.querySelector('#percentage_span')
  	var problem_textarea       	 = document.querySelector('#problem_textarea')
  	var all_string = stringA + adopt_product_text.value +"个\n"
  		+ stringB + remaining_product_text.value +"个\n"
  		+ stringC + all_product_span.textContent +"个\n"
  		+ stringD + percentage_span.textContent + "%\n"
  		+ problem_textarea.value
  	var copy_textarea       	 = document.querySelector('#copy_textarea')

  	copy_textarea.value = all_string
}







/**
 * 绑定事件[按钮-复制]
 * @description
 * @param 	sender  事件对象
 * @return 
 * @author canaddy <canaddy_2007@126.com>
 */
// function onButtonClick_copy() {
//    	// var copy_textarea       = document.querySelector('#copy_textarea')
//    	var s = copy_textarea.value
// 	var clipboard = new Clipboard('#copy_textarea');
// 	clipboard.on('success', function(e) {
// 	  console.info('Action:', e.action);
// 	  console.info('Text:', e.text);
// 	  console.info('Trigger:', e.trigger);
// 		alert("复制成功");
//   	e.clearSelection();
// 	});
 
// 	clipboard.on('error', function(e) {
// 	  console.error('Action:', e.action);
// 	  console.error('Trigger:', e.trigger);
// 	});
// }

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
    //保留两位小数
  	percentage_span.textContent = complete.toFixed(2)
    // }
}




//-----------------------
// 入口函数
// ----------------------
if (true) {
	main()
};