"use strict";
cc._RF.push(module, '487a7pxKJxF9JGNdA8Lyqsn', 'Player');
// script/ui/Player.js

'use strict';

var BALL_DISTANCE = 150;

cc.Class({
    extends: cc.Component,

    properties: {
        playerNode: cc.Node,
        ballNode: cc.Node,
        fallNode: cc.Node
    },

    onCollisionEnter: function onCollisionEnter(other, self) {
        if (other.node.name === 'Circle') {
            return;
        }
        GameApp.ui.node.emit('GAME_OVER');
    },
    run: function run() {
        var _this = this;

        this.ballNode.position = cc.v2(0, 70);
        this.playerNode.getComponent(cc.Animation).play('run');
        this.ballNode.runAction(cc.repeatForever(cc.sequence(cc.callFunc(function () {
            _this.ballNode.getComponent(cc.Animation).play('roll');
            GameApp.sound.playEffect('kick');
        }), cc.moveBy(0.3, cc.v2(0, BALL_DISTANCE)), cc.moveBy(BALL_DISTANCE / GameApp.data.mapVelocity(), cc.v2(0, -BALL_DISTANCE)))));
    },
    stand: function stand() {
        this.playerNode.getComponent(cc.Animation).play('stand');
        this.ballNode.stopAllActions();
    },
    shoot: function shoot() {
        var _this2 = this;

        GameApp.sound.playEffect('kick');
        this.ballNode.setPosition(0, 70);
        this.ballNode.runAction(cc.repeat(cc.sequence(cc.callFunc(function () {
            _this2.ballNode.getComponent(cc.Animation).play('roll');
        }), cc.moveBy(0.3, cc.v2(0, 220))), 3));
    },
    die: function die() {
        var _this3 = this;

        this.playerNode.active = false;
        this.fallNode.active = true;
        this.fallNode.runAction(cc.moveBy(0.3, cc.v2(0, BALL_DISTANCE)));
        this.ballNode.runAction(cc.sequence(cc.callFunc(function () {
            _this3.ballNode.getComponent(cc.Animation).play('roll');
        }), cc.moveBy(0.3, cc.v2(BALL_DISTANCE, BALL_DISTANCE * 2)), cc.callFunc(function () {
            _this3.node.runAction(cc.repeatForever(cc.blink(0.4, 1)));
        })));
    }
});

cc._RF.pop();