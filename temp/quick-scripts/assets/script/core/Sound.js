(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/core/Sound.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'aaeeeoDjNREhIS2l9bZ/gfy', 'Sound', __filename);
// script/core/Sound.js

'use strict';

cc.Class({
    name: 'Sound',

    properties: {
        _musicOn: true,
        _musicAudioID: 0,
        _musicName: '',

        _effectOn: true,
        _effectAudioID: 0
    },

    init: function init() {
        if (cc.sys.localStorage.getItem('MUSIC_ON')) {
            this._musicOn = cc.sys.localStorage.getItem('MUSIC_ON') === 'true';
        }
        if (cc.sys.localStorage.getItem('EFFECT_ON')) {
            this._effectOn = cc.sys.localStorage.getItem('EFFECT_ON') === 'true';
        }
    },


    playMusic: function playMusic(name, restart) {
        if (name === '' || this._musicName === name && !restart) {
            return;
        }
        this._musicName = name;
        if (this._musicOn) {
            cc.audioEngine.stop(this._musicAudioID);
            this._musicAudioID = cc.audioEngine.play('res/raw-assets/resources/sound/music/' + name + '.mp3', true, 1);
        }
    },

    setMusic: function setMusic(on) {
        this._musicOn = on;
        cc.sys.localStorage.setItem('MUSIC_ON', '' + on);
        if (on) {
            this.playMusic(this._musicName, true);
        } else {
            cc.audioEngine.stop(this._musicAudioID);
        }
    },

    playEffect: function playEffect(name, cb) {
        if (this._effectOn) {
            //cc.audioEngine.stop(this._effectAudioID);
            this._effectAudioID = cc.audioEngine.play('res/raw-assets/resources/sound/effect/' + name + '.mp3', false, 1);
            var effectId = this._effectAudioID;
            if (cb) {
                cc.audioEngine.setFinishCallback(effectId, cb);
            }
        }
    },

    setEffect: function setEffect(on) {
        this._effectOn = on;
        cc.sys.localStorage.setItem('EFFECT_ON', '' + on);
        if (!on) {
            cc.audioEngine.stop(this._effectAudioID);
        }
    },

    toggleSound: function toggleSound() {
        this.setMusic(!this._effectOn);
        this.setEffect(!this._effectOn);
        return this._effectOn;
    },
    isOn: function isOn() {
        return this._effectOn;
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
        //# sourceMappingURL=Sound.js.map
        