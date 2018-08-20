(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/core/Data.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '7852fPSUghAF6Wfo/WW6FAu', 'Data', __filename);
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
        //# sourceMappingURL=Data.js.map
        