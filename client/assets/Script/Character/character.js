import StateMachine from "./../StateMachine/state";
import StateToAction from "./../StateMachine/stateToAction";

let limbWidth = 93;
let limbHeight = 107;
let frameCount = 7;

cc.Class({
    extends: cc.Component,

    properties: {
    },

    onLoad: function () {
        this.groundPosition = cc.v2(this.node.x, this.node.y);
        this.action = this.node.getComponent("characterAction");
        this.state = StateMachine.MARA_STATE.idle;
        var that = this;
        this.action.init('girl', function () { that.acceptEvent(StateMachine.MARA_EVENT.run); });
    },

    acceptEvent: function (eventName) {
        var targetState = StateMachine.transform(this.state, eventName);
        if (!targetState)
            return;
        this.state = targetState;
        var actionName = StateToAction.getActionByState(targetState);
        if (!actionName)
            return;
        this.action.resetFrame(actionName);
    },
});