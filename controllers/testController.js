/**
 * Created by ctrip on 15/10/20.
 */
var registHelp = require(__rootpath + '/common/registController');

registHelp.registController(exports, {
    index: function (response, view) {
        response.write(view);
    }
});