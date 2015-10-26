/**
 * Created by ctrip on 15/10/20.
 * for dal test by alf
 */
//引用数据库连接池
var connection = require(__rootpath + '/dal/dbConnection');

//查询数据库
var query = function(sql,callback){  
    connection.pool.getConnection(function(err,conn){  
        if(err){  
            callback(err,null,null);  
        }else{  
            conn.query(sql,function(qerr,vals,fields){  
                //释放连接  
                conn.release();  
                //事件驱动回调  
                callback(qerr,vals,fields);  
            });  
        }  
    });  
};  

//赋予模块接口定义
module.exports = query;


  
 