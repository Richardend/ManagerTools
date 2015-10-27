/**
 * Created by ctrip on 15/10/20.
 * for test search db controller by alf
 */
var registHelp = require(__rootpath + '/common/registController');
var personBLL = require(__rootpath + '/bll/personBLL');
var util = require('util');

//加载 url 模块, 提供一些url相关的工具
var urlTool = require("url");

registHelp.registController(exports, {

	manage: function () {
	
		var returnView  = this;		
			
		var args = urlTool.parse(this.request.url, true).query;
		
		var methodType = args.methodType;
		
		var pageSize = args.pageSize = args.pageSize ? args.pageSize : 5;
		
		//添加
		if(methodType === "create"){	
			//组织参数
			var model = {name: args.newName, age: args.newAge, favorite: args.newFav }
		
			//请求业务方法
			personBLL.createPerson(model,function(result){  
						
				if(!result){
					console.log("add failed");
					this.response.end();
				}
				else {
					//组织参数
					var searchCondition = {name:args.newName, pageIndex: 1 };
					
					//请求业务方法
					personBLL.queryPersonList(searchCondition,function(result,pager){  
								
						if(!result){
							console.log("no result0");
						}
						else {
							var totalPages = pager.totalNum % pageSize == 0 ? pager.totalNum / pageSize : Math.floor(pager.totalNum / pageSize) + 1 
							var datamodel = {data:result, totalPages: totalPages, pageIndex:pager.pageIndex , pageSize:pager.pageSize };
							returnView.render(datamodel);				
						}
					}); 
				}
			}); 
		}
		//修改
		else if(methodType === "update"){
			console.log("update")
			//组织参数
			var model = {name: args.newName, age: args.newAge, favorite: args.newFav, id:args.personid }
		
			//请求业务方法
			personBLL.updatePerson(model,function(result){  
						
				if(!result){
					console.log("update failed");
				}
				else {
					//组织参数
					var searchCondition = {name:args.newName, pageIndex: 1  };
					
					//请求业务方法
					personBLL.queryPersonList(searchCondition,function(result,pager){  
								
						if(!result){
							console.log("no result1");
						}
						else {
							var totalPages = pager.totalNum % pageSize == 0 ? pager.totalNum / pageSize : Math.floor(pager.totalNum / pageSize) + 1 
							var datamodel = {data:result, totalPages: totalPages, pageIndex:pager.pageIndex , pageSize:pager.pageSize };
							returnView.render(datamodel);					
						}
					}); 
				}
			}); 
			
		}
		else if(methodType === "delete"){
			console.log("delete");
			//组织参数
			var model = {id: args.personid }
		
			//请求业务方法
			personBLL.removePerson(model,function(result){  
						
				if(!result){
					console.log("remove failed");
				}
				else {
					//组织参数
					var searchCondition = {pageIndex: 1, pageSize : pageSize  };
					
					//请求业务方法
					personBLL.queryPersonList(searchCondition,function(result,pager){  
								
						if(!result){
							console.log("no result2");
						}
						else {
							var totalPages = pager.totalNum % pageSize == 0 ? pager.totalNum / pageSize : Math.floor(pager.totalNum / pageSize) + 1 
							var datamodel = {data:result, totalPages: totalPages, pageIndex:pager.pageIndex , pageSize:pager.pageSize };
							returnView.render(datamodel);				
						}
					}); 
				}
			}); 
		}
		else{			
			//组织参数
			args && delete args["btnSearch"] && delete args["totalPages"];   

			//请求业务方法
			personBLL.queryPersonList(args,function(result,pager){  
						
				if(!result){
					console.log("no result3");
				}
				else {
					var totalPages = pager.totalNum % pageSize == 0 ? pager.totalNum / pageSize : Math.floor(pager.totalNum / pageSize) + 1 
					var datamodel = {data:result, totalPages: totalPages, pageIndex:pager.pageIndex , pageSize:pageSize };
					returnView.render(datamodel);				
				}
			}); 
		}			
		
    }

});