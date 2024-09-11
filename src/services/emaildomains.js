import instance from '@/api/instance'
async function fetchAllEmailDomains(params) {
    return instance.get('hospitality/WhiteListEmailDomains', {
        params
    }).then(res => res.data)
}
async function fetchEmailDomains(id) {
    return instance.get(`hospitality/WhiteListEmailDomains/${id}`).then(res => res.data)
}
async function createEmailDomains(data) {
    return instance.post('hospitality/WhiteListEmailDomains', data).then(res => res.data)
}
async function updateEmailDomains(data) {
    return instance.put('hospitality/WhiteListEmailDomains', data).then(res => res.data)
}
async function deleteEmailDomains(id) {
    return instance.delete(`hospitality/WhiteListEmailDomains/${id}`).then(res => res.data)
}
export { fetchAllEmailDomains, fetchEmailDomains, createEmailDomains, updateEmailDomains, deleteEmailDomains }