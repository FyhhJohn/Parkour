"use strict";
cc._RF.push(module, '914c9xBr6xITZN/lvStW6Yh', 'Circle');
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