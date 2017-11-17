const MARA_EVENT = {
    run: "run",
    jump: "jump",
    on_the_ground: "on_the_ground"
};

const MARA_STATE = {
    idle: "idle",
    running: "running",
    air: "air"
};

let MARA_STATE_TABLE = {
    [MARA_STATE.idle]: {
        [MARA_EVENT.run]: MARA_STATE.running,
        [MARA_EVENT.jump]: MARA_STATE.air
    },
    [MARA_STATE.running]: {
        [MARA_EVENT.jump]: MARA_STATE.air
    },
    [MARA_STATE.air]: {
        [MARA_EVENT.on_the_ground]: MARA_STATE.idle
    }
};

/**
 * 状态转换
 * @param {*} nowState 
 * @param {*} inputEvent 
 */
const transform = (nowState, inputEvent) => {
    if (!MARA_STATE_TABLE[nowState]) {
        console.error(cc.js.formatStr("The state '%s' is not exist!", nowState));
        return null;
    }
    if (!MARA_STATE_TABLE[nowState][inputEvent]) {
        console.error(cc.js.formatStr("The state '%s' can not accept the event %s!", nowState, inputEvent));
        return nowState;
    }
    return MARA_STATE_TABLE[nowState][inputEvent];
};

export default {
    MARA_EVENT,
    MARA_STATE,
    transform
};