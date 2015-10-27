/**
 * Created by ctrip on 15/10/20.
 * for test person bll by alf
 */
//refernce db connection
var connection = require(__rootpath + '/dal/dbConnection');

//search list
var queryPersonList = function(args,callback){ 

	var sql = "select * from personinfo";
	var totalNumSql = "select 1 from personinfo";
	
	//search condition organize
	if(args){
		//where			
		var flag = true;
		var orderby = "";
		
		for (var key in args){				
			if(key != "pageIndex" && key != "pageSize" && key != "orderby"){
				var tempComdition = "";
				if(flag === true){
					tempComdition = " where " + key + " like '%" + args[key]+"%'";
					sql += tempComdition;
					totalNumSql += tempComdition;
				}
				else{	
					tempComdition = " and " + key + "=" + args[key];
					sql += tempComdition;
					totalNumSql += tempComdition;
				}
				
				flag = false;
			}
			else{					
				if(key == "orderby"){
					orderby = " orderby " + args.orderby;
				}
			}				
		}
		
		
		//order by
		if(orderby){
			sql += " orderby " + args.orderby;
		}
		
		//设置默认值
		args.pageIndex = args.pageIndex ? args.pageIndex : 1;
		args.pageSize = args.pageSize ? args.pageSize : 10;
		
		//pager
		sql += " limit "+(args.pageIndex - 1) * args.pageSize + "," + args.pageSize;		
	}
	else{
		return;
	}
	

	//execute search
	connection.pool.getConnection(function(err,conn){  
        if(err){  
            callback(err,null,null);  
        }else{ 
			conn.query(totalNumSql,function(qerr,allrows){            				
                
				var pager = {
						totalNum:allrows.length
						, pageIndex: args.pageIndex
						, pageSize: args.pageSize };	
				
				//事件驱动回调 
				conn.query(sql,function(qerr,result){  
					//释放连接  
					conn.release(); 
					//事件驱动回调 					
					callback(result,pager);  
				});
            });  
			
           
        }  
    });  
}; 

//create a/an new person
var createPerson = function(args,callback){
	if(!args){
		return;
	}
	
	var sql = 'insert into personinfo set ?';
	
	//execute create
	connection.pool.getConnection(function(err,conn){  
        if(err){  
            callback(err,null,null);  
        }else{  
            conn.query(sql,args,function(qerr,vals,fields){  
                //释放连接  
                conn.release();  
                //事件驱动回调  
                callback(qerr,vals,fields);  
            });  
        }  
    });  
}; 


//update a/an person
var updatePerson = function(args,callback){ 
	if(!args){
		return;
	}

	var sql = 'update personinfo set ? where id = ?';
	//execute update
	connection.pool.getConnection(function(err,conn){  
        if(err){  
            callback(err,null,null);  
        }else{  
            conn.query(sql,[args, args.id], function(qerr,vals,fields){  
                //释放连接  
                conn.release();  
                //事件驱动回调  
                callback(qerr,vals,fields);  
            });  
        }  
    });  
}; 


//remove a/an person
var removePerson = function(arg,callback){ 
	if(!arg){
		return;
	}

	var sql = 'delete from personinfo where id = ?';
	
	//execute delete
	connection.pool.getConnection(function(err,conn){  
        if(err){  
            callback(err,null,null);  
        }else{  
            conn.query(sql,arg.id,function(qerr,vals,fields){  
                //释放连接  
                conn.release();  
                //事件驱动回调  
                callback(qerr,vals,fields);  
            });  
        }  
    });  
	
}; 


//赋予模块接口定义
module.exports.queryPersonList = queryPersonList;
module.exports.createPerson = createPerson;
module.exports.removePerson = removePerson;
module.exports.updatePerson = updatePerson;