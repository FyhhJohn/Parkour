(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/ui/GuidePopup.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '8679bX8WHtKV4Nnquh7O4Mr', 'GuidePopup', __filename);
// script/ui/GuidePopup.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        yesBtn: cc.Button
    },

    onLoad: function onLoad() {
        this.yesBtn.node.on('click', function () {
            cc.sys.localStorage.setItem('GUIDED', 'yes');
            GameApp.ui.popPopup();
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
        //# sourceMappingURL=GuidePopup.js.map
        