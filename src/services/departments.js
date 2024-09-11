import instance from '@/api/instance'
function fetchAllDepartments(params) {
    return instance.get('hospitality/departments', { params }).then(res => res.data)
}
function createDepartment(data) {
    return instance.post('hospitality/departments', data).then(res => res.data)
}
function fetchOneDepartment(id) {
    return instance.get(`hospitality/departments/${id}`).then(res => res.data)
}
function updateDepartment(data) {
    return instance.put(`hospitality/departments`, data).then(res => res.data)
}
function deleteDepartment(id) {
    return instance.delete(`hospitality/departments/${id}`).then(res => res.data)
}
export {
    fetchAllDepartments,
    createDepartment,
    fetchOneDepartment,
    updateDepartment,
    deleteDepartment
}