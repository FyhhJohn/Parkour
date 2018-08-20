(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/core/UI.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '2b57e63rGVEl7TOnLPQIULj', 'UI', __filename);
// script/core/UI.js

'use strict';

var PREFAB_PATH = {
    LoginUI: 'prefab/LoginUI',
    GameUI: 'prefab/GameUI',
    GuidePopup: 'prefab/GuidePopup'
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
            default: {}
        }
    },

    onLoad: function onLoad() {
        if (GameApp.ui !== null) {
            return this.node.destroy();
        }
        GameApp.ui = this;
        cc.game.addPersistRootNode(this.node);

        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        this.hideLoadingMask();

        GameApp.emit('UI_READY');
    },

    load: function load(name, cb) {
        if (!PREFAB_PATH[name]) {
            return cc.warn(name + '未定义！');
        }
        cc.loader.loadRes(PREFAB_PATH[name], function (err, prefab) {
            this._Prefabs[name] = prefab;
            cb(name);
        }.bind(this));
    },

    loadAll: function loadAll(cbProgress, cbComplete) {
        var paths = [];
        for (var name in PREFAB_PATH) {
            if (!PREFAB_PATH[name]) {
                return cc.warn(name + '未定义！');
            }
            paths.push(PREFAB_PATH[name]);
        }
        cc.loader.loadResArray(paths, function (completedCount, totalCount) {
            cbProgress(completedCount, totalCount);
        }, function (err, prefabs) {
            var names = Object.keys(PREFAB_PATH);
            for (var i in prefabs) {
                this._Prefabs[names[i]] = prefabs[i];
            }
            cbComplete();
        }.bind(this));
    },

    showFixed: function showFixed(name, cb) {
        //未加载
        if (!this._Prefabs[name]) {
            this.load(name, function () {
                this.showFixed(name, cb);
            }.bind(this));
            return;
        }
        //已实例化
        var node = this.fixedRoot.getChildByName(name);
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
    hideFixed: function hideFixed(name) {
        var node = this.fixedRoot.getChildByName(name);
        if (node) {
            node.active = false;
        }
    },


    showUI: function showUI(name, cb) {
        //未加载
        if (!this._Prefabs[name]) {
            this.load(name, function () {
                this.showUI(name, cb);
            }.bind(this));
            return;
        }
        //已加载
        this.uiRoot.removeAllChildren();
        for (var i = this.popupRoot.children.length - 1; i >= 0; i--) {
            if (this.popupRoot.children[i].tag !== 10086) {
                this.popupRoot.children[i].removeFromParent();
            }
        }
        var node = cc.instantiate(this._Prefabs[name]);
        this.uiRoot.addChild(node);
        if (cb) {
            cb(node);
        }
        //更新fixed
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = this.fixedRoot.children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var _node = _step.value;

                _node.getComponent(_node.name).onUIChanged();
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }
    },

    currentUI: function currentUI() {
        var node = this.uiRoot.children[0];
        return node;
    },


    showPopup: function showPopup(name, cb) {
        var clean = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

        //未加载
        if (!this._Prefabs[name]) {
            this.load(name, function () {
                this.showPopup(name, cb);
            }.bind(this));
            return;
        }
        //已加载
        var node = cc.instantiate(this._Prefabs[name]);
        this.popupRoot.addChild(node);
        //切换场景时不被清理
        if (!clean) {
            node.tag = 10086;
        }
        if (cb) {
            cb(node);
        }
    },

    getPopup: function getPopup(name) {
        return this.popupRoot.getChildByName(name);
    },

    popPopup: function popPopup() {
        var popups = this.popupRoot.children;
        if (popups.length > 0) {
            popups[popups.length - 1].removeFromParent();
        }
    },

    clearPopup: function clearPopup(name) {
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
            for (var _iterator2 = this.popupRoot.children[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var node = _step2.value;

                if (node.name === name) {
                    node.removeFromParent();
                }
            }
        } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                    _iterator2.return();
                }
            } finally {
                if (_didIteratorError2) {
                    throw _iteratorError2;
                }
            }
        }
    },

    clearPopups: function clearPopups() {
        this.popupRoot.removeAllChildren();
    },

    showToast: function showToast(s) {
        if (!this.toastPrefab) return;
        for (var i in this.toastRoot.children) {
            this.toastRoot.children[i].getComponent('Toast').moveUp();
        }
        var node = cc.instantiate(this.toastPrefab);
        this.toastRoot.addChild(node);
        node.getComponent('Toast').show(s);
    },

    showLoadingMask: function showLoadingMask() {
        this.loadingMask.active = true;
    },

    hideLoadingMask: function hideLoadingMask() {
        this.loadingMask.active = false;
    },

    // 返回键
    onKeyDown: function onKeyDown(event) {
        switch (event.keyCode) {
            case cc.KEY.back:
            case cc.KEY.escape:
                if (this.popupRoot.childrenCount > 0) {
                    this.popPopup();
                } else if (GameApp.ui.currentUI().name === 'MainUI') {
                    cc.game.end();
                } else {
                    var node = this.fixedRoot.getChildByName('TopFixed');
                    if (node) {
                        node.getComponent(node.name).closeBtn.node.emit('click');
                    }
                }
                break;
        }
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
        //# sourceMappingURL=UI.js.map
        