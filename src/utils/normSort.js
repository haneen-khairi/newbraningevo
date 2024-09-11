export default function normSort(direction) {
    switch (direction) {
        case "ascend":
            return "asc";
        case "descend":
            return "desc";
        default:
            return null;
    }
}
function normSortColumn(field) {
    if (!field) {
        return null;
    }
    if (Array.isArray(field)) {
        return field.at(0);
    }
    return field;
}
export {
    normSortColumn
}