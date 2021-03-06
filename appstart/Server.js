//加载[require] Node.js 自带的 http 模块.
var http = require("http");

function start(routeMethod) {

	http.createServer(function (request, response) {
		try{
			/*
				接收参数时, 像oc接收接口响应一样. 是分段传输的.
				在监听 request的data 事件时, 拼接data. 
				在全部请求接收完成时, 触发 request的end事件.  在这里才把请求数据提交给路由处理.
			*/
			var data = "";		

			if (request.url.indexOf('/favicon.ico') === -1) {
				//指定响应的状态和 头部 Content-type 类型
				response.writeHead(200, {"Content-type": "text/html"});

				//设置请求数据 接收时的编码
				request.setEncoding('utf8');
			
				//路由
				routeMethod(request, response);			
			}
		}catch(ex){		
			console.log(ex)
			//响应结束
			response.end();
		}
	})
	//指定这个Server的端口
	.listen(8080);

}

exports.start = start;