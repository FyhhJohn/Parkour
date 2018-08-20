(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/ui/LoginUI.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '7efe5vvt2dKzInP9T1wEirl', 'LoginUI', __filename);
// script/ui/LoginUI.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        ballNode: cc.Node,
        lineNode: cc.Node,
        maskNode: cc.Node,
        descLabel: cc.Label
    },

    onLoad: function onLoad() {
        cc.log('LoginUI onLoad');
        // 微信小游戏事件注册
        if (UTILS.isWeiXinMiniGame()) {
            wx.onHide(function () {
                wx.exitMiniProgram();
            });
        }
        // 获取url参数
        GameApp.data.request = UTILS.GetRequest();

        this.onLogin();
    },
    onLogin: function onLogin(result) {
        var _this = this;

        // 加载资源
        this.descLabel.string = '加载资源...';
        GameApp.ui.loadAll(function (completed, total) {
            var percent = completed / total;
            if (307 * percent > _this.maskNode.width) {
                _this.maskNode.width = 307 * percent;
                _this.ballNode.x = 290 * percent;
            }
        }, function () {
            GameApp.ui.showUI('GameUI');
        });
    }
});

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=LoginUI.js.map
        