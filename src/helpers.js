function createDeepArrayCopy(original) {
    const newArray = [];
    for (let i = 0; i < original.length; i++) {
        const row = original[i].slice();
        newArray.push(row);
    }
    return newArray;
}

exports.createDeepArrayCopy = createDeepArrayCopy;
