(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/Const.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '8c94a72FgxMD5HZA8PfDiYp', 'Const', __filename);
// script/Const.js

'use strict';

var servers = {
    TEST: 'TEST',
    INSPECT: 'INSPECT',
    RELEASE: 'RELEASE'
};
window.SERVER = servers.TEST;

window.WS_SERVERS = {
    TEST: 'wss://cgbeta.mggame.com.cn/football2',
    // TEST: 'ws://cgbeta.mggame.com.cn:10081/football2',
    INSPECT: 'ws://cgbeta.mggame.com.cn:11081/football2',
    RELEASE: 'wss://htgate.mggame.com.cn/football2'
};

window.HTTP_SERVERS = {
    TEST: 'http://htgate.mggame.com.cn/gateway/json',
    INSPECT: 'http://htgate.mggame.com.cn/gateway/json',
    RELEASE: 'http://htgate.mggame.com.cn/gateway/json'
};
window.SHARE_URL = {
    TEST: 'http://cgbeta.mggame.com.cn:10081/html5/soccer2/',
    INSPECT: 'http://cgbeta.mggame.com.cn:10081/html5/soccer2/',
    RELEASE: 'http://bath5.mggame.com.cn/html5/football2/'
};
window.SHARE_PIC_URL = {
    TEST: 'http://cgbeta.mggame.com.cn:10081/html5/soccer2/image/shareIcon.png',
    INSPECT: 'http://cgbeta.mggame.com.cn:10081/html5/soccer2/image/shareIcon.png',
    RELEASE: 'http://bath5.mggame.com.cn/html5/football2/image/shareIcon.png'
};
window.MATH = {
    sqrt2: 1.4142135623731
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
        //# sourceMappingURL=Const.js.map
        