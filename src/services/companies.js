import instance from '@/api/instance'

async function fetchCompanies(params) {
    return instance.get('hospitality/companies', {
        params
    }).then(res => res.data)
}
async function fetchCompany(id) {
    return instance.get(`hospitality/companies/${id}`).then(res => res.data)
}
async function createCompanies(data) {
    return instance.post('hospitality/companies', data).then(res => res.data)
}
async function updateCompanies(data) {
    return instance.put('hospitality/companies', data).then(res => res.data)
}
async function deleteCompanies(id) {
    return instance.delete(`hospitality/companies/${id}`).then(res => res.data)
}
export { fetchCompanies, fetchCompany, createCompanies, updateCompanies, deleteCompanies }