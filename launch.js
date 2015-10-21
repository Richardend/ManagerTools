/**
 * Created by ctrip on 15/10/20.
 */
/*
 * 服务器的 主入口文件.
 */

var server = require('./appstart/Server');
//加载自定义模块. 根据不同的来源, 处理请求并返回相应的响应.
var routeModel = require("./appstart/route");
console.log(__dirname)
//保存当前工程的根目录
global.__rootpath = __dirname;

//underscore
global._ = require('underscore');

//起一个服务, 并且告知服务 使用哪个模块(方法: 方法编程)来处理路由逻辑.
//传说中的 依赖注入方式.
server.start(routeModel.route);