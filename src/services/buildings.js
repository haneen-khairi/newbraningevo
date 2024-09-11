import instance from '@/api/instance'
function fetchAllBuildings(params) {
    return instance.get('hospitality/buildings', {
        params
    }).then(res => res.data)
}
function fetchBuilding(id) {
    return instance.get(`hospitality/buildings/${id}`).then(res => res.data)
}
function createBuilding(building) {
    return instance.post('hospitality/buildings', building).then(res => res.data)
}
function updateBuilding(building) {
    return instance.put(`hospitality/buildings`, building).then(res => res.data)
}
function deleteBuilding(id) {
    return instance.delete(`hospitality/buildings/${id}`).then(res => res.data)
}
export { fetchAllBuildings, fetchBuilding, createBuilding, updateBuilding, deleteBuilding }