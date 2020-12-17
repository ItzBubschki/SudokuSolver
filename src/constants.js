const states = {
    FILLED: 'filled',
    INVERTED: 'inverted',
    SQUARES: 'squares',
    STUCK: 'stuck',
    FAILED_GUESS: 'failed-guess',
    FINISHED: 'finished',
    FAILED: 'failed'
};

const phases = {
    NORMAL: 'normal',
    GUESSING: 'guessing'
};

const availableNums = {
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9
};

exports.states = states;
exports.phases = phases;
exports.availableNums = availableNums;
