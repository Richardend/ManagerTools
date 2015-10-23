/**
 * Created by ctrip on 15/10/20.
 */
var registHelp = require(__rootpath + '/common/registController');
var util = require('util');
var query = require(__rootpath + '/dal/queryList');

registHelp.registController(exports, {
    index: function (response, view) {

		var returnView  = this;

		query("select * from goods_info limit 10 ",function(err,vals,fields){  
			if(err){
				console.log(util.inspect(err));
			}
			else {		
				var datamodel = {data:vals};

				returnView.render(datamodel);	

				
				//var htmlContent = _.template(view)({data:vals});
				//console.log(htmlContent)
				
				
				//response.write(htmlContent);
				//response.end();
				//return returnView.render(datamodel);				
				//console.log(util.inspect(vals))			
				//console.log(util.inspect(fields));
			}
		}); 
    }
});