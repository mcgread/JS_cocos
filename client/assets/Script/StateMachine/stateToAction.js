import StateMachine from "./state";

const MARA_ACTION = {
    idle: "idle",
    run: "run",
    jump: "jump"
};

const STATE_TO_ACTION = {
    [StateMachine.MARA_STATE.idle]: MARA_ACTION.idle,
    [StateMachine.MARA_STATE.running]: MARA_ACTION.run,
    [StateMachine.MARA_STATE.air]: MARA_ACTION.jump,
};

const getActionByState = (state) => {
    if (!STATE_TO_ACTION[state]) {
        console.log(cc.js.formatStr("The state '%s' does not have action!", state));
        return;
    }
    return STATE_TO_ACTION[state];
};

export default {
    MARA_ACTION,
    STATE_TO_ACTION,
    getActionByState
};
