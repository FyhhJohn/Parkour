cc.Class({
    extends: cc.Component,

    properties: {
        ballNode: cc.Node,
        lineNode: cc.Node,
        maskNode: cc.Node,
        descLabel: cc.Label,
    },

    onLoad() {
        cc.log('LoginUI onLoad');
        // 微信小游戏事件注册
        if (UTILS.isWeiXinMiniGame()) {
            wx.onHide(() => {
                wx.exitMiniProgram();
            });
        }
        // 获取url参数
        GameApp.data.request = UTILS.GetRequest();

        this.onLogin()
    },

    onLogin(result) {
        // 加载资源
        this.descLabel.string = '加载资源...';
        GameApp.ui.loadAll((completed, total) => {
            let percent = completed / total;
            if (307 * percent > this.maskNode.width) {
                this.maskNode.width = 307 * percent;
                this.ballNode.x = 290 * percent;
            }
        }, () => {
            GameApp.ui.showUI('GameUI');
        });
    },
});
