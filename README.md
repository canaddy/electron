----------------
electron 
----------------

一.环境准备：
1. 安装node.js 和 npm [链接 https://nodejs.org/en/]

2. 全局安装electron [npm install electron -g]

二.创建Electron应用：
1. 在任何地方，建立一个app的目录, 在控制台使用 npm init 命令，接下来一路enter键。

2. 之后在 app下会自动生成一个 package.json 文件,里面记录的是有关应用的一些信息[包括应用名称、版本、主进程运行的脚本等]，可以手动进行修改。
    例：
    {
      "name": "abc",          
      "version": "1.0.0",    
      "description": "",
      "main": "index.js",   
      "scripts": {
          "start": "electron .",
        "test": "echo \"Error: no test specified\" && exit 1"
      },
      "author": "",
      "license": "ISC"
    }

3. 在app目录下再创建两个文件，一个是 index.js[程序入口文件,命名要与package.json中 "main"后面的文件名对应];
   另一个是 index.html[程序初始窗口的界面,命名要与"index.js"入口文件中载入的文件名一致,内容无要求]。
   入口文件内容示例：index.js   
   ---------------------------------------------------------------------
       const electron = require('electron');
    // 控制应用生命周期的模块
    const {app} = electron;
    // 创建本地浏览器窗口的模块
    const {BrowserWindow} = electron;

    var mainWindow = null;
    // 当Electron完成初始化并且已经创建了浏览器窗口，则该方法将会被调用。
    app.on('ready', function() {
        mainWindow = new BrowserWindow({
            height: 600,
            width: 400
        });

        mainWindow.loadURL('file://' + __dirname + '/page.html');
        // 打开开发工具页面
        // mainWindow.webContents.openDevTools()
    });
   ---------------------------------------------------------------------

4. 在命令行中切换到 app 目录下, 再输入 "electron ." 或 "npm start" 运行程序。

三.打包应用
1. 打包成可执行文件需要安装electron-prebuilt, 输入命令"npm install --save-dev electron-prebuilt" ["--save-dev"命令会在package.json文件中将它设置为开发依赖]

2. 再安装packer, 命令: "npm install --save-dev electron-packager", 之后会在 package.json 中多出如下信息。
   ---------------------------------
    "electron-packager": "^8.1.0",
    "electron-prebuilt": "^1.4.3"
   ---------------------------------

3. 配置信息：在 package.json 的 "scripts" 中添加如下信息
   "packager": "electron-packager <sourcedir> <appname> --platform=<platform> --arch=<arch> [optional flags...]"

   参数说明：
    <sourcedir>： 项目的位置

    <appname>： 应用名

    --platform=<platform>： 打包的系统(darwin、win32、linux)

    --arch=<arch>： 系统位数(ia32、x64)

    --icon=<icon>： 指定应用的图标(Mac 为 .icns 文件，Windows 为 .ico 或 .png)

    --out <out>： 指定输出的目录

    --version=<version>： 指定编译的 electron-prebuilt 版本
    示例：
    --------------------------------------------------------
    "packager": "electron-packager ./ appname --platform=win32 --arch=x64 --out ./OutApp --version 1.4.3 --icon=./2.ico --ignore=dev-settings --prune"

    ./ 表示文件当前位置
    --version 表示electron-prebuilt版本,安装packer后可直接在package.json中查看
    --ignore 命令可以排除掉例如electron等程序运行不必要的包减小包大小
    --------------------------------------------------------

5. 在项目文件夹下运行 npm run-scritp package 便可在指定的输出路径下打出exe包[windows下不是单个的exe文件]