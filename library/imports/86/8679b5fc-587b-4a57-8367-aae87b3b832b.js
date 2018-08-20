"use strict";
cc._RF.push(module, '8679bX8WHtKV4Nnquh7O4Mr', 'GuidePopup');
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