cc.Class({
    extends: cc.Component,

    properties: {

    },

    onEnd() {
        this.node.destroy();
    },
});
