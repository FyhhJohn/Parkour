const EventEmitter = require('events').EventEmitter;
const Data = require('Data');
const Http = require('Http');
const UI = require('UI');
const Sound = require('Sound');
const Pool = require('Pool');

let GameApp = cc.Class({
    name: 'GameApp',
    extends: EventEmitter,

    properties: {
        data: Data,
        http: Http,
        ui: UI,
        sound: Sound,
        pool: Pool,
    },

    ctor: function () {
        this.data = new Data();
        this.http = new Http();
        this.sound = new Sound();
        this.pool = new Pool();
        this.ui = null;
    },
});

if (!CC_EDITOR) {

    window.GameApp = new GameApp();
    window.GameApp.sound.init();
    window.GameApp.on('UI_READY', () => {
        window.GameApp.ui.showUI('LoginUI');
    });
}