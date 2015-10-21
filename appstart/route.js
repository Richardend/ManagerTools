/*
 * 处理请求的 路由 模块(自定义模块)
 *
 * 1. 路由找到 指定视图的控制器.
 * 2.
 */

//文件系统 操作模块.
var fs = require('fs');

function route(path, response, data) {

    var config = require(__rootpath + '/config/appConfig').content;
    //分离出 controller 和 action
    var controller, action, pathHash, controllerModule;

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
        gotoErrorPage();
    }

    //拿到controller 之后.  按照action去调用 view控制器
    if (controllerModule[action] && typeof controllerModule[action] === 'function') {
        //拿到控制器对应的 视图.
        var view;
        try {
            view = fs.readFileSync(__rootpath + '/views' + path + '.html', 'utf-8');
        } catch(e) {
            gotoErrorPage();
        }

        controllerModule[action](response, view);
    } else {
        //没找到控制器.
        gotoErrorPage();
    }

    //显示公共错误页的方法.
    function gotoErrorPage() {
        pathHash = config.errorpage.split('/');

        controller = pathHash[1];
        action = pathHash[2];

        controllerModule = require(__rootpath + '/controllers/' + controller + 'Controller');
        controllerModule[action](response, fs.readFileSync(__rootpath + '/views/' + controller + '/' + action + '.html', 'utf-8'));
    }
}

exports.route = route;