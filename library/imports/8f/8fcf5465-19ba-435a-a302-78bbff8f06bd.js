"use strict";
cc._RF.push(module, '8fcf5RlGbpDWqMCeLv/jwa9', 'Enemy');
// script/ui/Enemy.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        spriteFrames: [cc.SpriteFrame],
        _positionXPre: 0,

        scale: 1
    },

    onLoad: function onLoad() {
        this._positionXPre = this.node.x;
        if (this.spriteFrames.length > 1) {
            var index = Math.floor(Math.random() * this.spriteFrames.length);
            this.node.getComponent(cc.Sprite).spriteFrame = this.spriteFrames[index];
        }
    },
    update: function update() {
        var scaleX = this.node.x - this._positionXPre >= 0 ? -this.scale : this.scale;
        this.node.setScale(cc.v2(scaleX, this.scale));
        this._positionXPre = this.node.x;
    }
});

cc._RF.pop();