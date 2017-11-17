import StateToAction from "./../StateMachine/stateToAction";

cc.Class({
    extends: cc.Component,

    properties: {
        body: cc.Node,
        leg: cc.Node,
        arm: cc.Node,
        loaded: false
    },

    init: function (name, callback) {
        this.legSprite = this.leg.getComponent(cc.Sprite);
        this.armSprite = this.arm.getComponent(cc.Sprite);
        this.nowFrame = 0;
        this.loaded = false;
        this.speedDuration = 10; //每N帧变化一次
        this.counter = 0;
        this.characterName = name;
        this.frames = {};
        var that = this;
        cc.loader.loadResDir('texture/character', function (err, assets) {
            if (err) {
                cc.error(err);
                return;
            }
            for (var i = 0; i < assets.length; ++i) {
                var asset = assets[i];
                if (asset instanceof cc.SpriteFrame) {
                    if (asset.name.startsWith(that.characterName)) {
                        that.frames[asset.name] = asset;
                    }
                }
            }
            that.resetFrame(StateToAction.MARA_ACTION.idle);
            that.loaded = true;
            if (callback)
                callback();
        });
    },

    resetFrame: function (actionName) {
        var frames = this.frames;
        //TODO: 暂时认为胳膊和腿的索引是一致的
        this.legFrames = {};
        this.armFrames = {};
        this.frameCount = 0;
        this.nowFrame = 0;
        var needChange = true;
        switch (actionName) {
            case StateToAction.MARA_ACTION.idle:
                this.legFrames[0] = this.frames[this.characterName + "_leg1"];
                this.armFrames[0] = this.frames[this.characterName + "_arm1"];
                this.frameCount = 1;
                break;
            case StateToAction.MARA_ACTION.run:
                for (var i = 1; i <= 4; ++i) {
                    this.legFrames[i - 1] = this.frames[cc.js.formatStr("%s_leg%d", this.characterName, i)];
                    this.armFrames[i - 1] = this.frames[cc.js.formatStr("%s_arm%d", this.characterName, i)];
                }
                this.frameCount = 4;
                break;
            case StateToAction.MARA_ACTION.jump:
                for (var i = 5; i <= 7; ++i) {
                    this.legFrames[i - 5] = this.frames[cc.js.formatStr("%s_leg%d", this.characterName, i)];
                    this.armFrames[i - 5] = this.frames[cc.js.formatStr("%s_arm%d", this.characterName, i)];
                }
                this.frameCount = 3;
                break;
            default:
                needChange = false;
                break;
        }
        if (needChange)
            this.setNowFrame();
    },

    setNowFrame: function () {
        this.armSprite.spriteFrame = this.armFrames[this.nowFrame];
        this.legSprite.spriteFrame = this.legFrames[this.nowFrame];
    },

    update: function (dt) {
        if (!this.loaded || this.frameCount <= 0)
            return;
        if (this.counter > 0 && (this.counter % this.speedDuration == 0)) {
            this.counter = 0;
            ++this.nowFrame;
            //TODO: 暂不支持非循环动画
            if (this.nowFrame >= this.frameCount)
                this.nowFrame = 0;
            this.setNowFrame();
        }
        ++this.counter;
    },
});