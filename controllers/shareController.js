/**
 * Created by ctrip on 15/10/21.
 */
var registHelp = require(__rootpath + '/common/registController');

registHelp.registController(exports, {
    errorPage: function (response, view) {
		this.render({name:'lhl'});
        //response.write(_.template(view)({name:'lhl'}));
    }
})