import instance from "@/api/instance";
function fetchAllItems(params) {
    return instance
        .get("hospitality/restaurants/items", {
            params: params,
        })
        .then((response) => response.data);
}
function fetchOneItem(id) {
    return instance
        .get(`hospitality/restaurants/items/${id}`)
        .then((response) => response.data);
}
function createItem(data) {
    return instance
        .post("hospitality/restaurants/items", data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
        .then((response) => response.data);
}
function updateItem(data) {
    return instance
        .put(`hospitality/restaurants/items`, data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
        .then((response) => response.data);
}
async function favouriteItem(id, prevState) {
    return instance
        .put(`hospitality/user/favorite/restaurants/items`, {
            itemId: id,
            isFavorite: !prevState,
        })
        .then((response) => response.data);
}
function deleteItem(id) {
    return instance
        .delete(`hospitality/restaurants/items/${id}`)
        .then((response) => response.data);
}
export {
    fetchAllItems,
    fetchOneItem,
    createItem,
    updateItem,
    favouriteItem,
    deleteItem,
};
