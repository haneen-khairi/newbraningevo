import instance from '@/api/instance'
async function fetchAllWaiters(params) {
    return instance.get('hospitality/waiters', {
        params
    }).then(res => res.data)
}
async function fetchWaiters(id) {
    return instance.get(`hospitality/waiters/${id}`).then(res => res.data)
}
async function createWaiters(data) {
    return instance.post('hospitality/waiters', data, {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }).then(res => res.data)
}

async function updateWaiters(data) {
    return instance.put('hospitality/waiters/', data, {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }).then(res => res.data)
}
async function deleteWaiters(id) {
    return instance.delete(`hospitality/waiters/${id}`).then(res => res.data)
}
export { fetchAllWaiters, fetchWaiters, createWaiters, updateWaiters, deleteWaiters }