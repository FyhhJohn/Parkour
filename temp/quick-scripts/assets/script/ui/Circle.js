(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/ui/Circle.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '914c9xBr6xITZN/lvStW6Yh', 'Circle', __filename);
// script/ui/Circle.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        _congrated: false,
        congratLine: cc.Animation
    },

    onLoad: function onLoad() {
        this._congrated = false;
    },
    onCollisionEnter: function onCollisionEnter(other, self) {
        if (this._congrated) {
            return;
        }
        this.congratLine.play();
        GameApp.sound.playEffect('line');
        this._congrated = true;
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
        //# sourceMappingURL=Circle.js.map
        