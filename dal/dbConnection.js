var mysql=require("mysql");  
this.pool = mysql.createPool({  
    host: 'pub.mysql.db.fat.qa.nt.ctripcorp.com',  
    user: 'us_test_wanggy',  
    password: '1qaz@WSX',  
    database: 'finflproductdb',  
    port: 55666  
});