/*
 * 处理请求的 路由 模块(自定义模块)
 *
 * 1. 路由找到 指定视图的控制器.
 * 2.
 */

//文件系统 操作模块.
var fs = require('fs');
//加载 url 模块, 提供一些url相关的工具
var urlTool = require("url");

function route(request, response, data) {

    var config = require(__rootpath + '/config/appConfig').content;
    var tools = require(__rootpath + '/common/tools').tools;
    //分离出 controller 和 action
    var controller, action, pathHash, controllerModule;

	//解析path
	var path = urlTool.parse(request.url).pathname;
	
    //如果是默认路径, 则使用 配置文件中的homepage内容.
    if (path == '/') path = config.homepage;

    //分享出, controller 和 action的值.
    pathHash = path.split('/');
    controller = pathHash[1];
    action = pathHash[2];

    //尝试去加载, 指定的控制器.
    try {		
        controllerModule = require(__rootpath + '/controllers/' + controller + 'Controller');		
    } catch(e) {
        //指定控制器没加载到, 加载配置中的公共错误页.
        gotoErrorPage(0);
    }

    //拿到controller 之后.  按照action去调用 view控制器
    if (controllerModule[action] && typeof controllerModule[action] === 'object') {
        //拿到控制器对应的 视图.
        var view;
        try {		
            view = fs.readFileSync(__rootpath + '/views' + path + '.html', 'utf-8');
        } catch(e) {
            gotoErrorPage(1);
        }

        controllerModule[action]['run'](request, response, tools.renderView(view));
    } else {
        //没找到控制器.
        gotoErrorPage(2);
    }

    //显示公共错误页的方法.
    function gotoErrorPage(fromMethod) {
		console.log(fromMethod)
        pathHash = config.errorpage.split('/');

        controller = pathHash[1];
        action = pathHash[2];

        controllerModule = require(__rootpath + '/controllers/' + controller + 'Controller');
        controllerModule[action]['run'](request, response, fs.readFileSync(__rootpath + '/views/' + controller + '/' + action + '.html', 'utf-8'));
    }
}

exports.route = route;