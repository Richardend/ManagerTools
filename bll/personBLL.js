/**
 * Created by ctrip on 15/10/20.
 * for test person bll by alf
 */
var util = require('util');
var personDAL = require(__rootpath + '/dal/personDAL');

//search list
var queryPersonList = function(args,callback){ 
	personDAL.queryPersonList(args,function(result,pager){  		
		callback(result,pager);
	}); 	
}; 

//增加
var createPerson = function(model,callback){ 
	personDAL.createPerson(model,function(err,vals,fields){  
		if(err){
			console.log(util.inspect(err));
		}
		else {				
			callback(vals);						
		}
	}); 	
}; 


//修改
var updatePerson = function(model,callback){ 
	personDAL.updatePerson(model,function(err,vals,fields){  
		if(err){
			console.log(util.inspect(err));
		}
		else {				
			callback(vals);						
		}
	}); 	
}; 

//删除
var removePerson = function(model,callback){ 
	personDAL.removePerson(model,function(err,vals,fields){  
		if(err){
			console.log(util.inspect(err));
		}
		else {				
			callback(vals);						
		}
	}); 	
}; 


//赋予模块接口定义
module.exports.queryPersonList = queryPersonList;
module.exports.createPerson = createPerson;
module.exports.removePerson = removePerson;
module.exports.updatePerson = updatePerson;
