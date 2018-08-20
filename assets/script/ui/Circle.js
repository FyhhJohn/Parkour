cc.Class({
    extends: cc.Component,

    properties: {
        _congrated: false,
        congratLine: cc.Animation,
    },

    onLoad() {
        this._congrated = false;
    },

    onCollisionEnter(other, self) {
        if (this._congrated) {
            return;
        }
        this.congratLine.play();
        GameApp.sound.playEffect('line');
        this._congrated = true;
    },
});
