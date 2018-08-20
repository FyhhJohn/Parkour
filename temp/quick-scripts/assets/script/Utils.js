(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/Utils.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '3aaaflGiDVAC4cDfmebmqZD', 'Utils', __filename);
// script/Utils.js

'use strict';

window.UTILS = {
    getColor: function getColor(value) {
        if (value <= 20) {
            return COLOR.WHITE;
        } else if (value <= 40) {
            return COLOR.GREEN;
        } else if (value <= 60) {
            return COLOR.BLUE;
        } else if (value <= 80) {
            return COLOR.PURPLE;
        } else {
            return COLOR.ORANGE;
        }
    },


    toCountdownString: function toCountdownString(s) {
        s = Math.floor(s);
        var day = Math.floor(s / (24 * 60 * 60));
        s -= day * (24 * 60 * 60);
        var hour = Math.floor(s / (60 * 60));
        s -= hour * (60 * 60);
        var minute = Math.floor(s / 60);
        s -= minute * 60;
        var ret = '';
        if (day > 0) {
            ret += day + '天';
        }
        if (hour > 0) {
            ret += hour + '小时';
        }
        if (minute > 0) {
            ret += minute + '分';
        }
        if (s >= 0) {
            ret += s + '秒';
        }
        return ret;
    },

    addPreZero: function addPreZero(number, digits) {
        var s = number.toString();
        for (var i = 0; i < digits; i++) {
            s = '0' + s;
        }
        return s.substring(s.length - digits);
    },

    isWeiXin: function isWeiXin() {
        if (cc.sys.isNative) {
            return false;
        }
        var ua = window.navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
            return true;
        } else {
            return false;
        }
    },

    isWeiXinMiniGame: function isWeiXinMiniGame() {
        var isWeiXin = this.isWeiXin();
        if (!isWeiXin) {
            return false;
        }
        var ua = window.navigator.userAgent.toLowerCase();
        if (ua.match(/MiniGame/i) == 'minigame') {
            return true;
        } else {
            return false;
        }
    },


    GetRequest: function GetRequest() {
        //获取url中"?"符后的字串
        var url = location.search;
        var theRequest = {};
        if (url && url.indexOf("?") !== -1) {
            var str = url.substr(1);
            var strs = str.split("&");
            for (var i = 0; i < strs.length; i++) {
                theRequest[strs[i].split("=")[0]] = strs[i].split("=")[1];
            }
        }
        return theRequest;
    },

    delUrlParam: function delUrlParam(url, ref) {
        if (url.indexOf(ref) === -1) {
            return url;
        }
        var arr_url = url.split('?');
        var base = arr_url[0];
        var arr_param = arr_url[1].split('&');
        var index = -1;
        for (var i = 0; i < arr_param.length; i++) {
            var paired = arr_param[i].split('=');
            if (paired[0] === ref) {
                index = i;
                break;
            }
        }
        if (index === -1) {
            return url;
        } else {
            arr_param.splice(index, 1);
            return base + "?" + arr_param.join('&');
        }
    },

    initNetImage: function initNetImage(url, sprite) {
        cc.loader.load({ url: url, type: 'png' }, function (err, texture) {
            sprite.spriteFrame = new cc.SpriteFrame(texture);
        });
    }
};

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
        //# sourceMappingURL=Utils.js.map
        