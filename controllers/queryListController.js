/**
 * Created by ctrip on 15/10/20.
 * for test search db controller by alf
 */
var registHelp = require(__rootpath + '/common/registController');
var util = require('util');
var query = require(__rootpath + '/dal/queryList');
//加载 url 模块, 提供一些url相关的工具
var urlTool = require("url");

registHelp.registController(exports, {
    index: function () {

		var returnView  = this;		
			
		var arg = urlTool.parse(this.request.url, true).query;

		var sql = "";
		if(arg && arg.searchCondition){
			sql = "select * from personinfo where name like '%"+arg.searchCondition+"%' limit 10";
		}
		else{
			sql = "select * from personinfo limit 10";
		}

		query(sql,function(err,vals,fields){  
			if(err){
				console.log(util.inspect(err));
			}
			else {				
				var datamodel = {data:vals};
				returnView.render(datamodel);						
			}
		}); 
    }
});