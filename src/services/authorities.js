import instance from '@/api/instance'

async function fetchAuthorities(params) {
    return instance.get('hospitality/side', {
        params
    }).then(res => res.data)
}
async function fetchAuthority(id) {
    return instance.get(`hospitality/side/${id}`).then(res => res.data)
}
async function createAuthorities(data) {
    return instance.post('hospitality/side', data).then(res => res.data)
}
async function updateAuthorities(data) {
    return instance.put('hospitality/side', data).then(res => res.data)
}
async function deleteAuthorities(id) {
    return instance.delete(`hospitality/side/${id}`).then(res => res.data)
}
export { fetchAuthorities, fetchAuthority, createAuthorities, updateAuthorities, deleteAuthorities }