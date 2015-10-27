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

//����
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


//�޸�
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

//ɾ��
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


//����ģ��ӿڶ���
module.exports.queryPersonList = queryPersonList;
module.exports.createPerson = createPerson;
module.exports.removePerson = removePerson;
module.exports.updatePerson = updatePerson;
