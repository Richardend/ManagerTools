/**
 * Created by ctrip on 15/10/21.
 */
var registHelp = require(__rootpath + '/common/registController');

registHelp.registController(exports, {

    index: function (response, view) {
		this.render({data: null});	
        //response.write(_.template(view)({data: null}));
    }
})