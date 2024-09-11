export function convertYearsObjectToArr(dataArr) {
    //make a 12 length array of zeroes
    let arr = new Array(12).fill(0);
    //loop over the object and set the index at "month"-1 to the value at "count"
    for (let entry of dataArr) {
        arr[entry.month - 1] = entry.count;
    }
    return arr;
}

// "data": [
//     {
//         "year": 2024,
//         "month": 7,
//         "count": 18
//     }
// ],

