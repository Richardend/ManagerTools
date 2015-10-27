/**
 * Created by ctrip on 15/10/21.
 */
var fs = require('fs');

var _tools = {
    //把_layout和 视图结合, 作为html横版返回.
    //
    renderView: function (viewTempl) {

        var config = require(__rootpath + '/config/appConfig').content;
        var layoutHtml = fs.readFileSync(__rootpath + '/views/share/_layout.html', 'utf-8');
        var _html = _.template(layoutHtml);
        return _html({
            bodyContent: viewTempl,
            title: config.siteTitle
        });
    }
}

exports.tools = _tools;