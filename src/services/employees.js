import instance from '@/api/instance'
function fetchAllEmployees(param) {
    return instance.get('hospitality/employees', { params: param }).then(res => res.data)
}
function fetchEmployeeById(id) {
    return instance.get(`hospitality/employees/${id}`).then(res => res.data)
}
function createEmployee(data) {
    return instance.post('hospitality/employees', data).then(res => res.data)
}
export {
    fetchAllEmployees,
    fetchEmployeeById,
    createEmployee
}