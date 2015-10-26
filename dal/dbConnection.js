/**
 * Created by ctrip on 15/10/20.
 * for db connection test by alf
 */
var mysql=require("mysql");  
var config = require(__rootpath + '/config/appConfig').content;
	  
this.pool = mysql.createPool({  
    host: config.host,  
    user: config.user,  
    password: config.password,  
    database: config.database,  
    port: config.port  
});