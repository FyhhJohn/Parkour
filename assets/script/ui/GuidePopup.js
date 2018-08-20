cc.Class({
    extends: cc.Component,

    properties: {
        yesBtn: cc.Button,
    },

    onLoad() {
        this.yesBtn.node.on('click', () => {
            cc.sys.localStorage.setItem('GUIDED', 'yes');
            GameApp.ui.popPopup();
        });
    },
});
