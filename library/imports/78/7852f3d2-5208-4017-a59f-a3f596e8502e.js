"use strict";
cc._RF.push(module, '7852fPSUghAF6Wfo/WW6FAu', 'Data');
// script/core/Data.js

'use strict';

cc.Class({
    name: 'Data',

    properties: {
        request: null,
        user: null,
        params: null,
        config: null,
        level: 0
    },

    mapVelocity: function mapVelocity() {
        var maxMultiple = this.params.maxSpeedTimes;
        if (UTILS.isWeiXinMiniGame()) {
            maxMultiple = 1.5;
        }
        var multiple = Math.min(maxMultiple, 1 + Math.floor((this.level - 1) / this.params.countForRiseSpeed) * this.params.speedIncrementPercent / 100);
        return this.params.sceneInitSpeed * multiple;
    },
    groupInterval: function groupInterval() {
        return this.params.obstacleDistance;
    },
    levelScore: function levelScore() {
        return this.params.layerScore;
    }
});

cc._RF.pop();