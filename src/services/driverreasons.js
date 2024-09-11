import instance from '@/api/instance'

async function fetchDriverReasons(params) {
    return instance.get('vipcar/tripdrivercancelreasontypes', {
        params
    }).then(res => res.data)
}
async function fetchDriverReason(id) {
    return instance.get(`vipcar/tripdrivercancelreasontypes/${id}`).then(res => res.data)
}
async function createDriverReason(data) {
    return instance.post('vipcar/tripdrivercancelreasontypes/addlist', data).then(res => res.data)
}
async function updateDriverReason(data) {
    return instance.put('vipcar/tripdrivercancelreasontypes/editlist', data).then(res => res.data)
}
async function deleteDriverReason(id) {
    return instance.delete(`vipcar/tripdrivercancelreasontypes/${id}`).then(res => res.data)
}
export { fetchDriverReasons, fetchDriverReason, createDriverReason, updateDriverReason, deleteDriverReason }