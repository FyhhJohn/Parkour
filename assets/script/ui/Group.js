cc.Class({
    extends: cc.Component,

    properties: {
        _isRunningSearch: false,
        enemyPrefabs: [cc.Prefab],
        dotPrefab: cc.Prefab,
    },

    init(id, y) {
        this._isRunningSearch = false;
        this.node.position = cc.v2(0, y);
        let config = GameApp.data.config.group[id];
        this.node.height = config.height;
        this.scheduleOnce(() => {
            this.newGroup(id, config);
        }, y / GameApp.data.mapVelocity());
        return config.height;
    },

    newGroup(id, config) {
        switch (id) {
            case 1: {
                //轨迹
                // let dotNum = 6;
                // let windowSize = cc.winSize;
                // for (let i = 0; i < dotNum; i++) {
                //     let d = this.newDot(cc.v2(-windowSize.width / 2 + 45 + windowSize.width / dotNum * i, config.height / 2 - 20));
                // }
                for (let i = 0; i < config.num; i++) {
                    let x = -660 + 120 * i;
                    let e = this.newEnemy(config.enemyId1, cc.v2(x, config.height / 2));
                    e.runAction(
                        cc.moveBy((720 - x) / config.vOutside, cc.v2(720 - x, 0)));
                }
                break;
            }
            case 2: {
                //轨迹
                // let dotNum = 3;
                // let d1, d2, d3, d4;
                // for (let i = 0; i < dotNum; i++) {
                //     d1 = this.newDot(cc.v2(-config.height / 2 / dotNum * i, config.height - config.height / 2 / dotNum * i - 50));
                //     d2 = this.newDot(cc.v2(-config.height / 2 + config.height / 2 / dotNum * i, config.height / 2 - config.height / 2 / dotNum * i - 50));
                //     d3 = this.newDot(cc.v2(config.height / 2 / dotNum * i, config.height / 2 / dotNum * i - 50));
                //     d4 = this.newDot(cc.v2(config.height / 2 - config.height / 2 / dotNum * i, config.height / 2 + config.height / 2 / dotNum * i - 50));
                // }
                let e1 = this.newEnemy(config.enemyId1, cc.v2(0, config.height));
                let e2 = this.newEnemy(config.enemyId1, cc.v2(0, 0));
                let time = config.height / MATH.sqrt2 / config.vInside;
                e1.runAction(cc.repeatForever(cc.sequence(
                    cc.moveBy(time, cc.v2(-config.height / 2, -config.height / 2)),
                    cc.moveBy(time, cc.v2(config.height / 2, -config.height / 2)),
                    cc.moveBy(time, cc.v2(config.height / 2, config.height / 2)),
                    cc.moveBy(time, cc.v2(-config.height / 2, config.height / 2))
                )));
                e2.runAction(cc.repeatForever(cc.sequence(
                    cc.moveBy(time, cc.v2(config.height / 2, config.height / 2)),
                    cc.moveBy(time, cc.v2(-config.height / 2, config.height / 2)),
                    cc.moveBy(time, cc.v2(-config.height / 2, -config.height / 2)),
                    cc.moveBy(time, cc.v2(config.height / 2, -config.height / 2))
                )));
                break;
            }
            case 3: {
                // let dotNum = 6;
                // let windowSize = cc.winSize;
                // for (let i = 0; i < dotNum; i++) {
                //     let d = this.newDot(cc.v2(-windowSize.width / 2 + 45 + windowSize.width / dotNum * i, config.height / 2 - 20));
                // }
                let e1 = this.newEnemy(config.enemyId1, cc.v2(-300, config.height / 2));
                let e2 = this.newEnemy(config.enemyId1, cc.v2(300, config.height / 2));
                let distance = 250;
                let time = distance / config.vInside;
                e1.runAction(cc.repeatForever(cc.sequence(
                    cc.moveBy(time, cc.v2(distance, 0)),
                    cc.moveBy(time, cc.v2(-distance, 0))
                )));
                e2.runAction(cc.repeatForever(cc.sequence(
                    cc.moveBy(time, cc.v2(-distance, 0)),
                    cc.moveBy(time, cc.v2(distance, 0))
                )));
                break;
            }
            case 4: {
                // let dotNum = 6;
                // let windowSize = cc.winSize;
                // for (let i = 0; i < dotNum; i++) {
                //     let d = this.newDot(cc.v2(-windowSize.width / 2 + 45 + windowSize.width / dotNum * i, config.height / 2 - 20));
                // }
                let e = this.newEnemy(config.enemyId1, cc.v2(0, config.height / 2));
                e.runAction(cc.repeatForever(cc.sequence(
                    cc.moveBy(300 / config.vOutside, cc.v2(300, 0)),
                    cc.moveBy(600 / config.vOutside, cc.v2(-600, 0)),
                    cc.moveBy(300 / config.vOutside, cc.v2(300, 0))
                )));
                break;
            }
            case 5: {
                // let dotNum = 6;
                // let windowSize = cc.winSize;
                // for (let i = 0; i < dotNum; i++) {
                //     this.newDot(cc.v2(-windowSize.width / 2 + 45 + windowSize.width / dotNum * i, 240 - 20));
                //     this.newDot(cc.v2(-windowSize.width / 2 + 45 + windowSize.width / dotNum * i, 0 - 20));
                // }
                for (let i = 0; i < config.num; i++) {
                    let x = -540 + 80 * i;
                    let y = 240 - 80 * i;
                    let e = this.newEnemy(config.enemyId1, cc.v2(x, y));
                    e.runAction(
                        cc.moveBy((720 - x) / config.vOutside, cc.v2((720 - x), 0)));
                }
                break;
            }
            case 6: {
                let e1 = this.newEnemy(config.enemyId1, cc.v2(-300, config.height / 2));
                let e2 = this.newEnemy(config.enemyId1, cc.v2(0, config.height / 2));
                let e3 = this.newEnemy(config.enemyId1, cc.v2(300, config.height / 2));
                break;
            }
            case 7: {
                // let dotNum = 2;
                // let d1, d2, d3, d4;
                // for (let i = 0; i < dotNum; i++) {
                //     d1 = this.newDot(cc.v2(-config.height / 4 / dotNum * i, config.height * 3 / 4 - config.height / 4 / dotNum * i));
                //     d2 = this.newDot(cc.v2(-config.height / 4 + config.height / 4 / dotNum * i, config.height / 2 - config.height / 4 / dotNum * i));
                //     d3 = this.newDot(cc.v2(config.height / 4 / dotNum * i, config.height / 4 + config.height / 4 / dotNum * i));
                //     d4 = this.newDot(cc.v2(config.height / 4 - config.height / 4 / dotNum * i, config.height / 2 + config.height / 4 / dotNum * i));
                // }
                let e1 = this.newEnemy(config.enemyId2, cc.v2(-300, config.height / 2));
                let e2 = this.newEnemy(config.enemyId2, cc.v2(0, config.height / 2));
                let e3 = this.newEnemy(config.enemyId2, cc.v2(300, config.height / 2));
                let e4 = this.newEnemy(config.enemyId1, cc.v2(0, config.height * 3 / 4));
                let time = config.height / 2 / MATH.sqrt2 / config.vInside;
                e4.runAction(cc.repeatForever(cc.sequence(
                    cc.moveBy(time, cc.v2(-config.height / 4, -config.height / 4)),
                    cc.moveBy(time, cc.v2(config.height / 4, -config.height / 4)),
                    cc.moveBy(time, cc.v2(config.height / 4, config.height / 4)),
                    cc.moveBy(time, cc.v2(-config.height / 4, config.height / 4))
                )));
                break;
            }
            case 8: {
                // let dotNum = 6,rowNum = 3;
                // let windowSize = cc.winSize;
                // for (let i = 0; i < dotNum; i++) {
                //     for (let j = 0; j < rowNum; j++) {
                //     let d = this.newDot(cc.v2(-windowSize.width / 2 + 45 + windowSize.width / dotNum * i, config.height / 2 * j - 20));
                //     }
                // }
                let e1 = this.newEnemy(config.enemyId1, cc.v2(0, 0));
                let e2 = this.newEnemy(config.enemyId1, cc.v2(0, config.height / 2));
                let e3 = this.newEnemy(config.enemyId1, cc.v2(0, config.height));
                e1.runAction(cc.repeatForever(cc.sequence(
                    cc.moveBy(300 / config.vInside, cc.v2(300, 0)),
                    cc.moveBy(600 / config.vInside, cc.v2(-600, 0)),
                    cc.moveBy(300 / config.vInside, cc.v2(300, 0))
                )));
                this.scheduleOnce(() => {
                    e2.runAction(cc.repeatForever(cc.sequence(
                        cc.moveBy(300 / config.vInside, cc.v2(300, 0)),
                        cc.moveBy(600 / config.vInside, cc.v2(-600, 0)),
                        cc.moveBy(300 / config.vInside, cc.v2(300, 0))
                    )));
                }, 0.5);
                this.scheduleOnce(() => {
                    e3.runAction(cc.repeatForever(cc.sequence(
                        cc.moveBy(300 / config.vInside, cc.v2(300, 0)),
                        cc.moveBy(600 / config.vInside, cc.v2(-600, 0)),
                        cc.moveBy(300 / config.vInside, cc.v2(300, 0))
                    )));
                }, 1);
                break;
            }
            case 9: {
                let time = config.height / MATH.sqrt2 / config.vInside;
                // let dotNum = 2;
                // let d1, d2, d3, d4;
                // for (let i = 0; i < dotNum; i++) {
                //     d1 = this.newDot(cc.v2(-300 - config.height / 2 / dotNum * i, config.height - config.height / 2 / dotNum * i - 50));
                //     d2 = this.newDot(cc.v2(-300 - config.height / 2 + config.height / 2 / dotNum * i, config.height / 2 - config.height / 2 / dotNum * i - 50));
                //     d3 = this.newDot(cc.v2(-300 + config.height / 2 / dotNum * i, config.height / 2 / dotNum * i - 50));
                //     d4 = this.newDot(cc.v2(-300 + config.height / 2 - config.height / 2 / dotNum * i, config.height / 2 + config.height / 2 / dotNum * i - 50));

                //     d1.runAction(cc.repeatForever(cc.moveBy(time * 4, cc.v2(time * 4 * config.vOutside, 0))));
                //     d2.runAction(cc.repeatForever(cc.moveBy(time * 4, cc.v2(time * 4 * config.vOutside, 0))));
                //     d3.runAction(cc.repeatForever(cc.moveBy(time * 4, cc.v2(time * 4 * config.vOutside, 0))));
                //     d4.runAction(cc.repeatForever(cc.moveBy(time * 4, cc.v2(time * 4 * config.vOutside, 0))));
                // }
                let e = this.newEnemy(config.enemyId1, cc.v2(-300, config.height));
                e.runAction(cc.repeatForever(cc.spawn(
                    cc.sequence(
                        cc.moveBy(time, cc.v2(-config.height / 2, -config.height / 2)),
                        cc.moveBy(time, cc.v2(config.height / 2, -config.height / 2)),
                        cc.moveBy(time, cc.v2(config.height / 2, config.height / 2)),
                        cc.moveBy(time, cc.v2(-config.height / 2, config.height / 2))),
                    cc.moveBy(time * 4, cc.v2(time * 4 * config.vOutside, 0))
                )));
                break;
            }
            case 10: {
                // let dotNum = 3;
                // let d1, d2, d3, d4;
                // for (let i = 0; i < dotNum; i++) {
                //     d1 = this.newDot(cc.v2(-config.height / 2 / dotNum * i, config.height - config.height / 2 / dotNum * i - 50));
                //     d2 = this.newDot(cc.v2(-config.height / 2 + config.height / 2 / dotNum * i, config.height / 2 - config.height / 2 / dotNum * i - 50));
                //     d3 = this.newDot(cc.v2(config.height / 2 / dotNum * i, config.height / 2 / dotNum * i - 50));
                //     d4 = this.newDot(cc.v2(config.height / 2 - config.height / 2 / dotNum * i, config.height / 2 + config.height / 2 / dotNum * i - 50));
                // }
                let e1 = this.newEnemy(config.enemyId2, cc.v2(0, config.height / 2));
                let e2 = this.newEnemy(config.enemyId1, cc.v2(0, config.height));
                let e3 = this.newEnemy(config.enemyId1, cc.v2(-config.height / 2, config.height / 2));
                let e4 = this.newEnemy(config.enemyId1, cc.v2(0, 0));
                let e5 = this.newEnemy(config.enemyId1, cc.v2(config.height / 2, config.height / 2));
                let time = config.height / MATH.sqrt2 / config.vInside;
                e2.runAction(cc.repeatForever(cc.sequence(
                    cc.moveBy(time, cc.v2(-config.height / 2, -config.height / 2)),
                    cc.moveBy(time, cc.v2(config.height / 2, -config.height / 2)),
                    cc.moveBy(time, cc.v2(config.height / 2, config.height / 2)),
                    cc.moveBy(time, cc.v2(-config.height / 2, config.height / 2))
                )));
                e3.runAction(cc.repeatForever(cc.sequence(
                    cc.moveBy(time, cc.v2(config.height / 2, -config.height / 2)),
                    cc.moveBy(time, cc.v2(config.height / 2, config.height / 2)),
                    cc.moveBy(time, cc.v2(-config.height / 2, config.height / 2)),
                    cc.moveBy(time, cc.v2(-config.height / 2, -config.height / 2))
                )));
                e4.runAction(cc.repeatForever(cc.sequence(
                    cc.moveBy(time, cc.v2(config.height / 2, config.height / 2)),
                    cc.moveBy(time, cc.v2(-config.height / 2, config.height / 2)),
                    cc.moveBy(time, cc.v2(-config.height / 2, -config.height / 2)),
                    cc.moveBy(time, cc.v2(config.height / 2, -config.height / 2))
                )));
                e5.runAction(cc.repeatForever(cc.sequence(
                    cc.moveBy(time, cc.v2(-config.height / 2, config.height / 2)),
                    cc.moveBy(time, cc.v2(-config.height / 2, -config.height / 2)),
                    cc.moveBy(time, cc.v2(config.height / 2, -config.height / 2)),
                    cc.moveBy(time, cc.v2(config.height / 2, config.height / 2))
                )));
                break;
            }
            case 11: {
                // let dotNum = 4;
                // let windowSize = cc.winSize;
                // for (let i = 0; i < dotNum; i++) {
                //     let d = this.newDot(cc.v2(-windowSize.width / 2 + 45 + windowSize.width / dotNum * i, config.height / 2));
                // }
                let e1 = this.newEnemy(config.enemyId1, cc.v2(-300, config.height / 2));
                let e2 = this.newEnemy(config.enemyId1, cc.v2(300, config.height / 2));
                let e3 = this.newEnemy(config.enemyId2, cc.v2(0, config.height / 2));
                let distance = 180;
                let time = distance / config.vInside;
                e1.runAction(cc.repeatForever(cc.sequence(
                    cc.moveBy(time, cc.v2(distance, 0)),
                    cc.moveBy(time, cc.v2(-distance, 0))
                )));
                e2.runAction(cc.repeatForever(cc.sequence(
                    cc.moveBy(time, cc.v2(-distance, 0)),
                    cc.moveBy(time, cc.v2(distance, 0))
                )));
                break;
            }
            case 12: {
                // let dotNum = 5,verNum = 4;
                // let windowSize = cc.winSize;
                // for (let i = 0; i < dotNum; i++) {
                //     for (let j = 0; j < verNum; j++) {
                //     let d = this.newDot(cc.v2(-300 + j * 200, config.height / dotNum * i));
                //     }
                // }
                let e1 = this.newEnemy(config.enemyId1, cc.v2(-300, 0));
                let e2 = this.newEnemy(config.enemyId1, cc.v2(-100, 0));
                let e3 = this.newEnemy(config.enemyId1, cc.v2(100, 0));
                let e4 = this.newEnemy(config.enemyId1, cc.v2(300, 0));
                let time = config.height / config.vInside;
                let interval = 0.7;
                e1.runAction(cc.repeatForever(cc.sequence(
                    cc.moveBy(time, cc.v2(0, config.height)),
                    cc.moveBy(time, cc.v2(0, -config.height))
                )));
                this.scheduleOnce(() => {
                    e2.runAction(cc.repeatForever(cc.sequence(
                        cc.moveBy(time, cc.v2(0, config.height)),
                        cc.moveBy(time, cc.v2(0, -config.height))
                    )));
                }, interval);
                this.scheduleOnce(() => {
                    e3.runAction(cc.repeatForever(cc.sequence(
                        cc.moveBy(time, cc.v2(0, config.height)),
                        cc.moveBy(time, cc.v2(0, -config.height))
                    )));
                }, interval * 2);
                this.scheduleOnce(() => {
                    e4.runAction(cc.repeatForever(cc.sequence(
                        cc.moveBy(time, cc.v2(0, config.height)),
                        cc.moveBy(time, cc.v2(0, -config.height))
                    )));
                }, interval * 3);
                break;
            }
            case 13: {
                //椭圆运动半径
                // x = 0 + Math.cos(2*PI/360*角度)   y = config.height / 2 + Math.sin(2*PI/360*角度)
                let r1 = 400, r2 = 250, r3 = 170, dotNum = 4, d1, d2, d3, d4;
                // for (let i = 0; i < dotNum; i++) {
                //     d1 = this.newDot(cc.v2(Math.cos(90 / (dotNum - 1) * i * 2 * Math.PI / 360) * r2, config.height / 2 + Math.sin(90 / (dotNum - 1) * i * 2 * Math.PI / 360) * r3 - 20));
                //     d2 = this.newDot(cc.v2(-Math.cos(90 / (dotNum - 1) * i * 2 * Math.PI / 360) * r2, config.height / 2 + Math.sin(90 / (dotNum - 1) * i * 2 * Math.PI / 360) * r3 - 20));
                //     d3 = this.newDot(cc.v2(-Math.cos(90 / (dotNum - 1) * i * 2 * Math.PI / 360) * r2, config.height / 2 - Math.sin(90 / (dotNum - 1) * i * 2 * Math.PI / 360) * r3 - 20));
                //     d4 = this.newDot(cc.v2(Math.cos(90 / (dotNum - 1) * i * 2 * Math.PI / 360) * r2, config.height / 2 - Math.sin(90 / (dotNum - 1) * i * 2 * Math.PI / 360) * r3 - 20));
                // }
                let e1 = this.newEnemy(config.enemyId1, cc.v2(-r2, config.height / 2 + 20));
                let e2 = this.newEnemy(config.enemyId2, cc.v2(0, config.height / 2));
                let e3 = this.newEnemy(config.enemyId1, cc.v2(r2, config.height / 2 + 20));
                let point_1 = [cc.p(-r2, config.height / 2 + 20), cc.p(0, config.height / 2 + 20 + r1), cc.p(r2, config.height / 2 + 20)];
                let point_2 = [cc.p(r2, config.height / 2 + 20), cc.p(0, config.height / 2 + 20 + r1), cc.p(-r2, config.height / 2 + 20)];
                let point_3 = [cc.p(r2, config.height / 2 + 20), cc.p(0, config.height / 2 + 20 - r1), cc.p(-r2, config.height / 2 + 20)];
                let point_4 = [cc.p(-r2, config.height / 2 + 20), cc.p(0, config.height / 2 + 20 - r1), cc.p(r2, config.height / 2 + 20)];
                let time = 2 * r1 / config.vInside;
                e1.runAction(cc.repeatForever(cc.sequence(
                    cc.bezierTo(time, point_1),
                    cc.bezierTo(time, point_2)
                )));
                e3.runAction(cc.repeatForever(cc.sequence(
                    cc.bezierTo(time, point_3),
                    cc.bezierTo(time, point_4)
                )));
                break;
            }
        }
    },

    newEnemy(id, pos) {
        // let prefab = this.enemyPrefabs[id - 1];
        // let node = cc.instantiate(prefab);
        // node.position = pos;
        // node.parent = this.node;
        // return node;

        let node = GameApp.pool.getEnemy(id);
        node.position = pos;
        node.parent = this.node;
        return node;
    },
    newDot(pos) {
        // let prefab = this.dotPrefab;
        // let node = cc.instantiate(prefab);
        // node.position = pos;
        // node.parent = this.node;
        // return node;

        let node = GameApp.pool.getDot();
        node.position = pos;
        node.parent = this.node;
        return node;
    },
    update(dt) {
        if (this._isRunningSearch) return;
        if (this.node.parent.y + this.node.y + this.node.height < -640) {
            this._isRunningSearch = true;
            for (let i = this.node.childrenCount - 1; i >= 0; i--) {
                this.node.children[i].stopAllActions();
                if (this.node.children[i].name === 'dot') {
                    GameApp.pool.putDot(this.node.children[i]);
                } else if (this.node.children[i].name === 'Enemy1') {
                    GameApp.pool.putEnemy(1, this.node.children[i]);
                } else if (this.node.children[i].name === 'Enemy2') {
                    GameApp.pool.putEnemy(2, this.node.children[i]);
                } else if (this.node.children[i].name === 'Enemy3') {
                    GameApp.pool.putEnemy(3, this.node.children[i]);
                } else if (this.node.children[i].name === 'Enemy4') {
                    GameApp.pool.putEnemy(4, this.node.children[i]);
                } else if (this.node.children[i].name === 'Enemy5') {
                    GameApp.pool.putEnemy(5, this.node.children[i]);
                }
            }
        }
    },

});
