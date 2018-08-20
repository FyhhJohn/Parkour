cc.Class({
    name: 'Data',

    properties: {
        request: null,
        user: null,
        params: null,
        config: null,
        level: 0,
    },

    mapVelocity() {
        let maxMultiple = this.params.maxSpeedTimes;
        if (UTILS.isWeiXinMiniGame()) {
            maxMultiple = 1.5;
        }
        let multiple = Math.min(maxMultiple, 1 + Math.floor((this.level - 1) / this.params.countForRiseSpeed) * this.params.speedIncrementPercent / 100);
        return this.params.sceneInitSpeed * multiple;
    },

    groupInterval() {
        return this.params.obstacleDistance;
    },

    levelScore() {
        return this.params.layerScore;
    },
});