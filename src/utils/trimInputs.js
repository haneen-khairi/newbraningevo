//receives a value object and returns a new object with trimmed values
export default function trimInputs(values) {
    const newValues = {};
    for (let key in values) {
        //only trim string values
        if (typeof values[key] === 'string') {
            newValues[key] = values[key].trim();
        } else {
            newValues[key] = values[key];
        }
    }
    return newValues;
}