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
        headIcon: cc.Sprite,//头像
        nickName: cc.Label,//昵称
        highestScore: cc.Label,//历史最高分
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
        blockNode: cc.Node,
    },

    onLoad() {
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
        }
        else {
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
            this.showRankBtn.node.on('click', ()=>{
                wx.postMessage({
                    message: 'ShowRank'
                });
                this.showRankBtn.node.active = false;
                this.blockNode.active = true;
                this.hideRankBtn.node.active = true;
            });
            this.hideRankBtn.node.on('click', ()=>{
                wx.postMessage({
                    message: 'HideRank'
                });
                this.showRankBtn.node.active = true;
                this.blockNode.active = false;
                this.hideRankBtn.node.active = false;
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

    onDisable() {
        this.unregisterEvents();
    },

    registerEvents() {
        GameApp.ui.node.on('GAME_OVER', this.gameOver, this);
        GameApp.ui.node.on('LEVEL_NEXT', this.levelNext, this);
        GameApp.ui.node.on('GAME_END', this.gameEnd, this);
    },

    unregisterEvents() {
        GameApp.ui.node.off('GAME_OVER', this.gameOver, this);
        GameApp.ui.node.off('LEVEL_NEXT', this.levelNext, this);
        GameApp.ui.node.off('GAME_END', this.gameEnd, this);
    },

    initCollision() {
        let manager = cc.director.getCollisionManager();
        manager.enabled = true;
        // manager.enabledDebugDraw = true;
    },

    showGuide() {
        GameApp.ui.showPopup('GuidePopup');
        this.playerNode.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.playerNode.once(cc.Node.EventType.TOUCH_START, this.gameStart, this);
    },

    gameStart(event) {
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
        this.scoreNode.runAction(cc.sequence(
            cc.delayTime(1),
            cc.moveBy(1, cc.v2(0, -this.scoreNode.height))
        ));
        // 地图
        this._scrolling = true;
        // 玩家
        this.playerNode.getComponent('Player').run();
        this.onTouchMove(event);
        // 刷新怪物
        GameApp.data.level = 1;
        this.newLevel();
    },

    gameFinish() {
        // 注销事件
        this.unregisterEvents();
        // 停止游戏
        this._scrolling = false;
        this.playerNode.off(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.playerNode.getComponent('Player').stand();
        for (let level of this.mapNode.children) {
            level.getComponent('Level')._scrolling = false;
        }

        // 上传微信
        if (UTILS.isWeiXinMiniGame()) {
            wx.postMessage({
                message: 'UpdateScore',
                score: this._score,
            });
        }
        // 更新本地最高分
        if (GameApp.data.user && this._score > GameApp.data.user.highestScore) {
            GameApp.data.user.highestScore = this._score;
        }
    },

    toShareUrl() {
        this.scheduleOnce(() => {
            GameApp.ui.showUI('GameUI');
        }, 3);
    },

    gameOver() {
        GameApp.sound.playEffect('lose');
        this.shake(0.2, 10);
        this.gameFinish();

        this.playerNode.getComponent('Player').die();
        this.overNode.runAction(cc.sequence(
            cc.delayTime(1),
            cc.rotateBy(0.3, 180),
            cc.rotateBy(0.1, -10),
            cc.rotateBy(0.1, 10),
        ));
        this.toShareUrl();
    },

    gameEnd() {
        this.gameFinish();

        this.playerNode.getComponent('Player').run();
        this.playerNode.runAction(cc.sequence(
            cc.moveTo(0.6, cc.v2(0, -460)),
            cc.callFunc(() => {
                this.playerNode.getComponent('Player').stand();
                this.playerNode.getComponent('Player').shoot();
            }),
            cc.delayTime(0.6),
            cc.callFunc(() => {
                this.firework();
            }),
            cc.delayTime(1),
            cc.callFunc(() => {
                this.toShareUrl();
            })
        ));
    },

    onRetryBtn() {
        GameApp.ui.showUI('GameUI');
    },

    onTouchMove(event) {
        let touchPos = this.node.convertTouchToNodeSpace(event.currentTouch);
        let pos = cc.v2(touchPos.x - this.node.width / 2, touchPos.y - this.node.height / 2);
        pos.x = Math.min(315, Math.max(-315, pos.x));
        pos.y = Math.min(505, Math.max(-635, pos.y));
        this.playerNode.position = pos;
    },

    refreshScore(score) {
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

    levelNext() {
        GameApp.data.level++;
        this.newLevel();
    },

    update(delta) {
        if (this._subTexture && this.subSprite.node.active) {
            this._subTexture.initWithElement(sharedCanvas);
            this._subTexture.handleLoadedTexture();
            this.subSprite.spriteFrame = new cc.SpriteFrame(this._subTexture);
        }

        if (!this._scrolling) {
            return;
        }
        // 滚动背景
        let move = -delta * GameApp.data.mapVelocity();
        for (let i = 0; i < 2; i++) {
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
            let player = this.playerNode.getComponent('Player');
            if (player.playerNode.getComponent(cc.Animation).currentClip._name !== 'stand') {
                // 玩家站立，获胜！
                GameApp.sound.playEffect('win');
                player.stand();
                for (let i = 0; i < 3; i++) {
                    this.scheduleOnce(() => {
                        let node = cc.instantiate(this.congratPrefab);
                        node.y = this.playerNode.y + 250 * i;
                        node.parent = this.node;
                    }, i * 0.3);
                }
            }
        }
        // 更新分数
        for (let level of this.mapNode.children) {
            let score = level.getComponent('Level').getScore(this.playerNode.y);
            this.refreshScore(score);
        }
        // 检查人物是否出屏幕
        if (this.playerNode.x < -360 || this.playerNode.x > 360 || this.playerNode.y < -640 || this.playerNode.y > 640) {
            this.playerNode.position = cc.v2(0, -524.6);
        }
    },

    newLevel() {
        let node = cc.instantiate(this.levelPrefab);
        node.getComponent('Level').init(GameApp.data.level);
        node.parent = this.mapNode;
    },

    firework() {
        GameApp.ui.node.emit('FIREWORK');
    },

    // 抖动画面
    shake(duration, range) {
        let interval = 0.01;
        let time = duration / interval;
        let i = 0;
        this.schedule(() => {
            i++;
            if (i === time + 1) {
                this.node.position = cc.v2(0, 0);
                cc.log('reset');
            }
            else {
                this.node.position = cc.v2((Math.random() - 0.5) * 2 * range, (Math.random() - 0.5) * 2 * range);
            }
        }, interval, time);
    },
});
