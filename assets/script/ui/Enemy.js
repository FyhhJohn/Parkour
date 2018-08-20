cc.Class({
    extends: cc.Component,

    properties: {
        spriteFrames: [cc.SpriteFrame],
        _positionXPre: 0,

        scale: 1,
    },

    onLoad() {
        this._positionXPre = this.node.x;
        if (this.spriteFrames.length > 1) {
            let index = Math.floor(Math.random() * this.spriteFrames.length);
            this.node.getComponent(cc.Sprite).spriteFrame = this.spriteFrames[index];
        }
    },

    update() {
        let scaleX = (this.node.x - this._positionXPre >= 0 ? -this.scale : this.scale);
        this.node.setScale(cc.v2(scaleX, this.scale));
        this._positionXPre = this.node.x;
    },
});
