cc.Class({
    extends: cc.Component,

    properties: {
        groupPrefab: cc.Prefab,
        endNode: cc.Node,
        scoreLabel: cc.Label,
        nationSprite: cc.Sprite,
        nationSpriteFrames: [cc.SpriteFrame],

        finalNode: cc.Node,
        fireworks: [cc.Animation],
        _isFinal: false,

        _levelId: 0,
        _scrolling: false,
        _levelNextEmitted: false,
    },

    init(id) {
        this._levelId = id;
        if (!GameApp.data.config.level[id]) {
            this.setFinal();
            return;
        }
        let groupIds = JSON.parse(JSON.stringify(GameApp.data.config.level[id].groupIds));
        // 计算高度
        let y = GameApp.data.groupInterval() / 2;
        // 改为随机顺序
        while (groupIds.length > 0) {
            let index = Math.floor(Math.random() * groupIds.length);
            y += (this.newGroup(groupIds[index], y) + GameApp.data.groupInterval());
            groupIds.splice(index, 1);
        }
        // for (let id of groupIds) {
        //     y += (this.newGroup(id, y) + GameApp.data.groupInterval());
        // }
        y -= (GameApp.data.groupInterval() / 2);
        // 初始化位置
        this.node.position = cc.v2(0, 640);
        this.node.height = y;
        this.endNode.y = (y);
        // 设置国家
        this.nationSprite.spriteFrame = this.nationSpriteFrames[this._levelId - 1];
        this.scoreLabel.string = this._levelId * GameApp.data.levelScore() + 'M';
        // 开始滚动
        this._scrolling = true;
    },

    setFinal() {
        GameApp.ui.node.on('FIREWORK', () => {
            for (let ani of this.fireworks) {
                this.scheduleOnce(() => {
                    ani.play();
                }, Math.random());
            }
        });
        this._isFinal = true;
        // 设置背景
        this.endNode.active = false;
        this.finalNode.active = true;
        // 设置位置
        this.node.position = cc.v2(0, 640);
        this.node.height = this.finalNode.height;
        // 开始滚动
        this._scrolling = true;
    },

    update(delta) {
        if (!this._scrolling) {
            return;
        }
        // 滚动背景
        this.node.y = (this.node.y - delta * GameApp.data.mapVelocity());
        // 下一关
        if (!this._levelNextEmitted && 640 - this.node.y > this.node.height) {
            if (this._isFinal) {
                this.node.y = (-640);
                this._scrolling = false;
                GameApp.ui.node.emit('GAME_END');
            }
            else {
                this._levelNextEmitted = true;
                GameApp.ui.node.emit('LEVEL_NEXT');
            }
        }
        // 离开屏幕
        let offset = 200;
        if (this.node.y + this.node.height + offset < -640) {
            this.node.destroy();
        }
    },

    newGroup(id, y) {
        let node = cc.instantiate(this.groupPrefab);
        let height = node.getComponent('Group').init(id, y);
        node.parent = this.node;
        return height;
    },

    getScore(positionY) {
        if (this._isFinal) {
            return 0;
        }
        let levelCoefficient = Math.min(1, (positionY - this.node.y) / this.node.height);
        let score = (levelCoefficient + (this._levelId - 1)) * GameApp.data.levelScore();
        return Math.round(score);
    },
});
