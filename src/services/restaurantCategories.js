import instance from '@/api/instance'
function fetchAllCategories(params) {
    return instance.get('hospitality/restaurants/items/categories', { params }).then(response => response.data)
}
function fetchOneCategory(id) {
    return instance.get(`hospitality/restaurants/items/categories/${id}`).then(response => response.data)
}
function createCategory(data) {
    return instance.post('hospitality/restaurants/items/categories', data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }

    }).then(response => response.data)
}
function updateCategory(data) {
    return instance.put(`hospitality/restaurants/items/categories`, data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }

    }).then(response => response.data)
}
function deleteCategory(id) {
    return instance.delete(`hospitality/restaurants/items/categories/${id}`).then(response => response.data)
}
export {
    fetchAllCategories,
    fetchOneCategory,
    createCategory,
    updateCategory,
    deleteCategory
}