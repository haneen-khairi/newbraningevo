import instance from '@/api/instance'
async function fetchAllRestHours(params) {
    return instance.get('hospitality/resthours', {
        params
    }).then(res => res.data)
}
async function fetchRestHours(id) {
    return instance.get(`hospitality/resthours/${id}`).then(res => res.data)
}
async function createRestHours(data) {
    return instance.post('hospitality/resthours', data, {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }).then(res => res.data)
}
async function updateRestHours(data) {
    return instance.put('hospitality/resthours', data).then(res => res.data)
}
async function deleteRestHours(id) {
    return instance.delete(`hospitality/resthours/${id}`).then(res => res.data)
}
export { fetchAllRestHours, fetchRestHours, createRestHours, updateRestHours, deleteRestHours }