window.UTILS = {
    getColor(value) {
        if (value <= 20) {
            return COLOR.WHITE;
        }
        else if (value <= 40) {
            return COLOR.GREEN;
        }
        else if (value <= 60) {
            return COLOR.BLUE;
        }
        else if (value <= 80) {
            return COLOR.PURPLE;
        }
        else {
            return COLOR.ORANGE;
        }
    },

    toCountdownString: function (s) {
        s = Math.floor(s);
        let day = Math.floor(s / (24 * 60 * 60));
        s -= day * (24 * 60 * 60);
        let hour = Math.floor(s / (60 * 60));
        s -= hour * (60 * 60);
        let minute = Math.floor(s / 60);
        s -= minute * 60;
        let ret = '';
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

    addPreZero: function (number, digits) {
        let s = number.toString();
        for (let i = 0; i < digits; i++) {
            s = '0' + s;
        }
        return s.substring(s.length - digits);
    },

    isWeiXin: function () {
        if (cc.sys.isNative) {
            return false;
        }
        let ua = window.navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
            return true;
        } else {
            return false;
        }
    },

    isWeiXinMiniGame() {
        let isWeiXin = this.isWeiXin();
        if (!isWeiXin) {
            return false;
        }
        let ua = window.navigator.userAgent.toLowerCase();
        if (ua.match(/MiniGame/i) == 'minigame') {
            return true;
        } else {
            return false;
        }
    },

    GetRequest: function () {
        //获取url中"?"符后的字串
        let url = location.search;
        let theRequest = {};
        if (url && url.indexOf("?") !== -1) {
            let str = url.substr(1);
            let strs = str.split("&");
            for (let i = 0; i < strs.length; i++) {
                theRequest[strs[i].split("=")[0]] = (strs[i].split("=")[1]);
            }
        }
        return theRequest;
    },

    delUrlParam: function (url, ref) {
        if (url.indexOf(ref) === -1) {
            return url;
        }
        let arr_url = url.split('?');
        let base = arr_url[0];
        let arr_param = arr_url[1].split('&');
        let index = -1;
        for (let i = 0; i < arr_param.length; i++) {
            let paired = arr_param[i].split('=');
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

    initNetImage: function (url, sprite) {
        cc.loader.load({url: url, type: 'png'}, function (err, texture) {
            sprite.spriteFrame = new cc.SpriteFrame(texture);
        });
    },
};