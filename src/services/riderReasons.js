import instance from '@/api/instance'

async function fetchRiderReasons(params) {
    return instance.get('vipcar/tripridercancelreasontypes', {
        params
    }).then(res => res.data)
}
async function fetchRiderReason(id) {
    return instance.get(`vipcar/tripridercancelreasontypes/${id}`).then(res => res.data)
}
async function createRiderReason(data) {
    return instance.post('vipcar/tripridercancelreasontypes/addlist', data).then(res => res.data)
}
async function updateRiderReason(data) {
    return instance.put('vipcar/tripridercancelreasontypes/editlist', data).then(res => res.data)
}
async function deleteRiderReason(id) {
    return instance.delete(`vipcar/tripridercancelreasontypes/${id}`).then(res => res.data)
}
export { fetchRiderReasons, fetchRiderReason, createRiderReason, updateRiderReason, deleteRiderReason }