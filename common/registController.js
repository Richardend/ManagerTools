/**
 * Created by ctrip on 15/10/20.
 * controllers 中视图控制器都要使用此模块来作继承.
 * 1. 将控制器中的方法公开
 */

exports.registController = function (thatExports, viewControllers) {
    for (var controller in viewControllers) {
        thatExports[controller] = new viewInstace(viewControllers[controller]);
    }
}

function viewInstace (handle) {
    this.handle = handle;
    this.render = function (datamodel) {
        var _html = _.template(this.view)(datamodel);
        this.response.write(_html);
		this.response.end();
    }
    this.run = function (req, res, view) {
		this.request = req;
        this.response = res;
        this.view = view;
        this.handle.call(this, req, res, view);
    }
    return this;
}