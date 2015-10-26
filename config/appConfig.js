/**
 * Created by ctrip on 15/10/20.
 * 整个工程的配置文件.
 */

var _config = {
    //工程的title
    siteTitle: '金融平台管理工具'
    //默认路由
    , homepage: '/test/index'
    //公共错误页
    , errorpage: '/share/errorPage'
	
	
	//Db config
	, host: 'pub.mysql.db.fat.qa.nt.ctripcorp.com' 
    , user: 'us_test_wanggy'
    , password: '1qaz@WSX' 
    , database: 'finflproductdb'
    , port: 55666  
}

exports.content = _config;
