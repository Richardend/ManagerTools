/**
 * Created by ctrip on 15/10/20.
 */
var registHelp = require(__rootpath + '/common/registController');

registHelp.registController(exports, {
    index: function (response, view) {
        var datamodel = {};

        datamodel.name = '李海亮';

        this.render(datamodel);
    }

    , database: function () {
        //console.log('aaaaaaaaaaaaaaaaaaaa');
    }
});