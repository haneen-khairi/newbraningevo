import instance from '@/api/instance'
function createNewAdminOrder(data) {
    return instance({
        url: '/hospitality/admin-request',
        method: 'post',
        data
    }).then(res => res.data) 
}
function buildingNumber(data) {
    return instance({
        url: 'hospitality/buildings',
        method: 'post',
        data
    }).then(res => res.data) 
}
export {
    createNewAdminOrder,
    buildingNumber
}