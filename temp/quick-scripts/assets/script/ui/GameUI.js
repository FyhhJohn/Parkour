(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/ui/GameUI.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'e5009GTNRNGfbxP4d8fZCTy', 'GameUI', __filename);
// script/ui/GameUI.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        // 背景
        _scrolling: false,
        groundNodes: [cc.Node],
        // 怪物
        mapNode: cc.Node,
        levelPrefab: cc.Prefab,
        congratPrefab: cc.Prefab,
        // 玩家
        playerNode: cc.Node,
        // UI
        logoNode: cc.Node,
        infoNode: cc.Node,
        headIcon: cc.Sprite, //头像
        nickName: cc.Label, //昵称
        highestScore: cc.Label, //历史最高分
        bgNode: cc.Node,
        tipNode: cc.Node,
        aboutNode: cc.Node,
        scoreNode: cc.Node,
        overNode: cc.Node,

        scoreLabel: cc.Label,
        _score: 0,
        _scoreMax: false,
        retryBtn: cc.Button,

        // 微信小游戏子域
        _subTexture: null,
        subSprite: cc.Sprite,
        showRankBtn: cc.Button,
        hideRankBtn: cc.Button,
        blockNode: cc.Node
    },

    onLoad: function onLoad() {
        var _this = this;

        cc.log('GameUI onLoad');
        // 开启碰撞检测
        this.initCollision();
        // UI
        this.infoNode.scale = 0;
        this.retryBtn.node.on('click', this.onRetryBtn, this);
        // 游戏
        this._scrolling = false;
        // 按住开始
        if (!cc.sys.localStorage.getItem('GUIDED')) {
            this.playerNode.once(cc.Node.EventType.TOUCH_START, this.showGuide, this);
        } else {
            this.playerNode.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
            this.playerNode.once(cc.Node.EventType.TOUCH_START, this.gameStart, this);
        }
        this.tipNode.runAction(cc.repeatForever(cc.blink(0.7, 1)));
        this.playerNode.active = false;
        this.tipNode.active = false;

        if (GameApp.data.user && GameApp.data.user.nickname) {
            this.nickName.string = GameApp.data.user.nickname;
        }
        if (GameApp.data.user && GameApp.data.user.highestScore) {
            this.highestScore.string = UTILS.addPreZero(GameApp.data.user.highestScore, 4);
        }
        if (GameApp.data.user && GameApp.data.user.headimgurl) {
            UTILS.initNetImage(GameApp.data.user.headimgurl, this.headIcon);
        }
        this.infoNode.runAction(cc.scaleTo(0.2, 1));

        // 获取配置
        GameApp.data.config = window.a.obstacleConfig;
        GameApp.data.params = window.a;

        this.playerNode.active = true;
        this.tipNode.active = true;
        this.aboutNode.active = true;

        // 播放音乐
        GameApp.sound.playMusic('game');
        //初始化对象池
        GameApp.pool.initPool();

        //微信小游戏用到的渲染区域
        if (UTILS.isWeiXinMiniGame()) {
            this.showRankBtn.node.on('click', function () {
                wx.postMessage({
                    message: 'ShowRank'
                });
                _this.showRankBtn.node.active = false;
                _this.blockNode.active = true;
                _this.hideRankBtn.node.active = true;
            });
            this.hideRankBtn.node.on('click', function () {
                wx.postMessage({
                    message: 'HideRank'
                });
                _this.showRankBtn.node.active = true;
                _this.blockNode.active = false;
                _this.hideRankBtn.node.active = false;
            });

            sharedCanvas.width = cc.game.canvas.width * 2;
            sharedCanvas.height = cc.game.canvas.height * 2;
            this._subTexture = new cc.Texture2D();
            this.subSprite.node.active = true;

            this.showRankBtn.node.active = true;
            this.blockNode.active = false;
            this.hideRankBtn.node.active = false;
            wx.postMessage({
                message: 'Refresh'
            });
        }
    },
    onDisable: function onDisable() {
        this.unregisterEvents();
    },
    registerEvents: function registerEvents() {
        GameApp.ui.node.on('GAME_OVER', this.gameOver, this);
        GameApp.ui.node.on('LEVEL_NEXT', this.levelNext, this);
        GameApp.ui.node.on('GAME_END', this.gameEnd, this);
    },
    unregisterEvents: function unregisterEvents() {
        GameApp.ui.node.off('GAME_OVER', this.gameOver, this);
        GameApp.ui.node.off('LEVEL_NEXT', this.levelNext, this);
        GameApp.ui.node.off('GAME_END', this.gameEnd, this);
    },
    initCollision: function initCollision() {
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        // manager.enabledDebugDraw = true;
    },
    showGuide: function showGuide() {
        GameApp.ui.showPopup('GuidePopup');
        this.playerNode.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.playerNode.once(cc.Node.EventType.TOUCH_START, this.gameStart, this);
    },
    gameStart: function gameStart(event) {
        // 隐藏排行榜
        if (UTILS.isWeiXinMiniGame()) {
            this.subSprite.node.active = false;
        }
        // 监听事件
        this.registerEvents();
        // UI
        this.tipNode.stopAllActions();
        this.tipNode.opacity = 255;
        this.tipNode.runAction(cc.fadeOut(0.5));
        this.aboutNode.active = false;
        this.logoNode.runAction(cc.moveBy(0.5, cc.v2(0, 1000)));
        this.infoNode.runAction(cc.moveBy(0.5, cc.v2(0, 1000)));
        this.scoreNode.active = true;
        this.scoreNode.runAction(cc.sequence(cc.delayTime(1), cc.moveBy(1, cc.v2(0, -this.scoreNode.height))));
        // 地图
        this._scrolling = true;
        // 玩家
        this.playerNode.getComponent('Player').run();
        this.onTouchMove(event);
        // 刷新怪物
        GameApp.data.level = 1;
        this.newLevel();
    },
    gameFinish: function gameFinish() {
        // 注销事件
        this.unregisterEvents();
        // 停止游戏
        this._scrolling = false;
        this.playerNode.off(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.playerNode.getComponent('Player').stand();
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = this.mapNode.children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var level = _step.value;

                level.getComponent('Level')._scrolling = false;
            }

            // 上传微信
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

        if (UTILS.isWeiXinMiniGame()) {
            wx.postMessage({
                message: 'UpdateScore',
                score: this._score
            });
        }
        // 更新本地最高分
        if (GameApp.data.user && this._score > GameApp.data.user.highestScore) {
            GameApp.data.user.highestScore = this._score;
        }
    },
    toShareUrl: function toShareUrl() {
        this.scheduleOnce(function () {
            GameApp.ui.showUI('GameUI');
        }, 3);
    },
    gameOver: function gameOver() {
        GameApp.sound.playEffect('lose');
        this.shake(0.2, 10);
        this.gameFinish();

        this.playerNode.getComponent('Player').die();
        this.overNode.runAction(cc.sequence(cc.delayTime(1), cc.rotateBy(0.3, 180), cc.rotateBy(0.1, -10), cc.rotateBy(0.1, 10)));
        this.toShareUrl();
    },
    gameEnd: function gameEnd() {
        var _this2 = this;

        this.gameFinish();

        this.playerNode.getComponent('Player').run();
        this.playerNode.runAction(cc.sequence(cc.moveTo(0.6, cc.v2(0, -460)), cc.callFunc(function () {
            _this2.playerNode.getComponent('Player').stand();
            _this2.playerNode.getComponent('Player').shoot();
        }), cc.delayTime(0.6), cc.callFunc(function () {
            _this2.firework();
        }), cc.delayTime(1), cc.callFunc(function () {
            _this2.toShareUrl();
        })));
    },
    onRetryBtn: function onRetryBtn() {
        GameApp.ui.showUI('GameUI');
    },
    onTouchMove: function onTouchMove(event) {
        var touchPos = this.node.convertTouchToNodeSpace(event.currentTouch);
        var pos = cc.v2(touchPos.x - this.node.width / 2, touchPos.y - this.node.height / 2);
        pos.x = Math.min(315, Math.max(-315, pos.x));
        pos.y = Math.min(505, Math.max(-635, pos.y));
        this.playerNode.position = pos;
    },
    refreshScore: function refreshScore(score) {
        if (score < this._score || this._scoreMax) {
            return;
        }
        this._score = score;
        this.scoreLabel.string = this._score + 'M';
        // 获得满分时
        if (this._score >= Object.keys(GameApp.data.config.level).length * GameApp.data.levelScore()) {
            this._scoreMax = true;
            cc.log('满分啦！！！');
            this.playerNode.off(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        }
    },
    levelNext: function levelNext() {
        GameApp.data.level++;
        this.newLevel();
    },
    update: function update(delta) {
        var _this3 = this;

        if (this._subTexture && this.subSprite.node.active) {
            this._subTexture.initWithElement(sharedCanvas);
            this._subTexture.handleLoadedTexture();
            this.subSprite.spriteFrame = new cc.SpriteFrame(this._subTexture);
        }

        if (!this._scrolling) {
            return;
        }
        // 滚动背景
        var move = -delta * GameApp.data.mapVelocity();
        for (var i = 0; i < 2; i++) {
            this.groundNodes[i].y += move;
            if (this.groundNodes[i].y < -1280) {
                // 隐藏背景
                if (this.bgNode.active) {
                    this.bgNode.active = false;
                }
                this.groundNodes[i].y = 1280;
                this.groundNodes[1 - i].y = 0;
                break;
            }
        }
        // 达到最高分
        if (this._scoreMax) {
            this.playerNode.y -= delta * GameApp.data.mapVelocity();
            var player = this.playerNode.getComponent('Player');
            if (player.playerNode.getComponent(cc.Animation).currentClip._name !== 'stand') {
                // 玩家站立，获胜！
                GameApp.sound.playEffect('win');
                player.stand();

                var _loop = function _loop(_i) {
                    _this3.scheduleOnce(function () {
                        var node = cc.instantiate(_this3.congratPrefab);
                        node.y = _this3.playerNode.y + 250 * _i;
                        node.parent = _this3.node;
                    }, _i * 0.3);
                };

                for (var _i = 0; _i < 3; _i++) {
                    _loop(_i);
                }
            }
        }
        // 更新分数
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
            for (var _iterator2 = this.mapNode.children[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var level = _step2.value;

                var score = level.getComponent('Level').getScore(this.playerNode.y);
                this.refreshScore(score);
            }
            // 检查人物是否出屏幕
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

        if (this.playerNode.x < -360 || this.playerNode.x > 360 || this.playerNode.y < -640 || this.playerNode.y > 640) {
            this.playerNode.position = cc.v2(0, -524.6);
        }
    },
    newLevel: function newLevel() {
        var node = cc.instantiate(this.levelPrefab);
        node.getComponent('Level').init(GameApp.data.level);
        node.parent = this.mapNode;
    },
    firework: function firework() {
        GameApp.ui.node.emit('FIREWORK');
    },


    // 抖动画面
    shake: function shake(duration, range) {
        var _this4 = this;

        var interval = 0.01;
        var time = duration / interval;
        var i = 0;
        this.schedule(function () {
            i++;
            if (i === time + 1) {
                _this4.node.position = cc.v2(0, 0);
                cc.log('reset');
            } else {
                _this4.node.position = cc.v2((Math.random() - 0.5) * 2 * range, (Math.random() - 0.5) * 2 * range);
            }
        }, interval, time);
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
        //# sourceMappingURL=GameUI.js.map
        