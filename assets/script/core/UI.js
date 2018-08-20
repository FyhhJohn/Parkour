const PREFAB_PATH = {
    LoginUI: 'prefab/LoginUI',
    GameUI: 'prefab/GameUI',
    GuidePopup: 'prefab/GuidePopup',
};

cc.Class({
    extends: cc.Component,

    properties: {
        uiRoot: cc.Node,
        fixedRoot: cc.Node,
        popupRoot: cc.Node,
        toastRoot: cc.Node,
        toastPrefab: cc.Prefab,
        loadingMask: cc.Node,

        _Prefabs: {
            default: {},
        },
    },

    onLoad: function () {
        if (GameApp.ui !== null) {
            return this.node.destroy();
        }
        GameApp.ui = this;
        cc.game.addPersistRootNode(this.node);

        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        this.hideLoadingMask();

        GameApp.emit('UI_READY');
    },

    load: function (name, cb) {
        if (!PREFAB_PATH[name]) {
            return cc.warn(name + '未定义！')
        }
        cc.loader.loadRes(PREFAB_PATH[name], function (err, prefab) {
            this._Prefabs[name] = prefab;
            cb(name);
        }.bind(this));
    },

    loadAll: function (cbProgress, cbComplete) {
        let paths = [];
        for (let name in PREFAB_PATH) {
            if (!PREFAB_PATH[name]) {
                return cc.warn(name + '未定义！')
            }
            paths.push(PREFAB_PATH[name]);
        }
        cc.loader.loadResArray(paths, function (completedCount, totalCount) {
            cbProgress(completedCount, totalCount);
        }, function (err, prefabs) {
            let names = Object.keys(PREFAB_PATH);
            for (let i in prefabs) {
                this._Prefabs[names[i]] = prefabs[i];
            }
            cbComplete();
        }.bind(this));
    },

    showFixed(name, cb) {
        //未加载
        if (!this._Prefabs[name]) {
            this.load(name, function () {
                this.showFixed(name, cb);
            }.bind(this));
            return;
        }
        //已实例化
        let node = this.fixedRoot.getChildByName(name);
        if (node) {
            return node.active = true;
        }
        //未实例化
        node = cc.instantiate(this._Prefabs[name]);
        this.fixedRoot.addChild(node);
        if (cb) {
            cb(node);
        }
    },

    hideFixed(name) {
        let node = this.fixedRoot.getChildByName(name);
        if (node) {
            node.active = false;
        }
    },

    showUI: function (name, cb) {
        //未加载
        if (!this._Prefabs[name]) {
            this.load(name, function () {
                this.showUI(name, cb);
            }.bind(this));
            return;
        }
        //已加载
        this.uiRoot.removeAllChildren();
        for (let i = this.popupRoot.children.length - 1; i >= 0; i--) {
            if (this.popupRoot.children[i].tag !== 10086) {
                this.popupRoot.children[i].removeFromParent();
            }
        }
        let node = cc.instantiate(this._Prefabs[name]);
        this.uiRoot.addChild(node);
        if (cb) {
            cb(node);
        }
        //更新fixed
        for (let node of this.fixedRoot.children) {
            node.getComponent(node.name).onUIChanged();
        }
    },

    currentUI() {
        let node = this.uiRoot.children[0];
        return node;
    },

    showPopup: function (name, cb, clean = true) {
        //未加载
        if (!this._Prefabs[name]) {
            this.load(name, function () {
                this.showPopup(name, cb);
            }.bind(this));
            return;
        }
        //已加载
        let node = cc.instantiate(this._Prefabs[name]);
        this.popupRoot.addChild(node);
        //切换场景时不被清理
        if (!clean) {
            node.tag = 10086;
        }
        if (cb) {
            cb(node);
        }
    },

    getPopup: function (name) {
        return this.popupRoot.getChildByName(name);
    },

    popPopup: function () {
        let popups = this.popupRoot.children;
        if (popups.length > 0) {
            popups[popups.length - 1].removeFromParent();
        }
    },

    clearPopup: function (name) {
        for (let node of this.popupRoot.children) {
            if (node.name === name) {
                node.removeFromParent();
            }
        }
    },

    clearPopups: function () {
        this.popupRoot.removeAllChildren();
    },

    showToast: function (s) {
        if (!this.toastPrefab) return;
        for (let i in this.toastRoot.children) {
            this.toastRoot.children[i].getComponent('Toast').moveUp();
        }
        let node = cc.instantiate(this.toastPrefab);
        this.toastRoot.addChild(node);
        node.getComponent('Toast').show(s);
    },

    showLoadingMask: function () {
        this.loadingMask.active = true;
    },

    hideLoadingMask: function () {
        this.loadingMask.active = false;
    },

    // 返回键
    onKeyDown: function (event) {
        switch (event.keyCode) {
            case cc.KEY.back:
            case cc.KEY.escape:
                if (this.popupRoot.childrenCount > 0) {
                    this.popPopup();
                }
                else if (GameApp.ui.currentUI().name === 'MainUI'){
                    cc.game.end();
                }
                else {
                    let node = this.fixedRoot.getChildByName('TopFixed');
                    if (node) {
                        node.getComponent(node.name).closeBtn.node.emit('click');
                    }
                }
                break;
        }
    },
});