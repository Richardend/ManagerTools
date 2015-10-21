/**
 * Created by ctrip on 15/10/20.
 * controllers 中视图控制器都要使用此模块来作继承.
 * 1. 将控制器中的方法公开
 */

exports.registController = function (thatExports, viewControllers) {
    for (var key in viewControllers) {
        thatExports[key] = viewControllers[key];
    }
}
