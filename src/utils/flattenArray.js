const flattenNestedArray = (array) => {
    let flattenedArray = [];
    array.forEach((item) => {
        flattenedArray.push(item);

        if (item.children && Array.isArray(item.children)) {
            flattenedArray = flattenedArray.concat(flattenNestedArray(item.children));
        }
    });

    return flattenedArray;
};
export default flattenNestedArray;