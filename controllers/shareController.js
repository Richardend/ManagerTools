/**
 * Created by ctrip on 15/10/21.
 */
var registHelp = require(__rootpath + '/common/registController');

registHelp.registController(exports, {
    errorPage: function (response, view) {
        response.write(_.template(view)({name:'lhl'}));
    }
})