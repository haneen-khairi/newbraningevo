//crud for restaurant roles
import instance from '@/api/instance'
function fetchAllRestaurantRoles(params) {
    return instance.get('hospitality/roles', { params }).then(res => res.data)
}
function createRestaurantRole(data) {
    return instance.post('hospitality/roles', data).then(res => res.data)
}
function updateRestaurantRole(data) {
    return instance.put('hospitality/roles' + data.id, data).then(res => res.data)
}
function deleteRestaurantRole(id) {
    return instance.delete(`hospitality/roles/${id}`).then(res => res.data)
}
export {
    fetchAllRestaurantRoles,
    createRestaurantRole,
    updateRestaurantRole,
    deleteRestaurantRole
}