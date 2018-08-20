"use strict";
cc._RF.push(module, 'c3723xCVu1NtpqAGwdRN8Y4', 'Http');
// script/core/Http.js

'use strict';

cc.Class({
    name: 'Http',

    send: function send(route, data, cbSuccess, cbFail) {
        var xhr = new XMLHttpRequest();
        xhr.open('post', HTTP_SERVERS[SERVER] + route);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('uid', GameApp.data.user._id);
        xhr.onload = function () {
            var res = JSON.parse(xhr.responseText);
            cc.log(res);
            if (xhr.status === 200) {
                return cbSuccess && cbSuccess(res);
            }
            cbFail && cbFail(res);
        };
        xhr.ontimeout = function () {
            cc.log('网络连接超时');
        };
        xhr.onerror = function () {
            cc.log('网络连接出错');
        };
        xhr.onabort = function () {
            cc.log('网络连接中断');
        };
        xhr.send(JSON.stringify(data));
    },
    httpPost: function httpPost(service, method, data, cbSuccess, cbFail) {
        var xhr = new XMLHttpRequest();
        xhr.timeout = 15000;
        xhr.open('post', HTTP_SERVERS[SERVER]);
        xhr.setRequestHeader('Content-Type', 'application/json;charset=utf-8');

        xhr.setRequestHeader('app_version', '1');
        xhr.setRequestHeader('appversion', '1');
        xhr.setRequestHeader('channel_code', '1000010');
        xhr.setRequestHeader('channelcode', '1000010');
        xhr.setRequestHeader('subchannelid', '1');
        xhr.setRequestHeader('platform', '3');
        xhr.setRequestHeader('tel', '');
        xhr.setRequestHeader('userid', '');

        xhr.setRequestHeader('imei', '123');
        xhr.setRequestHeader('imsi', '111');
        xhr.setRequestHeader('client_ip', '0');
        xhr.setRequestHeader('clientip', '0');
        xhr.setRequestHeader('brand', '2');
        xhr.setRequestHeader('model', '2');
        xhr.setRequestHeader('screen', '1280');
        xhr.setRequestHeader('memory', '1024');
        xhr.setRequestHeader('os_version', '0');
        xhr.setRequestHeader('osversion', '0');

        xhr.setRequestHeader('spid', '127');
        xhr.setRequestHeader('migu_channel', '1');
        xhr.setRequestHeader('migubase_ch', '1');
        xhr.setRequestHeader('type_id', '1');
        xhr.setRequestHeader('game_id', '2');
        xhr.setRequestHeader('miguchannel', '1');
        xhr.setRequestHeader('migubasech', '1');
        xhr.setRequestHeader('typeid', '1');
        xhr.setRequestHeader('gameid', '2');

        xhr.onload = function () {
            var res = JSON.parse(xhr.responseText);
            cc.log(res);
            if (Number(res.returnCode) !== 0) {
                if (cbFail) {
                    cbFail(res.returnCode, res.resultData);
                }
                return;
            }
            if (cbSuccess) {
                cbSuccess(res.resultData);
            }
        };
        xhr.ontimeout = function () {
            cc.log('网络连接超时');
        };
        xhr.onerror = function () {
            cc.log('网络连接出错');
        };
        xhr.onabort = function () {
            cc.log('网络连接中断');
        };
        xhr.send(JSON.stringify({
            service: service,
            method: method,
            data: data
        }));
    }
});

cc._RF.pop();