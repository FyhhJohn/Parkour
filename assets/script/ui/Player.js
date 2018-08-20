const BALL_DISTANCE = 150;

cc.Class({
    extends: cc.Component,

    properties: {
        playerNode: cc.Node,
        ballNode: cc.Node,
        fallNode: cc.Node,
    },

    onCollisionEnter(other, self) {
        if (other.node.name === 'Circle') {
            return;
        }
        GameApp.ui.node.emit('GAME_OVER');
    },

    run() {
        this.ballNode.position = cc.v2(0, 70);
        this.playerNode.getComponent(cc.Animation).play('run');
        this.ballNode.runAction(cc.repeatForever(cc.sequence(
            cc.callFunc(() => {
                this.ballNode.getComponent(cc.Animation).play('roll');
                GameApp.sound.playEffect('kick');
            }),
            cc.moveBy(0.3, cc.v2(0, BALL_DISTANCE)),
            cc.moveBy(BALL_DISTANCE / GameApp.data.mapVelocity(), cc.v2(0, -BALL_DISTANCE))
        )));
    },

    stand() {
        this.playerNode.getComponent(cc.Animation).play('stand');
        this.ballNode.stopAllActions();
    },

    shoot() {
        GameApp.sound.playEffect('kick');
        this.ballNode.setPosition(0, 70);
        this.ballNode.runAction(cc.repeat(cc.sequence(
            cc.callFunc(() => {
                this.ballNode.getComponent(cc.Animation).play('roll');
            }),
            cc.moveBy(0.3, cc.v2(0, 220)),
        ), 3));
    },

    die() {
        this.playerNode.active = false;
        this.fallNode.active = true;
        this.fallNode.runAction(cc.moveBy(0.3, cc.v2(0, BALL_DISTANCE)));
        this.ballNode.runAction(cc.sequence(
            cc.callFunc(() => {
                this.ballNode.getComponent(cc.Animation).play('roll');
            }),
            cc.moveBy(0.3, cc.v2(BALL_DISTANCE, BALL_DISTANCE * 2)),
            cc.callFunc(() => {
                this.node.runAction(cc.repeatForever(cc.blink(0.4, 1)));
            })
        ));
    },
});
