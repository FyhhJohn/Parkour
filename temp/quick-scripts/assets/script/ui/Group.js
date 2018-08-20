(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/ui/Group.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '4550ayOGaRA273dBJc69eDA', 'Group', __filename);
// script/ui/Group.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        _isRunningSearch: false,
        enemyPrefabs: [cc.Prefab],
        dotPrefab: cc.Prefab
    },

    init: function init(id, y) {
        var _this = this;

        this._isRunningSearch = false;
        this.node.position = cc.v2(0, y);
        var config = GameApp.data.config.group[id];
        this.node.height = config.height;
        this.scheduleOnce(function () {
            _this.newGroup(id, config);
        }, y / GameApp.data.mapVelocity());
        return config.height;
    },
    newGroup: function newGroup(id, config) {
        switch (id) {
            case 1:
                {
                    //轨迹
                    // let dotNum = 6;
                    // let windowSize = cc.winSize;
                    // for (let i = 0; i < dotNum; i++) {
                    //     let d = this.newDot(cc.v2(-windowSize.width / 2 + 45 + windowSize.width / dotNum * i, config.height / 2 - 20));
                    // }
                    for (var i = 0; i < config.num; i++) {
                        var x = -660 + 120 * i;
                        var e = this.newEnemy(config.enemyId1, cc.v2(x, config.height / 2));
                        e.runAction(cc.moveBy((720 - x) / config.vOutside, cc.v2(720 - x, 0)));
                    }
                    break;
                }
            case 2:
                {
                    //轨迹
                    // let dotNum = 3;
                    // let d1, d2, d3, d4;
                    // for (let i = 0; i < dotNum; i++) {
                    //     d1 = this.newDot(cc.v2(-config.height / 2 / dotNum * i, config.height - config.height / 2 / dotNum * i - 50));
                    //     d2 = this.newDot(cc.v2(-config.height / 2 + config.height / 2 / dotNum * i, config.height / 2 - config.height / 2 / dotNum * i - 50));
                    //     d3 = this.newDot(cc.v2(config.height / 2 / dotNum * i, config.height / 2 / dotNum * i - 50));
                    //     d4 = this.newDot(cc.v2(config.height / 2 - config.height / 2 / dotNum * i, config.height / 2 + config.height / 2 / dotNum * i - 50));
                    // }
                    var e1 = this.newEnemy(config.enemyId1, cc.v2(0, config.height));
                    var e2 = this.newEnemy(config.enemyId1, cc.v2(0, 0));
                    var time = config.height / MATH.sqrt2 / config.vInside;
                    e1.runAction(cc.repeatForever(cc.sequence(cc.moveBy(time, cc.v2(-config.height / 2, -config.height / 2)), cc.moveBy(time, cc.v2(config.height / 2, -config.height / 2)), cc.moveBy(time, cc.v2(config.height / 2, config.height / 2)), cc.moveBy(time, cc.v2(-config.height / 2, config.height / 2)))));
                    e2.runAction(cc.repeatForever(cc.sequence(cc.moveBy(time, cc.v2(config.height / 2, config.height / 2)), cc.moveBy(time, cc.v2(-config.height / 2, config.height / 2)), cc.moveBy(time, cc.v2(-config.height / 2, -config.height / 2)), cc.moveBy(time, cc.v2(config.height / 2, -config.height / 2)))));
                    break;
                }
            case 3:
                {
                    // let dotNum = 6;
                    // let windowSize = cc.winSize;
                    // for (let i = 0; i < dotNum; i++) {
                    //     let d = this.newDot(cc.v2(-windowSize.width / 2 + 45 + windowSize.width / dotNum * i, config.height / 2 - 20));
                    // }
                    var _e = this.newEnemy(config.enemyId1, cc.v2(-300, config.height / 2));
                    var _e2 = this.newEnemy(config.enemyId1, cc.v2(300, config.height / 2));
                    var distance = 250;
                    var _time = distance / config.vInside;
                    _e.runAction(cc.repeatForever(cc.sequence(cc.moveBy(_time, cc.v2(distance, 0)), cc.moveBy(_time, cc.v2(-distance, 0)))));
                    _e2.runAction(cc.repeatForever(cc.sequence(cc.moveBy(_time, cc.v2(-distance, 0)), cc.moveBy(_time, cc.v2(distance, 0)))));
                    break;
                }
            case 4:
                {
                    // let dotNum = 6;
                    // let windowSize = cc.winSize;
                    // for (let i = 0; i < dotNum; i++) {
                    //     let d = this.newDot(cc.v2(-windowSize.width / 2 + 45 + windowSize.width / dotNum * i, config.height / 2 - 20));
                    // }
                    var _e3 = this.newEnemy(config.enemyId1, cc.v2(0, config.height / 2));
                    _e3.runAction(cc.repeatForever(cc.sequence(cc.moveBy(300 / config.vOutside, cc.v2(300, 0)), cc.moveBy(600 / config.vOutside, cc.v2(-600, 0)), cc.moveBy(300 / config.vOutside, cc.v2(300, 0)))));
                    break;
                }
            case 5:
                {
                    // let dotNum = 6;
                    // let windowSize = cc.winSize;
                    // for (let i = 0; i < dotNum; i++) {
                    //     this.newDot(cc.v2(-windowSize.width / 2 + 45 + windowSize.width / dotNum * i, 240 - 20));
                    //     this.newDot(cc.v2(-windowSize.width / 2 + 45 + windowSize.width / dotNum * i, 0 - 20));
                    // }
                    for (var _i = 0; _i < config.num; _i++) {
                        var _x = -540 + 80 * _i;
                        var y = 240 - 80 * _i;
                        var _e4 = this.newEnemy(config.enemyId1, cc.v2(_x, y));
                        _e4.runAction(cc.moveBy((720 - _x) / config.vOutside, cc.v2(720 - _x, 0)));
                    }
                    break;
                }
            case 6:
                {
                    var _e5 = this.newEnemy(config.enemyId1, cc.v2(-300, config.height / 2));
                    var _e6 = this.newEnemy(config.enemyId1, cc.v2(0, config.height / 2));
                    var e3 = this.newEnemy(config.enemyId1, cc.v2(300, config.height / 2));
                    break;
                }
            case 7:
                {
                    // let dotNum = 2;
                    // let d1, d2, d3, d4;
                    // for (let i = 0; i < dotNum; i++) {
                    //     d1 = this.newDot(cc.v2(-config.height / 4 / dotNum * i, config.height * 3 / 4 - config.height / 4 / dotNum * i));
                    //     d2 = this.newDot(cc.v2(-config.height / 4 + config.height / 4 / dotNum * i, config.height / 2 - config.height / 4 / dotNum * i));
                    //     d3 = this.newDot(cc.v2(config.height / 4 / dotNum * i, config.height / 4 + config.height / 4 / dotNum * i));
                    //     d4 = this.newDot(cc.v2(config.height / 4 - config.height / 4 / dotNum * i, config.height / 2 + config.height / 4 / dotNum * i));
                    // }
                    var _e7 = this.newEnemy(config.enemyId2, cc.v2(-300, config.height / 2));
                    var _e8 = this.newEnemy(config.enemyId2, cc.v2(0, config.height / 2));
                    var _e9 = this.newEnemy(config.enemyId2, cc.v2(300, config.height / 2));
                    var e4 = this.newEnemy(config.enemyId1, cc.v2(0, config.height * 3 / 4));
                    var _time2 = config.height / 2 / MATH.sqrt2 / config.vInside;
                    e4.runAction(cc.repeatForever(cc.sequence(cc.moveBy(_time2, cc.v2(-config.height / 4, -config.height / 4)), cc.moveBy(_time2, cc.v2(config.height / 4, -config.height / 4)), cc.moveBy(_time2, cc.v2(config.height / 4, config.height / 4)), cc.moveBy(_time2, cc.v2(-config.height / 4, config.height / 4)))));
                    break;
                }
            case 8:
                {
                    // let dotNum = 6,rowNum = 3;
                    // let windowSize = cc.winSize;
                    // for (let i = 0; i < dotNum; i++) {
                    //     for (let j = 0; j < rowNum; j++) {
                    //     let d = this.newDot(cc.v2(-windowSize.width / 2 + 45 + windowSize.width / dotNum * i, config.height / 2 * j - 20));
                    //     }
                    // }
                    var _e10 = this.newEnemy(config.enemyId1, cc.v2(0, 0));
                    var _e11 = this.newEnemy(config.enemyId1, cc.v2(0, config.height / 2));
                    var _e12 = this.newEnemy(config.enemyId1, cc.v2(0, config.height));
                    _e10.runAction(cc.repeatForever(cc.sequence(cc.moveBy(300 / config.vInside, cc.v2(300, 0)), cc.moveBy(600 / config.vInside, cc.v2(-600, 0)), cc.moveBy(300 / config.vInside, cc.v2(300, 0)))));
                    this.scheduleOnce(function () {
                        _e11.runAction(cc.repeatForever(cc.sequence(cc.moveBy(300 / config.vInside, cc.v2(300, 0)), cc.moveBy(600 / config.vInside, cc.v2(-600, 0)), cc.moveBy(300 / config.vInside, cc.v2(300, 0)))));
                    }, 0.5);
                    this.scheduleOnce(function () {
                        _e12.runAction(cc.repeatForever(cc.sequence(cc.moveBy(300 / config.vInside, cc.v2(300, 0)), cc.moveBy(600 / config.vInside, cc.v2(-600, 0)), cc.moveBy(300 / config.vInside, cc.v2(300, 0)))));
                    }, 1);
                    break;
                }
            case 9:
                {
                    var _time3 = config.height / MATH.sqrt2 / config.vInside;
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
                    var _e13 = this.newEnemy(config.enemyId1, cc.v2(-300, config.height));
                    _e13.runAction(cc.repeatForever(cc.spawn(cc.sequence(cc.moveBy(_time3, cc.v2(-config.height / 2, -config.height / 2)), cc.moveBy(_time3, cc.v2(config.height / 2, -config.height / 2)), cc.moveBy(_time3, cc.v2(config.height / 2, config.height / 2)), cc.moveBy(_time3, cc.v2(-config.height / 2, config.height / 2))), cc.moveBy(_time3 * 4, cc.v2(_time3 * 4 * config.vOutside, 0)))));
                    break;
                }
            case 10:
                {
                    // let dotNum = 3;
                    // let d1, d2, d3, d4;
                    // for (let i = 0; i < dotNum; i++) {
                    //     d1 = this.newDot(cc.v2(-config.height / 2 / dotNum * i, config.height - config.height / 2 / dotNum * i - 50));
                    //     d2 = this.newDot(cc.v2(-config.height / 2 + config.height / 2 / dotNum * i, config.height / 2 - config.height / 2 / dotNum * i - 50));
                    //     d3 = this.newDot(cc.v2(config.height / 2 / dotNum * i, config.height / 2 / dotNum * i - 50));
                    //     d4 = this.newDot(cc.v2(config.height / 2 - config.height / 2 / dotNum * i, config.height / 2 + config.height / 2 / dotNum * i - 50));
                    // }
                    var _e14 = this.newEnemy(config.enemyId2, cc.v2(0, config.height / 2));
                    var _e15 = this.newEnemy(config.enemyId1, cc.v2(0, config.height));
                    var _e16 = this.newEnemy(config.enemyId1, cc.v2(-config.height / 2, config.height / 2));
                    var _e17 = this.newEnemy(config.enemyId1, cc.v2(0, 0));
                    var e5 = this.newEnemy(config.enemyId1, cc.v2(config.height / 2, config.height / 2));
                    var _time4 = config.height / MATH.sqrt2 / config.vInside;
                    _e15.runAction(cc.repeatForever(cc.sequence(cc.moveBy(_time4, cc.v2(-config.height / 2, -config.height / 2)), cc.moveBy(_time4, cc.v2(config.height / 2, -config.height / 2)), cc.moveBy(_time4, cc.v2(config.height / 2, config.height / 2)), cc.moveBy(_time4, cc.v2(-config.height / 2, config.height / 2)))));
                    _e16.runAction(cc.repeatForever(cc.sequence(cc.moveBy(_time4, cc.v2(config.height / 2, -config.height / 2)), cc.moveBy(_time4, cc.v2(config.height / 2, config.height / 2)), cc.moveBy(_time4, cc.v2(-config.height / 2, config.height / 2)), cc.moveBy(_time4, cc.v2(-config.height / 2, -config.height / 2)))));
                    _e17.runAction(cc.repeatForever(cc.sequence(cc.moveBy(_time4, cc.v2(config.height / 2, config.height / 2)), cc.moveBy(_time4, cc.v2(-config.height / 2, config.height / 2)), cc.moveBy(_time4, cc.v2(-config.height / 2, -config.height / 2)), cc.moveBy(_time4, cc.v2(config.height / 2, -config.height / 2)))));
                    e5.runAction(cc.repeatForever(cc.sequence(cc.moveBy(_time4, cc.v2(-config.height / 2, config.height / 2)), cc.moveBy(_time4, cc.v2(-config.height / 2, -config.height / 2)), cc.moveBy(_time4, cc.v2(config.height / 2, -config.height / 2)), cc.moveBy(_time4, cc.v2(config.height / 2, config.height / 2)))));
                    break;
                }
            case 11:
                {
                    // let dotNum = 4;
                    // let windowSize = cc.winSize;
                    // for (let i = 0; i < dotNum; i++) {
                    //     let d = this.newDot(cc.v2(-windowSize.width / 2 + 45 + windowSize.width / dotNum * i, config.height / 2));
                    // }
                    var _e18 = this.newEnemy(config.enemyId1, cc.v2(-300, config.height / 2));
                    var _e19 = this.newEnemy(config.enemyId1, cc.v2(300, config.height / 2));
                    var _e20 = this.newEnemy(config.enemyId2, cc.v2(0, config.height / 2));
                    var _distance = 180;
                    var _time5 = _distance / config.vInside;
                    _e18.runAction(cc.repeatForever(cc.sequence(cc.moveBy(_time5, cc.v2(_distance, 0)), cc.moveBy(_time5, cc.v2(-_distance, 0)))));
                    _e19.runAction(cc.repeatForever(cc.sequence(cc.moveBy(_time5, cc.v2(-_distance, 0)), cc.moveBy(_time5, cc.v2(_distance, 0)))));
                    break;
                }
            case 12:
                {
                    // let dotNum = 5,verNum = 4;
                    // let windowSize = cc.winSize;
                    // for (let i = 0; i < dotNum; i++) {
                    //     for (let j = 0; j < verNum; j++) {
                    //     let d = this.newDot(cc.v2(-300 + j * 200, config.height / dotNum * i));
                    //     }
                    // }
                    var _e21 = this.newEnemy(config.enemyId1, cc.v2(-300, 0));
                    var _e22 = this.newEnemy(config.enemyId1, cc.v2(-100, 0));
                    var _e23 = this.newEnemy(config.enemyId1, cc.v2(100, 0));
                    var _e24 = this.newEnemy(config.enemyId1, cc.v2(300, 0));
                    var _time6 = config.height / config.vInside;
                    var interval = 0.7;
                    _e21.runAction(cc.repeatForever(cc.sequence(cc.moveBy(_time6, cc.v2(0, config.height)), cc.moveBy(_time6, cc.v2(0, -config.height)))));
                    this.scheduleOnce(function () {
                        _e22.runAction(cc.repeatForever(cc.sequence(cc.moveBy(_time6, cc.v2(0, config.height)), cc.moveBy(_time6, cc.v2(0, -config.height)))));
                    }, interval);
                    this.scheduleOnce(function () {
                        _e23.runAction(cc.repeatForever(cc.sequence(cc.moveBy(_time6, cc.v2(0, config.height)), cc.moveBy(_time6, cc.v2(0, -config.height)))));
                    }, interval * 2);
                    this.scheduleOnce(function () {
                        _e24.runAction(cc.repeatForever(cc.sequence(cc.moveBy(_time6, cc.v2(0, config.height)), cc.moveBy(_time6, cc.v2(0, -config.height)))));
                    }, interval * 3);
                    break;
                }
            case 13:
                {
                    //椭圆运动半径
                    // x = 0 + Math.cos(2*PI/360*角度)   y = config.height / 2 + Math.sin(2*PI/360*角度)
                    var r1 = 400,
                        r2 = 250,
                        r3 = 170,
                        dotNum = 4,
                        d1 = void 0,
                        d2 = void 0,
                        d3 = void 0,
                        d4 = void 0;
                    // for (let i = 0; i < dotNum; i++) {
                    //     d1 = this.newDot(cc.v2(Math.cos(90 / (dotNum - 1) * i * 2 * Math.PI / 360) * r2, config.height / 2 + Math.sin(90 / (dotNum - 1) * i * 2 * Math.PI / 360) * r3 - 20));
                    //     d2 = this.newDot(cc.v2(-Math.cos(90 / (dotNum - 1) * i * 2 * Math.PI / 360) * r2, config.height / 2 + Math.sin(90 / (dotNum - 1) * i * 2 * Math.PI / 360) * r3 - 20));
                    //     d3 = this.newDot(cc.v2(-Math.cos(90 / (dotNum - 1) * i * 2 * Math.PI / 360) * r2, config.height / 2 - Math.sin(90 / (dotNum - 1) * i * 2 * Math.PI / 360) * r3 - 20));
                    //     d4 = this.newDot(cc.v2(Math.cos(90 / (dotNum - 1) * i * 2 * Math.PI / 360) * r2, config.height / 2 - Math.sin(90 / (dotNum - 1) * i * 2 * Math.PI / 360) * r3 - 20));
                    // }
                    var _e25 = this.newEnemy(config.enemyId1, cc.v2(-r2, config.height / 2 + 20));
                    var _e26 = this.newEnemy(config.enemyId2, cc.v2(0, config.height / 2));
                    var _e27 = this.newEnemy(config.enemyId1, cc.v2(r2, config.height / 2 + 20));
                    var point_1 = [cc.p(-r2, config.height / 2 + 20), cc.p(0, config.height / 2 + 20 + r1), cc.p(r2, config.height / 2 + 20)];
                    var point_2 = [cc.p(r2, config.height / 2 + 20), cc.p(0, config.height / 2 + 20 + r1), cc.p(-r2, config.height / 2 + 20)];
                    var point_3 = [cc.p(r2, config.height / 2 + 20), cc.p(0, config.height / 2 + 20 - r1), cc.p(-r2, config.height / 2 + 20)];
                    var point_4 = [cc.p(-r2, config.height / 2 + 20), cc.p(0, config.height / 2 + 20 - r1), cc.p(r2, config.height / 2 + 20)];
                    var _time7 = 2 * r1 / config.vInside;
                    _e25.runAction(cc.repeatForever(cc.sequence(cc.bezierTo(_time7, point_1), cc.bezierTo(_time7, point_2))));
                    _e27.runAction(cc.repeatForever(cc.sequence(cc.bezierTo(_time7, point_3), cc.bezierTo(_time7, point_4))));
                    break;
                }
        }
    },
    newEnemy: function newEnemy(id, pos) {
        // let prefab = this.enemyPrefabs[id - 1];
        // let node = cc.instantiate(prefab);
        // node.position = pos;
        // node.parent = this.node;
        // return node;

        var node = GameApp.pool.getEnemy(id);
        node.position = pos;
        node.parent = this.node;
        return node;
    },
    newDot: function newDot(pos) {
        // let prefab = this.dotPrefab;
        // let node = cc.instantiate(prefab);
        // node.position = pos;
        // node.parent = this.node;
        // return node;

        var node = GameApp.pool.getDot();
        node.position = pos;
        node.parent = this.node;
        return node;
    },
    update: function update(dt) {
        if (this._isRunningSearch) return;
        if (this.node.parent.y + this.node.y + this.node.height < -640) {
            this._isRunningSearch = true;
            for (var i = this.node.childrenCount - 1; i >= 0; i--) {
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
        //# sourceMappingURL=Group.js.map
        