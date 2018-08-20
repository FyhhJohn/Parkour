"use strict";
cc._RF.push(module, '6cdb8Bwaj9OIbgvKeDUtmNW', 'GameApp');
// script/GameApp.js

'use strict';

var EventEmitter = require('events').EventEmitter;
var Data = require('Data');
var Http = require('Http');
var UI = require('UI');
var Sound = require('Sound');
var Pool = require('Pool');

var GameApp = cc.Class({
    name: 'GameApp',
    extends: EventEmitter,

    properties: {
        data: Data,
        http: Http,
        ui: UI,
        sound: Sound,
        pool: Pool
    },

    ctor: function ctor() {
        this.data = new Data();
        this.http = new Http();
        this.sound = new Sound();
        this.pool = new Pool();
        this.ui = null;
    }
});

if (!CC_EDITOR) {

    window.GameApp = new GameApp();
    window.GameApp.sound.init();
    window.GameApp.on('UI_READY', function () {
        window.GameApp.ui.showUI('LoginUI');
    });
}

cc._RF.pop();